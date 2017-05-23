<style lang="scss" scoped>
div {
	align-items: center;
	display: flex;
	justify-content: space-between;
}

a {
	border: 0;
	color: white;
	font-size: 2em;

	&.invisible {
		opacity: 0;
		visibility: hidden;
	}
}
</style>

<template lang="pug">
div(v-if="pagination.last_page > 1")
	a(@click="to(-1)", :class="{ 'invisible': isFirstPage }") ←
	span {{ pagination.current_page }} / {{ pagination.last_page }}
	a(@click="to(1)", :class="{ 'invisible': isLastPage }") ︎→
</template>

<script>
export default {
	name: 'Pagination',

	props: {
		pagination: Object
	},

	computed: {
		isFirstPage () {
			return this.pagination.current_page === 1
		},
		isLastPage () {
			return this.pagination.current_page === this.pagination.last_page
		},
	},

	methods: {
		to (direction) {
			this.$emit('to', direction)
		}
	}
}
</script>
