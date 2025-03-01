# Frontend Mentor - Clock app solution

This is a solution to the [Clock app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/clock-app-LMFaxFwrM). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- View the current time and location information based on their IP address
- View additional information about the date and time in the expanded state
- Be shown the correct greeting and background image based on the time of day they're visiting the site
- Generate random programming quotes by clicking the refresh icon near the quote

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [Vite](https://vite.dev/guide/) 
- [Vue.js Composition API](https://vuejs.org/guide/introduction.html) 
- [TypeScript](https://www.typescriptlang.org/docs/) 
- [ESLint](https://eslint.org/docs/latest/) 
- [Prettier](https://prettier.io/docs/) 
- [Moment.js](https://momentjs.com/docs/) 

### What I learned

I've worked with Vue.js and JavaScript for the past 3+ years, so I started this project as a way to practice TypeScript with a framework that I already know and enjoy. I think my implementation of TypeScript was a bit basic, but overall it was a good first project. 

There were a couple of challenges with the APIs recommended by Frontend Mentor, so I had to pivot from [World Time API](http://worldtimeapi.org/) to [Time API](https://timeapi.io/) in order to set the time based on the visitor's IP address, and from [Programming Quotes API](https://programming-quotes-api.herokuapp.com/) to [Quotable](https://github.com/lukePeavey/quotable) to get the quotes. I also used another API that wasn't on the list, [ipify API](https://api.ipify.org?format=json) to get the IP address.

This was also the first time I used Vite to setup a project, so that was another tiny learning curve as well (rip create-react-app, you'll be missed).

### Continued development

I need to add unit tests and make this project more accessible. 