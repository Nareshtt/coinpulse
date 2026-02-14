"use client";

interface CoinsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CoinsPagination({ currentPage, totalPages, onPageChange }: CoinsPaginationProps) {
  const pages = [];
  for (let i = 1; i <= Math.min(totalPages, 5); i++) {
    pages.push(i);
  }

  return (
    <div id="coins-pagination" className="flex w-full justify-center mt-6">
      <div className="pagination-content flex items-center gap-2">
        <button
          className={`pagination-control prev px-3 py-2 bg-dark-400 rounded-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← Prev
        </button>
        
        <div className="pagination-pages flex gap-2">
          {pages.map((page) => (
            <button
              key={page}
              className={`page-link px-3 py-2 rounded-sm ${currentPage === page ? 'bg-green-500 text-black font-semibold' : 'hover:bg-dark-400'}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className={`pagination-control next px-3 py-2 bg-dark-400 rounded-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
