<style lang="scss" scoped>
@keyframes spin {
	from { transform: rotateY(0deg); }
	to { transform: rotateY(360deg); }
}

.logo {
	display: inline-block;
	position: relative;
	height: 40px;
	width: 30px;

	&:hover {
		> * {
			animation: spin 1.2s linear infinite;
			transform: rotateY(360deg);
		}

		> div:first-child {
			animation-delay: 0.1s;
			transition-delay: 0.1s;
		}

		> div:last-child {
			animation-delay: 0.3s;
			transition-delay: 0.3s;
		}
	}

	> * {
		transition: 1.2s linear;
		transform-origin: right;
	}
	
	> div:first-child {
		height: 30px;
		width: 30px;
		background-color: white;
		border-radius: 15px 0 0 15px;
	}
		
	> div:last-child {
		position: absolute;
		bottom: 0;
		border-bottom: 20px solid white;
		border-right: 15px solid white;
		border-top: 20px solid transparent;
		border-left: 15px solid transparent;
	}
}
</style>

<template lang="pug">
.logo
	div
	div
</template>

<script>
export default {
	name: 'Logo'
}
</script>
