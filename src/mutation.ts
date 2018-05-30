import { GraphQLFieldConfig, GraphQLResolveInfo } from "graphql";

import { mutationWithClientMutationId } from "graphql-relay";

import { OutputFieldConfigMap, InputFieldConfigMap } from "./types";

export type MutationFn<TInput, TOutput, TContext = any> = (
  object: TInput,
  ctx: TContext,
  info: GraphQLResolveInfo
) => Promise<TOutput> | TOutput;

export type MutationConfig<TInput, TOutput, TContext = any> = {
  name: string;
  description?: string;
  inputFields: () => InputFieldConfigMap<TInput, any, TContext>;
  outputFields: () => OutputFieldConfigMap<TOutput, any, TContext>;
  resolver: MutationFn<TInput, TOutput>;
};

export default <TInput, TOutput>(
  config: MutationConfig<TInput, TOutput>
): GraphQLFieldConfig<any, any> => {
  const { resolver: mutateAndGetPayload, ...options } = config;

  return mutationWithClientMutationId({
    ...options,
    mutateAndGetPayload
  });
};
