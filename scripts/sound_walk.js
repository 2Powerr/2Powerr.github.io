var song = undefined

var fft
var particles = []
var img

window.onload = () => {
	const soundWalk = document.getElementById('sound-walk')


	const soundNodes = document.getElementById('sound-nodes')

	let position = {x: 0, y: 0}

	const nodeInteractable = interact('.sound-node-circle.draggable')
	nodeInteractable.draggable({
		onstart: (event) => {
			const rect = interact.getElementRect(event.target)

			position.x = rect.left + rect.width / 2
			position.y = rect.top + rect.height / 2
		},
		onmove: (event) => {
			const target = event.target
			const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
			const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
			target.style.webKitTransform = target.style.transform = `translate(${x}px, ${y}px)`
			target.setAttribute('data-x', x)
			target.setAttribute('data-y', y)
		}
	})
}

class AudioControl {
	constructor(containerDOM, sessionBoxConfig) {
		this.dom = containerDOM
		this.imageFilename = sessionBoxConfig.previewImageFilename
		this.audioFilename = sessionBoxConfig.audioFilename
		// const audio = new Audio('../audio/' + sessionBoxConfig.audioFilename)
		const audio = undefined
		this.audio = undefined

		const imgElement = containerDOM.getElementsByTagName('img')[0]
		imgElement.src = '../images/' + sessionBoxConfig.previewImageFilename
		imgElement.onclick = () => {
			this.toggleAudio()
		}


	}

	setupSlider(audio) {
		const sliderElement = this.dom.getElementsByTagName('input')[0]
		sliderElement.addEventListener('input', (event) => {
			const value = event.currentTarget.value
			this.audio.setVolume(Number(value))
		})
	}

	toggleAudio() {
		console.log(this.audio)
		if (this.audio.isPlaying()) {
			this.audio.pause()
			noLoop()
		}
		else {
			this.audio.play()
			loop()
		}
	}
}

const audioControls = []

function setupBoxes() {
	const selectedBoxes = JSON.parse(sessionStorage.getItem("selectedBoxes"))
	const volumeControlContainer = document.getElementsByClassName('volume-control-container')

	let i = 0
	for (; i < selectedBoxes.length; i++) {

		const selectedBox = selectedBoxes[i]
		const container = volumeControlContainer[i]
		audioControls.push(new AudioControl(container, selectedBox))
	}
}


let audio1
let audio2
let audio3
let audio4

function preload() {

	setupBoxes()

	audioControls.forEach(control => {
		control.audio = loadSound('../audio/' + control.audioFilename)
		control.setupSlider(control.audio)
	})

	interact('#sound-walk').on('tap', () => {
		console.log('interact')
		audioControls.forEach(control => {
			control.toggleAudio()
		})
		// song2.play()
		// audioControls.forEach(control => {
		// 	control.toggleAudio()
		// })
	})

	// img = loadImage("https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=747")
	// img = loadImage("https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80")
}

function setup() {

	createCanvas(windowWidth / 2, windowHeight / 2);

	angleMode(DEGREES)
	// imageMode(CENTER)
	// rectMode(CENTER)
	fft = new p5.FFT(0.8, 512)
	// img.filter(BLUR, 1)
	background(0)
	noLoop()
}

function draw() {

	background(0)

	const soundWalk = document.getElementById('sound-walk-container')
	translate(width/2, height/2)

	fft.analyze()
	amp = fft.getEnergy(20, 200)

	// push()
	// if(amp>230) {
	// 	rotate(random(-1, 1))
	// }
	// // image(img, 0, 0, width + 100, height + 100)
	// pop()

	// var alpha = map(amp, 0, 255, 100, 150)
	// fill(20, alpha)
	noStroke()
	// rect(0, 0, width, height)

	stroke(255)     // stroke color of ring
	// stroke(220, 107, 255)
	strokeWeight(3)
	noFill()
	// fill(255)

	var wave = fft.waveform()

	for(var t = -1; t <= 1; t += 2) {
		beginShape()
		for(var i = 0; i <= 180; i += 0.5) {
			var index = floor(map(i,0,180,0,wave.length-1))
			var r = map(wave[index], -1, 1, 90, 350)
			var x = r * sin(i) * t
			var y = r * cos(i)
			vertex(x,y)
		}
		endShape()
	}
}