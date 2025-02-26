<script setup lang="ts">
import { ref, computed } from 'vue';
import type { TimeData, LocationData } from '../common/types';

const location = ref<string>('');
const time = ref<string>('');
const fullTimeInfo = ref<TimeData | undefined>(undefined);
const fullLocationInfo = ref<LocationData | undefined>(undefined);
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
        fullLocationInfo.value = data.data.location;
        return data.data.location;
    } catch (error: unknown) {
        console.error('Error fetching location:', error);
    }
};

const showTime = async (): Promise<string> => {
    if (!fullTimeInfo.value) {
        await getTimeInfo();
    }
    return (time.value = fullTimeInfo.value?.time ?? '');
};

const showLocation = async (): Promise<string> => {
    if (!fullLocationInfo.value) {
        await getLocation();
    }
    return (location.value = `in ${fullLocationInfo.value?.city?.name}, ${fullLocationInfo.value?.country?.alpha2}`);
};

const getGreetingAndIcon = (
    hour: number | undefined
): { greeting: string; icon: string } => {
    if (hour !== undefined) {
        if (hour >= 5 && hour < 12) {
            return {
                greeting: 'Good Morning',
                icon: 'src/assets/mobile/icon-sun.svg'
            };
        } else if (hour >= 12 && hour < 18) {
            return {
                greeting: 'Good Afternoon',
                icon: 'src/assets/mobile/icon-sun.svg'
            };
        } else {
            return {
                greeting: 'Good Evening',
                icon: 'src/assets/mobile/icon-moon.svg'
            };
        }
    } else {
        return { greeting: 'Hello', icon: 'src/assets/mobile/icon-sun.svg' };
    }
};

const showGreeting = computed(() => {
    const { greeting } = getGreetingAndIcon(fullTimeInfo.value?.hour);
    return greeting;
});

const showGreetingIcon = computed(() => {
    const { icon } = getGreetingAndIcon(fullTimeInfo.value?.hour);
    return icon;
});

showTime();
showLocation();
</script>
<template>
    <div class="time-info-container">
        <div class="greeting-container">
            <img
                :src="showGreetingIcon"
                alt="greeting icon"
                class="greeting-icon"
            />
            <p class="font-base second-font-base greeting-text">
                {{ showGreeting }}
            </p>
        </div>
        <p class="font-base time-text">{{ time }}</p>
        <p class="font-base second-font-base location-text">{{ location }}</p>
    </div>
</template>
<style scoped>
.time-info-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.greeting-container {
    display: flex;
    gap: 16px;
}

.font-base {
    font-family: 'Inter', system-ui, sans-serif;
    text-align: left;
    color: var(--white);
}

.second-font-base {
    font-size: 16px;
    letter-spacing: 3px;
    line-height: 25px;
    text-transform: uppercase;
}

.greeting-text {
    font-weight: 400;
}

.greeting-icon {
    width: 24px;
    height: 24px;
}

.time-text {
    font-size: 100px;
    font-weight: 700;
    letter-spacing: -2.5px;
    line-height: 100px;
}

.location-text {
    font-weight: 700;
}

@media screen and (min-width: 768px) {
    .time-info-container {
        max-width: 539px;
        gap: 0;
    }

    .second-font-base {
        font-size: 18px;
        line-height: 28px;
        letter-spacing: 3.6px;
    }

    .time-text {
        font-size: 175px;
        line-height: 175px;
        letter-spacing: -4.38px;
    }
}

@media screen and (min-width: 1024px) {
    .second-font-base {
        font-size: 20px;
        line-height: 28px;
        letter-spacing: 4px;
    }

    .time-text {
        font-size: 200px;
        line-height: 200px;
        letter-spacing: -5px;
    }

    .location-text {
        font-size: 24px;
        letter-spacing: 4.8px;
    }
}
</style>
