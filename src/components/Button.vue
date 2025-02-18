<script setup lang="ts">
import { ref, computed } from 'vue';

const text = ref<string>('More');

const arrowPath = computed(() => {
    return text.value === 'More' ? 'M14 17l6 6 6-6' : 'M14 23l6-6 6 6';
});
</script>

<template>
    <button
        type="button"
        class="btn"
        @click="text = text === 'More' ? 'Less' : 'More'"
    >
        {{ text }}
        <svg
            class="arrow-icon"
            width="40"
            height="40"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g fill="none" fill-rule="evenodd">
                <circle fill="var(--dark-gray)" cx="20" cy="20" r="20" />
                <path
                    :d="arrowPath"
                    stroke="var(--white)"
                    stroke-width="2"
                    fill="none"
                />
            </g>
        </svg>
    </button>
</template>

<style scoped>
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 146px;
    height: 56px;
    padding: 0;
    padding-left: 4px;
    border: none;
    border-radius: 28px;
    font-family: 'Inter', system-ui, sans-serif;
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: var(--light-gray);
    background: var(--white);
}

@media (hover: hover) {
    .arrow-icon:hover circle {
        fill: var(--light-gray);
    }
}
</style>
