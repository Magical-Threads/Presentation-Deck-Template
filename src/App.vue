<template>
    <div id='app'>
		<slides nav-position='right' :scripts='scripts' :slide-duration='1'>
			<section>
				<h2>Slide One</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad veritatis numquam expedita quas consequuntur ab dicta hic nostrum commodi consectetur dolores incidunt placeat, doloribus laborum quasi est. Ullam, corrupti expedita!</p>
				<button class='go-next'>Next</button>
			</section>
			<section id='some-id'>
				<h2>Slide Two</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad veritatis numquam expedita quas consequuntur ab dicta hic nostrum commodi consectetur dolores incidunt placeat, doloribus laborum quasi est. Ullam, corrupti expedita!</p>
				<button class='go-prev'>Prev</button>
				<button class='go-next'>Next</button>
			</section>
			<section>
				<h2>Slide Three</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad veritatis numquam expedita quas consequuntur ab dicta hic nostrum commodi consectetur dolores incidunt placeat, doloribus laborum quasi est. Ullam, corrupti expedita!</p>
				<figure>
					<img v-for='img in imgs' :src='getImage(img)'>
				</figure>
				<button class='go-prev'>Prev</button>
				<button class='go-next'>Next</button>
			</section>
			<section>
				<h2>Slide Four</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad veritatis numquam expedita quas consequuntur ab dicta hic nostrum commodi consectetur dolores incidunt placeat, doloribus laborum quasi est. Ullam, corrupti expedita!</p>
				<img src='./assets/images/1.jpg'>
				<button class='go-prev'>Prev</button>
			</section>
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
    	return {
    		scripts: Scripts,
    		imgs: [ 'a.jpg', 'b.jpg', 'c.jpg' ]
    	};
    }
}
</script>

<style lang='scss'>

	section {
		padding: 5vw;
	}

	h2 {
		font-size: 5vw;
	}

	/* Select with and ID */
	#some-id {
		background: url('./assets/images/1.jpg') 50% 50%/cover;
		* {
			opacity: 0;
			transition: all 1s ease-in-out;
		}
		&.active.complete * {
			opacity: 1;
		}
	}

	section:nth-of-type(3) {
		background: rgba(gray, 0.25);
		figure {
			display: flex;
			align-items: center;
			justify-content: space-between;;
			margin: 0 -1%;
			img {
				width: 31.333%;
				height: auto;
				margin: 1%;
				opacity: 0;
				transition: 0s ease-in 1s;
			}
		}
		&.active.complete {
			img {
				opacity: 1;
				transition: 1s ease-out 0s;
				@for $i from 1 through 3 {
					&:nth-of-type(#{$i}) {
						transition-delay: $i * 0.1s;
					}
				}
			}
		}
	}

	section[data-i='4'] {
		text-align: center;
		padding: 0 30%;
		img {
			width: 80%;
			display: block;
			margin: 2% auto;
		}
	}
	
</style>