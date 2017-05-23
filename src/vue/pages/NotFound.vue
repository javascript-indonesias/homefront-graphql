<style lang="scss" scoped>
article {
	text-align: right;
}

h1,
h2 {
	margin: 0;
}
</style>

<template lang="pug">
article
	h2 Ooops...
	h1
		mark 404
	h2 Looks like I can't always give what you want
	router-link(:to="{ name: 'home', exact: true }") Check back the other ones
</template>

<script>
export default {
	name: 'NotFound'
}	
</script>
