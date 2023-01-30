const PokemonFightGame = {
    name: 'Pokemon Fight Game',
    description: 'This is a pokemon combat style fighting game',
    version: '1.0.0',
    license: undefined,
    authors: 'Gonzalo Rincon',
    canvasTag: undefined,
    ctx: undefined,
    canvasSize: { w: window.innerWidth, h: window.innerHeight },
    backgroundInstance: undefined,
    mainPlatform: undefined,
    platform1: undefined,
    platform2: undefined,
    platforms: [],
    players: [],
    player1: undefined,
    player2: undefined,
    frames: 60,
    framesCounter: 0,


    init() {
        this.setContext()
        this.setDimensions()
        this.createFightingArena()
        this.createPlayers()
        this.start()
    },
    setContext() {
        this.canvasTag = document.querySelector('canvas')
        this.ctx = this.canvasTag.getContext('2d')
        console.log(this.ctx)
    },
    setDimensions() {
        this.canvasSize = {
            w: window.innerWidth - 10,
            h: window.innerHeight - 5,
        }
        this.canvasTag.setAttribute('width', this.canvasSize.w)
        this.canvasTag.setAttribute('height', this.canvasSize.h)
    },
    start() {
        setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.isCollision()
            this.punchHitBox()
            this.framesCounter++
            if (this.framesCounter % 60 === 0) {
                this.players.forEach(player => player.canPunch = true)
            }
        }, 1000 / this.frames)

    },
    drawAll() {
        this.drawFightingArena()
        this.drawPlayers()
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    createFightingArena() {
        this.backgroundInstance = new Image()
        this.backgroundInstance.src = './img/fighting-arena-background.png'
        this.mainPlatform = new MainPlatform(this.ctx, this.canvasSize)
        this.platform1 = this.platforms.push(new Platform(this.ctx, this.canvasSize, this.canvasSize.w * 0.15, this.canvasSize.h * 0.45, 1))
        this.platform2 = this.platforms.push(new Platform(this.ctx, this.canvasSize, this.canvasSize.w * 0.65, this.canvasSize.h * 0.45, 2))
    },
    drawFightingArena() {
        // this.ctx.drawImage(this.backgroundInstance, 0, 0, this.canvasSize.w, this.canvasSize.h)
        this.mainPlatform.init()
        this.platforms.forEach(platform => platform.init())
    },
    createPlayers() {
        this.player1 = this.players.push(new Player(this.ctx, this.canvasSize, this.mainPlatform.platformPos, this.mainPlatform.platformSize, this.canvasSize.w * 0.3, 'KeyW', 'KeyD', 'KeyA', 'KeyF'))
        this.player2 = this.players.push(new Player(this.ctx, this.canvasSize, this.mainPlatform.platformPos, this.mainPlatform.platformSize, this.canvasSize.w * 0.6, 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Space'))
    },
    drawPlayers() {
        this.players.forEach(player => player.init())
    },
    isCollision() {
        this.players.forEach(player => {
            this.platforms.forEach(platform => {
                if (player.playerPos.y + player.playerSize.h + player.playerVel.y >= platform.platformPos.y &&
                    player.playerPos.y + player.playerSize.h <= platform.platformPos.y &&
                    player.playerPos.x <= platform.platformPos.x + platform.platformSize.w &&
                    player.playerPos.x + player.playerSize.w >= platform.platformPos.x) {
                    player.playerVel.y = 0
                }
            })
        })
    },
    punchHitBox() {
        if (this.players[0].punch.punchPos.y + this.players[0].punch.punchSize.h >= this.players[1].playerPos.y &&
            this.players[0].punch.punchPos.y <= this.players[1].playerPos.y + this.players[1].playerSize.h &&
            this.players[0].punch.punchPos.x + this.players[0].punch.punchSize.w >= this.players[1].playerPos.h &&
            this.players[0].punch.punchPos.x <= this.players[1].playerPos.x + this.players[1].playerSize.w) {
            console.log('HIT')
        }
        if (this.players[1].punch.punchPos.y + this.players[1].punch.punchSize.h >= this.players[0].playerPos.y &&
            this.players[1].punch.punchPos.y <= this.players[0].playerPos.y + this.players[0].playerSize.h &&
            this.players[1].punch.punchPos.x + this.players[1].punch.punchSize.w >= this.players[0].playerPos.h &&
            this.players[1].punch.punchPos.x <= this.players[0].playerPos.x + this.players[0].playerSize.w) {
            console.log('HIT')
        }
    }
}