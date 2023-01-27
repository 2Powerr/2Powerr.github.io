let boxes, mixer

class SoundBox {
	constructor(boxConfig) {
		this.id = boxConfig.id
		this.previewImageFilename = boxConfig.previewImageFilename
		this.previewSoundFilename = boxConfig.previewSoundFilename
		this.soundFilename = boxConfig.soundFilename
		this.isMoving = false
		this.isSelected = false

		this.dom = document.getElementById(boxConfig.id)
		if (this.dom === null) throw new Error("Sound box '" + this.id + "' not found")
		this.setupImage()
		this.setupAudio()
		this.setupInteract()
	}

	setupImage() {
		const images = this.dom.getElementsByClassName('box-image')
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

class MixerBox {
	constructor() {
		this.dom = document.getElementById('mixer')
		if (this.dom === null) throw new Error("Mixer box not found")
		this.numOfBoxes = 0
		this.setupInteract()
	}

	setupInteract() {
		interact('#mixer').dropzone({
			accept: '.grid-item',
			ondrop: function (event) {
				const dom = document.getElementById('mixer')
				event.relatedTarget.style.opacity = '0'
				const box = boxes.find(box => box.id === event.relatedTarget.id)
				box.image.classList.remove('box-image')
				box.image.classList.add('mixer-image')
				dom.appendChild(box.image)
				box.image.style.opacity = '1'
				mixer.numOfBoxes++
				box.isSelected = true

				showSubmit()

				interact(box.image).on('tap', (event) => {
					dom.removeChild(box.image)
					box.isSelected = false
					box.image.classList.remove('mixer-image')
					box.image.classList.add('box-image')
					box.dom.appendChild(box.image)
					box.dom.style.opacity = '1'
					mixer.numOfBoxes--
					if (mixer.numOfBoxes === 0) hideSubmit()
					interact(box.image).unset()
				})
			}
		})
	}
}

function showSubmit() {
	const submit = document.getElementById('submit')
	submit.style.opacity = '1'
	submit.style.pointerEvents = 'all'
	submit.style.cursor = 'pointer'
}

function hideSubmit() {
	const submit = document.getElementById('submit')
	submit.style.opacity = '0'
	submit.style.pointerEvents = 'none'
	submit.style.cursor = 'default'
}

window.onload = () => {
	document.getElementById('submit').onclick = submit
	boxes = SOUND_BOXES.map(boxConfig => new SoundBox(boxConfig))
	mixer = new MixerBox()
}

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