import { TimelineMax, TweenMax } from 'gsap';

export default function({currentSlide, slideDuration}) {
	
	let get = (element) => currentSlide.querySelector(element);
	let getAll = (element) => currentSlide.querySelectorAll(element);

	return {
		slideStart() {
			if (currentSlide.dataset.i === '1') {
				// do something with slide number 1
			}

			// or 
			if (currentSlide.id === 'some-id') {
				// do something with an assiged slide id
			}
		},
		slideEnd() {

		}
	};
}