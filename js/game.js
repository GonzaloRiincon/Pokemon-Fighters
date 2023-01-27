const PokemonFightGame = {
    name: 'Pokemon Fight Game',
    description: 'This is a pokemon combat style fighting game',
    version: '1.0.0',
    license: undefined,
    authors: 'Ángeles Figueredo & Gonzalo Rincon',
    canvasTag: undefined,
    ctx: undefined,
    canvasSize: { w: undefined, h: undefined },
    backgroundInstance: undefined,



    init() {
        this.setContext()
        this.setDimensions()
        this.createFightingArena()
        this.start()
    },
    setContext() {
        this.canvasTag = document.querySelector('canvas')
        this.ctx = this.canvasTag.getContext('2d')
        console.log(this.ctx)
    },
    setDimensions() {
        this.canvasSize = {
            w: window.innerWidth,
            h: window.innerHeight,
        }
        this.canvasTag.setAttribute('width', this.canvasSize.w)
        this.canvasTag.setAttribute('height', this.canvasSize.h)
    },
    start() {
        setInterval(() => {
            this.clearAll()
            this.drawAll()
        }, 10)

    },
    drawAll() {
        this.drawFightingArea()
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    createFightingArena() {
        this.backgroundInstance = new Image()
        this.backgroundInstance.src = '../img/fighting-arena-background.png'
    },
    drawFightingArea() {
        this.ctx.drawImage(this.backgroundInstance, 0, 0, this.canvasSize.w, this.canvasSize.h)
        this.ctx.fillRect(292, 319, 180, 17)
        this.ctx.styleRect()
    },
}