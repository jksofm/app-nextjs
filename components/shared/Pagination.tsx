"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";
import useQuery from "@/hooks/useQuery";

interface Props {
  pageNumber: number;
  isNext: boolean;
  path: string;
  pageTotal: number;
  pageSize: number;
}

function Pagination({ pageNumber, isNext, pageTotal }: Props) {
  const router = useRouter();
  const path = usePathname();
  // console.log(router.query);
  // const searchParams = useSearchParams();

  const searchParams = useQuery();

  const handleNavigation = (type: string) => {
    let nextPageNumber = pageNumber;
    if (type === "prev") {
      nextPageNumber = pageNumber > 1 ? pageNumber - 1 : pageNumber;
    }
    if (type === "next") {
      nextPageNumber = pageNumber < pageTotal ? pageNumber + 1 : pageNumber;
    }

    if (nextPageNumber > 1) {
      const newQueryParams = { ...searchParams, page: nextPageNumber };
      const result = new URLSearchParams(newQueryParams as any).toString();

      // router.push(`${path}?page=${nextPageNumber}`);
      router.push(`?${result}`);
    } else {
      const newQueryParams = { ...searchParams, page: 1 };
      const result = new URLSearchParams(newQueryParams as any).toString();
      // router.push(`${path}?page=1`);
      router.push(`?${result}`);
    }
  };

  // if (!isNext && pageNumber === 1) return null;

  return (
    <div className="pagination">
      <Button
        onClick={() => handleNavigation("prev")}
        disabled={pageNumber === 1}
        className="!text-small-regular text-light-2"
      >
        Prev
      </Button>
      {Array.from({ length: pageTotal }, (_, page) => {
        return (
          <p
            key={page}
            onClick={() => {
              const newQueryParams = { ...searchParams, page: page + 1 };

              const result = new URLSearchParams(
                newQueryParams as any
              ).toString();

              // router.push(`${path}?page=${page + 1}`);
              router.push(`?${result}`);
            }}
            className={`${
              pageNumber === page + 1 && "text-[#877EFF]"
            } text-small-semibold text-light-1 cursor-pointer`}
          >
            {page + 1}
          </p>
        );
      })}

      <Button
        onClick={() => handleNavigation("next")}
        disabled={!isNext}
        className="!text-small-regular text-light-2"
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
