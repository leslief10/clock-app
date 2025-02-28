<script setup lang="ts">
import { computed, inject } from 'vue';
import type { Ref } from 'vue';
import { TimeDataKey, LocationDataKey } from '../common/injectionKeys';
import type { TimeData, LocationData } from '../common/types';

const fullTimeInfo = inject<Ref<TimeData | undefined>>(TimeDataKey);
const fullLocationInfo = inject<Ref<LocationData | undefined>>(LocationDataKey);

const showTime = computed(() => {
    const time = fullTimeInfo?.value?.time ?? '';
    return time;
});

const showLocation = computed(() => {
    const location = `in ${fullLocationInfo?.value?.city?.name ?? ''}, ${fullLocationInfo?.value?.country?.alpha2 ?? ''}`;
    return location;
});

const getGreetingAndIcon = (
    hour: number | undefined
): { greeting: string; icon: string } => {
    if (hour !== undefined) {
        if (hour >= 5 && hour < 12) {
            return window.innerWidth >= 768
                ? {
                      greeting: `Good Morning, it's currently`,
                      icon: 'src/assets/desktop/icon-sun.svg'
                  }
                : {
                      greeting: 'Good Morning',
                      icon: 'src/assets/desktop/icon-sun.svg'
                  };
        } else if (hour >= 12 && hour < 18) {
            return window.innerWidth >= 768
                ? {
                      greeting: `Good Afternoon, it's currently`,
                      icon: 'src/assets/desktop/icon-sun.svg'
                  }
                : {
                      greeting: 'Good Afternoon',
                      icon: 'src/assets/desktop/icon-sun.svg'
                  };
        } else {
            return window.innerWidth >= 768
                ? {
                      greeting: `Good Evening, it's currently`,
                      icon: 'src/assets/desktop/icon-moon.svg'
                  }
                : {
                      greeting: 'Good Evening',
                      icon: 'src/assets/desktop/icon-moon.svg'
                  };
        }
    } else {
        return { greeting: '', icon: '' };
    }
};

const showGreeting = computed(() => {
    const { greeting } = getGreetingAndIcon(fullTimeInfo?.value?.hour);
    return greeting;
});

const showGreetingIcon = computed(() => {
    const { icon } = getGreetingAndIcon(fullTimeInfo?.value?.hour);
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
    gap: 16px;
}

.greeting-container {
    display: flex;
    gap: 16px;
}

.font-base {
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
