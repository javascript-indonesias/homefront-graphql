<style lang="scss" scoped>
section {
	height: 10em;
}

.title {
	h3 {
		margin: 0;
	}

	a {
		border: 0;
	}

	a,
	em {
		background-color: black;
	}
}

.separator {
	margin: 1.5em 0;
}

.slide-enter,
.slide-leave {
	&-active {
		transition: 0.3s cubic-bezier(0, 0, 0, 1.2);
	}
}

.slide-enter {
	opacity: 0;
	transform: translateX(-2em);
}

.slide-leave-to {
	opacity: 0;
	transform: translateX(2em);
}
</style>

<template lang="pug">
div
	home-header(:show="header")
	transition(name="fade")
		section(v-if="loading")
			loading
	transition-group(name="slide", tag="article")
		.title(
			v-for="(thought, key, index) in thoughts",
			:key="key",
			:style="{ transitionDelay: (index * 0.15) + 's' }")
			.separator(v-if="index > 0") ———
			h3
				router-link(:to="{ name: 'thought', params: { slug: key } }") {{ thought.title }}
			em {{ format(thought.published_at) }}
</template>

<script>
import format from 'date-fns/format'
import loading from 'js/mixins/loading'
import HomeHeader from 'vue/partials/HomeHeader'

export default {
	name: 'Thoughts',
	mixins: [ loading ],
	components: { HomeHeader },

	data () {
		return {
			thoughts: [],
			header: false,
			pagination: {
				current_page: 2,
				last_page: 3
			}
		}
	},

	mounted () {
		this.header = true
		this.fetch()
	},

	beforeRouteLeave (to, from, next) {
		this.header = false
		this.thoughts = []

		setTimeout(() => {
			next()
		}, 1000)
	},

	methods: {
		fetch () {
			this.loading = true
		},
		format (date) {
			return format(date, 'MMMM, Do YYYY')
		}
	}
}
</script>
