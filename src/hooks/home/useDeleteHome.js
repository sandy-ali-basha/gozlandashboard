
import { useQueryClient, useMutation } from "react-query";
import { _Home } from "api/home/home";

export const useDeleteHome = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => _Home.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["home"]);
      const previousData = queryClient.getQueriesData(["home"]);
      queryClient.setQueryData(["home"], (oldQueryData) => {
        const oldQueryDataCopy = oldQueryData?.companies.filter(
          (old) => +old.id !== +id
        );
        return oldQueryDataCopy;
      });
      return {
        previousData,
      }
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(["home"]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["home"], context.prevuiosQuery);
    },
  });
};
