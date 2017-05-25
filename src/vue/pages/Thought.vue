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
		section(v-if="loading > 0")
			loading
	transition(name="slide-up")
		article.head(v-if="content")
			h2 {{ thought.title }}
			em {{ format(thought.published) }}
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
import gql from 'graphql-tag'
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
			thought: null,
			content: null,
			url: window.location.href
		}
	},

	apollo: {
		thought () {
			return {
				query: gql`
					query Post ($slug: String!) {
						thought: Post(slug: $slug) {
							title
							published
							file {
								url
							}
						}
					}
				`,
				variables () {
					return {
						slug: this.$route.params.slug
					}
				},
				result () {
					this.fetchContent()
				},
				loadingKey: 'loading',
			}
		}
	},

	mounted () {
		this.header = true
	},

	beforeRouteLeave (to, from, next) {
		this.header = false
		this.content = null

		setTimeout(() => {
			next()
		}, 1000)
	},

	methods: {
		fetchContent () {
			return new Promise(resolve => {
				this.$http.get(this.thought.file.url)
					.then(response => {
						setTimeout(() => {
							this.content = response.data
						}, 300)
					})
			})
		},
		format (date) {
			return format(date, 'MMMM, Do YYYY')
		}
	}
}
</script>
