<style lang="scss" scoped>
section {
	height: 10em;
}

.head {
	text-align: center;

	h2 {
		margin-top: 0;
	}
}

.slide-up,
.slide-down {
	&-enter,
	&-leave {
		&-active {
			transition: 0.5s cubic-bezier(0, 0, 0, 1.2);
		}
	}

	&-enter,
	&-leave-to {
		opacity: 0;
	}
}

.slide-up {
	&-enter,
	&-leave-to {
		transform: translateY(-5em);
	}
}

.slide-down {
	&-enter,
	&-leave-to {
		transform: translateY(5em);
	}
}
</style>

<template lang="pug">
div
	home-header(:show="header")
	transition(name="fade")
		section(v-if="loading")
			loading
	transition(name="slide-up")
		article.head(v-if="meta")
			h2 {{ meta.title }}
			em {{ format(meta.published_at) }}
	transition(name="slide-down")
		article(v-if="content")
			mark-view(:content="content")
	transition(name="slide-down")
		article(v-if="content")
			disqus(
				shortname="naidraikzir",
				:identifier="$route.params.slug", 
				:url="url")
</template>

<script>
import format from 'date-fns/format'
import loading from 'js/mixins/loading'
import Logo from 'vue/components/Logo'
import MarkView from 'vue/components/MarkView'
import HomeHeader from 'vue/partials/HomeHeader'
import Disqus from 'vue-disqus/VueDisqus'

export default {
	name: 'Thought',
	mixins: [ loading ],
	components: { Logo, MarkView, HomeHeader, Disqus },

	data () {
		return {
			header: false,
			meta: null,
			content: null,
			url: window.location.href
		}
	},

	mounted () {
		this.header = true
		this.fetch()
	},

	beforeRouteLeave (to, from, next) {
		this.header = false
		this.meta = null
		this.content = null

		setTimeout(() => {
			next()
		}, 1000)
	},

	methods: {
		fetch () {
			this.loading = true
		},
		fetchContent (meta) {
		},
		format (date) {
			return format(date, 'MMMM, Do YYYY')
		}
	}
}
</script>
