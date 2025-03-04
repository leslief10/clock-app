<script setup lang="ts">
import { ref, provide, computed } from 'vue';
import Quote from './components/Quote.vue';
import Clock from './components/Clock.vue';
import Button from './components/Button.vue';
import Details from './components/Details.vue';
import {
    TimeDataKey,
    LocationDataKey,
    toggleVisibilityKey
} from './common/injectionKeys';
import type { TimeData, LocationData } from './common/types';

const userIP = ref<string>('');
const timeObject = ref<TimeData | undefined>(undefined);
const locationObject = ref<LocationData | undefined>(undefined);
const toggleVisibility = ref<boolean>(false);

provide(TimeDataKey, timeObject);
provide(LocationDataKey, locationObject);
provide(toggleVisibilityKey, toggleVisibility);

const getIP = async (): Promise<string | undefined> => {
    const url = 'https://api.ipify.org?format=json';
    try {
        const response: Response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const { ip }: { ip: string } = await response.json();
        userIP.value = ip;
        return userIP.value;
    } catch (error: unknown) {
        console.error('Error fetching IP:', error);
    }
};

const getTime = async (): Promise<TimeData | undefined> => {
    if (!userIP.value) {
        await getIP();
    }

    try {
        const url = `https://timeapi.io/api/time/current/ip?ipAddress=${userIP.value}`;
        const response: Response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data: TimeData = await response.json();
        timeObject.value = data;
        return data;
    } catch (error: unknown) {
        console.error('Error fetching time info:', error);
    }
};

const getLocation = async (): Promise<LocationData | undefined> => {
    if (!userIP.value) {
        await getIP();
    }

    try {
        const url = `https://api.ipbase.com/v2/info?ip=${userIP.value}`;
        const response: Response = await fetch(url, {
            headers: {
                'X-API-KEY': import.meta.env.VITE_API_KEY as string
            }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        locationObject.value = data.data.location;
        return data.data.location;
    } catch (error: unknown) {
        console.error('Error fetching location:', error);
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

getTime();
getLocation();
</script>

<template>
    <div v-if="timeObject === undefined" class="loading"></div>
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
