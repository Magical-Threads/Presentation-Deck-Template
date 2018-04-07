<template>
    <main id='slides'>
        <nav :class='navClass'>
            <ul ref='slidesNav'>
                <li v-for='(id, index) in ids' :key='index'>
                    <a :href='id' :data-i='index + 1' @click='onNavLinkClick' class='nav-slide-name'>
                        <span>{{ navSlideName(id) }}</span>
                    </a>
                    <a :href='id' :data-i='index + 1' @click='onNavLinkClick' class='nav-indicator'>
                        <span>{{ index }}</span>
                    </a>
                </li>
            </ul>
        </nav>
        <article ref='slides'>
           <slot></slot>
        </article>
    </main>
</template>

<script>
import { TweenMax } from 'gsap';
import hammerjs from 'hammerjs';
import 'imports-loader?define=>false!gsap/ScrollToPlugin';

export default {
    name: 'Slides',
    props: {
        navPosition: {
            type:           String,
            default:        'right' // values: [ 'left', 'right' ]
        },
        scripts: {
            type:           Function,
            default:        function() { }
        },
        slideDuration: {
            type:           Number,
            default:        1
        }
    },
    data() {
        return {
            ids:            null,
            isAnimating:    false,
            currentSlide:   null,
            currentIndex:   0,
            activeClass:    'active',
            completeClass:  'complete',
            keyCodes:       { UP: 38, DOWN: 40 }
        };
    },
    computed: {
        slides() {
            return Array.from(this.slidesContainer.children);
        },
        navClass() {
            return 'position-' + this.navPosition;
        },
        navLinks() {
            return Array.from(this.$refs.slidesNav.children);
        }
    },

    // Called when the the component is initialized, once
    mounted() {
        
        this.slidesContainer    = this.$refs.slides;
        this.slideGoPrev        = Array.from(this.$el.querySelectorAll('.go-prev'));
        this.slideGoNext        = Array.from(this.$el.querySelectorAll('.go-next'));
        this.ids                = this.slides.map(this.createIds); 
        this.pageHeight         = window.innerHeight;

        // Get the current slide by checking local storage and comparing it to the slide length
        const storedId          = parseInt(window.localStorage.getItem('_slideID')) - 1 || 0;
        const initialId         = storedId > this.slides.length ? this.slides.length - 1 : storedId;
        this.currentSlide       = this.slides[initialId];
        
        this.addSlideIndex();
        this.addEvents();
        this.goToSlide(this.currentSlide);
    },
    methods: {
        addEvents() {

            // Add keyboard events
            document.addEventListener('keydown', this.onKeyDown);

            // Add window resize events
            window.addEventListener('resize', this.debounce(() => this.onResize(), 250));

            // Add mouse wheel events
            window.addEventListener('mousewheel', this.throttle(event => this.onMouseWheel(event), 10));
            window.addEventListener('DOMMouseScroll', this.throttle(event => this.onMouseWheel(event), 10)); // FF

            // Add click events for buttons
            this.slideGoPrev.forEach(button => button.addEventListener('click', this.goToPrevSlide));
            this.slideGoNext.forEach(button => button.addEventListener('click', this.goToNextSlide));

            // Add touch events for devices
            const container = new Hammer(this.slidesContainer);
            container.get('pan').set({ direction: Hammer.DIRECTION_ALL });
            container.on('panleft panright panup pandown tap press', event => {
                if (event.type === 'panup') this.goToNextSlide();
                if (event.type === 'pandown') this.goToPrevSlide();
            });
        },

        // Add an index counter to each slide
        addSlideIndex() {
            this.slides.forEach((slide, index) => slide.setAttribute('data-i', index + 1));
        },
        onKeyDown(event) {
            const keyPress = event.keyCode;
            if (keyPress === this.keyCodes.UP) {
                this.goToPrevSlide();
            }
            else if (keyPress === this.keyCodes.DOWN) {
                this.goToNextSlide();
            }
        },
        onMouseWheel(event) {
            
            // Normalize event wheel delta
            const delta = event.wheelDelta / 30 || -event.detail;

            // If the user scrolled up, it goes to previous slide, otherwise - to next slide
            if      (delta < -1) this.goToNextSlide();
            else if (delta >  1) this.goToPrevSlide();
        },
        goToPrevSlide() {
            if (this.currentSlide.previousElementSibling) {
                this.goToSlide(this.currentSlide.previousElementSibling);
            }
        },
        goToNextSlide() {
            if (this.currentSlide.nextElementSibling) {
                this.goToSlide(this.currentSlide.nextElementSibling);
            }
        },
        goToSlide(slide) {

            // If the slides are not animating and there's a slide
            if (!this.isAnimating && slide) {

                this.isAnimating = true;
                this.currentSlide = slide;
                this.currentIndex = parseInt(this.currentSlide.dataset.i) - 1 || 0;
                
                // Set the slide name to the local storage for remembering the last slide position
                // on a window refresh
                window.localStorage.setItem('_slideID', this.currentSlide.dataset.i);
                
                // Sliding to current slide, with callbacks
                TweenMax.to(this.slidesContainer, this.slideDuration, {
                    onStart:            this.onSlideStart,
                    onStartParams:      [ this.currentIndex, this.currentSlide, this.slideDuration ],
                    onComplete:         this.onSlideEnd,
                    onCompleteParams:   [ this.currentIndex, this.currentSlide ],
                    scrollTo:           { y: this.pageHeight * this.currentIndex },
                    ease:               Power4.easeInOut,
                });
            }
        },
        onSlideStart(currentIndex, currentSlide, slideDuration) {

            // Update the active class for the slides and nav
            this.updateSlideClass(this.activeClass, currentIndex);

            // Initialize the aniamtions and pass in the current slide and duration
            // And assign the function reference to "slideScripts", from the scripts.js file
            this.slideScripts = this.scripts({ currentSlide, slideDuration });
            this.slideScripts.slideStart();
        },
        onSlideEnd(currentIndex, currentSlide) {

            // When the slide finishes moving, add the "complete" css class to the slides and nav
            this.updateSlideClass(this.completeClass, currentIndex);

            // Call the scriptsEnd() function from the scripts.js file
            this.slideScripts.slideEnd();

            // Set the animating flag to flase
            this.isAnimating = false;

            // Update the window hash url
            window.location.hash = '#' + this.currentSlide.id;
        },
        onResize() {
            const newPageHeight = window.innerHeight;
            if (this.pageHeight !== newPageHeight) {
               this.pageHeight = newPageHeight;

                TweenMax.set([this.slidesContainer, this.slides], {
                    height: this.pageHeight + 'px'
                });

                TweenMax.set(this.slidesContainer, {
                    scrollTo: { y: this.pageHeight * this.currentIndex }
                });
            }
        },

        // debounce() taken from Underscore.js
        debounce(func, wait, immediate) {
            let timeout;
            return function() {
                let args = arguments;
                let later = () => {
                    timeout = null;
                    if (!immediate) func.apply(this, args);
                };
                let callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(this, args);
            };
        },
        throttle(func, wait) {
            let throttle;
            return function() {
                if (!throttle) {
                    func.apply(this, arguments);
                    throttle = true;
                    setTimeout(() => throttle = false, wait);
                }
            };
        },

        // Remove the "#" and "-" characters for navigation links
        navSlideName(id) {
            return id.replace(/#/gmi, '').replace(/-/gmi, ' ');
        },

        // Create IDs for creation of the navigation links
        createIds(slide, index) {

            // If there is an ID on the section use the explicit ID, otherwise use the index 
            return slide.id ? ('#' + slide.id) : ('#' + (index + 1).toString());
        },
        onNavLinkClick(event) {
            event.preventDefault();
            const id = event.target.dataset.i - 1;
            const slide = this.slides[id];
            this.goToSlide(slide);
        },
        updateSlideClass(className, slideIndex) {

            // Remove the class from all the links
            [this.navLinks, this.slides].forEach(removeClass);

            // Then add the class to the active link
            [this.navLinks, this.slides].forEach(addClass);

            function removeClass(set) {
                set.forEach(item => item.classList.remove(className));
            }
            function addClass(set) {
                set[slideIndex].classList.add(className);
            }
        }
    }
}
</script>

<style lang='scss'>

    $color-primary: black;

    *, 
    *:after, 
    *:before { box-sizing: border-box; }

    body { margin: 0; }

    #slides {
        width: 100vw;
        height: 100vh;
        font: normal 1.15vw/1.70vw Sans-serif;
    }
    
    #slides nav + article {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    section {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    nav {
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 9001;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 6vw;
        user-select: none;
        &.position-right {
            right: 0;
            text-align: right;
            li .nav-slide-name {
                right: 85%;
            }
            li .nav-slide-name {
                justify-content: flex-end;
            }
        }
        &.position-left {
            left: 0;
            .nav-slide-name {
                left: 85%;
            }
            li .nav-slide-name {
                justify-content: flex-start;
            }
        }
        ul {
            width: 100%;
            margin: 0;
            padding: 0;
            list-style: none;
        }
        li {
            width: 100%;
            display: block;
            margin: 0;
            height: 2vw;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        li .nav-indicator {
            width: 1vw;
            height: 1vw;
            background: black;
            text-transform: capitalize;
            display: block;
            border-radius: 100%;
            border: 2px solid black;
            font-size: 0;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
        li.active .nav-indicator {
            border-color: $color-primary;
            background: white;
        }
        li.active:hover .nav-indicator {
            border-color: $color-primary;
            background: white;
        }
        li:hover .nav-indicator {
            background: white;
        }
        li .nav-slide-name {
            position: absolute;
            white-space: nowrap;
            display: flex;
            align-items: center;
            text-transform: capitalize;
            transition: 0.15s ease-in 0s;
            opacity: 0;
            span {
                background: black;
                border: 2px solid transparent;
                border-radius: 2px;
                color: white;
                padding: 0.6em 1em;
                display: block;
                pointer-events: none;
                font-size: 0.85em;
                font-weight: bold;
            }
        }
         li:hover .nav-slide-name {
            transition: 0.15s ease-out 0s;
            opacity: 1; 
        }
        .nav-slide-name:active span {
            background: rgba(black, 0.5);
            color: black;
        }
        ul li a {
            width: 100%;
            height: inherit;
            text-decoration: none;
            color: inherit;
        }
    }
    
    button {
        background: transparent;
        border: 2px solid $color-primary;
        color: $color-primary;
        border-radius: 2px;
        font: inherit;
        font-weight: bold;
        padding: 0.4em 1em;
        cursor: pointer;
        &:hover {
            color: white;
            background: $color-primary;
        }
    }
</style>
