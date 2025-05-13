<script setup lang="ts">
import { computed, inject } from 'vue';
import type { Ref } from 'vue';
import sunIcon from '../assets/desktop/icon-sun.svg';
import moonIcon from '../assets/desktop/icon-moon.svg';
import { TimeDataKey, LocationDataKey } from '../common/injectionKeys';
import type { TimeData, LocationData, GreetingConfig } from '../common/types';

const fullTimeInfo = inject<Ref<TimeData | undefined>>(TimeDataKey);
const fullLocationInfo = inject<Ref<LocationData | undefined>>(LocationDataKey);
const [hour, minutes] = fullTimeInfo?.value?.time_24.split(':') ?? '';

const showTime = computed(() => {
    const time = `${hour}:${minutes}`;
    return time;
});

const showLocation = computed(() => {
    const location = `in ${fullLocationInfo?.value?.city ?? ''}, ${fullLocationInfo?.value?.country_code2 ?? ''}`;
    return location;
});

const getGreetingAndIcon = (hour: string | undefined): GreetingConfig => {
    if (hour !== undefined) {
        if (hour >= '05' && hour < '12') {
            return window.innerWidth >= 768
                ? {
                      greeting: `Good Morning, it's currently`,
                      icon: `${sunIcon}`
                  }
                : {
                      greeting: 'Good Morning',
                      icon: `${sunIcon}`
                  };
        } else if (hour >= '12' && hour < '18') {
            return window.innerWidth >= 768
                ? {
                      greeting: `Good Afternoon, it's currently`,
                      icon: `${sunIcon}`
                  }
                : {
                      greeting: 'Good Afternoon',
                      icon: `${sunIcon}`
                  };
        } else {
            return window.innerWidth >= 768
                ? {
                      greeting: `Good Evening, it's currently`,
                      icon: `${moonIcon}`
                  }
                : {
                      greeting: 'Good Evening',
                      icon: `${moonIcon}`
                  };
        }
    } else {
        return { greeting: '', icon: '' };
    }
};

const showGreeting = computed(() => {
    const { greeting } = getGreetingAndIcon(hour);
    return greeting;
});

const showGreetingIcon = computed(() => {
    const { icon } = getGreetingAndIcon(hour);
    return icon;
});
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
        <p class="font-base time-text">
            <time :datetime="showTime">
                {{ showTime }}
            </time>
        </p>
        <p class="font-base second-font-base location-text">
            {{ showLocation }}
        </p>
    </div>
</template>
<style scoped>
.time-info-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
}

.greeting-container {
    display: flex;
    gap: 1rem;
}

.font-base {
    text-align: left;
    color: var(--white);
}

.second-font-base {
    font-size: 1rem;
    letter-spacing: 0.25rem;
    line-height: 1.5rem;
    text-transform: uppercase;
}

.greeting-text {
    font-weight: 400;
}

.greeting-icon {
    width: 1.5rem;
    height: 1.5rem;
}

.time-text {
    font-size: 6.25rem;
    font-weight: 700;
    letter-spacing: -0.25rem;
    line-height: 6.25rem;
}

.location-text {
    font-weight: 700;
}

@media screen and (min-width: 768px) {
    .time-info-container {
        gap: 0;
    }

    .second-font-base {
        font-size: 1.25rem;
        line-height: 1.75rem;
    }

    .time-text {
        font-size: 11rem;
        line-height: 11rem;
    }
}

@media screen and (min-width: 1024px) {
    .location-text {
        font-size: 1.5rem;
        letter-spacing: 0.5rem;
    }
}

@media screen and (min-width: 1440px) {
    .time-text {
        font-size: 12.5rem;
        line-height: 12.5rem;
    }
}
</style>
