# Static API Starter Kit
This is a starter kit to help you, generate a basic static API (Static JSON files). [My buddy paul made a good writeup for using GitHub to serve a static API.](http://paulsalaets.com/posts/json-api-with-github-pages) He makes a few good points, I thought I could take it a step further, and make a Jekyll-esq way of generating content, via Markdown.


## What you're looking for

All the good stuff you're looking for is in the `gulpfile.js`. **Part of using this is that you're the one making new gulp tasks to build the static JSON files** If you don't know how to use gulp, then you don't know how to use this... It makes heavy use of a markdown to JSON gulp plugin that generates your JSON while keeping your directory structure intact.

In essence, you design your JSON requests around the directory structure of your markdown/images.


## Usage

### Install

I should have to tell you this, but use nvm (Node Version Manager).  
`nvm use`  
`npm install -g gulp && npm install`

### Tasks

Only two meta tasks right now...

### Build
`gulp build`

### Watch
`gulp watch`

### Page
`gulp page --"name of page"`
