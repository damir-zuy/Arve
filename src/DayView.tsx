import React, { useState, useEffect, useRef, useCallback } from 'react';
import ArrowLeft from './assets/Arrow_left.svg';
import ArrowRight from './assets/Arrow_right.svg';
import NewCross from './assets/New_cross.svg';
import {ReactComponent as Logo} from './assets/Logo.svg';
import NoteModal from './components/NoteModal';
import { GoArrowRight as SaveIcon } from "react-icons/go";
import { motion, AnimatePresence } from 'framer-motion';
import {ReactComponent as NewTradeLog} from './assets/add_log.svg';
import {ReactComponent as SettingsIcon} from './assets/Settings.svg';
import SettingsModal from './components/SettingsModal';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface DayViewProps {
  currentDate?: Date; // Make currentDate optional
  onPrevDay: () => void;
  onNextDay: () => void;
  onViewChange: (view: 'Day' | 'Month' | 'Year') => void;
  onYearChange: (yearIndex: number) => void;
  onMonthChange: (monthIndex: number) => void;
  setNotification: (message: string | null) => void;
  setNotificationClass: (className: string) => void;
}

// Define a type for the trade object
interface Trade {
  _id?: string; // Added _id for MongoDB documents
  pair: string;
  date: string;
  session: string;
  position: 'long' | 'short' | null;
  result: string;
  rr: string;
  risk: string;
  note: string;
  images?: File[];
}

