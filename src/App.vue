<template>
    <div id='app'>
        <slides nav-position='right' :slide-duration='1'>
           <!-- Demo HTML -->
            <section id='welcome'>
                <img src='./assets/images/a.jpg'>
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
                    <img v-for='img in imgs' :src='getImage(img)'>
                </figure>
            </section>

            <!-- Repeat some demo sections -->
            <section v-for='img in imgs' :style='{ background: "url("  + getImage(img) + ") 50% 50%/cover" }'></section>
            <section v-for='n in 3'>{{n + 6}}</section>

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
            return require('./assets/images/' + img);
        }
    },
    // Demo Data Below
    data() {
        return {
            imgs: [ 'a.jpg', 'b.jpg', 'c.jpg' ]
        };
    }
}
</script>

<style lang='scss'>
     /* All Demo CSS Below, Basic Layout */
    section { padding: 5vw; background: white; }
    section h2 { font-size: 5vw; }
    section[data-i='1'] img { float: left; width: 40%; margin-right: 5%; }
    #anchored-section { background: gold;  position: relative; z-index: 1; }
    #anchored-section * { color: gold; border-color: gold; }
    #anchored-section:before { content: ''; position: absolute; top: 0; right: 0; bottom: 0; left: 0; background: url('./assets/images/1.jpg') 50% 50%/cover; mix-blend-mode: difference; z-index: -1; }
    section[data-i='3'] figure { display: flex; align-items: center; justify-content: space-between;; margin: 0; height: 100%; }
    section[data-i='3'] figure img { width: 31.333%; height: auto; margin: 0 1%; }

    /* 
        The transition-delay of the following variable: "$slide-delay" 
        should be equal as the slide-duration in the <slide> component 
        --------------------------------------------------------------
    */

    $slide-delay: 1s;  

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
            transition: all 0.5s ease-in 0s;
            transform: translateY(15%);
            clip-path: inset(0 0 100% 0);
        }
        &.active.complete img {
            transition: all 0.5s ease-out;
            clip-path: inset(0 0 0 0);
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
            clip-path: inset(0 0 100% 0);
        }
    }

    /* Color random sections for demo */
    @for $s from 4 through 9 {
        section:nth-of-type(#{$s}) {
            display: flex; 
            align-items: center;
            justify-content: center;
            font-size: 10vw;
            $r: random(255); $g: random(255); $b: random(255);
            background: rgba($r, $g, $b, 1);
        }
    }
    
</style>