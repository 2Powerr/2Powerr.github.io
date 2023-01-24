let boxes = []
let mixer

window.onload = () => {
	const boxesDOM = document.getElementsByClassName('grid-item')
	const mixerDOM = document.getElementById('mixer')

	let i = 1
	for (const boxDOM of boxesDOM) {
		if (boxDOM.id !== 'mixer') {
			boxes.push({
				dom: boxDOM,
				audio: new Audio('../audio/park_' + i + '.mp3'),
				image: boxDOM.getElementsByClassName('box-image')[0],
			})
			i++
		}
	}

	boxes.forEach(box => {
		box.image.onclick = () => {
			playAudio(box, boxes.filter(b => b !== box))
		}
	})

	mixer = {
		dom: mixerDOM,
		audio: {
			box_1: new Audio('../audio/park_1.mp3'),
			box_2: new Audio('../audio/park_2.mp3'),
			box_3: new Audio('../audio/park_3.mp3'),
			box_4: new Audio('../audio/park_4.mp3')
		},
		slider: mixerDOM.getElementsByClassName('slider')[0]
	}
}

function playAudio(box) {
	const player = box.audio
	const otherBoxes = boxes.filter(b => b !== box)
	if (player.paused) {
		pauseAll(otherBoxes)
		player.play()
		box.image.style.filter = 'blur(0px)'
	} else {
		player.pause()
		box.image.style.filter = 'blur(5px)'
	}
}

function pauseAll(boxes) {
	for (const boxIdx in boxes) {
		const box = boxes[boxIdx]
		const audio = box.audio
		box.image.style.filter = 'blur(5px)'
		audio.pause()
	}
}