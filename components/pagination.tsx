import React from "react";

const Pagination = ({
  page,
  pageSize,
  total,
  onPageChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}) => {
  const totalpages = Math.ceil(total / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalpages) {
      onPageChange(newPage);
      window.scrollTo(0, 85);
    }
  };

  return (
    <section className="container mx-auto flex justify-center items-center mt-8 text-white text-shadow-[0_0_2px] text-shadow-black/50">
      <button
        disabled={page === 1}
        className="mr-2 px-2 py-1 linkbuttonamber rounded-md cursor-pointer w-20"
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>

      <span className="mx-2">
        Page {page} of {totalpages}
      </span>

      <button
        disabled={page === totalpages}
        className="ml-2 px-2 py-1 linkbuttonamber rounded-md cursor-pointer w-20"
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
