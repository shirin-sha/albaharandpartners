"use client";

export default function RtlToggler() {
  const toggleRtl = () => {
    const match = document.cookie.match(/(?:^|; )rtl=([^;]+)/);
    const current = match ? decodeURIComponent(match[1]) : "false";
    const next = current === "true" ? "false" : "true";

    // Set cookie for persistence
    document.cookie = `rtl=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;

    // Apply instantly to <html>
    const html = document.documentElement;
    const isRtl = next === "true";

    html.setAttribute("dir", isRtl ? "rtl" : "ltr");

    if (isRtl) {
      html.classList.add("rtl");
    } else {
      html.classList.remove("rtl");
    }
  };

  return (
    <button
      onClick={toggleRtl}
      id="toggle-rtl"
      className="btn-style-2 radius-3"
    >
      <span>rtl</span>
      <span>ltr</span>
    </button>
  );
}
