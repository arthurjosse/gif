(function() {
	("use strict");

	const firstFramesSet = [];
	const secondFramesSet = [];
	const frames = [];
	const interleavedImg = document.getElementById("interleaved");

	const populateFramesSets = function() {
		for (let i = 0; i < 7; i++) {
			firstFramesSet.push("../media/1/" + i + ".png");
		}

		for (let i = 0; i < 7; i++) {
			secondFramesSet.push("../media/2/" + i + ".png");
		}
	};

	const interLeave = (arr1, arr2) => arr1.reduce((arr3, el, i) => arr3.concat(el, arr2[i]), []);

	const gif = new GIF({
		workers: 2,
		quality: 1,
		width: 320,
		height: 240,
		workerScript: "js/lib/gif.worker.js"
	});

	const addFramesToGif = function() {
		const interleavedFramesSet = Array.from(interLeave(firstFramesSet, secondFramesSet));

		for (let i = 0; i < interleavedFramesSet.length; i++) {
			frames[i] = new Image();
			frames[i].src = interleavedFramesSet[i];
			gif.addFrame(frames[i]);
		}
	};

	populateFramesSets();
	addFramesToGif();

	gif.on("finished", function(blob) {
		const blobUrl = URL.createObjectURL(blob);
		// window.open(blobUrl);
		interleavedImg.src = blobUrl;
	});

	gif.render();

	gif.freeWorkers.forEach(w => w.terminate());
})();
