<script setup lang="ts">
import Quote from './components/Quote.vue';
import TimeInfo from './components/TimeInfo.vue';
import Button from './components/Button.vue';
</script>

<template>
    <Quote />
    <div class="clock-container">
        <TimeInfo />
        <Button />
    </div>
</template>

<style scoped>
.clock-container {
    display: flex;
    flex-direction: column;
    gap: 48px;
}

@media screen and (min-width: 768px) {
    .clock-container {
        gap: 80px;
        max-width: 500px;
    }
}

@media screen and (min-width: 1024px) {
    .clock-container {
        max-width: 100%;
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
