import React, { useState } from 'react';
import { X, UserPlus, LogIn, Users, Check, Sparkles, Shield, Trophy } from 'lucide-react';
import { AVATARS, loadAllAccounts, registerAccount, switchAccount } from '../utils/authManager';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

export const AuthModal = ({
  isOpen,
  onClose,
  currentUser,
  onUserChanged
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState('signup'); // 'signup' | 'switch'
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('ninja');
  const [errorMessage, setErrorMessage] = useState(null);

  const allAccounts = loadAllAccounts();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) {
      setErrorMessage('Please enter both a username and an email.');
      sound.playError();
      return;
    }

    const result = registerAccount(username.trim(), email.trim(), selectedAvatar);
    if (!result.success) {
      setErrorMessage(result.message);
      sound.playError();
      return;
    }

    sound.playFanfare();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
    onUserChanged(result.user);
    onClose();
  };

  const handleSwitchUser = (userId) => {
    sound.playPop();
    const switched = switchAccount(userId);
    if (switched) {
      onUserChanged(switched);
      onClose();
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md select-none animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md rounded-3xl border-4 border-[#e5e5e5] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Top Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
              <span>👤</span>
            </div>
            <div>
              <h3 className="text-xl font-black">CodLingo Profiles</h3>
              <p className="text-xs text-emerald-100 font-bold">
                Save streaks, XP & customize your coder identity
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-2 bg-gray-100 border-b border-gray-200">
          <button
            onClick={() => {
              sound.playPop();
              setMode('signup');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'signup'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create New Account</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              setMode('switch');
              setErrorMessage(null);
            }}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'switch'
                ? 'bg-white text-cyan-700 shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Switch Profile ({allAccounts.length})</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {mode === 'signup' && (
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Avatar Selector */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-500 mb-2">
                  Choose Your Coding Mascot
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {AVATARS.map((av) => {
                    const isSelected = selectedAvatar === av.id;
                    return (
                      <button
                        type="button"
                        key={av.id}
                        onClick={() => {
                          sound.playPop();
                          setSelectedAvatar(av.id);
                        }}
                        className={`p-2 rounded-2xl flex flex-col items-center gap-1 border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-emerald-500 bg-emerald-50 shadow-md scale-105'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-2xl">{av.emoji}</span>
                        <span className="text-[10px] font-black text-gray-700 truncate w-full text-center">
                          {av.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Username Input */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-500 mb-1">
                  Coder Username
                </label>
                <input
                  type="text"
                  placeholder="e.g. ByteMaster, AdaLovelace"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-sm font-bold text-gray-800"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-black uppercase text-gray-500 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="developer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-sm font-bold text-gray-800"
                  required
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold animate-fade-in">
                  ⚠️ {errorMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full duo-btn duo-btn-green py-3 text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-yellow-200" />
                <span>Create Account & Start Learning</span>
              </button>
            </form>
          )}

          {mode === 'switch' && (
            <div className="space-y-3">
              <p className="text-xs font-bold text-gray-500">
                Choose an existing local profile to resume its streak and course progress:
              </p>

              <div className="space-y-2">
                {allAccounts.map((acc) => {
                  const avatarObj = AVATARS.find((a) => a.id === acc.avatar) || AVATARS[0];
                  const isActive = acc.id === currentUser.id;

                  return (
                    <div
                      key={acc.id}
                      onClick={() => handleSwitchUser(acc.id)}
                      className={`p-3 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-xl shadow-xs">
                          <span>{avatarObj.emoji}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-black text-gray-800 text-sm">{acc.username}</span>
                            {isActive && (
                              <span className="text-[10px] uppercase font-black bg-emerald-500 text-white px-1.5 py-0.2 rounded-full">
                                Active
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-bold text-gray-400">
                            🔥 {acc.streak} Day Streak • {acc.xp} XP
                          </div>
                        </div>
                      </div>

                      {isActive ? (
                        <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
                      ) : (
                        <span className="text-xs font-black text-cyan-600">Switch ➔</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
