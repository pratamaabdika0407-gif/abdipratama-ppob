'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TimerSession {
  id: string;
  label: string;
  duration: number;
  remaining: number;
  isRunning: boolean;
  isCompleted: boolean;
}

const Timer = () => {
  const [timers, setTimers] = useState<TimerSession[]>([
    { id: '1', label: 'Work Session', duration: 1500, remaining: 1500, isRunning: false, isCompleted: false },
  ]);
  const [inputMinutes, setInputMinutes] = useState('5');
  const [inputLabel, setInputLabel] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.isRunning && timer.remaining > 0) {
            const newRemaining = timer.remaining - 1;
            return {
              ...timer,
              remaining: newRemaining,
              isCompleted: newRemaining === 0,
              isRunning: newRemaining > 0,
            };
          }
          return timer;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const addTimer = () => {
    const minutes = parseInt(inputMinutes) || 0;
    if (minutes > 0) {
      setTimers([...timers, {
        id: Date.now().toString(),
        label: inputLabel || `Timer ${minutes}m`,
        duration: minutes * 60,
        remaining: minutes * 60,
        isRunning: false,
        isCompleted: false,
      }]);
      setInputMinutes('5');
      setInputLabel('');
    }
  };

  const toggleTimer = (id: string) => {
    setTimers(timers.map(t => t.id === id ? { ...t, isRunning: !t.isRunning } : t));
  };

  const resetTimer = (id: string) => {
    setTimers(timers.map(t => t.id === id ? { ...t, remaining: t.duration, isRunning: false, isCompleted: false } : t));
  };

  const deleteTimer = (id: string) => {
    setTimers(timers.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/clock" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
            ← Back to Clock
          </Link>
          <h1 className="text-4xl font-bold text-white">⏱ Timer</h1>
        </div>

        {/* Add Timer */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Add New Timer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="number"
              value={inputMinutes}
              onChange={(e) => setInputMinutes(e.target.value)}
              placeholder="Minutes"
              min="1"
              max="999"
              className="px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white"
            />
            <input
              type="text"
              value={inputLabel}
              onChange={(e) => setInputLabel(e.target.value)}
              placeholder="Timer label (optional)"
              className="px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder:text-gray-500"
            />
            <button
              onClick={addTimer}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition"
            >
              Add Timer
            </button>
          </div>
        </div>

        {/* Timers List */}
        <div className="space-y-4">
          {timers.map((timer) => (
            <div
              key={timer.id}
              className={`backdrop-blur-xl border border-white/20 rounded-2xl p-8 transition ${
                timer.isCompleted
                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/50 ring-2 ring-green-400/50'
                  : timer.isRunning
                  ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-400/50'
                  : 'bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-gray-400/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-6xl font-bold text-white font-mono mb-2">
                    {formatTime(timer.remaining)}
                  </div>
                  <p className="text-xl text-gray-300">{timer.label}</p>
                  {timer.isCompleted && (
                    <p className="text-lg text-green-400 font-semibold mt-2">✓ Time's up!</p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => toggleTimer(timer.id)}
                    className={`px-6 py-3 rounded-lg font-semibold transition ${
                      timer.isRunning
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {timer.isRunning ? '⏸ Pause' : '▶ Start'}
                  </button>
                  <button
                    onClick={() => resetTimer(timer.id)}
                    className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => deleteTimer(timer.id)}
                    className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
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

export default Timer;
