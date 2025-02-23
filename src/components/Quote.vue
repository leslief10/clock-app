<script setup lang="ts">
import { ref } from 'vue';
import type { QuoteData } from '../common/types';

const quote = ref<string>('');
const author = ref<string>('');

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
    <div class="text-quote-container">
        <p class="font-base text-quote">{{ quote }}</p>
        <p class="font-base text-author">{{ author }}</p>
        <button class="refresh-quote" @click="getQuote">
            <img
                src="../assets/mobile/icon-refresh.svg"
                alt="refresh quote"
                class="refresh-icon"
            />
        </button>
    </div>
</template>

<style scoped>
.text-quote-container {
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-template-rows: repeat(4, auto);
    grid-template-areas: 'quote quote quote refresh' 'quote quote quote .' 'quote quote quote .' 'author author author .';
    max-height: 100px;
    margin: 32px 24px 0px;
}

.font-base {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 12px;
    line-height: 22px;
    text-align: left;
    color: var(--white);
}

.text-quote {
    grid-area: quote;
    margin-right: 16px;
    font-weight: 400;
}

.text-author {
    grid-area: author;
    margin-top: 8px;
    font-weight: 700;
}

.refresh-quote {
    grid-area: refresh;
    padding: 0;
    margin-top: 2px;
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
    .text-quote-container {
        max-width: 572px;
        max-height: 125px;
        margin: 80px 130px 0 64px;
    }

    .font-base {
        font-size: 18px;
        line-height: 28px;
    }

    .text-author {
        margin-top: 16px;
    }

    .refresh-quote {
        margin-top: 4px;
    }
}
</style>
