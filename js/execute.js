window.onload = () => {
    nonPokemonFightGame.init()
}


const canvas = document.querySelector('canvas')
const div = document.querySelector('div')
const h1 = document.querySelector('h1')

h1.addEventListener('click', () => {
    nonPokemonFightGame.backgroundSound.play()
    canvas.classList.remove('d-none')
    div.classList.add('d-none')
})
