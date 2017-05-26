import Vue from 'vue'
import Router from 'vue-router'
import makeTitle from './makeTitle'

Vue.use(Router)

const Home = r => require.ensure([], () => r(require('vue/pages/Home')), 'app')
const Thoughts = r => require.ensure([], () => r(require('vue/pages/Thoughts')), 'thoughts')
const Thought = r => require.ensure([], () => r(require('vue/pages/Thought')), 'thought')
const Projects = r => require.ensure([], () => r(require('vue/pages/Projects')), 'projects')
const NotFound = r => require.ensure([], () => r(require('vue/pages/NotFound')), 'notfound')

const router = new Router({
	linkActiveClass: '-active',
	mode: 'history',
	routes: [
		{ path: '/', name: 'home', component: Home },
		{ path: '/thoughts', name: 'thoughts', component: Thoughts },
		{ path: '/thoughts/:slug', name: 'thought', component: Thought },
		{ path: '/projects', name: 'projects', component: Projects },
		{ path: '/404', name: '404', component: NotFound },
		{ path: '*', redirect: '/404' }
	]
})

router.afterEach(to => {
	makeTitle(to, 'Rizki Ardian')
})

export default router
