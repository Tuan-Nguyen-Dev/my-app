"use client";
import { useRouter } from "next/navigation";

const Pagination = ({
  totalPages,
  currentPage,
  currentLimit,
}: {
  totalPages: number;
  currentPage: number;
  currentLimit: number;
}) => {
  const router = useRouter();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <button
        disabled={currentPage === 1}
        onClick={() => {
          router.push(`/post?limit=${currentLimit}&page=${currentPage - 1}`);

          console.log("chec route", router);
        }}
      >
        Pre
      </button>
      <div>Curent Page {currentPage} </div>
      <button
        disabled={currentPage === totalPages}
        onClick={() => {
          router.push(`/post?limit=${currentLimit}&page=${currentPage + 1}`);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
