'use client';
import React from 'react';

interface LanguageSwitchProps {
  language: 'ltr' | 'rtl';
  onChange: (language: 'ltr' | 'rtl') => void;
  className?: string;
}

export default function LanguageSwitch({ language, onChange, className = '' }: LanguageSwitchProps) {
  return (
    <div className={`btn-group ${className}`} role="group">
      <button
        type="button"
        className={`btn ${language === 'ltr' ? 'btn-primary' : 'btn-outline-secondary'}`}
        onClick={() => onChange('ltr')}
      >
        🌐 LTR (English)
      </button>
      <button
        type="button"
        className={`btn ${language === 'rtl' ? 'btn-primary' : 'btn-outline-secondary'}`}
        onClick={() => onChange('rtl')}
      >
        🌍 RTL (Arabic)
      </button>
    </div>
  );
}
