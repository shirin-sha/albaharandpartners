"use client";

import React, { useRef, useEffect } from 'react';

interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({
  label,
  value,
  onChange,
  placeholder = 'Enter description...',
  className = '',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      const selection = window.getSelection();
      const range = selection?.rangeCount ? selection.getRangeAt(0) : null;
      editorRef.current.innerHTML = value || '';
      if (range && selection) {
        try {
          selection.removeAllRanges();
          selection.addRange(range);
        } catch (e) {
          // Ignore selection errors
        }
      }
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="form-label">{label}</label>
      )}
      <div className="border rounded">
        {/* Toolbar */}
        <div className="d-flex gap-1 p-2 border-bottom bg-light" style={{ flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => execCommand('bold')}
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => execCommand('italic')}
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => execCommand('underline')}
            title="Underline"
          >
            <u>U</u>
          </button>
          <div className="vr" />
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => execCommand('formatBlock', '<h3>')}
            title="Heading"
          >
            H
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => execCommand('insertUnorderedList')}
            title="Bullet List"
          >
            •
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => execCommand('insertOrderedList')}
            title="Numbered List"
          >
            1.
          </button>
          <div className="vr" />
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => {
              const url = prompt('Enter URL:');
              if (url) {
                execCommand('createLink', url);
              }
            }}
            title="Insert Link"
          >
            🔗
          </button>
        </div>
        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="p-3"
          style={{
            minHeight: '150px',
            outline: 'none',
            fontSize: '14px',
            lineHeight: '1.6',
          }}
          data-placeholder={placeholder}
        />
        <style jsx>{`
          div[contenteditable][data-placeholder]:empty:before {
            content: attr(data-placeholder);
            color: #999;
            pointer-events: none;
          }
        `}</style>
      </div>
    </div>
  );
}
