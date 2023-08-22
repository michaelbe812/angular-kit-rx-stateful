import {Observable, Subject} from 'rxjs';
import {Injector, Signal} from '@angular/core';
import {RxStatefulAccumulationFn} from "./accumulation-fn";

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
export interface Stateful<T, E> {
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
export interface RxStateful<T, E> {
  hasError$: Observable<boolean>;
  error$: Observable<E | never>;

  isSuspense$: Observable<boolean>;

  value$: Observable<T | null | undefined>;
  hasValue$: Observable<boolean>;

  context$: Observable<RxStatefulContext>;

  state$: Observable<Stateful<T, E>>;
}

export interface RxStatefulSignals<T, E> {
  hasError: Signal<boolean>;
  error: Signal<E | never>;

  isSuspense: Signal<boolean>;
  value: Signal<T | null | undefined>;
  hasValue: Signal<boolean>;
  context: Signal<RxStatefulContext>;

  state: Signal<Stateful<T, E>>;
}
export type RxStatefulWithError<T, E> = Pick<Stateful<T, E>, 'hasError' | 'error' | 'context'>;

/**
 * @internal
 */
export interface InternalRxState<T, E> {
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
export interface RxStatefulConfig<T, E> {
  /**
   * Injector to create an injection-context for rxStateful$.
   */
  injector?: Injector;
  /**
   * Trigger to refresh the source$.
   */
  refreshTrigger$?: Subject<any>;
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
  errorMappingFn?: (error: E) => any;
}

/**
 * @publicApi
 */
export interface RxStatefulSignalConfig<T, E> {
  /**
   * Injector to create an injection-context for rxStateful$.
   */
  injector?: Injector;
  /**
   * Trigger to refresh the source$.
   */
  refreshTrigger$?: Subject<any>;
  /**
   * Define if the value should be kept on refresh or reset to null
   * @default false
   */
  keepValueOnRefresh?: boolean;
  useSignals: true;
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
   * @param error
   */
  errorMappingFn?: (error: E) => any;
}