"use client";
import React, { useState } from "react";

export default function LanguageDropdown() {
  const languages = ["EN", "VN"];
  const [selectedLang, setSelectedLang] = useState("EN");

  const handleSelect = (lang: string) => {
    setSelectedLang(lang);
  };

  return (
    <div className="tf-dropdown-sort tf-language" data-bs-toggle="dropdown">
      <div className="btn-select">
        <span className="text-sort-value label">{selectedLang}</span>
        <i className="icon-Arrow-Down" />
      </div>
      <div className="dropdown-menu">
        {languages.map((lang) => (
          <div
            key={lang}
            className="select-item"
            data-sort-value={lang}
            onClick={() => handleSelect(lang)}
          >
            <span className="text-value-item">{lang}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
