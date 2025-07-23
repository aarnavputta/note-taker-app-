'use client';

import { useState } from 'react';

type Event = {
  id: string;
  summary: string;
  description: string;
  start: string;
  end: string;
  location: string;
};

export default function CalendarComponent() {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCalendarEvents = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/fetch-calendar-events');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Calendar events:', data);
      setEvents(data.events);
    } catch (err) {
      console.error('Error fetching calendar events:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={fetchCalendarEvents}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Fetch Calendar Events'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {events && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Calendar Events</h2>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold">{event.summary}</h3>
                {event.description && (
                  <p className="text-gray-600 mt-1">{event.description}</p>
                )}
                <div className="text-sm text-gray-500 mt-2">
                  <p>Start: {new Date(event.start).toLocaleString()}</p>
                  <p>End: {new Date(event.end).toLocaleString()}</p>
                  {event.location && <p>Location: {event.location}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 