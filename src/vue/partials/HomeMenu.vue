<style lang="scss" scoped>
@import '../../sass/variables';

.item {
	border: 0;
	color: white;
	overflow: hidden;
	position: relative;
	transition: 0.5s;
	
	&.-active {
		color: $green;
	}

	&:hover::before {
		transform: scaleX(1);
	}

	&:not(:last-child) {
		margin-right: 1em;
	}

	&::before {
		content: '';
		border-bottom: 1px solid $green;
		height: 2px;
		left: 0;
		position: absolute;
		top: 50%;
		transform-origin: left;
		transform: scaleX(0);
		transition: 0.3s ease-in-out;
		width: 100%;
	}
}
</style>

<template lang="pug">
nav
	router-link.item(
		v-for="menu in menus.filter(menu => menu.show)",
		:to="{ name: menu.name }",
		:key="menu.name") {{ menu.text }}
</template>

<script>
export default {
	name: 'HomeMenu',

	data () {
		return {
			menus: [
				{ name: 'thoughts', text: 'Thoughts', show: false },
				{ name: 'projects', text: 'Projects', show: false },
			]
		}
	},

	created () {
		this.fetch()
	},

	methods: {
		fetch () {
		},
		set (name) {
			this.menus.find(menu => menu.name === name).show = true
		}
	}
}
</script>
