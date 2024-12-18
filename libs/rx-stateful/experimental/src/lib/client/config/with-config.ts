import {inject, InjectionToken} from '@angular/core';
import { makeFeature } from './config-feature';
import { Config, RX_STATEFUL_CONFIG } from '@angular-kit/rx-stateful';

export const RX_STATEFUL_CLIENT_CONFIG = <T,E>() => new InjectionToken<Config<T, E>>('RX_STATEFUL_CONFIG');

export function withConfig<T, E>(config: Config<T, E>) {
  return makeFeature('Config', [{ provide: RX_STATEFUL_CLIENT_CONFIG, useValue: config }]);
}

export function injectRxStatefulConfig<T, E>(): Config<T, E> | null {
  return inject(RX_STATEFUL_CLIENT_CONFIG, { optional: true });
}
