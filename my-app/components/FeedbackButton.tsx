'use client';

import React from 'react';

interface FeedbackButtonProps {
  href: string;
  text?: string;
}

export function FeedbackButton({
  href,
  text = '点击提交反馈意见'
}: FeedbackButtonProps) {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'all 0.2s',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
      >
        {text}
      </a>
    </div>
  );
}
