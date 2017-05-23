<style lang="scss" scoped>
@keyframes loading-slide {
	0% { opacity: 0; transform: scale(0) translateX(-3em); width: 1em; }
	10% { opacity: 0.1; transform: scale(0.1) translateX(-1.75em); width: 1em; }
	40% { opacity: 1; transform: scale(1) translateX(-1em); width: 1em; }
	50% { opacity: 1; transform: scale(1) translateX(0); width: 3em; }
	60% { opacity: 1; transform: scale(1) translateX(1em); width: 1em; }
	90% { opacity: 0.1; transform: scale(0.1) translateX(1.75em); width: 1em; }
	100% { opacity: 0; transform: scale(0) translateX(3em); width: 1em; }
}

@keyframes loading-circle {
	0% { border-width: 1em; height: 0; opacity: 0; width: 0; }
	50% { border-width: 1em; height: 0; opacity: 1; width: 0; }
	100% { border-width: 0em; height: 2em; opacity: 0; width: 2em; }
}

.loading {
	align-items: center;
	display: inline-flex;
	height: 100%;
	justify-content: center;
	width: 100%;

	> .slide {
		animation: 1s linear infinite loading-slide;
		background-color: white;
		border-radius: 0.5em;
		height: 1em;
	}

	> .circle {
		animation: 1s linear infinite loading-circle;
		border: solid white;
		border-radius: 50%;
		box-sizing: content-box;
	}
}
</style>

<template lang="pug">
.loading
	span(:class="type")
</template>

<script>
export default {
	name: 'Loading',

	props: {
		type: {
			type: String,
			default: 'slide'
		}
	}
}
</script>
