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
    platforms: [],
    // mainPlatformPos: {
    //     x: this.canvasSize.w * 0.2,
    //     y: this.canvasSize.h * 0.7
    // },
    // mainPlatformSize: {
    //     w: this.canvasSize.w - (this.canvasSize.w * 2 / 5),
    //     h: this.canvasSize.h - (this.canvasSize.h - this.canvasSize.h * 0.5)
    // },

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
        this.backgroundInstance.src = './img/fighting-arena-background.png'

    },
    createFightingArena() {
        // this.mainPlatformPos = {
        //     x: this.canvasSize.w * 0.2,
        //     y: this.canvasSize.h * 0.7
        // }
        // this.mainPlatformSize = {
        //     w: this.canvasSize.w - (this.canvasSize.w * 2 / 5),
        //     h: this.canvasSize.h - (this.canvasSize.h - this.canvasSize.h * 0.5)
        // }
    },
    drawFightingArea() {
        // this.ctx.drawImage(this.backgroundInstance, 0, 0, this.canvasSize.w, this.canvasSize.h)
        mainPlatform = new Platform(this.ctx, this.canvasSize, this.mainPlatformPos.x, this.mainPlatformPos.y, this.mainPlatformSize.w, this.mainPlatformSize.h)
        this.platforms.push(this.mainPlatform)
        platform1 = new Platform()
    },
}