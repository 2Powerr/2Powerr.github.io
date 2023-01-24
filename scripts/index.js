function setupVideoControls() {
	let firstVideoLoad = true
	const videoElement = document.getElementById('animation-video')
	const restartVideoControl = document.getElementById('restart-video')
	const togglePlayVideoControl = document.getElementById('toggle-play-video')
	const skipVideoControl = document.getElementById('skip-video')

	restartVideoControl.onclick = () => {
		videoElement.currentTime = 0
	}

	togglePlayVideoControl.onclick = () => {
		if (videoElement.paused) {
			if (firstVideoLoad) videoElement.volume = 0.5
			firstVideoLoad = false
			videoElement.play()
			togglePlayVideoControl.classList.remove('bi-play')
			togglePlayVideoControl.classList.add('bi-pause')
		} else {
			videoElement.pause()
			togglePlayVideoControl.classList.remove('bi-pause')
			togglePlayVideoControl.classList.add('bi-play')
		}
	}

	skipVideoControl.onclick = () => {
		document.location.href = 'pages/sound_chooser.html'
	}
}

window.onload = () => {
	setupVideoControls()
}



const position = {
	x: 0, y: 0
}

// interact('.grid-item').draggable({
// 	listeners: {
// 		start (event) {
// 			console.log(event.type, event.target)
// 		},
// 		move (event) {
// 			position.x += event.dx
// 			position.y += event.dy
//
// 			event.target.style.transform =
// 				`translate(${position.x}px, ${position.y}px)`
// 		},
// 	}
// })
//
// interact('#mixer')
// 	.dropzone({
// 		ondrop: function (event) {
// 			position.x = 0
// 			position.y = 0
// 			alert(event.relatedTarget.id
// 				+ ' was dropped into '
// 				+ event.target.id)
// 		}
// 	})
// 	.on('dropactivate', function (event) {
// 		event.target.classList.add('drop-activated')
// 	})