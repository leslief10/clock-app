<script setup lang="ts">
import { ref, provide, computed } from 'vue';
import { getIP, getTimeData, getLocationData } from './services/api';
import Quote from './components/Quote.vue';
import Clock from './components/Clock.vue';
import Button from './components/Button.vue';
import Details from './components/Details.vue';
import ErrorModal from './components/ErrorModal.vue';
import {
    TimeDataKey,
    LocationDataKey,
    toggleVisibilityKey
} from './common/injectionKeys';
import type { TimeData, LocationData } from './common/types';

const errorMessage = ref<string>('');
const timeObject = ref<TimeData | undefined>(undefined);
const locationObject = ref<LocationData | undefined>(undefined);
const toggleVisibility = ref<boolean>(false);

provide(TimeDataKey, timeObject);
provide(LocationDataKey, locationObject);
provide(toggleVisibilityKey, toggleVisibility);

const initializeData = async (): Promise<void> => {
    try {
        const ip = await getIP();
        if (!ip) {
            throw new Error('Could not fetch IP address');
        }

        const timeData = await getTimeData(ip);
        if (!timeData) {
            throw new Error('Could not fetch time data');
        }

        const locationData = await getLocationData(ip);
        if (!locationData) {
            throw new Error('Could not fetch location data');
        }

        timeObject.value = timeData;
        locationObject.value = locationData;
        errorMessage.value = '';
    } catch (error) {
        errorMessage.value =
            error instanceof Error
                ? error.message
                : 'An unknown error occurred';
    }
};

const handleToggle = (value: boolean) => {
    toggleVisibility.value = value;
};

const backgroundClass = computed(() => {
    const hour = timeObject.value?.hour;

    if (hour === undefined) return 'no-background';
    if (hour >= 5 && hour < 18) return 'day-background';
    return 'night-background';
});

const handleRetry = () => {
    errorMessage.value = '';
    initializeData();
};

initializeData();
</script>

<template>
    <ErrorModal
        :message="errorMessage"
        :is-visible="!!errorMessage"
        @retry="handleRetry"
    />
    <div v-if="timeObject === undefined" class="loading">
        <div class="loading-spinner"></div>
    </div>
    <div
        v-else
        class="app-container"
        :class="[backgroundClass, { 'details-visible': toggleVisibility }]"
    >
        <Quote />
        <div
            class="clock-container"
            :class="toggleVisibility ? 'clock-container-update' : ''"
        >
            <Clock />
            <Button @update:toggle="handleToggle" />
        </div>
        <Details />
    </div>
</template>

<style scoped>
.app-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 100vh;
}

.details-visible {
    justify-content: flex-end;
}

.no-background {
    background-color: darkgray;
}

.day-background {
    background: no-repeat bottom
        url('../src/assets/tablet/bg-image-daytime.jpg');
    background-blend-mode: darken;
    background-color: silver;
    background-size: cover;
    background-blend-mode: multiply;
}

.night-background {
    background: no-repeat bottom
        url('/src/assets/tablet/bg-image-nighttime.jpg');
    background-color: darkgray;
    background-size: cover;
    background-blend-mode: multiply;
}

.loading {
    background-color: darkgray;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.loading-spinner {
    width: 3rem;
    height: 3rem;
    border: 0.25rem solid #f3f3f3;
    border-top: 0.25rem solid #555;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.clock-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    width: 100%;
    padding: 0 1.5rem 2rem;
}

.clock-container-update {
    padding: 2rem 1.5rem 2.5rem;
}

@media screen and (min-width: 768px) {
    .clock-container {
        gap: 5rem;
        padding: 0 4rem 5rem;
    }

    .clock-container-update {
        padding: 5rem 4rem;
    }
}

@media screen and (min-width: 1024px) {
    .clock-container {
        flex-direction: row;
        align-items: flex-end;
        gap: 0;
        padding: 0 6rem 3.5rem;
    }

    .clock-container-update {
        padding: 3.5rem 6rem;
    }

    .day-background {
        background: no-repeat bottom
            url('../src/assets/desktop/bg-image-daytime.jpg');
        background-color: silver;
        background-size: cover;
    }

    .night-background {
        background: no-repeat bottom
            url('/src/assets/desktop/bg-image-nighttime.jpg');
        background-color: darkgray;
        background-size: cover;
    }
}

@media screen and (min-width: 1440px) {
    .clock-container {
        padding: 0 10rem 6.75rem;
    }

    .clock-container-update {
        padding: 6.75rem 10rem;
    }
}
</style>
