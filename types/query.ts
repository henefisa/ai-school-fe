import { QueryFunctionContext } from '@tanstack/react-query';

export type QueryKey = unknown[];

export type QueryContext = QueryFunctionContext<QueryKey>;
