"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({
  page,
  pageSize,
  total,
}: {
  page: number;
  pageSize: number;
  total: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalpages = Math.ceil(total / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalpages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <section className="container mx-auto text-sm lg:text-base flex justify-center items-center mt-8 text-white text-shadow-[0_0_2px] text-shadow-black/50">
      <button
        disabled={page === 1}
        className="mr-2 px-3 py-1.5 linkbuttongray rounded-md cursor-pointer w-20"
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>

      <span className="mx-2">
        Page {page} of {totalpages}
      </span>

      <button
        disabled={page >= totalpages}
        className="ml-2 px-3 py-1.5 linkbuttongray rounded-md cursor-pointer w-20"
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
