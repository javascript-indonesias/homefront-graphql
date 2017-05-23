<style lang="scss" scoped>
header {
	display: flex;
	justify-content: space-between;
	opacity: 0;
	padding: 1em;
	transform: translateY(-4em);
	transition: 0.5s;

	&.-show {
		opacity: 1;
		transform: translateY(0);
	}
}

a {
	border: 0;
}
</style>

<template lang="pug">
	header(:class="{ '-show': show }")
		router-link(:to="{ name: 'home' }"): logo
		home-menu
</template>

<script>
import Logo from 'vue/components/Logo'
import HomeMenu from './HomeMenu'

export default {
	name: 'HomeHeader',
	components: { HomeMenu, Logo },

	props: {
		show: Boolean
	}
}
</script>
