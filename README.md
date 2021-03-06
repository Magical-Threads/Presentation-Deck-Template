# Presentation-Deck-Template
Presentation deck using Vue.js "Webpack Simple", GSAP and Hammer.js. Copy or clone this repo to start off a new project.

## App.vue
#### Attributes for ```<slides>``` component
- [**nav-position**] Accepts either "right" or "left", default "right"
- [**scripts**] Custom callback functions for animating or anything else
- [**slide-duration**] A number in seconds for slide transition duration, default 1


####  Structure
ID attribute is optional, but not required. If ID is used, it will be the name of the slide in the navigation menu.
```
<slides nav-position='right' :scripts='scripts' :slide-duration='1'>
    <section></section>
    <section></section>
    <section id="is-optional"> Your Content </section>
    <section></section>
    <section></section>
</slides>
```

#### CSS State
Each ```<section>``` cycles through the following CSS classes

##### Entering State CSS
   1. null
   2. **active**
   3. **active**, **complete**

##### Leaving State CSS
   1. **active**, **complete**
   2. **complete**
   3. null

## scripts.js
#### Global variables available in scripts.js
- *currentSlide* - Reference to current HTML DOM Element
- *slideDuration* - Slide duration in seconds 
```
slideStart() {

    // called immediately before the slide begins to move into view

    if (currentSlide.dataset.i === '1') {
        // do something with slide number 1
    }

    // or 
    if (currentSlide.id === 'some-id') {
        // do something with an assiged slide id
    }
},
slideEnd() {
    // called at the end of the slide transitioning 
};
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).