<style lang="scss" scoped>
.status {
	position: fixed;
	top: 2em;
	right: 2em;
	width: 6em;
	height: 6em;
	border-radius: 50%;
	opacity: 0;
	visibility: hidden;
	transition: 0.5s;
	background: #f00;
	z-index: 1000;

	div {
		background: black;
		color: #f00;
		font-weight: 700;
		transform-origin: left;
		transform: rotate(-10deg) translate(-50%, -50%);
		white-space: nowrap;
		position: absolute;
		top: 50%;
		left: 50%;
	}

	&.show {
		opacity: 1;
		visibility: visible;
	}
}
</style>

<template lang="pug">
div
	.status(:class="{ 'show': isOffline }")
		div You Are Offline
	router-view
</template>

<script>
export default {
	name: 'App',

	data () {
		return {
			isOffline: false
		}
	},

	mounted () {
		this.$root.$on('offline', () => { this.isOffline = true })
		this.$root.$on('online', () => { this.isOffline = false })
	}
}
</script>
