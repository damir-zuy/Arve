import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import ArrowLeft from './assets/Arrow_left.svg';
import ArrowRight from './assets/Arrow_right.svg';
import NewCross from './assets/New_cross.svg';
import {ReactComponent as SettingsIcon} from './assets/Settings.svg';
import {ReactComponent as Logo} from './assets/Logo.svg';
import SettingsModal from './components/SettingsModal';
import { useNavigate } from 'react-router-dom';

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

interface MonthViewProps {
  setNotification: (message: string | null) => void;
  setNotificationClass: (className: string) => void;
  currentDate: Date;
  onViewChange: (view: 'Day' | 'Month' | 'Year') => void;
}

function MonthView({ setNotification, setNotificationClass, currentDate, onViewChange }: MonthViewProps) {
  const [viewDate, setViewDate] = useState(currentDate);
  const [calendarDays, setCalendarDays] = useState<DayData[]>([]);
  const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false);
  const [isYearSelectorOpen, setIsYearSelectorOpen] = useState(false);
  const yearSelectorRef = useRef<HTMLDivElement>(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [email] = useState('');

  useEffect(() => {
    setViewDate(currentDate);
    loadCalendarDays();
  }, [currentDate]);

  const handlePrevMonth = () => {
    const prevMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1);
    setViewDate(prevMonth);
    onViewChange('Month');
    const event = new CustomEvent('dateChange', { detail: prevMonth });
    window.dispatchEvent(event);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1);
    const today = new Date();
    
    if (nextMonth <= today) {
      setViewDate(nextMonth);
      onViewChange('Month');
      const event = new CustomEvent('dateChange', { detail: nextMonth });
      window.dispatchEvent(event);
    }
  };

  const handleRightArrowContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const today = new Date();
    const todayMonth = new Date(today.getFullYear(), today.getMonth());
    setViewDate(todayMonth);
    onViewChange('Month');
    const event = new CustomEvent('dateChange', { detail: todayMonth });
    window.dispatchEvent(event);
  };

  const handleYearChange = (year: number) => {
    const newDate = new Date(year, viewDate.getMonth(), 1);
    setViewDate(newDate);
    setCurrentYear(year);
    onViewChange('Month');
    const event = new CustomEvent('dateChange', { detail: newDate });
    window.dispatchEvent(event);
  };

  const handleMonthChange = (monthIndex: number) => {
    const newDate = new Date(viewDate.getFullYear(), monthIndex, 1);
    setViewDate(newDate);
    const event = new CustomEvent('dateChange', { detail: newDate });
    window.dispatchEvent(event);
  };

  const generateCalendarDays = async () => {
    try {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth() + 1; // Adjust for 1-based months
      const response = await fetch(
        `https://arve.onrender.com/api/trades/month/${year}/${month}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch trade data');
      }

      const tradeSummaries = await response.json();
      const firstDay = new Date(year, month - 1, 1);
      const lastDay = new Date(year, month, 0);
      const firstDayOfWeek = firstDay.getDay() || 7;
      const daysInMonth = lastDay.getDate();
      const days: DayData[] = [];

      // Add days from previous month
      const prevMonthDays = firstDayOfWeek - 1;
      const prevMonth = new Date(year, month - 1, 0);
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
      const today = new Date();
      for (let i = 1; i <= daysInMonth; i++) {
        const currentDay = new Date(year, month - 1, i);
        const tradeSummary = tradeSummaries.find((summary: { day: number }) => summary.day === i);
        const isFutureDay = currentDay > today;

        days.push({
          date: i,
          percentage: tradeSummary ? tradeSummary.totalResult : 0,
          amount: 0,
          isCurrentMonth: true,
          isToday: currentDay.getDate() === today.getDate() && 
                   currentDay.getMonth() === today.getMonth() && 
                   currentDay.getFullYear() === today.getFullYear(),
          isFutureDay,
          tradeCount: tradeSummary ? tradeSummary.tradeCount : 0
        });
      }

      // Fill remaining days from next month
      const remainingDays = 42 - days.length; // 6 rows × 7 days
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          date: i,
          percentage: 0,
          amount: 0,
          isCurrentMonth: false,
          isOtherMonth: true,
          tradeCount: 0
        });
      }

      return {
        days,
        totalPercentage: days.reduce((sum, day) => sum + (day.isCurrentMonth ? day.percentage : 0), 0),
        tradeCount: days.reduce((sum, day) => sum + (day.isCurrentMonth ? day.tradeCount : 0), 0)
      };
    } catch (error) {
      console.error('Error generating calendar days:', error);
      throw error;
    }
  };

  const loadCalendarDays = async () => {
    try {
      const data = await generateCalendarDays();
      setCalendarDays(data.days);
    } catch (error) {
      console.error('Error loading calendar days:', error);
      setNotification('Failed to load calendar data');
      setNotificationClass('notification-error');
    }
  };

  useEffect(() => {
    loadCalendarDays();
  }, [viewDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearSelectorRef.current && !yearSelectorRef.current.contains(event.target as Node)) {
        setIsYearSelectorOpen(false);
        setIsMonthSelectorOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const getDayClass = (day: DayData) => {
    const baseClass = 'day';
    const monthClass = day.isOtherMonth ? ' other-month' : ' current-month';
    const today = new Date();
    const isFutureOtherMonth = day.isOtherMonth && (
      (day.date <= 20 && viewDate.getMonth() === 11 && day.date <= today.getDate()) || // December to January
      (day.date > 20 && viewDate.getMonth() === 0 && day.date >= today.getDate()) || // January to December
      (day.date <= 20 && viewDate.getMonth() < today.getMonth()) || // Future month
      (viewDate.getFullYear() > today.getFullYear()) // Future year
    );
    const valueClass = day.percentage > 0 ? ' profit' : (day.percentage < 0 ? ' loss' : ' neutral');
    const todayClass = day.isToday ? ' today' : '';
    const futureClass = (day.isFutureDay || isFutureOtherMonth) ? ' future-day' : '';
    return baseClass + valueClass + monthClass + todayClass + futureClass;
  };

  const getContentClass = (day: DayData) => {
    if (day.percentage > 0) return 'day-content profit';
    if (day.percentage < 0) return 'day-content loss';
    return 'day-content neutral';
  };

  const formatPercentage = (value: number) => {
    return value === 0 ? '0%' : (value > 0 ? `+${value}%` : `${value}%`);
  };

  const calculateStats = () => {
    const currentMonthDays = calendarDays.filter(day => 
      day.isCurrentMonth && 
      !day.isFutureDay
    );
    
    const profitDays = currentMonthDays.filter(day => day.percentage > 0);
    const lossDays = currentMonthDays.filter(day => day.percentage < 0);
    const neutralDays = currentMonthDays.filter(day => day.percentage === 0);
    
    const totalPercentage = currentMonthDays.reduce((sum, day) => sum + day.percentage, 0);
    
    return {
      profitDays: profitDays.length,
      lossDays: lossDays.length,
      neutralDays: neutralDays.length,
      totalPercentage: parseFloat(totalPercentage.toFixed(2))
    };
  };

  const stats = calculateStats();

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

  const scrollMonthList = (direction: 'up' | 'down') => {
    const container = document.querySelector('.month-options-container');
    if (container) {
      const optionHeight = 48;
      const currentScroll = container.scrollTop;
      const targetScroll = Math.round((currentScroll + (direction === 'up' ? -optionHeight : optionHeight)) / optionHeight) * optionHeight;
      
      container.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const handleDayClick = useCallback((day: DayData) => {
    const today = new Date();
    let targetDate;
    if (day.isOtherMonth) {
      if (day.date > 20) {
        targetDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, day.date);
      } else {
        targetDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, day.date);
      }
    } else {
      targetDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day.date);
    }

    // Check if the target date is in the future
    if (targetDate <= today) {
      const event = new CustomEvent('dateChange', { detail: targetDate });
      window.dispatchEvent(event);
      setViewDate(targetDate);
      onViewChange('Day');
    }
  }, [viewDate, onViewChange]);

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('username');
    setIsSettingsModalOpen(false);
    navigate('/sign-in');
  };

  return (
    <div className="calendar-container">
      <header className="calendar-header">
        <div className="logo_wrapper">
          <div className="logo">
            <Logo />
          </div>
          <button className="settings-btn" onClick={() => setIsSettingsModalOpen(true)}>
            <SettingsIcon className="settings-icon"/>
          </button>
        </div>
        <div className="month-display" ref={yearSelectorRef}>
          <span 
            className="month-text"
            onClick={() => setIsMonthSelectorOpen(!isMonthSelectorOpen)}
          >
            {monthNames[viewDate.getMonth()]}
          </span>
          {isMonthSelectorOpen && (
            <div className="month-selector">
              <div className="month-navigation-top">
                <button 
                  className="year-nav-button"
                  onClick={() => scrollMonthList('up')}
                  aria-label="Scroll up"
                >
                  ▲
                </button>
              </div>
              <div className="month-options-container">
                {monthNames.map((month, index) => (
                  <div
                    key={month}
                    className={`month-option ${index === viewDate.getMonth() ? 'selected' : ''}`}
                    onClick={() => {
                      handleMonthChange(index);
                      setIsMonthSelectorOpen(false);
                    }}
                  >
                    {month}
                  </div>
                ))}
              </div>
              <div className="month-navigation-bottom">
                <button 
                  className="year-nav-button"
                  onClick={() => scrollMonthList('down')}
                  aria-label="Scroll down"
                >
                  ▼
                </button>
              </div>
            </div>
          )}
          <span 
            className="year-badge"
            onClick={() => setIsYearSelectorOpen(!isYearSelectorOpen)}
          >
            {viewDate.getFullYear()}
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
                      handleYearChange(year);
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
            <button className="view-btn current-view" onClick={() => onViewChange('Month')}>Month</button>
            <button className="view-btn" onClick={() => onViewChange('Year')}>Year</button>
          </div>
          <div className="line"></div>
          <button className="arrow-btn" onClick={handlePrevMonth}><img src={ArrowLeft} alt="Previous" /></button>
          <button 
            className={`arrow-btn ${new Date(viewDate.getFullYear(), viewDate.getMonth() + 1) > new Date() ? 'disabled' : ''}`} 
            onClick={handleNextMonth}
            onContextMenu={handleRightArrowContextMenu}
            disabled={new Date(viewDate.getFullYear(), viewDate.getMonth() + 1) > new Date()}
          >
            <img src={ArrowRight} alt="Next" />
          </button>
          <div className="line"></div>
          <button className="new_cross" onClick={() => {
            const today = new Date();
            const event = new CustomEvent('dateChange', { detail: today });
            window.dispatchEvent(event);
            onViewChange('Day');
            localStorage.setItem('focusPairInput', 'true');
          }}>
            <img src={NewCross} alt="New" />
          </button>
        </div>
      </header>
      
      <div className="calendar-grid">
        <div className="weekdays">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
        <div className="days">
          {calendarDays.map((day, index) => (
            <div key={index} className={getDayClass(day)} onClick={() => handleDayClick(day)}>
              <div className="day-number">{day.date}</div>
              <div className={getContentClass(day)}>
                <div className="day-percentage">{formatPercentage(day.percentage)}</div>
                <div className="day-trades">{day.tradeCount > 0 ? `${day.tradeCount} trades` : ''}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="calendar-stats">
        <div className="calendar-stats-left">
          <div >Profit days: <span className='stat_text'style={{color: 'var(--black)', fontWeight: 600}}>{stats.profitDays}</span></div>
          <div >Unprofitable days: <span className='stat_text' style={{color: 'var(--black)', fontWeight: 600}}>{stats.lossDays}</span></div>
          <div >Zero profit: <span className='stat_text' style={{color: 'var(--black)', fontWeight: 600}}>{stats.neutralDays}</span></div>
        </div>
        <div className="calendar-stats-right">
          <div >Profit: <span className='stat_text' style={{color: 'var(--black)', fontWeight: 600}}>{stats.totalPercentage > 0 ? '+' : ''}{stats.totalPercentage}%</span></div>
        </div>
      </footer>

      <SettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        initialNote=""
        onSave={(note, images) => {
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

export default MonthView;
