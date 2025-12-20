"use client";
import React, { useState } from "react";

const totalPages = 3; // you can make this dynamic via props

export default function Pagination() {
  const [currentPage, setCurrentPage] = useState(2); // set default page

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <ul className="pagination">
      <li
        className="wow fadeInUp"
        data-wow-delay=".3s"
        onClick={() => handlePageChange(currentPage - 1)}
        style={{ cursor: "pointer" }}
      >
        <a href="#" onClick={(e) => e.preventDefault()}>
          <i className="icon-arrow-left" />
        </a>
      </li>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
        (page, index) => (
          <li
            key={page}
            className={`wow fadeInUp ${page === currentPage ? "active" : ""}`}
            data-wow-delay={`.${index}s`}
            onClick={() => handlePageChange(page)}
            style={{ cursor: "pointer" }}
          >
            <a href="#" onClick={(e) => e.preventDefault()}>
              {page}
            </a>
          </li>
        )
      )}

      <li
        className="wow fadeInUp"
        data-wow-delay=".3s"
        onClick={() => handlePageChange(currentPage + 1)}
        style={{ cursor: "pointer" }}
      >
        <a href="#" onClick={(e) => e.preventDefault()}>
          <i className="icon-arrow-right1" />
        </a>
      </li>
    </ul>
  );
}
