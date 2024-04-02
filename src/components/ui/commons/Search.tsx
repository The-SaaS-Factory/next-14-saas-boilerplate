"use client";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { TextInput } from "@tremor/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }: { placeholder?: string }) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathName}?${params.toString()}`);
  }, 500);

  return (
    <div className="mb-3">
      <div>
        <div className="relative  flex items-center">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <TextInput
            id="search"
            name="search"
            defaultValue={searchParams.get("query") || ""}
            icon={MagnifyingGlassCircleIcon}
            onValueChange={(value) => handleSearch(value)}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
