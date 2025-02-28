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

const getDayOfYear = (): number | undefined => {
    if (!fullTimeInfo?.value?.dateTime) return;
    dayOfYear.value = moment(fullTimeInfo.value.dateTime).dayOfYear();
    return dayOfYear.value;
};

const getdayOfWeek = (): number | undefined => {
    if (!fullTimeInfo?.value?.dateTime) return;
    dayOfWeek.value = moment(fullTimeInfo.value.dateTime).isoWeekday();
    return dayOfWeek.value;
};

const getWeekOfYear = (): number | undefined => {
    if (!fullTimeInfo?.value?.dateTime) return;
    weekOfYear.value = moment(fullTimeInfo.value.dateTime).isoWeek();
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
    const timeZone = fullTimeInfo?.value?.timeZone?.replace(/_/g, ' ') ?? '';
    return timeZone;
});

const textColor = computed(() => {
    const hour = fullTimeInfo?.value?.hour;
    if (hour === undefined) return '';
    return hour >= 18 || hour < 5 ? 'light' : 'dark';
});

const backgroundClass = computed(() => {
    const hour = fullTimeInfo?.value?.hour;

    if (hour === undefined) return '';
    if (hour >= 5 && hour < 18) return 'details-day-background';
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
    gap: 16px;
    width: 100%;
    padding: 48px 26px;
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
    justify-content: space-between;
}

.details-description {
    font-size: 10px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 2px;
    text-align: left;
    text-transform: uppercase;
}

.details-info {
    font-size: 20px;
    font-weight: 700;
    line-height: 24px;
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
        flex-direction: row;
        justify-content: space-between;
        gap: 24px;
        padding: 120px 166px 120px 64px;
        max-height: 440px;
    }

    .details {
        flex-direction: column;
    }

    .details:last-of-type {
        min-width: 28%;
    }

    .details-description {
        font-size: 13px;
        letter-spacing: 2.6px;
    }

    .details-info {
        font-size: 40px;
        line-height: 48px;
        text-align: left;
    }
}

@media screen and (min-width: 1024px) {
    .details-container {
        gap: 24px 44px;
        max-height: 400px;
        padding: 74px 165px;
    }

    .details:last-of-type {
        min-width: 22%;
    }
}

@media screen and (min-width: 1440px) {
    .details-container {
        padding: 54px 340px 54px 165px;
    }

    .details:first-of-type {
        min-width: 70%;
    }

    .details:last-of-type {
        min-width: 15%;
    }
}
</style>
