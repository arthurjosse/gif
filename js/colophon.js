(function() {
	"use strict";

	const colophonButton = document.getElementById("colophon-b");
	const colophonW = document.getElementById("colophon-w");
	const colophon = document.getElementById("colophon");
	const infos = document.getElementById("c-infos-w");
	let transitionBackground;
	let transitionText1;
	let transitionText2;

	class ClassWatcher {
		constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
			this.targetNode = targetNode;
			this.classToWatch = classToWatch;
			this.classAddedCallback = classAddedCallback;
			this.classRemovedCallback = classRemovedCallback;
			this.observer = null;
			this.lastClassState = targetNode.classList.contains(this.classToWatch);

			this.init();
		}

		init() {
			this.observer = new MutationObserver(this.mutationCallback);
			this.observe();
		}

		observe() {
			this.observer.observe(this.targetNode, { attributes: true });
		}

		disconnect() {
			this.observer.disconnect();
		}

		mutationCallback = mutationsList => {
			for (let mutation of mutationsList) {
				if (mutation.type === "attributes" && mutation.attributeName === "class") {
					let currentClassState = mutation.target.classList.contains(this.classToWatch);
					if (this.lastClassState !== currentClassState) {
						this.lastClassState = currentClassState;
						if (currentClassState) {
							this.classAddedCallback();
						} else {
							this.classRemovedCallback();
						}
					}
				}
			}
		};
	}

	const toggle = function(el) {
		el.classList.toggle("enabled");
	};

	const updateDate = function() {
		const date = new Date(document.lastModified);

		const dateFormated = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);

		document.getElementById("updated").firstChild.innerHTML = `${dateFormated}`;
	};

	function workOnClassAdd() {
		transitionBackground = setTimeout(() => {
			colophon.classList.add("transition");
			transitionText1 = setTimeout(() => {
				toggle(colophon);
			}, 1500);
			transitionText2 = setTimeout(() => {
				toggle(infos);
			}, 2000);
		}, 500);
	}

	function workOnClassRemoval() {
		clearTimeout(transitionBackground);
		clearTimeout(transitionText1);
		clearTimeout(transitionText2);
		colophon.classList.remove("transition", "enabled");
		infos.classList.remove("enabled");
	}

	updateDate();

	let classWatcher = new ClassWatcher(colophonButton, "enabled", workOnClassAdd, workOnClassRemoval);

	colophonButton.addEventListener(
		"click",
		e => {
			e.preventDefault;
			toggle(colophonButton);
			toggle(colophonW);
		},
		false
	);

	colophonButton.addEventListener(
		"touch",
		e => {
			e.preventDefault;
			toggle(colophonButton);
			toggle(colophonW);
		},
		false
	);
})();
