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
    gap: 16px;
    width: 116px;
    height: 40px;
    padding: 0;
    padding-left: 4px;
    border: none;
    border-radius: 28px;
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 3.75px;
    text-transform: uppercase;
    color: var(--light-gray);
    background: var(--white);
}

.arrow-icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
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
        gap: 12px;
        width: 146px;
        height: 56px;
        font-size: 16px;
        letter-spacing: 5px;
    }

    .arrow-icon-container {
        width: 40px;
        height: 40px;
    }
}
</style>
