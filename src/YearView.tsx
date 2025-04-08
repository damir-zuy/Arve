import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import {ReactComponent as Logo} from './assets/Logo.svg';
import ArrowLeft from './assets/Arrow_left.svg';
import ArrowRight from './assets/Arrow_right.svg';
import NewCross from './assets/New_cross.svg';
import {ReactComponent as SettingsIcon} from './assets/Settings.svg';
import { useNavigate } from 'react-router-dom';
import SettingsModal from './components/SettingsModal';

interface YearViewProps {
  setNotification: (message: string | null) => void;
  setNotificationClass: (className: string) => void;
  currentDate: Date;
  onViewChange: (view: 'Day' | 'Month' | 'Year') => void;
  setSelectedDate: (date: Date) => void;
}

interface DayData {
  date: number;
  percentage: number;
  amount: number;
  isCurrentMonth: boolean;
  isToday?: boolean;
  isOtherMonth?: boolean;
  isFutureDay?: boolean;
  tradeCount: number;
}

interface MonthData {
  days: DayData[];
  totalPercentage: number;
  tradeCount: number;
}

interface TradeSummary {
  day: number;
  totalResult: number;
  tradeCount: number;
}

// Add memoized month cell component
const MonthCell = React.memo(({ monthName, monthData, index, onClick }: {
  monthName: string;
  monthData: MonthData;
  index: number;
  onClick: (index: number) => void;
}) => {
  return (
    <div
      className={`day-cell month-cell ${monthData.totalPercentage > 0 ? 'profit' : monthData.totalPercentage < 0 ? 'loss' : ''}`}
      onClick={() => onClick(index)}
    >
      <div className="day-header">
        <span className="day-number">{monthName}</span>
        {monthData.tradeCount > 0 && (
          <span className="day-percentage">
            {monthData.totalPercentage > 0 ? '+' : ''}{monthData.totalPercentage}%
          </span>
        )}
      </div>
      {monthData.tradeCount > 0 && (
        <div className="trade-info">
          <span className="trade-count">{monthData.tradeCount} trades</span>
        </div>
      )}
    </div>
  );
});

