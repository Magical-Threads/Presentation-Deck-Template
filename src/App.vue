<template>
    <div id='app'>
        <slides nav-position='right' :slide-duration='0.75'>
           
           <!-- Demo HTML -->
            <section id='welcome'>
                <img src='./assets/images/1.jpg'>
                <h2>Welcome</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad veritatis numquam expedita quas consequuntur ab dicta hic nostrum commodi consectetur dolores incidunt placeat, doloribus laborum quasi est. Ullam, corrupti expedita!</p>
                <button class='go-next'>Next</button>
            </section>
            <section id='anchored-section'>
                <h2>Anchored Section</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad veritatis numquam expedita quas consequuntur ab dicta hic nostrum commodi consectetur dolores incidunt placeat, doloribus laborum quasi est. Ullam, corrupti expedita!</p>
                <button class='go-prev'>Prev</button>
                <button class='go-next'>Next</button>
            </section>
            <section>
                <figure>
                    <img v-for='img in 3' :src='getImage(img)'>
                </figure>
            </section>

            <!-- Repeat some demo sections -->
            <section 
                v-for='(img, index) in 15'>
                    {{index}}
                    <figure :data-lazy='getImage(img)' :style='getLowImage(img)'></figure>
                    <!-- <img v-lazy='img'> -->
                </section>
            <!-- End Demo HTML -->
            
        </slides>
    </div>
</template>

<script>

import Slides from './Slides.vue';

export default {
    name: 'App',
    components: {
        'slides': Slides
    },
    methods: {
        getImage(img) {
            return require('./assets/images/' + img + '.jpg');
        },
        getLowImage(img) {
            return {
                backgroundImage: `url(${require('./assets/images/low-' + img + '.jpg')})`
            };
        }
    },
    computed: {
        // sectionImages() {
        //     const images = [];
        //     for ( let i = 4; i <= 15; i++) {
        //         let file = i + '.jpg';
        //         // images.push( `url(${ this.getImage(file) }) 50% 50%/cover`);
        //         images.push(this.getImage(file));
        //     }
        //     return images;
        // },
        // getLowImage() {
        //     const images = [];
        //     for ( let i = 4; i <= 15; i++) {
        //         let file = 'low-' + i + '.jpg';
        //         images.push( `url(${ this.getImage(file) }) 50% 50%/cover`);
        //         // images.push(this.getImage(file));
        //     }
        //     return images;
        // }
    }
}
</script>

<style lang='scss'>
     /* All Demo CSS Below, Basic Layout */
    section:nth-child(n-3) { padding: 5vw; background: white; }
    section h2 { font-size: 5vw; }
    section[data-i='1'] img { float: left; width: 40%; margin-right: 5%; }
    #anchored-section { background: gold;  position: relative; z-index: 1; }
    #anchored-section * { color: gold; border-color: gold; }
    #anchored-section:before { content: ''; position: absolute; top: 0; right: 0; bottom: 0; left: 0; background: url('./assets/images/1.jpg') 50% 50%/cover;  z-index: -1; mix-blend-mode: difference;}
    section[data-i='3'] figure { display: flex; align-items: center; justify-content: space-between;; margin: 0; height: 100%; }
    section[data-i='3'] figure img { width: 31.333%; height: auto; margin: 0 1%; }

    /* 
        The transition-delay of the following variable: "$slide-delay" 
        should be equal as the slide-duration in the <slide> component 
        --------------------------------------------------------------
    */

    $slide-delay: 0.75s;  

    /* Example transition states */
    #welcome {
        &.active * {
            opacity: 0;
        }
        &.active.complete * {
            opacity: 1;
            transition: opacity 0.3s ease-in;
        }
    }

    /* Example transition states */
    #anchored-section {
        &.active:before {
            transition: all 0.6s ease-in $slide-delay;
            clip-path: circle(0% at 50% 50%);
        }
        &.active.complete:before {
            transition: all 0.6s ease-in 0s;
            clip-path: circle(100% at 50% 50%);
        }

        &.complete:before {
            transition: all 0s ease-in $slide-delay;
            clip-path: circle(0% at 50% 50%);
        }
    }

    /* Example transition states */
    section[data-i='3'] {
        &.active img {
            transition: all 0s ease-in 0s;
            transform: translateY(15%);
            opacity: 0;
        }
        &.active.complete img {
            transition: all 0.5s ease-out;
            opacity: 1;
            transform: translateY(0%);
            @for $i from 1 through 3 {
                &:nth-of-type(#{$i}) {
                    transition-delay: $i * 0.25s;
                }
            }
        }
        &.complete img {
            transition: all 0s ease-in $slide-delay;
            transform: translateY(15%);
            opacity: 0;
        }
    }

    section:nth-child(n+4) figure {
        position: absolute;
        margin: 0;
        background: transparent 50% 50%/cover;
        top: 0; right: 0; bottom: 0; left: 0;
        pointer-events: none;
    }
    
</style>