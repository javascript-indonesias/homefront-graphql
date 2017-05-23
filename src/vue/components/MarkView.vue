<template lang="pug">
div(v-html="parsed")
</template>

<script>
import marked from 'marked'
import Prism from 'prismjs'
require('prismjs/components/prism-bash')
require('prismjs/components/prism-go')
require('prismjs/components/prism-jade')
require('prismjs/components/prism-json')
require('prismjs/components/prism-nginx')
require('prismjs/components/prism-php')
require('prismjs/components/prism-python')
require('prismjs/components/prism-sass')
require('prismjs/components/prism-scss')
require('prismjs/components/prism-sql')

export default {
	name: 'MarkView',

	props: {
		content: {
			type: String,
			default: null
		}
	},

	computed: {
		parsed () {
			if (this.content) {
				return marked(this.content, {
					highlight: (code, lang) => lang ? Prism.highlight(code, Prism.languages[lang], lang) : code
				})
			}
		}
	},
}
</script>
