<script setup lang="ts">
import { ref, provide } from 'vue';
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
    console.log('toggle', toggleVisibility.value);
    toggleVisibility.value = value;
};

getTime();
getLocation();
</script>

<template>
    <div
        class="app-container"
        :class="
            (timeObject?.hour ?? 0) >= 5 && (timeObject?.hour ?? 0) < 18
                ? 'day-background'
                : 'night-background'
        "
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
    /* padding: 32px 24px; */
}

.day-background {
    background: no-repeat bottom
        url('../src/assets/tablet/bg-image-daytime.jpg');
    background-blend-mode: darken;
    background-color: silver;
    background-size: cover;
}

.night-background {
    background: no-repeat bottom
        url('/src/assets/tablet/bg-image-nighttime.jpg');
    background-blend-mode: multiply;
    background-color: darkgray;
    background-size: cover;
}

.clock-container {
    display: flex;
    flex-direction: column;
    gap: 48px;
    width: 100%;
    padding: 0 24px 32px;
}

.clock-container-update {
    padding: 32px 24px 0;
}

@media screen and (min-width: 768px) {
    .app-container {
        /* padding: 80px 0 64px 64px; */
    }

    .clock-container {
        gap: 80px;
        max-width: 500px;
    }
}

@media screen and (min-width: 1024px) {
    .app-container {
        /* padding: 56px 0 98px 165px; */
    }

    .clock-container {
        max-width: 100%;
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
        flex-direction: row;
        align-items: flex-end;
        gap: 345px;
    }
}
</style>
