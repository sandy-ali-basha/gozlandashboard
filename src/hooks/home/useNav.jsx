
import { useState } from "react";
import { useQuery } from "react-query";
import { _Home } from "api/home/home";

export const useNav = () => {
  const { data, isLoading, refetch } = useQuery(
    ["navbar"],
    () =>
      _Home
        .nav()
        .then((res) => res)
  );

  return {
    data,
    isLoading,
    refetch,
  };
};
