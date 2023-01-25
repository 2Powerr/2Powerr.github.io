function setupVideoControls() {
	console.log('video controls setup')
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
		videoElement.currentTime = videoElement.duration
	}

	videoElement.onended = () => {
		document.location.href = 'pages/sound_chooser.html'
	}

	if (videoElement.paused) {
		console.log('video paused')
		togglePlayVideoControl.classList.remove('bi-pause')
		togglePlayVideoControl.classList.add('bi-play')
	} else {
		console.log('video playing')
		togglePlayVideoControl.classList.remove('bi-play')
		togglePlayVideoControl.classList.add('bi-pause')
	}
}

window.onload = () => {
	setupVideoControls()
}

window.onunload = () => {}