const TableListingPagination = ({ currentPage, totalPages, onClick }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;
    const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

    let startPage = Math.max(currentPage - halfMaxPageNumbersToShow, 1);
    let endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

    if (endPage - startPage + 1 < maxPageNumbersToShow) {
      startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onClick(i)}
          className={`px-2 py-1 mx-1 text-xs ${
            currentPage === i
              ? "text-white bg-blue-500 rounded-lg"
              : "text-gray-600"
          } font-latoFont`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center p-1 font-latoFont">
      <button
        onClick={() => onClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 ml-1 mr-1 text-xs text-gray-600 font-latoFont disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="py-1 pr-3 ml-2 text-xs text-gray-600 font-latoFont disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default TableListingPagination;
