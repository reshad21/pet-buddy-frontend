"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-3 py-1 rounded-lg border ${
            currentPage === i
              ? "bg-blue-700 text-white border-transparent"
              : "bg-white text-blue-700 border-blue-300 hover:bg-blue-100"
          } transition duration-200`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex  mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`mx-1 px-3 py-1 rounded-lg border ${
          currentPage === 1
            ? "bg-gray-300 text-gray-600 border-transparent"
            : "bg-blue-700 text-white border-transparent hover:bg-blue-800"
        } transition duration-200`}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`mx-1 px-3 py-1 rounded-lg border ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-600 border-transparent"
            : "bg-blue-700 text-white border-transparent hover:bg-blue-800"
        } transition duration-200`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
