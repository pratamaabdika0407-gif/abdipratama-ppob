'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Alarm {
  id: string;
  time: string;
  timezone: string;
  label: string;
  enabled: boolean;
}

const AlarmClock = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([
    { id: '1', time: '07:00', timezone: 'Asia/Jakarta', label: 'Wake up', enabled: true },
    { id: '2', time: '12:00', timezone: 'UTC', label: 'Lunch time', enabled: false },
  ]);
  const [newAlarmTime, setNewAlarmTime] = useState('08:00');
  const [newAlarmLabel, setNewAlarmLabel] = useState('');
  const [currentTime, setCurrentTime] = useState('00:00:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const addAlarm = () => {
    if (newAlarmTime) {
      setAlarms([...alarms, {
        id: Date.now().toString(),
        time: newAlarmTime,
        timezone: 'Asia/Jakarta',
        label: newAlarmLabel || 'Alarm',
        enabled: true,
      }]);
      setNewAlarmTime('08:00');
      setNewAlarmLabel('');
    }
  };

  const toggleAlarm = (id: string) => {
    setAlarms(alarms.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  const deleteAlarm = (id: string) => {
    setAlarms(alarms.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/clock" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
              ← Back to Clock
            </Link>
            <h1 className="text-4xl font-bold text-white">⏰ Alarm Clock</h1>
          </div>
          <div className="text-5xl font-bold text-purple-300 font-mono">{currentTime}</div>
        </div>

        {/* Add Alarm */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Set New Alarm</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="time"
              value={newAlarmTime}
              onChange={(e) => setNewAlarmTime(e.target.value)}
              className="px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white font-mono"
            />
            <input
              type="text"
              value={newAlarmLabel}
              onChange={(e) => setNewAlarmLabel(e.target.value)}
              placeholder="Alarm label (optional)"
              className="px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder:text-gray-500"
            />
            <button
              onClick={addAlarm}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
            >
              Add Alarm
            </button>
          </div>
        </div>

        {/* Alarms List */}
        <div className="space-y-4">
          {alarms.map((alarm) => (
            <div
              key={alarm.id}
              className={`backdrop-blur-xl border border-white/20 rounded-xl p-6 transition ${
                alarm.enabled
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50'
                  : 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-gray-400/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-4xl font-bold text-white font-mono mb-2">{alarm.time}</div>
                  <p className="text-lg text-gray-300">{alarm.label}</p>
                  <p className="text-sm text-gray-400">{alarm.timezone}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => toggleAlarm(alarm.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      alarm.enabled
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-600 hover:bg-gray-700 text-white'
                    }`}
                  >
                    {alarm.enabled ? '✓ ON' : 'OFF'}
                  </button>
                  <button
                    onClick={() => deleteAlarm(alarm.id)}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlarmClock;