const DayView: React.FC<DayViewProps> = ({
  currentDate: providedDate,
  onPrevDay,
  onNextDay,
  onViewChange,
  onYearChange,
  onMonthChange,
}) => {
  const currentDate = providedDate || new Date(); // Provide default value
  const [isYearSelectorOpen, setIsYearSelectorOpen] = useState(false);
  const [isMonthSelectorOpen, setIsMonthSelectorOpen] = useState(false);
  const [positionType, setPositionType] = useState<'none' | 'long' | 'short'>('none');
  const [pairValue, setPairValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [rrValue, setRrValue] = useState('');
  const [riskValue, setRiskValue] = useState('');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [noteIndex, setNoteIndex] = useState<number | null>(null);
  const yearSelectorRef = useRef<HTMLDivElement>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [notificationClass, setNotificationClass] = useState<string>('');
  const [selectedSession, setSelectedSession] = useState('London');
  const [showTemplateRow, setShowTemplateRow] = useState(true);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [selectedTradeIndex, setSelectedTradeIndex] = useState<number | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [trades, setTrades] = useState<Trade[]>([]);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Removed unused variable
  const currentYear = currentDate?.getFullYear?.() || new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const sessions = ['London', 'New York', 'Asia', 'Franfurt']; // Define available sessions

  const getFormattedDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekDay = weekDays[date.getDay()];
    return `${weekDay} ${day}/${month}/${year}`;
  };

  const formatDateForAPI = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60000; // смещение в миллисекундах
    const localDate = new Date(date.getTime() - offset);
    return localDate.toISOString().split('T')[0]; // возвращает дату в формате YYYY-MM-DD
  };

  const togglePositionType = () => {
    if (positionType === 'none') setPositionType('long');
    else if (positionType === 'long') setPositionType('short');
    else setPositionType('long');
  };

  const handlePairInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase();
    setPairValue(newValue);
  };

  const handleResultInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.\-+]/g, '');
    setResultValue(value);
  };

  const handleRrInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace('1:', '');
    value = value.replace(/[^0-9.]/g, '');
    setRrValue(value ? `1:${value}` : '');
  };

  const handleRiskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setRiskValue(value);
  };

  const openNoteModal = (note: string, index: number | null) => {
    setCurrentNote(note);
    setNoteIndex(index);
    setIsNoteModalOpen(true);
  };

  const saveNote = async (note: string, images: File[]) => {
    if (noteIndex !== null) {
        const tradeToUpdate = trades[noteIndex];
        if (tradeToUpdate._id) {
            const formData = new FormData();
            formData.append('note', note); // Append the note
            images.forEach((image) => {
                formData.append('images', image); // Append each image
            });

            try {
                const response = await fetch(`http://localhost:5000/api/trades/${tradeToUpdate._id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: formData // Send form data
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error updating trade note:', errorText);
                    setNotification("Failed to update note on the server.");
                    setTimeout(() => setNotification(null), 3000);
                } else {
                    const updatedTrades = [...trades];
                    updatedTrades[noteIndex].note = note; // Update local state
                    updatedTrades[noteIndex].images = images; // Update images in local state
                    setTrades(updatedTrades);
                    setNotification("Note updated successfully!");
                    setNotificationClass('notification-success'); // Set success class
                    setTimeout(() => setNotification(null), 3000);
                }
            } catch (error) {
                console.error('Error updating trade note:', error);
                setNotification("Network error while updating note.");
                setTimeout(() => setNotification(null), 3000);
            }
        }
    } else {
        setCurrentNote(note);
    }
  };
  
// Function to save a trade (create or update)
// After successful saving, a repeat request for trades occurs (refetch)
const handleSaveClick = async () => {
  // Check required fields
  if (!pairValue || positionType === 'none' || !resultValue || !rrValue || !riskValue) {
    setNotification("Please fill in all required fields.");
    setTimeout(() => setNotification(null), 3000);
    return;
  }

  try {
    const method = isEditMode && selectedTradeIndex !== null ? 'PUT' : 'POST';
    const tradeId = isEditMode && selectedTradeIndex !== null ? trades[selectedTradeIndex]._id : '';
    const url = `http://localhost:5000/api/trades${method === 'PUT' ? `/${tradeId}` : ''}`;

    console.log('Sending trade data:', { // Debug log
      pair: pairValue,
      date: formatDateForAPI(currentDate),
      session: selectedSession,
      position: positionType,
      result: resultValue,
      rr: rrValue,
      risk: riskValue,
      note: currentNote
    });

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        pair: pairValue,
        date: formatDateForAPI(currentDate),
        session: selectedSession,
        position: positionType,
        result: resultValue,
        rr: rrValue,
        risk: riskValue,
        note: currentNote
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    setNotification(isEditMode ? "Trade updated successfully!" : "Trade saved successfully!");
    setNotificationClass('notification-success');
    setTimeout(() => setNotification(null), 3000);

    // Reset form
    setPositionType('none');
    setPairValue('');
    setResultValue('');
    setRrValue('');
    setRiskValue('');
    setCurrentNote('');
    setShowTemplateRow(false);
    setIsEditMode(false);
    setSelectedTradeIndex(null);

    // Refresh trades
    fetchTrades();

  } catch (error) {
    console.error('Error saving trade:', error);
    if (error instanceof Error) {
      setNotification(error.message);
    } else {
      setNotification('An unknown error occurred');
    }
    setTimeout(() => setNotification(null), 3000);
  }
};  
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

  useEffect(() => {
    const shouldFocus = localStorage.getItem('focusPairInput') === 'true';
    if (shouldFocus) {
      const pairInput = document.querySelector('input[placeholder="Pair"]') as HTMLInputElement;
      if (pairInput) {
        pairInput.focus();
        setShowTemplateRow(true);
        localStorage.removeItem('focusPairInput');
      }
    }
  }, []);

  const handleYearClick = (year: number) => {
    onYearChange(year);
    setIsYearSelectorOpen(false);
  };

  const handleMonthClick = (monthIndex: number) => {
    onMonthChange(monthIndex);
    setIsMonthSelectorOpen(false);
  };

  const scrollYearList = (direction: 'up' | 'down') => {
    const container = document.querySelector('.year-options-container');
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

  // Fetch trades for the current day
const fetchTrades = useCallback(async () => {
  try {
    const dateString = formatDateForAPI(currentDate);
    const response = await fetch(`http://localhost:5000/api/trades/${dateString}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve trades');
    }

    const data = await response.json();
    
    // Transform data for display
    const formattedTrades = data.map((trade: any) => ({
      _id: trade._id,
      pair: trade.pair,  // Changed from asset to pair
      date: getFormattedDate(new Date(trade.date)),
      session: trade.session,
      position: trade.position,
      result: trade.result.toString() + '%',  // Ensure result is formatted with %
      rr: `1:${trade.rr}`,  // Format RR as 1:X
      risk: `${trade.risk}%`,  // Format risk with %
      note: trade.note || ''
    }));
    
    setTrades(formattedTrades);
  } catch (error) {
    console.error('Error retrieving trades:', error);
    setNotification("Failed to retrieve trades for the selected day.");
    setTimeout(() => setNotification(null), 3000);
  }
}, [currentDate]);  
  
  // Fetch trades whenever the date changes
  useEffect(() => {
    fetchTrades();
  }, [currentDate, fetchTrades]);

  const calculateTotalProfit = () => {
    return trades.reduce((total, trade) => {
      const resultValue = parseFloat(trade.result.replace('%', '')); // Remove '%' and convert to number
      return total + (isNaN(resultValue) ? 0 : resultValue); // Add to total if valid number
    }, 0);
  };

  const totalProfit = calculateTotalProfit();

  const handleSessionClick = () => {
    const currentIndex = sessions.indexOf(selectedSession);
    const nextIndex = (currentIndex + 1) % sessions.length; // Cycle through sessions
    setSelectedSession(sessions[nextIndex]);
  };

  const handleNewTradeLogClick = () => {
    setShowTemplateRow(true);
  };

  const handleRowContextMenu = (index: number, event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default context menu
    setSelectedTradeIndex(index);
    setContextMenuVisible(true);
    setContextMenuPosition({ top: event.clientY, left: event.clientX });
  };

  const handleEditTrade = () => {
    if (selectedTradeIndex !== null) {
      const tradeToEdit = trades[selectedTradeIndex];
      // fill form with data of selected trade
      setPairValue(tradeToEdit.pair);
      setResultValue(tradeToEdit.result.replace('%', ''));
      setRrValue(tradeToEdit.rr);
      setRiskValue(tradeToEdit.risk.replace('%', ''));
      setPositionType(tradeToEdit.position || 'none');
      setCurrentNote(tradeToEdit.note);
      setSelectedSession(tradeToEdit.session);
      // enable editing mode and show editing row
      setIsEditMode(true);
      setShowTemplateRow(true);
      setContextMenuVisible(false);
    }
  };

  const handleDeleteTrade = async () => {
    if (selectedTradeIndex !== null) {
      const tradeToDelete = trades[selectedTradeIndex];
      
      if (tradeToDelete._id) {
        try {
          const response = await fetch(`http://localhost:5000/api/trades/${tradeToDelete._id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Server error deleting trade:', errorText);
            setNotification("Failed to delete trade from server.");
            setTimeout(() => setNotification(null), 3000);
          } else {
            setNotification("Trade deleted successfully!");
            setTimeout(() => setNotification(null), 3000);
            setNotificationClass('notification-success'); // Set success class
            
            // Remove from local state
            setTrades(prevTrades => prevTrades.filter((_, index) => index !== selectedTradeIndex));
          }
        } catch (error) {
          console.error('Error deleting trade:', error);
          setNotification("Network error deleting trade.");
          setTimeout(() => setNotification(null), 3000);
        }
      } else {
        // Just remove from local state if no _id
        setTrades(prevTrades => prevTrades.filter((_, index) => index !== selectedTradeIndex));
      }
      
      setContextMenuVisible(false);
    }
  };

  const closeContextMenu = () => {
    setContextMenuVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuVisible && event.target instanceof Element && !event.target.closest('.context-menu')) {
        closeContextMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenuVisible]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    console.log('Logging out...'); // Debug log
    localStorage.removeItem('email'); // Clear email from local storage
    localStorage.removeItem('token'); // Also clear the token
    setEmail(''); // Clear email state
    setIsSettingsModalOpen(false); // Close the modal
    navigate('/sign-in'); // Redirect to sign-in page
  };

  const handleViewChange = (view: 'Day' | 'Month' | 'Year') => {
    onViewChange(view);
    if (view === 'Year') {
      navigate('/year');
    } else if (view === 'Month') {
      navigate('/');
    }
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [notification, setNotification]);

  return (
    <div className='calendar-container'>
      <AnimatePresence>
        {notification && (
          <motion.div
            className={`notification ${notificationClass}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'fixed', top: '-10px', left: '0', right: '0', transform: 'translateX(-50%)', zIndex: 10000 }}
          >
            {notification}
          </motion.div>
        )}
      </AnimatePresence>
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
            className="month-text"
            onClick={() => setIsMonthSelectorOpen(!isMonthSelectorOpen)}
          >
            {monthNames[currentDate.getMonth()]}
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
                    className={`month-option ${index === currentDate.getMonth() ? 'selected' : ''}`}
                    onClick={() => handleMonthClick(index)}
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
            {currentDate.getFullYear()}
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
                    onClick={() => handleYearClick(year)}
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
            <button className="view-btn current-view" onClick={() => handleViewChange('Day')}>Day</button>
            <button className="view-btn" onClick={() => handleViewChange('Month')}>Month</button>
            <button className="view-btn" onClick={() => handleViewChange('Year')}>Year</button>
          </div>
          <div className="line"></div>
          <button className="arrow-btn" onClick={onPrevDay}>
            <img src={ArrowLeft} alt="Previous Day" />
          </button>
          <button 
            className="arrow-btn" 
            onClick={onNextDay}
          >
            <img src={ArrowRight} alt="Next Day" />
          </button>
          <div className="line"></div>
          <button className="new_cross" onClick={handleNewTradeLogClick}>
            <img src={NewCross} alt="New" />
          </button>
        </div>
      </header>
      
        <div className="day-view-content">
          <h2 className="day-title">Day {currentDate.getDate()}</h2>
          <div className="trades-table-container">
          <table className="trades-table">
            <thead>
              <tr>
                <th>Pair</th>
                <th>Date</th>
                <th>Session</th>
                <th>Position</th>
                <th>Result</th>
                <th>RR</th>
                <th>Risk</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, index) => (
                <React.Fragment key={index}>
                  <tr 
                    className={`trade-row ${trade.result.includes('-') ? 'loss' : 'profit'}`}
                    onContextMenu={(e) => handleRowContextMenu(index, e)}
                  >
                    <td>{trade.pair}</td>
                    <td>{trade.date}</td>
                    <td onClick={handleSessionClick} style={{ cursor: 'pointer' }}>
                      <motion.span 
                        className={`session-badge ${trade.session === selectedSession ? 'selected' : ''}`}
                        whileTap={{ scale: 0.9 }}
                      >
                        {trade.session}
                      </motion.span>
                    </td>
                    <td>
                      <motion.span 
                        className={`position-badge ${trade.position}`}
                        whileTap={{ scale: 0.9 }}
                      >
                        {trade.position ? trade.position.charAt(0).toUpperCase() + trade.position.slice(1) : ''}
                      </motion.span>
                    </td>
                    <td>{trade.result}</td>
                    <td>{trade.rr}</td>
                    <td>{trade.risk}</td>
                    <td className="note-cell" onClick={() => openNoteModal(trade.note, index)}>
                      {trade.note}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
              {(isEditMode || showTemplateRow) && (
                <tr className={`template-row ${isEditMode ? 'editing' : ''}`}>
                  <td>
                    <input 
                      type="text" 
                      placeholder="Pair" 
                      value={pairValue}
                      onChange={handlePairInputChange}
                      autoComplete="off"
                    />
                  </td>
                  <td>
                    <input 
                      type="text" 
                      className="date-display"
                      value={getFormattedDate(currentDate)}
                      readOnly
                    />
                  </td>
                  <td onClick={handleSessionClick} style={{ cursor: 'pointer' }}>
                    <motion.span 
                      className={`session-badge ${selectedSession ? 'selected' : ''}`}
                      whileTap={{ scale: 0.9 }}
                    >
                      {selectedSession}
                    </motion.span>
                  </td>
                  <td>
                    <motion.span 
                      className={`position-badge template ${positionType === 'long' ? 'selected-long' : ''} ${positionType === 'short' ? 'selected-short' : ''}`}
                      onClick={togglePositionType}
                      whileTap={{ scale: 0.9 }}
                    >
                      {positionType === 'none' ? 'Position' : positionType === 'long' ? 'Long' : 'Short'}
                    </motion.span>
                  </td>
                  <td className="result-column">
                    <input 
                      type="text"
                      inputMode="decimal"
                      placeholder="0.0" 
                      value={resultValue}
                      onChange={handleResultInputChange}
                    />
                    <span className="symbol-suffix">%</span>
                  </td>
                  <td>
                    <input 
                      type="text"
                      inputMode="decimal"
                      placeholder="1:1" 
                      value={rrValue}
                      onChange={handleRrInputChange}
                    />
                  </td>
                  <td className="result-column">
                    <input 
                      type="text"
                      inputMode="decimal"
                      placeholder="0.0" 
                      value={riskValue}
                      onChange={handleRiskInputChange}
                    />
                    <span className="symbol-suffix">%</span>
                  </td>
                  <td className="note-cell">
                    <div className="note-placeholder" onClick={() => openNoteModal(currentNote, null)}>
                      {currentNote || "Click to add note..."}
                    </div>
                    <button className="save-button" onClick={handleSaveClick}><SaveIcon style={{width: '20px', height: '20px'}}/></button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <button className="new-trade-log" onClick={handleNewTradeLogClick}>
            <NewTradeLog />
            New trade log
          </button>
        
          <footer className="trades-footer">
        <div className="trades-stats">
          <div>Positions: <span className='stat_text'>{trades.length}</span></div> 
          <div>Long: <span className='stat_text'>{trades.filter(t => t.position === 'long').length}</span></div> 
          <div>Short: <span className='stat_text'>{trades.filter(t => t.position === 'short').length}</span></div> 
          <div>Win: <span className='stat_text'>{trades.filter(t => !t.result.includes('-')).length}</span></div> 
          <div>Loss: <span className='stat_text'>{trades.filter(t => t.result.includes('-')).length}</span></div> 
        </div>
        <div className="profit-display">
          Profit: <span className='stat_text'>{totalProfit.toFixed(2)}%</span> 
        </div>
          </footer>
          </div>
        </div>

      <NoteModal 
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        initialNote={currentNote}
        onSave={(note: string) => saveNote(note, [])}
      />

      {contextMenuVisible && selectedTradeIndex !== null && contextMenuPosition && (
        <div 
            className="context-menu" 
            style={{ 
                position: 'absolute', 
                top: contextMenuPosition.top, 
                left: contextMenuPosition.left 
            }}
        >
            <button onClick={handleEditTrade}>Edit</button>
            <button className='context-menu-delete' onClick={handleDeleteTrade}>Delete</button>
        </div>
      )}

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
        setNotification={(message: string | null) => setNotification(message)}
        setNotificationClass={setNotificationClass}
      />
    </div>
  );
};

export default DayView;