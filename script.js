// let content = document.getElementById("content")
//
// window.onclick = (event) => {
// 	console.log("target: " + event.target.nodeName)
// 	if (event.explicitOriginalTarget.className === 'sound') {
// 		return
// 	}
// 	let content = document.getElementById("content")
//
// 	let input = document.createElement("input")
// 	input.type = "text"
// 	input.style.top = "" + event.clientY + "px"
// 	input.style.left = "" + event.clientX + "px"
// 	input.autofocus = true
// 	input.className = "sound"
// 	content.appendChild(input)
// 	input.focus()
// 	input.addEventListener("keydown", keyDown)
// }
//
// function keyDown(event) {
// 	if (event.keyCode === 13) {
// 		console.log("enter")
// 		let input = event.target
// 		input.blur()
// 		input.type = "submit"
// 		// const randomColor = Math.floor(Math.random()*16777215).toString(16);
// 		// input.style.backgroundColor = "#" + randomColor
// 	}
// }

const park1 = document.getElementById("park-1")
const park1_Audio = new Audio('audio/park_1.mp3')
const park2 = document.getElementById("park-2")
const park2_Audio = new Audio('audio/park_2.mp3')
const park3 = document.getElementById("park-3")
const park3_Audio = new Audio('audio/park_3.mp3')
const park4 = document.getElementById("park-4")
const park4_Audio = new Audio('audio/park_4.mp3')

park1.onclick = () => playAudio(park1_Audio, [park2_Audio, park3_Audio, park4_Audio])
park2.onclick = () => playAudio(park2_Audio, [park1_Audio, park3_Audio, park4_Audio])
park3.onclick = () => playAudio(park3_Audio, [park1_Audio, park2_Audio, park4_Audio])
park4.onclick = () => playAudio(park4_Audio, [park1_Audio, park2_Audio, park3_Audio])

function playAudio(player, otherAudios) {
	if (player.paused) {
		pauseAll(otherAudios)
		player.play()
	} else
		player.pause()
}

function pauseAll(audios) {
	for (const audio of audios) {
		audio.pause()
	}
}