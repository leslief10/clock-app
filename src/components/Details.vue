<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import type { Ref } from 'vue';
import { TimeDataKey, toggleVisibilityKey } from '../common/injectionKeys';
import type { TimeData } from '../common/types';

const dayOfYear = ref(0);
const fullTimeInfo = inject<Ref<TimeData | undefined>>(TimeDataKey);
const toggleVisibility = inject<boolean>(toggleVisibilityKey);

const getDayOfYear = async (): Promise<number | undefined> => {
    const date = fullTimeInfo?.value?.dateTime.split('T')[0];
    try {
        const url = `https://timeapi.io/api/conversion/dayoftheyear/${date}`;
        const response: Response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const { day }: { day: number } = await response.json();
        dayOfYear.value = day;
        return dayOfYear.value;
    } catch (error: unknown) {
        console.error('Error fetching day of the year:', error);
    }
};

getDayOfYear();

const timeZone = computed(() => {
    const timeZone = fullTimeInfo?.value?.timeZone ?? '';
    return timeZone;
});

const dayOfWeek = computed(() => {
    let dayOfWeek = 0;
    switch (fullTimeInfo?.value?.dayOfWeek) {
        case 'Monday':
            dayOfWeek = 1;
            break;
        case 'Tuesday':
            dayOfWeek = 2;
            break;
        case 'Wednesday':
            dayOfWeek = 3;
            break;
        case 'Thursday':
            dayOfWeek = 4;
            break;
        case 'Friday':
            dayOfWeek = 5;
            break;
        case 'Saturday':
            dayOfWeek = 6;
            break;
        case 'Sunday':
            dayOfWeek = 7;
            break;
        default:
            dayOfWeek = 0;
            break;
    }
    return dayOfWeek;
});
</script>
<template>
    <div v-if="toggleVisibility" class="details-container">
        <div class="time-zone">
            <p>Current TimeZone</p>
            <p>{{ timeZone }}</p>
        </div>
        <div class="day-of-year">
            <p>Day of the Year</p>
            <p>{{ dayOfYear }}</p>
        </div>
        <div class="day-of-week">
            <p>Day of the Week</p>
            <p>{{ dayOfWeek }}</p>
        </div>
        <div class="week-number">
            <p>Week Number</p>
            <p></p>
        </div>
    </div>
</template>
<style scoped></style>
