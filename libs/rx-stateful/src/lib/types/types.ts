import {Observable, Subject} from 'rxjs';
import {RxStatefulAccumulationFn} from "./accumulation-fn";
import {RefetchStrategy} from "../refetch-strategies/refetch-strategy";

/**
 * @publicApi
 *
 * @description
 * Context of the current emission.
 */
export type RxStatefulContext =  'suspense' | 'error' | 'next';

/**
 * @publicApi
 */
export interface Stateful<T, E = unknown>  {
  hasError: boolean;
  error: E | undefined;

  isSuspense: boolean;

  context: RxStatefulContext;

  value: T | null | undefined;
  hasValue: boolean;
}

/**
 * @publicApi
 */
export interface RxStateful<T, E = unknown> {
  hasError$: Observable<boolean>;
  error$: Observable<E | never>;

  isSuspense$: Observable<boolean>;

  value$: Observable<T | null | undefined>;
  hasValue$: Observable<boolean>;

  context$: Observable<RxStatefulContext>;

  state$: Observable<Stateful<T, E>>;
}


export type RxStatefulWithError<T, E = unknown> = Pick<InternalRxState<T, E>,  'error' | 'context' | 'isLoading' | 'isRefreshing' | 'value' >;

/**
 * @internal
 */
export interface InternalRxState<T, E = unknown> {
  value: T | null | undefined;
  isLoading: boolean;
  isRefreshing: boolean;
  error: E | undefined;
  context: RxStatefulContext;
}

/**
 * @publicApi
 *
 * @description
 * Configuration for rxStateful$
 *
 * @example
 * rxStateful$(source$, {keepValueOnRefresh: true})
 */
export interface RxStatefulConfig<T, E = unknown> {
  /**
   * Trigger to refresh the source$.
   * @deprecated use refetchStrategies instead
   * Will be removed in version 2 or 3.
   */
  refreshTrigger$?: Subject<any>;
  /**
   * Trigger to refresh the source$.
   */
  refetchStrategies?: RefetchStrategy[]
  /**
   * Define if the value should be kept on refresh or reset to null
   * @default false
   */
  keepValueOnRefresh?: boolean;
  /**
   * Accumulation function to accumulate the state.
   *
   * @default: ({ ...acc, ...val })
   */
  accumulationFn?: RxStatefulAccumulationFn<T, E>;
  /**
   * Define if the error should be kept on refresh or reset to null
   * @default false
   */
  keepErrorOnRefresh?: boolean;
  /**
   * Mapping function to map the error to a specific value.
   * @param error - the error which is thrown by the source$, e.g. a {@link HttpErrorResponse}.
   */
  errorMappingFn?: (error: E) => unknown;
  /**
   * Function which is called before the error is handled.
   * @param error - the error which is thrown by the source$, e.g. a {@link HttpErrorResponse}.
   */
  beforeHandleErrorFn?: (error: E) => void;
}


