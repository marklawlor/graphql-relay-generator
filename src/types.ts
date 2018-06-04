import {
  GraphQLInputFieldConfig,
  GraphQLFieldConfig,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType
} from "graphql";

export const InterfaceSymbol = Symbol("typescript-interface");

export interface Typed<T> {
  [InterfaceSymbol]?: T;
}

export type InferType<T> = T extends Typed<any>
  ? T[typeof InterfaceSymbol]
  : any;

export type TypedFieldConfig<T> = {
  [K in keyof T]: Typed<T[K]> & GraphQLFieldConfig<any, any>
};

export interface Connection<T> {
  totalCount: number;
  edges: {
    node: T;
  };
}

// prettier-ignore
export type HasConnection<T, K extends string | void> = K extends string
  ? Record<K, T> & Typed<T> & Connection<T>
  : Typed<T> & Connection<T>

// prettier-ignore
export type InputFieldConfig<T, TSource, TContext> =
  T extends string ? GraphQLInputScalarTypeConfig<TSource, TContext> :
  T extends string[] ? GraphQLInputScalarArrayTypeConfig<TSource, TContext> :
  T extends boolean ? GraphQLInputScalarTypeConfig<TSource, TContext> :
  T extends boolean[] ? GraphQLInputScalarArrayTypeConfig<TSource, TContext> :
  T extends number ? GraphQLInputScalarTypeConfig<TSource, TContext> :
  T extends number[] ? GraphQLInputScalarArrayTypeConfig<TSource, TContext> :
  GraphQLInputFieldConfig

export interface GraphQLInputScalarTypeConfig<TSource, TContext>
  extends GraphQLInputFieldConfig {
  type: GraphQLScalarType | GraphQLNonNull<GraphQLScalarType>;
}

export interface GraphQLInputScalarArrayTypeConfig<TSource, TContext>
  extends GraphQLInputFieldConfig {
  type:
    | GraphQLList<GraphQLScalarType>
    | GraphQLNonNull<GraphQLList<GraphQLScalarType>>;
}

export type InputFieldConfigMap<T, TSource, TContext> = {
  [K in keyof T]: InputFieldConfig<T[K], TSource, TContext>
};

// prettier-ignore
export type OutputFieldConfig<T, TSource, TContext> =
  T extends string ? GraphQLOutputScalarTypeConfig<TSource, TContext> :
  T extends string[] ? GraphQLOutputScalarArrayTypeConfig<TSource, TContext> :
  T extends boolean ? GraphQLOutputScalarTypeConfig<TSource, TContext> :
  T extends boolean[] ? GraphQLOutputScalarArrayTypeConfig<TSource, TContext> :
  T extends number ? GraphQLOutputScalarTypeConfig<TSource, TContext> :
  T extends number[] ? GraphQLOutputScalarArrayTypeConfig<TSource, TContext> :
  GraphQLFieldConfig<TSource, TContext>;

export interface GraphQLOutputScalarTypeConfig<TSource, TContext>
  extends GraphQLFieldConfig<TSource, TContext> {
  type: GraphQLScalarType | GraphQLNonNull<GraphQLScalarType>;
}

export interface GraphQLOutputScalarArrayTypeConfig<TSource, TContext>
  extends GraphQLFieldConfig<TSource, TContext> {
  type:
    | GraphQLList<GraphQLScalarType>
    | GraphQLNonNull<GraphQLList<GraphQLScalarType>>;
}

export type OutputFieldConfigMap<T, TSource, TContext> = {
  [K in keyof T]: OutputFieldConfig<T[K], TSource, TContext>
};
