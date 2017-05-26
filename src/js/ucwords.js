export default function (words, separator, joint) {
	return words.split(separator)
		.map(word => word.charAt(0).toUpperCase() + word.slice(1, word.length))
		.join(joint)
}
