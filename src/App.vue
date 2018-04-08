<template>
    <div id='app'>
        <slides nav-position='right' :scripts='scripts' :slide-duration='1'>
            <!-- Demo HTML -->
            <section>
                <img src='./assets/images/1.jpg'>
                <h2>Slide 1</h2>
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
            <!-- End Demo HTML -->
        </slides>
    </div>
</template>

<script>

import Slides from './Slides.vue';
import Scripts from './scripts';

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
    data() {

        // Demo Data Below
        return {
            scripts: Scripts,
            imgs: [ 'a.jpg', 'b.jpg', 'c.jpg' ]
        };
    }
}
</script>

<style lang='scss'>

    /* Demo CSS Below */

    section { padding: 5vw; }

    h2 { font-size: 5vw; }

    section[data-i='1'] {
        img {
            float: left;
            width: 40%;
            margin-right: 5%;
        }
        * {
            opacity: 0;
            transition: opacity 0.6s ease-in;
        }
        &.active.complete * {
            opacity: 1;
            transition: opacity 0.3s ease-in;
        }
    }

    #anchored-section {
        background: black;
        position: relative;
        z-index: 1;
        &:before {
            content: '';
            position: absolute;
            top: 0; right: 0; bottom: 0; left: 0;
            background: url('./assets/images/1.jpg') 50% 50%/cover;
            transition: all 1s ease-in 1s;
            clip-path: circle(0% at 50% 50%);
            z-index: -1;
        }
        &.active.complete:before {
            transition-delay: 0s;
            clip-path: circle(100% at 50% 50%);
        }
    }

    section[data-i='3'] {
        background: rgba(black, 0.1);
        figure {
            display: flex;
            align-items: center;
            justify-content: space-between;;
            margin: 0;
            height: 100%;
            img {
                width: 31.333%;
                height: auto;
                margin: 0 1%;
                transition: 
                    clip-path 0.5s linear 0.5s,
                    transform 0.5s linear 0.5s;
                transform: translateY(15%);
                clip-path: inset(0 0 100% 0);
            }
        }
        &.active.complete {
            img {
                clip-path: inset(0 0 0 0);
                transform: translateY(0%);
                transition: 
                    clip-path 0.5s ease-out,
                    transform 0.5s ease-out;
                @for $i from 1 through 3 {
                    &:nth-of-type(#{$i}) {
                        transition-delay: $i * 0.25s;
                    }
                }
            }
        }
    }    
    
</style>