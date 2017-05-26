import ucwords from './ucwords'

export default function (...parts) {
	const tabTitle = document.querySelector('title')

	tabTitle.innerText = parts[0].name === 'home' ? parts[1]
		: parts[0].params.slug ? ucwords(parts[0].params.slug, '-', ' ') + ' | ' + parts[1]
			: ucwords(parts[0].name, ' ', ' ') + ' | ' + parts[1]
}
