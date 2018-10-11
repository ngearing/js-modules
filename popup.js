export const lightbox = function(elements) {
	var lightBox = {}
	var isActive = false
	var isVisible = false

	if (elements.length < 1) {
		return
	}

	let nodes = elements
	var selector = getClassList(nodes[0])

	document.addEventListener("readystatechange", () => {
		console.log("readyState:" + document.readyState)
		attachEvents()
	})
	document.addEventListener("DOMContentLoaded", () => {
		console.log("DOMContentLoaded")
		attachEvents()
	})

	window.onload = () => {
		console.log("window onload")
		attachEvents()
	}

	attachEvents(true)

	const observer = new MutationObserver(function(mutList) {
		mutList.forEach(function(mutRec) {
			console.log(mutRec.type)
		})

		let tmp = document.querySelectorAll(selector)
		if (tmp.length != nodes.length) {
			console.log(tmp)

			nodes = tmp
			attachEvents()
		}
	})

	function attachEvents(init = false) {
		if (init !== true) {
			let tmp = document.querySelectorAll(selector)

			if (tmp.length == nodes.length) {
				return
			}

			nodes = tmp
		}

		nodes.forEach(elem => {
			elem.addEventListener("click", handleClick)
			elem.addEventListener("touch", handleClick)
			elem.setAttribute("data-listeners", "click,touch")
		})

		let parent = nodes[0].offsetParent

		if (parent) {
			observer.observe(parent, {
				childList: true,
				subtree: true,
			})
		}
	}

	function handleClick(event) {
		let href = this.getAttribute("href")
		let caption = this.getAttribute("title")
		console.log(this)
		console.log(event)

		event.preventDefault()

		if (!isActive) {
			createLightBox()
		}

		lightBox.image.src = href
		lightBox.caption.innerText = caption

		showLightBox()
	}

	function showLightBox() {
		lightBox.container.classList.add("show")

		if (lightBox.caption.innerText.length < 1) {
			lightBox.caption.classList.add("empty")
		} else {
			lightBox.caption.classList.remove("empty")
		}

		isVisible = true
	}

	function createLightBox() {
		lightBox.container = document.createElement("div")
		lightBox.container.classList.add("lightbox")
		lightBox.wrap = document.createElement("div")
		lightBox.wrap.classList.add("lightbox-wrap")
		lightBox.image = document.createElement("img")
		lightBox.image.classList.add("lightbox-image")
		lightBox.caption = document.createElement("p")
		lightBox.caption.classList.add("lightbox-caption")
		lightBox.close = document.createElement("span")
		lightBox.close.classList.add("lightbox-close")

		document.body.appendChild(lightBox.container)
		lightBox.container.appendChild(lightBox.wrap)
		lightBox.wrap.appendChild(lightBox.image)
		lightBox.wrap.appendChild(lightBox.caption)
		lightBox.wrap.appendChild(lightBox.close)

		isActive = true

		lightBox.container.addEventListener("click", function() {
			if (isVisible) {
				lightBox.container.classList.remove("show")
				isVisible = false
			}
		})

		lightBox.close.addEventListener("click", function() {
			if (isVisible) {
				lightBox.container.classList.remove("show")
				isVisible = false
			}
		})
	}

	function getClassList(elem) {
		return `${elem.nodeName}.${Array.from(elem.classList).join(".")}`
	}
}
