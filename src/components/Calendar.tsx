"use client";

import { useState, useEffect } from "react";
import { IoChevronBack, IoChevronForward, IoAdd, IoClose, IoTime, IoLocation } from "react-icons/io5";

interface CalendarEvent {
  id: string;
  summary: string;
  description: string;
  start: string;
  end: string;
  location: string;
}

interface CalendarProps {
  onAddMeeting?: () => void;
}

export default function Calendar({ onAddMeeting }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDayView, setShowDayView] = useState(false);

  // Get calendar data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/fetch-calendar-events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data.events || []);
        }
      } catch (error) {
        console.error('Failed to fetch calendar events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Calendar navigation
  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setShowDayView(true);
  };

  const closeDayView = () => {
    setShowDayView(false);
    setSelectedDate(null);
  };

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const days = [];
  const today = new Date();
  const isToday = (date: Date) => 
    date.getDate() === today.getDate() && 
    date.getMonth() === today.getMonth() && 
    date.getFullYear() === today.getFullYear();

  // Generate calendar days
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date);
  }

  const monthNames = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];

  const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  // Get events for selected date
  const selectedDateEvents = selectedDate 
    ? events.filter(event => {
        const eventDate = new Date(event.start);
        return eventDate.getDate() === selectedDate.getDate() && 
               eventDate.getMonth() === selectedDate.getMonth() && 
               eventDate.getFullYear() === selectedDate.getFullYear();
      })
    : [];

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="w-full h-full flex flex-col p-4 relative">
      {/* Day View Overlay */}
      {showDayView && selectedDate && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
            {/* Day View Header */}
            <div className="bg-[#D9D9D9] px-6 py-4 flex items-center justify-between">
              <h2 className="font-mono text-xl font-medium">
                {formatDate(selectedDate)}
              </h2>
              <button
                onClick={closeDayView}
                className="p-2 hover:bg-[#D9D9D9]/60 rounded-lg transition-colors"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>

            {/* Day View Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="bg-[#D9D9D9]/20 rounded-xl p-4">
                      <h3 className="font-mono text-lg font-medium mb-2">
                        {event.summary}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <IoTime className="w-4 h-4" />
                          <span className="font-mono">
                            {formatTime(event.start)} - {formatTime(event.end)}
                          </span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <IoLocation className="w-4 h-4" />
                            <span className="font-mono">{event.location}</span>
                          </div>
                        )}
                        {event.description && (
                          <p className="text-sm text-gray-700 font-mono mt-2">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="font-mono text-gray-500">No meetings scheduled for this day.</p>
                </div>
              )}
            </div>

            {/* Day View Footer */}
            <div className="bg-[#D9D9D9]/20 px-6 py-4 flex justify-end">
              <button
                onClick={onAddMeeting}
                className="bg-black text-white font-mono text-sm px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <IoAdd className="w-4 h-4" />
                add meeting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Container */}
      <div className="w-full h-full bg-[#D9D9D9]/20 rounded-3xl flex flex-col overflow-hidden">
        
        {/* Calendar Header */}
        <div className="w-full h-16 bg-[#D9D9D9] flex items-center justify-between px-6">
          {/* Month/Year and Navigation */}
          <div className="flex items-center gap-6">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-[#D9D9D9]/60 rounded-lg transition-colors"
            >
              <IoChevronBack className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-4">
              <h2 className="font-mono text-xl font-medium">
                {monthNames[month]} {year}
              </h2>
              <button
                onClick={goToToday}
                className="font-mono text-xs text-gray-600 hover:text-black transition-colors"
              >
                today
              </button>
            </div>
            
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-[#D9D9D9]/60 rounded-lg transition-colors"
            >
              <IoChevronForward className="w-6 h-6" />
            </button>
          </div>

          {/* Add Meeting Button */}
          <button
            onClick={onAddMeeting}
            className="bg-black text-white font-mono text-xs px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-1"
          >
            <IoAdd className="w-3 h-3" />
            add meeting
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="h-6 flex items-center justify-center">
                <span className="font-mono text-xs text-gray-600 uppercase">
                  {day}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              const isCurrentMonth = date.getMonth() === month;
              const isTodayDate = isToday(date);
              const dayEvents = events.filter(event => {
                const eventDate = new Date(event.start);
                return eventDate.getDate() === date.getDate() && 
                       eventDate.getMonth() === date.getMonth() && 
                       eventDate.getFullYear() === date.getFullYear();
              });

              return (
                <div
                  key={index}
                  className={`aspect-square p-1 rounded-xl transition-all duration-200 cursor-pointer ${
                    isCurrentMonth 
                      ? 'bg-[#D9D9D9]/60 hover:bg-[#D9D9D9]/80' 
                      : 'bg-[#D9D9D9]/20'
                  } ${
                    isTodayDate ? 'ring-2 ring-black' : ''
                  }`}
                  onClick={() => handleDayClick(date)}
                >
                  <div className="h-full flex flex-col">
                    {/* Date Number */}
                    <div className="flex-1 flex items-start justify-center pt-1">
                      <span className={`font-mono text-sm ${
                        isCurrentMonth ? 'text-black' : 'text-gray-400'
                      }`}>
                        {date.getDate()}
                      </span>
                    </div>

                    {/* Events */}
                    <div className="flex-1 flex flex-col gap-0.5">
                      {dayEvents.slice(0, 1).map((event, eventIndex) => (
                        <div
                          key={event.id}
                          className="bg-black text-white text-xs px-1 py-0.5 rounded text-center truncate"
                          title={event.summary}
                        >
                          {event.summary}
                        </div>
                      ))}
                      {dayEvents.length > 1 && (
                        <div className="text-xs text-gray-600 font-mono text-center">
                          +{dayEvents.length - 1}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <div className="font-mono text-lg">loading calendar...</div>
        </div>
      )}
    </div>
  );
} 