# Presentation-Deck-Template
Presentation deck using Vue.js "Webpack Simple", GSAP and Hammer.js. Copy or clone this repo to start off a new project.

## App.vue
#### Attributes for ```<slides>``` component
- [nav-position] Accepts either "right" or "left", default "right"
- [scripts] Custom callback functions for animating or anything else
- [slide-duration] A number in seconds for slide transition duration, default 1
- [id] Optional ID for anchoring

####  Structure
```
<slides nav-position='right' :scripts='scripts' :slide-duration='1'>
    <section></section>
    <section></section>

    # Each slide cycles through the following CSS classes

    # Entering State
    # "" -> "active" –> "active complete"

    # Leaving State
    # "active complete" -> "complete" –> "" 

    <section id="id-is-optional" class="active complete">
        // Your Content
    </section>

    <section></section>
    <section></section>
</slides>

```

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