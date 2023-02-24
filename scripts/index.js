/**
 * Setup HTML elements with JavaScript
 * This functions is ran when Window loads (onload function)
 * This function does the following:
| * Name                    | ID                | Description                                                |
| * Initial animation video | animation-video   | setting video source                                       |
| * Restart button          | restart-video     | When user clicks, restart video playback                   |
| * Play/pause button       | toggle-play-video | When user clicks, pause video. If it's playing, unpause it |
| * Next button             | skip-video        | When user click on it, go to next page                     |
 */
function setupVideoControls() {
	let firstVideoLoad = true
	const videoElement = document.getElementById('animation-video')
	const restartVideoControl = document.getElementById('restart-video')
	const togglePlayVideoControl = document.getElementById('toggle-play-video')
	const skipVideoControl = document.getElementById('skip-video')

	videoElement.src = '../video/' + INIT_ANIMATION_FILENAME

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

// Do not keep cache values
window.onunload = () => {}