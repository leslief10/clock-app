<script setup lang="ts">
import { ref } from 'vue';

const text = ref<string>('More');
const toggleVisibility = ref<boolean>(false);

const emit = defineEmits<{
    (e: 'update:toggle', value: boolean): void;
}>();

const handleToggle = (): { text: string; toggle: boolean } => {
    toggleVisibility.value = !toggleVisibility.value;
    text.value = text.value === 'More' ? 'Less' : 'More';
    emit('update:toggle', toggleVisibility.value);
    return { text: text.value, toggle: toggleVisibility.value };
};
</script>

<template>
    <button type="button" class="btn" @click="handleToggle">
        {{ text }}
        <div class="arrow-icon-container">
            <img
                src="../assets/desktop/icon-arrow.svg"
                alt="arrow"
                class="arrow-icon"
                :class="{ 'rotate-arrow': text === 'Less' }"
            />
        </div>
    </button>
</template>

<style scoped>
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 7.25rem;
    height: 2.5rem;
    padding: 0;
    padding-left: 0.25rem;
    border: none;
    border-radius: 1.75rem;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.25rem;
    text-transform: uppercase;
    color: var(--light-gray);
    background: var(--white);
}

.arrow-icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: var(--dark-gray);
}

.arrow-icon {
    width: auto;
    height: auto;
}

.rotate-arrow {
    transform: rotate(180deg);
}

@media (hover: hover) {
    .btn:hover {
        cursor: pointer;
        .arrow-icon-container {
            background-color: var(--light-gray);
        }
    }
}

@media screen and (min-width: 768px) {
    .btn {
        gap: 0.75rem;
        width: 9.25rem;
        height: 3.5rem;
        font-size: 1rem;
    }

    .arrow-icon-container {
        width: 2.5rem;
        height: 2.5rem;
    }
}
</style>
