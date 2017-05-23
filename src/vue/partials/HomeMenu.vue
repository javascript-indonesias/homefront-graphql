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
		v-for="menu in menus.filter(menu => $data[menu.name].count > 0)",
		:to="{ name: menu.name }",
		:key="menu.name") {{ menu.text }}
</template>

<script>
import gql from 'graphql-tag'

const thoughts = gql`
	query {
		thoughts: _allPostsMeta(filter: {
			type: "thought"
		}) {
			count
		}
	}
`

const projects = gql`
	query {
		projects: _allPostsMeta(filter: {
			type: "project"
		}) {
			count
		}
	}
`

export default {
	name: 'HomeMenu',

	data () {
		return {
			thoughts: {
				count: 0
			},
			projects: {
				count: 0
			},
			menus: [
				{ name: 'thoughts', text: 'Thoughts' },
				{ name: 'projects', text: 'Projects' },
			]
		}
	},

	apollo: {
		thoughts: {
			query: thoughts
		},
		projects: {
			query: projects
		}
	},
}
</script>
