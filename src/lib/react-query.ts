import {
  QueryClient,
  QueryFunctionContext,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import api from "./api";

const defaultQueryFn = async (context: QueryFunctionContext) => {
  const [_key, _params] = context.queryKey;

  const response = await api.get(`/${_key}`, { params: _params });

  return response.data;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

type Fn = (...args: never[]) => unknown;

export type ExtractFnReturnType<FnType extends Fn> = Awaited<
  ReturnType<FnType>
>;

export type QueryConfig<QueryFnType extends Fn> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  "queryFn" | "queryKey"
>;

export type MutationConfig<MutationFnType extends Fn> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  AxiosError,
  Parameters<MutationFnType>[0]
>;

export type WithQueryConfig<
  QueryFnType extends Fn,
  Params extends object = object
> = Params & {
  config?: QueryConfig<QueryFnType>;
};
