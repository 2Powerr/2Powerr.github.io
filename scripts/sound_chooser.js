let boxes, mixer

/**
 * Sound box class representing each clickable and draggable box
 *
 * Each sound box has:
 * - Preview image
 * - Preview sound
 * - Description text
 *
 * Each sound box can:
 * - Be clicked to produce the 'preview sound'
 * - Be dragged into the 'mixer'
 */
class SoundBox {
	constructor(boxConfig) {
		this.id = boxConfig.id
		this.previewImageFilename = boxConfig.previewImageFilename
		this.previewSoundFilename = boxConfig.previewSoundFilename
		this.soundFilename = boxConfig.soundFilename
		this.descriptionText = boxConfig.description
		this.isMoving = false
		this.isSelected = false

		this.dom = document.getElementById(boxConfig.id)
		if (this.dom === null) throw new Error("Sound box '" + this.id + "' not found")
		this.setupImage()
		this.setupAudio()
		this.setupInteract()
		this.setupDescription()
	}

	setupDescription() {
		const description = this.dom.getElementsByClassName('sound-box-description')
		if (description.length === 0) throw new Error("Sound box '" + this.id + "'has no description element")
		this.description = description[0]
		this.description.innerText = this.descriptionText
	}

	setupImage() {
		const images = this.dom.getElementsByTagName('img')
		if (images.length === 0) throw new Error("Sound box '" + this.id + "' has no image element")
		this.image = images[0]
		this.image.src = '../images/' + this.previewImageFilename
		this.image.id = this.id + '-image'
	}

	setupAudio() {
		this.audio = new Audio('../audio/' + this.previewSoundFilename)
		interact(this.dom).on('tap', () => {
			if (this.audio.paused && !this.isMoving) {
				this.audio.currentTime = 0
				this.audio.play()
			} else {
				this.audio.pause()
			}
		})
	}

	setupInteract() {
		let position = {x: 0, y: 0}
		interact(this.dom).draggable({
			listeners: {
				start (event) {
					event.target.classList.add('no-transition')
					position = {x: 0, y: 0}
				},
				move (event) {
					position.x += event.dx
					position.y += event.dy

					event.target.style.transform =
						`translate(${position.x}px, ${position.y}px)`
				},
				end (event) {
					event.target.style.transform = 'translate(0px, 0px)'
				}
			}
		})
	}
}

/**
 * Mixer class representing the middle section of the Sound Chooser page.
 *
 * The mixer can receive any number of Sound Boxes inside.
 * On receiving each sound box, fill the available space with its preview image.
 * When there are 1 or more sound boxes in mixer, allow user to go to next page (Sound Walk page).
 */
class MixerBox {
	constructor() {
		this.dom = document.getElementById('mixer')
		if (this.dom === null) throw new Error("Mixer box not found")
		this.numOfBoxes = 0
		this.setupInteract()
	}

	setupInteract() {
		interact('#mixer').dropzone({
			accept: '.sound-box',
			ondrop: function (event) {
				const box = boxes.find(box => box.id === event.relatedTarget.id)

				const divContainer = document.createElement('div')
				divContainer.classList.add('mixer-background-item')
				const img = document.createElement('img')
				img.src = '../images/' + box.previewImageFilename

				const overlay = document.createElement('div')
				overlay.classList.add('sound-box-overlay')
				const overlayDescription = document.createElement('p')
				overlayDescription.classList.add('sound-box-description')
				overlayDescription.innerText = box.descriptionText

				overlay.appendChild(overlayDescription)

				divContainer.appendChild(img)
				divContainer.appendChild(overlay)

				box.dom.style.visibility = 'hidden'

				const mixerContainer = document.getElementById('mixer-background')
				mixerContainer.appendChild(divContainer)

				const submitButton = document.getElementById('submit-button')
				submitButton.disabled = false
				box.isSelected = true

				document.getElementById('mixer-description').style.visibility = 'hidden'

				divContainer.onclick = () => {
					box.dom.style.visibility = 'visible'
					mixerContainer.removeChild(divContainer)

					if (mixerContainer.children.length === 0) {
						document.getElementById('mixer-description').style.visibility = 'visible'
						submitButton.disabled = true
					}

					box.isSelected = false
				}
			}
		})
	}
}

window.onload = () => {
	boxes = SOUND_BOXES.map(boxConfig => new SoundBox(boxConfig))
	mixer = new MixerBox()
	document.getElementById('submit-button').addEventListener('click', () => {
		submit()
	})
}

/**
 * Submits the selected sound boxes to the next page (Sound Walk page)
 */
function submit() {

	const selectedBoxes = boxes.filter(box => box.isSelected)

	const selectedBoxesSessionObj = selectedBoxes.map(box => {
		return {
			id: box.id,
			previewImageFilename: box.previewImageFilename,
			audioFilename: box.soundFilename
		}
	})

	sessionStorage.setItem("selectedBoxes", JSON.stringify(selectedBoxesSessionObj))
	document.location.href = '../pages/sound_walk.html'
}