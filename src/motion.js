import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register GSAP plugins
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

// Define motion path animation for each box
const paths = ["#track", "#track", "#track"]; // Array of paths for each box

paths.forEach((path, index) => {
	const box = document.getElementById(`box${index + 1}`);
	const tl = gsap.timeline({ defaults: { duration: 4, ease: "power1.inOut" } });

	// Create motion path animation
	tl.to(box, {
		motionPath: {
			path: path,
			align: path,
			autoRotate: true,
		},
	});

	// Create ScrollTrigger to pause animation at certain points
	ScrollTrigger.create({
		trigger: box,
		start: "top top",
		end: "bottom bottom",
		scrub: 1,
		pin: true,
		anticipatePin: 1,
		markers: true, // for debugging, you can remove this later
		onUpdate: (self) => {
			// Pause animation at specific points along the path
			if (self.progress >= 0.25 && self.progress <= 0.5) {
				tl.pause();
			} else {
				tl.play();
			}
		},
	});
});
