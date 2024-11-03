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
          className={`mx-0.5 px-2 py-1 text-sm rounded border ${
            currentPage === i
              ? "bg-blue-900 text-white border-transparent shadow-md" // Active page styling
              : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
          } transition duration-200`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-end space-x-1 mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 py-1 text-sm rounded border ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 border-transparent cursor-not-allowed" // Disabled Previous button
            : "bg-blue-900 text-white border-transparent hover:bg-blue-800 shadow-sm"
        } transition duration-200`}
      >
        Previous
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 text-sm rounded border ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 border-transparent cursor-not-allowed" // Disabled Next button
            : "bg-blue-900 text-white border-transparent hover:bg-blue-800 shadow-sm"
        } transition duration-200`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
