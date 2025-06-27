import React from "react";
import './pagination.css'

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number; // how many pages to show on each side
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1,
}) => {
    const createPageRange = () => {
        const totalNumbers = siblingCount * 2 + 5; // including first, last, current, and two dots
        if (totalPages <= totalNumbers) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages: (number | "...")[] = [];
        const leftSibling = Math.max(currentPage - siblingCount, 2);
        const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);

        pages.push(1); // always show first page

        if (leftSibling > 2) pages.push("...");

        for (let i = leftSibling; i <= rightSibling; i++) {
            pages.push(i);
        }

        if (rightSibling < totalPages - 1) pages.push("...");

        pages.push(totalPages); // always show last page

        return pages;
    };

    const pages = createPageRange();

    return (
        <div className="pagination-container">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="prev"
            >
                Prev
            </button>

            {pages.map((page, index) =>
                typeof page === "number" ? (
                    <button
                        key={index}
                        onClick={() => onPageChange(page)}
                        className={`pageChange ${page === currentPage
                            ? "current"
                            : "notCurrent"
                            }`}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className="page">
                        {page}
                    </span>
                )
            )}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="next"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
