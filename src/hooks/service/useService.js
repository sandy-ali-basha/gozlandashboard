
import { useState } from "react";
import { useQuery } from "react-query";
import { _Service } from "api/service/service";

export const useService = (id) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["service", page, count, query],
    () =>
      _Service
        .index({
          query,
          page,
          count,
        })
        .then((res) => res)
  );

  return {
    data,
    isLoading,
    page,
    setPage,
    count,
    setCount,
    refetch,
    setQuery,
    query
  };
};
