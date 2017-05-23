<template lang="pug">
div
	home-header(:show="header")
</template>

<script>
import Logo from 'vue/components/Logo'
import HomeHeader from 'vue/partials/HomeHeader'

export default {
	name: 'Projects',
	components: { Logo, HomeHeader },

	data () {
		return {
			header: false
		}
	},

	mounted () {
		this.header = true
	},

	beforeRouteLeave (to, from, next) {
		this.header = false

		setTimeout(() => {
			next()
		}, 1000)
	},
}
</script>
