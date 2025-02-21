<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';

interface TimeData {
    date: string;
    dateTime: string;
    day: number;
    dayOfWeek: string;
    dstActive: boolean;
    hour: number;
    milliseconds: number;
    minute: number;
    month: number;
    seconds: number;
    time: string;
    timeZone: string;
    year: number;
}

const greeting = ref<string>('');
const location = ref<string>('');
const time = ref<string>('');
const fullTimeInfo = ref<TimeData | undefined>(undefined);
const userIP = ref<string>('');

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

const getTimeInfo = async (): Promise<TimeData | undefined> => {
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
        fullTimeInfo.value = data;
        return data;
    } catch (error: unknown) {
        console.error('Error fetching time info:', error);
    }
};

const showTime = async (): Promise<string> => {
    if (!fullTimeInfo.value) {
        await getTimeInfo();
    }
    return (time.value = fullTimeInfo.value?.time ?? '');
};

showTime();
</script>
<template>
    <div class="time-info-container">
        <div class="greeting-container">
            <img
                src="../assets/mobile/icon-sun.svg"
                alt="Sun Icon"
                class="greeting-icon"
            />
            <p class="greeting-text">{{ greeting }}</p>
        </div>
        <p class="time-text">{{ time }}</p>
        <p class="location-text">{{ location }}</p>
        <Button />
    </div>
</template>
<style scoped></style>
