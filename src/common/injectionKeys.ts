import type { InjectionKey, Ref } from 'vue';
import type { TimeData, LocationData } from './types';

export const TimeDataKey: InjectionKey<Ref<TimeData | undefined>> =
    Symbol('TimeData');
export const LocationDataKey: InjectionKey<Ref<LocationData | undefined>> =
    Symbol('LocationData');
