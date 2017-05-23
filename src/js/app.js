'use strict'

import Vue from 'vue'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'
import router from './router'
import App from 'vue/App'

Vue.prototype.$http = require('axios')

// styles
require('sass/app')

Vue.use(VueApollo)

const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj2zvv6fylilp0176gdzce8yx' })

const apolloClient = new ApolloClient({
	networkInterface,
	connectToDevTools: true
})

const apolloProvider = new VueApollo({
	defaultClient: apolloClient
})

window.app = new Vue({
	router,
	apolloProvider,
	render: h => h(App)
}).$mount('#app')

console.log(window.app)
