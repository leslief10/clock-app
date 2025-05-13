<script setup lang="ts">
import { ref, computed, inject, watch } from 'vue';
import moment from 'moment';
import type { Ref } from 'vue';
import { TimeDataKey, toggleVisibilityKey } from '../common/injectionKeys';
import type { TimeData } from '../common/types';

const dayOfYear = ref<number>(0);
const dayOfWeek = ref<number>(0);
const weekOfYear = ref<number>(0);
const fullTimeInfo = inject<Ref<TimeData | undefined>>(TimeDataKey);
const toggleVisibility = inject<Ref<boolean>>(toggleVisibilityKey, ref(false));
const [hour] = fullTimeInfo?.value?.time_24.split(':') ?? '';

const getDayOfYear = (): number | undefined => {
    if (!fullTimeInfo?.value?.date_time_ymd) return;
    dayOfYear.value = moment(fullTimeInfo.value.date_time_ymd).dayOfYear();
    return dayOfYear.value;
};

const getdayOfWeek = (): number | undefined => {
    if (!fullTimeInfo?.value?.date_time_ymd) return;
    dayOfWeek.value = moment(fullTimeInfo.value.date_time_ymd).isoWeekday();
    return dayOfWeek.value;
};

const getWeekOfYear = (): number | undefined => {
    if (!fullTimeInfo?.value?.week) return;
    weekOfYear.value = fullTimeInfo?.value?.week;
    return weekOfYear.value;
};

watch(toggleVisibility, (newValue) => {
    if (
        newValue === true &&
        dayOfYear.value === 0 &&
        dayOfWeek.value === 0 &&
        weekOfYear.value === 0
    ) {
        getDayOfYear();
        getdayOfWeek();
        getWeekOfYear();
    }
});

const timeZone = computed(() => {
    const timeZone = fullTimeInfo?.value?.name?.replace(/_/g, ' ') ?? '';
    return timeZone;
});

const textColor = computed(() => {
    if (hour === undefined) return '';
    return hour >= '18' || hour < '05' ? 'light' : 'dark';
});

const backgroundClass = computed(() => {
    if (hour === undefined) return '';
    if (hour >= '05' && hour < '18') return 'details-day-background';
    return 'details-night-background';
});
</script>
<template>
    <div
        v-show="toggleVisibility"
        class="details-container"
        :class="backgroundClass"
    >
        <div class="details">
            <p class="details-description" :class="textColor">
                Current TimeZone
            </p>
            <p class="details-info" :class="textColor">{{ timeZone }}</p>
        </div>
        <div class="details">
            <p class="details-description" :class="textColor">
                Day of the Year
            </p>
            <p class="details-info" :class="textColor">{{ dayOfYear }}</p>
        </div>
        <div class="details">
            <p class="details-description" :class="textColor">
                Day of the Week
            </p>
            <p class="details-info" :class="textColor">{{ dayOfWeek }}</p>
        </div>
        <div class="details">
            <p class="details-description" :class="textColor">Week Number</p>
            <p class="details-info" :class="textColor">{{ weekOfYear }}</p>
        </div>
    </div>
</template>
<style scoped>
.details-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 3rem 1.5rem;
    backdrop-filter: blur(40.77px);
}

.details-day-background {
    background: rgba(255, 255, 255, 0.75);
}

.details-night-background {
    background: rgba(0, 0, 0, 0.75);
}

.details {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
}

.details-description {
    font-size: 0.5rem;
    font-weight: 400;
    line-height: 1.75rem;
    letter-spacing: 0.25rem;
    text-align: left;
    text-transform: uppercase;
}

.details-info {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.5rem;
    text-align: right;
}

.light {
    color: var(--white);
}

.dark {
    color: var(--dark-gray);
}

@media screen and (min-width: 768px) {
    .details-container {
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 1.5rem;
        padding: 7.5rem 4rem;
        max-height: 27.5rem;
    }

    .details {
        flex-direction: column;
    }

    .details-description {
        font-size: 0.75rem;
    }

    .details-info {
        font-size: 2.5rem;
        line-height: 3rem;
        text-align: left;
    }
}

@media screen and (min-width: 1024px) {
    .details-container {
        flex-direction: row;
        gap: 1.5rem 2.75rem;
        max-height: 25rem;
        padding: 3.5rem 6rem;
    }
}

@media screen and (min-width: 1440px) {
    .details-container {
        padding: 3.5rem 10rem;
    }
}
</style>
