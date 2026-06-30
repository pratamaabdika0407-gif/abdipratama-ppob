'use client';

import { useState, useEffect } from 'react';
import { FiClock, FiGlobe } from 'react-icons/fi';

interface TimeZone {
  name: string;
  label: string;
  offset: string;
}

const TIMEZONES: TimeZone[] = [
  { name: 'UTC', label: 'UTC (Universal)', offset: 'UTC+0' },
  { name: 'Asia/Jakarta', label: 'Jakarta (WIB)', offset: 'UTC+7' },
  { name: 'Asia/Bangkok', label: 'Bangkok (ICT)', offset: 'UTC+7' },
  { name: 'Asia/Singapore', label: 'Singapore (SGT)', offset: 'UTC+8' },
  { name: 'Asia/Hong_Kong', label: 'Hong Kong (HKT)', offset: 'UTC+8' },
  { name: 'Asia/Tokyo', label: 'Tokyo (JST)', offset: 'UTC+9' },
  { name: 'Asia/Shanghai', label: 'Shanghai (CST)', offset: 'UTC+8' },
  { name: 'Australia/Sydney', label: 'Sydney (AEDT)', offset: 'UTC+11' },
  { name: 'Pacific/Auckland', label: 'Auckland (NZDT)', offset: 'UTC+13' },
  { name: 'Europe/London', label: 'London (GMT)', offset: 'UTC+0' },
  { name: 'Europe/Paris', label: 'Paris (CET)', offset: 'UTC+1' },
  { name: 'Europe/Moscow', label: 'Moscow (MSK)', offset: 'UTC+3' },
  { name: 'America/New_York', label: 'New York (EST)', offset: 'UTC-5' },
  { name: 'America/Chicago', label: 'Chicago (CST)', offset: 'UTC-6' },
  { name: 'America/Denver', label: 'Denver (MST)', offset: 'UTC-7' },
  { name: 'America/Los_Angeles', label: 'Los Angeles (PST)', offset: 'UTC-8' },
  { name: 'Pacific/Honolulu', label: 'Honolulu (HST)', offset: 'UTC-10' },
];

interface ClockDisplay {
  timezone: TimeZone;
  time: string;
  date: string;
  hours: number;
  minutes: number;
  seconds: number;
}

const DigitalClock = () => {
  const [clocks, setClocks] = useState<ClockDisplay[]>([]);
  const [favorites, setFavorites] = useState<string[]>(['Asia/Jakarta', 'Asia/Tokyo', 'America/New_York']);
  const [selectedZone, setSelectedZone] = useState<string>('Asia/Jakarta');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const updateClocks = () => {
      const displayZones = showAll ? TIMEZONES : TIMEZONES.filter((tz) => favorites.includes(tz.name));

      const newClocks = displayZones.map((tz) => {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tz.name,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });

        const dateFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tz.name,
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });

        const timeString = formatter.format(new Date());
        const [hours, minutes, seconds] = timeString.split(':').map(Number);

        return {
          timezone: tz,
          time: timeString,
          date: dateFormatter.format(new Date()),
          hours,
          minutes,
          seconds,
        };
      });

      setClocks(newClocks);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, [favorites, showAll]);

  const toggleFavorite = (tzName: string) => {
    setFavorites((prev) =>
      prev.includes(tzName) ? prev.filter((t) => t !== tzName) : [...prev, tzName]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <FiClock className="text-5xl text-blue-400" />
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">World Clock</h1>
              <p className="text-blue-200">Real-time display across multiple time zones</p>
            </div>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            {showAll ? 'Show Favorites' : 'Show All Zones'}
          </button>
        </div>

        {/* Main Clock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {clocks.map((clock) => (
            <div
              key={clock.timezone.name}
              className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 hover:border-blue-400/50 transition group"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition">
                    {clock.timezone.label}
                  </h3>
                  <p className="text-xs text-blue-200">{clock.timezone.offset}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(clock.timezone.name)}
                  className={`text-2xl transition ${
                    favorites.includes(clock.timezone.name) ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
                  }`}
                >
                  ⭐
                </button>
              </div>

              {/* Digital Time Display */}
              <div className="bg-black/40 rounded-xl p-6 mb-4 border border-blue-500/30">
                <div className="font-mono text-5xl font-bold text-blue-300 tracking-wider text-center mb-2">
                  {String(clock.hours).padStart(2, '0')}:{String(clock.minutes).padStart(2, '0')}:
                  <span className="text-blue-500 animate-pulse">{String(clock.seconds).padStart(2, '0')}</span>
                </div>
                <p className="text-center text-gray-300 text-sm">{clock.date}</p>
              </div>

              {/* Analog-style progress bar */}
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full transition-all duration-100"
                  style={{
                    width: `${((clock.hours % 12) * 60 + clock.minutes) / 720 * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Detailed View Section */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <FiGlobe className="text-blue-400" />
            Time Zone Details
          </h2>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {clocks.map((clock) => (
              <div
                key={clock.timezone.name}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition border border-white/10 hover:border-blue-400/30"
              >
                <div className="flex-1">
                  <p className="font-semibold text-white">{clock.timezone.label}</p>
                  <p className="text-xs text-gray-400">{clock.timezone.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-2xl font-bold text-blue-300">{clock.time}</p>
                  <p className="text-xs text-gray-400">{clock.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '🌍',
              title: 'Global Coverage',
              desc: '17+ major time zones worldwide',
            },
            {
              icon: '⚡',
              title: 'Real-time Updates',
              desc: 'Updates every second automatically',
            },
            {
              icon: '⭐',
              title: 'Favorites',
              desc: 'Mark your preferred time zones',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-blue-400/50 transition"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;
