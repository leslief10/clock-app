<script setup lang="ts">
import { ref, inject } from 'vue';
import type { QuoteData } from '../common/types';
import { toggleVisibilityKey } from '../common/injectionKeys';

const quote = ref<string>('');
const author = ref<string>('');
const toggleVisibility = inject<boolean>(toggleVisibilityKey);

const getQuote = async (): Promise<QuoteData | undefined> => {
    const url = 'http://api.quotable.io/quotes/random';
    try {
        const response: Response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const [data]: [QuoteData] = await response.json();
        quote.value = data.content;
        author.value = data.author;
        return data;
    } catch (error: unknown) {
        console.error('Error fetching quote:', error);
    }
};

getQuote();
</script>

<template>
    <div v-show="!toggleVisibility" class="quote-container">
        <div class="text-quote-container">
            <p class="font-base text-quote">{{ quote }}</p>
            <p class="font-base text-author">{{ author }}</p>
        </div>
        <button class="refresh-quote" @click="getQuote">
            <img
                src="../assets/desktop/icon-refresh.svg"
                alt="refresh quote"
                class="refresh-icon"
            />
        </button>
    </div>
</template>

<style scoped>
.quote-container {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1rem;
    width: 100%;
    padding: 2rem 1.5rem 0;
}

.text-quote-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.font-base {
    font-size: 0.75rem;
    line-height: 1.25rem;
    text-align: left;
    color: var(--white);
}

.text-quote {
    font-weight: 400;
}

.text-author {
    font-weight: 700;
}

.refresh-quote {
    justify-self: flex-start;
    padding: 0;
    margin-top: 0.25rem;
    background-color: transparent;
    border: none;
}

@media (hover: hover) {
    .refresh-icon:hover {
        opacity: 0.5;
        cursor: pointer;
    }
}

@media screen and (min-width: 768px) {
    .quote-container {
        padding: 5rem 4rem 0;
    }

    .text-quote-container {
        gap: 1rem;
    }

    .font-base {
        font-size: 1.25rem;
        line-height: 1.75rem;
    }
}

@media screen and (min-width: 1024px) {
    .quote-container {
        padding: 3.5rem 6rem 0;
    }
}

@media screen and (min-width: 1440px) {
    .quote-container {
        padding: 6.75rem 10rem 0;
    }
}
</style>
