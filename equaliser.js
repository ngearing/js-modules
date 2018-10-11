export const equaliser = function(base, elems = false) {
	const baseElements = document.querySelectorAll(base)
	if (baseElements.length == 0) {
		return
	}
	const elements = elems ? document.querySelectorAll(elems) : baseElements
	let maxHeight

	window.addEventListener("load", resizeElems)
	window.addEventListener("resize", resizeElems)

	function resizeElems() {
		maxHeight = getMaxHeight(baseElements)
		if (maxHeight !== getMaxHeight(elements)) {
			setHeight(elements)
		}
	}

	function getMaxHeight(elements) {
		return Math.max(Array.from(elements).map(ele => ele.offsetHeight))
	}

	function setHeight(elements) {
		Array.from(elements).map(elem => (elem.style.maxHeight = `${maxHeight}px`))
	}
}