function YearView({ setNotification, setNotificationClass, currentDate, onViewChange, setSelectedDate }: YearViewProps) {
  const [isYearSelectorOpen, setIsYearSelectorOpen] = useState(false);
  const yearSelectorRef = useRef<HTMLDivElement>(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [email] = useState('');
  const [monthsData, setMonthsData] = useState<MonthData[]>([]);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    // Initialize currentYear based on currentDate prop
    setCurrentYear(currentDate.getFullYear());
  }, [currentDate]);

  const handlePrevYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const handleNextYear = () => {
    const nextYear = currentYear + 1;
    const today = new Date();
    if (nextYear <= today.getFullYear()) {
      setCurrentYear(nextYear);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setIsSettingsModalOpen(false);
    navigate('/sign-in');
  };

  // Optimize data fetching with debouncing
  const generateMonthData = useCallback(async (year: number, month: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/trades/month/${year}/${month + 1}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch trade data');
      }

      const tradeSummaries = await response.json() as TradeSummary[];
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const today = new Date();
      const days: DayData[] = [];

      // Add days from previous month
      const firstDayOfWeek = firstDay.getDay() || 7;
      const prevMonthDays = firstDayOfWeek - 1;
      const prevMonth = new Date(year, month, 0);
      for (let i = prevMonthDays - 1; i >= 0; i--) {
        days.push({
          date: prevMonth.getDate() - i,
          percentage: 0,
          amount: 0,
          isCurrentMonth: false,
          isOtherMonth: true,
          tradeCount: 0
        });
      }

      // Current month days
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const currentDay = new Date(year, month, i);
        const tradeSummary = tradeSummaries.find(summary => summary.day === i);
        const isFutureDay = currentDay > today;

        days.push({
          date: i,
          percentage: tradeSummary ? parseFloat(tradeSummary.totalResult.toFixed(2)) : 0,
          amount: tradeSummary ? tradeSummary.totalResult * 1000 : 0,
          isCurrentMonth: true,
          isToday: currentDay.getDate() === today.getDate() && 
                   currentDay.getMonth() === today.getMonth() && 
                   currentDay.getFullYear() === today.getFullYear(),
          isFutureDay: isFutureDay,
          tradeCount: tradeSummary ? tradeSummary.tradeCount : 0
        });
      }

      // Calculate total percentage and trade count
      const monthTotal = days
        .filter(day => day.isCurrentMonth && !day.isFutureDay)
        .reduce((acc, day) => ({
          percentage: acc.percentage + day.percentage,
          trades: acc.trades + day.tradeCount
        }), { percentage: 0, trades: 0 });

      return {
        days,
        totalPercentage: parseFloat(monthTotal.percentage.toFixed(2)),
        tradeCount: monthTotal.trades
      };
    } catch (error) {
      console.error('Error generating month data:', error);
      return {
        days: [],
        totalPercentage: 0,
        tradeCount: 0
      };
    }
  }, []);

  // Cache monthly data
  const monthDataCache = useRef(new Map<string, MonthData>());

  const loadYearData = useCallback(async () => {
    const cachedKey = `${currentYear}`;
    if (monthDataCache.current.has(cachedKey)) {
      setMonthsData(monthDataCache.current.get(cachedKey)!);
      return;
    }

    const data = await Promise.all(
      Array.from({ length: 12 }, (_, month) => 
        generateMonthData(currentYear, month)
      )
    );
    monthDataCache.current.set(cachedKey, data);
    setMonthsData(data);
  }, [currentYear, generateMonthData]);

  useEffect(() => {
    loadYearData();
  }, [currentYear, loadYearData]);

  const scrollYearList = (direction: 'up' | 'down') => {
    const container = document.querySelector('.year-options-container');
    if (container) {
      const scrollAmount = 40;
      const currentScroll = container.scrollTop;
      container.scrollTo({
        top: currentScroll + (direction === 'up' ? -scrollAmount : scrollAmount),
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (isYearSelectorOpen) {
      setTimeout(() => {
        const yearSelectorContainer = document.querySelector('.year-options-container');
        const selectedYearElement = document.querySelector('.year-option.selected');
        if (selectedYearElement && yearSelectorContainer) {
          selectedYearElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }, 50);
    }
  }, [isYearSelectorOpen]);

  const handleMonthClick = (monthIndex: number) => {
    const newDate = new Date(currentYear, monthIndex, 1);
    const event = new CustomEvent('dateChange', { detail: newDate });
    window.dispatchEvent(event);
    onViewChange('Month');
  };

  const calculateYearStats = () => {
    const profitMonths = monthsData.filter(month => month.totalPercentage > 0).length;
    const lossMonths = monthsData.filter(month => month.totalPercentage < 0).length;
    const neutralMonths = monthsData.filter(month => month.totalPercentage === 0).length;
    
    const totalPercentage = monthsData.reduce((sum, month) => sum + month.totalPercentage, 0);
    const totalTrades = monthsData.reduce((sum, month) => sum + month.tradeCount, 0);
    
    return {
      profitDays: profitMonths,
      lossDays: lossMonths,
      neutralDays: neutralMonths,
      totalPercentage: parseFloat(totalPercentage.toFixed(2)),
      totalTrades
    };
  };

  // Memoize year stats calculation
  const yearStats = useMemo(() => calculateYearStats(), [monthsData]);

  return (
    <div className="calendar-container">
      <header className="calendar-header">
        <div className="logo_wrapper">
          <div className="logo">
            <Logo/>
          </div>
          <button className="settings-btn" onClick={() => setIsSettingsModalOpen(true)}>
            <SettingsIcon className="settings-icon"/>
          </button>
        </div>
        <div className="month-display" ref={yearSelectorRef}>
          <span 
            className="year-badge"
            onClick={() => setIsYearSelectorOpen(!isYearSelectorOpen)}
          >
            {currentYear}
          </span>
          {isYearSelectorOpen && (
            <div className="year-selector">
              <div className="year-navigation-top">
                <button 
                  className="year-nav-button"
                  onClick={() => scrollYearList('up')}
                  aria-label="Scroll up"
                >
                  ▲
                </button>
              </div>
              <div className="year-options-container">
                {years.map(year => (
                  <div
                    key={year}
                    className={`year-option ${year === currentYear ? 'selected' : ''}`}
                    onClick={() => {
                      setCurrentYear(year);
                      setIsYearSelectorOpen(false);
                    }}
                  >
                    {year}
                  </div>
                ))}
              </div>
              <div className="year-navigation-bottom">
                <button 
                  className="year-nav-button"
                  onClick={() => scrollYearList('down')}
                  aria-label="Scroll down"
                >
                  ▼
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="controls">
          <div className="view-controls">
            <button className="view-btn" onClick={() => onViewChange('Day')}>Day</button>
            <button className="view-btn" onClick={() => onViewChange('Month')}>Month</button>
            <button className="view-btn current-view" onClick={() => onViewChange('Year')}>Year</button>
          </div>
          <div className="line"></div>
          <button className="arrow-btn" onClick={handlePrevYear}>
            <img src={ArrowLeft} alt="Previous" />
          </button>
          <button 
            className={`arrow-btn ${currentYear + 1 > new Date().getFullYear() ? 'disabled' : ''}`} 
            onClick={handleNextYear}
            disabled={currentYear + 1 > new Date().getFullYear()}
          >
            <img src={ArrowRight} alt="Next" />
          </button>
          <div className="line"></div>
          <button className="new_cross" onClick={() => {
            onViewChange('Day');
            localStorage.setItem('focusPairInput', 'true');
          }}>
            <img src={NewCross} alt="New" />
          </button>
        </div>
      </header>

      <div className="days-grid year-month-grid">
        {monthNames.map((monthName, index) => {
          const monthData = monthsData[index] || { totalPercentage: 0, tradeCount: 0 };
          return (
            <MonthCell
              key={index}
              monthName={monthName}
              monthData={monthData}
              index={index}
              onClick={handleMonthClick}
            />
          );
        })}
      </div>

      <footer className="calendar-stats">
        <div className="calendar-stats-left">
          <div>Profit months: <span className='stat_text' style={{color: 'var(--black)', fontWeight: 600}}>{yearStats.profitDays}</span></div>
          <div>Unprofitable months: <span className='stat_text' style={{color: 'var(--black)', fontWeight: 600}}>{yearStats.lossDays}</span></div>
          <div>Zero profit: <span className='stat_text' style={{color: 'var(--black)', fontWeight: 600}}>{yearStats.neutralDays}</span></div>
          <div>Total trades: <span className='stat_text' style={{color: 'var(--black)', fontWeight: 600}}>{yearStats.totalTrades}</span></div>
        </div>
        <div className="calendar-stats-right">
          <div>Profit: <span className='stat_text' style={{color: 'var(--black)', fontWeight: 600}}>{yearStats.totalPercentage > 0 ? '+' : ''}{yearStats.totalPercentage}%</span></div>
        </div>
      </footer>

      <SettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        initialNote=""
        onSave={(note: string, images: File[]) => {
          console.log('Note saved:', note, images);
          setIsSettingsModalOpen(false);
        }}
        email={email}
        onLogout={handleLogout}
        setNotification={setNotification}
        setNotificationClass={setNotificationClass}
      />
    </div>
  );
}

export default YearView;