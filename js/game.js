const nonPokemonFightGame = {
    name: 'nonPokemon Fight Game',
    description: 'This is a pokemon combat style fighting game',
    version: '1.0.0',
    license: undefined,
    authors: 'Gonzalo Rincon',
    canvasTag: undefined,
    ctx: undefined,
    canvasSize: { w: window.innerWidth, h: window.innerHeight },
    backgroundInstance: undefined,
    livesInstance: undefined,
    p1winsInstance: undefined,
    p2winsInstance: undefined,
    mainPlatform: undefined,
    platform1: undefined,
    platform2: undefined,
    platforms: [],
    player1: undefined,
    player2: undefined,
    powerUpsArr: [],
    frames: 60,
    framesCounter: 0,
    interval: undefined,
    imageInstance: undefined,


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
        this.interval = setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.collisions()
            this.loseHealth()
            this.createPowerUps()
            this.framesCounter += 1

            if (this.framesCounter % 60 === 0) {
                this.player1.canPunch = true
                this.player2.canPunch = true
            }
        }, 1000 / this.frames)
    },

    drawAll() {
        this.drawFightingArena()
        this.drawPlayers()
        this.drawPowerUps()
        this.drawHUD()
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    createFightingArena() {
        this.backgroundInstance = new Image()
        this.backgroundInstance.src = './img/background.png'
        this.mainPlatform = new MainPlatform(this.ctx, this.canvasSize)
        this.platform1 = this.platforms.push(new Platform(this.ctx, this.canvasSize, this.canvasSize.w * 0.15, this.canvasSize.h * 0.45, 1))
        this.platform2 = this.platforms.push(new Platform(this.ctx, this.canvasSize, this.canvasSize.w * 0.65, this.canvasSize.h * 0.45, 2))
    },

    createPlayers() {
        this.player1 = new Player(this.ctx, this.canvasSize, this.frames, this.framesCounter, this.mainPlatform.platformPos, this.mainPlatform.platformSize, this.canvasSize.w * 0.3, 'KeyW', 'KeyD', 'KeyA', 'KeyS', 'KeyF', 1, './img/p1-running.png', './img/p1-runningLeft.png', './img/p1-noMove.png', './img/p1-hit.png', './img/p1-hitLeft.png')
        this.player2 = new Player(this.ctx, this.canvasSize, this.frames, this.framesCounter, this.mainPlatform.platformPos, this.mainPlatform.platformSize, this.canvasSize.w * 0.6, 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'ArrowDown', 'Space', 2, './img/p2-running.png', './img/p2-runningLeft.png', './img/p2-noMove.png', './img/p2-hit.png', './img/p2-hitLeft.png')
    },

    createPowerUps() {
        if (this.framesCounter % 600 === 0) {
            this.powerUpsArr.push(new PowerUp(this.ctx, this.canvasSize))
        }
    },

    drawFightingArena() {
        this.ctx.drawImage(this.backgroundInstance, 0, 0, this.canvasSize.w, this.canvasSize.h)
        this.mainPlatform.init()
        this.platforms.forEach(platform => platform.init())
    },


    drawPlayers() {
        this.player1.init(this.framesCounter)
        this.player2.init(this.framesCounter)
        this.punchHitBox()
    },


    drawPowerUps() {
        this.powerUpsArr.forEach(powerUp => {
            powerUp.init()
        })
    },

    drawHUD() {
        this.ctx.font = '50px arial black'
        this.livesInstance = new Image()
        this.livesInstance.src = './img/lives.png'
        this.ctx.drawImage(this.livesInstance, 20, 15, 60, 55)
        this.ctx.drawImage(this.livesInstance, this.canvasSize.w - 80, 15, 60, 55)
        this.ctx.font = '50px arial black'
        this.ctx.fillText(`${this.player2.lives}`, this.canvasSize.w - 120, 60)
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(150, 15, 650, 55)
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(151, 16, 648 * this.player1.health / 100, 53)
        this.ctx.font = '50px arial black'
        this.ctx.fillText(`${this.player1.lives}`, 90, 60)
        this.ctx.font = '50px arial black'
        this.ctx.fillText(`${this.player2.lives}`, this.canvasSize.w - 120, 60)
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.canvasSize.w - 150, 15, -650, 55)
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.canvasSize.w - 151, 16, -648 * this.player2.health / 100, 53)
    },

    drawGameOver1() {
        console.log('player1wins')
        this.clearAll()
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)
        this.p1winsInstance = new Image()
        this.p1winsInstance.src = './img/startingImage.png'
        this.ctx.drawImage(this.p1winsInstance, this.canvasSize.w / 2, this.canvasSize.h / 2, 200, 200)
    },
    drawGameOver2() {
        console.log('player2wins')
        this.clearAll()
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)
        this.p2winsInstance = new Image()
        this.p2winsInstance.src = './img/startingImage.png'
        this.ctx.drawImage(this.p2winsInstance, this.canvasSize.w / 2, this.canvasSize.h, 200, 200)
    },

    collisions() {
        this.isCollision()
        this.powerUpsCollision()
    },

    powerUpsCollision() {
        this.powerUpsArr.forEach((pw, i) => {
            if (this.player1.playerPos.y + this.player1.playerSize.h > pw.powerUpPos.y &&
                this.player1.playerPos.y < pw.powerUpPos.y + pw.powerUpSize.h &&
                this.player1.playerPos.x + this.player1.playerSize.w > pw.powerUpPos.x &&
                this.player1.playerPos.x < pw.powerUpPos.x + pw.powerUpSize.w) {
                this.player1.strength *= 2
                this.powerUpsArr.splice(i, 1)
                setTimeout(() => {
                    this.player1.strength /= 2
                }, 5000)
            }

            if (this.player2.playerPos.y + this.player2.playerSize.h > pw.powerUpPos.y &&
                this.player2.playerPos.y < pw.powerUpPos.y + pw.powerUpSize.h &&
                this.player2.playerPos.x + this.player2.playerSize.w > pw.powerUpPos.x &&
                this.player2.playerPos.x < pw.powerUpPos.x + pw.powerUpSize.w) {
                this.player2.strength *= 2
                this.powerUpsArr.splice(i, 1)
                setTimeout(() => {
                    this.player2.strength /= 2
                }, 5000)
            }
        })
    },

    isCollision() {
        this.platforms.forEach(platform => {
            if (this.player1.playerPos.y + this.player1.playerSize.h + this.player1.playerVel.y >= platform.platformPos.y &&
                this.player1.playerPos.y + this.player1.playerSize.h <= platform.platformPos.y &&
                this.player1.playerPos.x <= platform.platformPos.x + platform.platformSize.w &&
                this.player1.playerPos.x + this.player1.playerSize.w >= platform.platformPos.x) {
                this.player1.playerVel.y = 0
            }
            if (this.player2.playerPos.y + this.player2.playerSize.h + this.player2.playerVel.y >= platform.platformPos.y &&
                this.player2.playerPos.y + this.player2.playerSize.h <= platform.platformPos.y &&
                this.player2.playerPos.x <= platform.platformPos.x + platform.platformSize.w &&
                this.player2.playerPos.x + this.player2.playerSize.w >= platform.platformPos.x) {
                this.player2.playerVel.y = 0
            }
        })
    },

    punchHitBox() {
        this.player1.punches.forEach(punch => {
            if (punch.punchPos.y + punch.punchSize.h > this.player2.playerPos.y &&
                punch.punchPos.y < this.player2.playerPos.y + this.player2.playerSize.h &&
                punch.punchPos.x + punch.punchSize.w > this.player2.playerPos.x &&
                punch.punchPos.x < this.player2.playerPos.x + this.player2.playerSize.w) {
                this.player2.health -= this.player1.strength
            }
        })
        this.player2.punches.forEach(punch => {
            if (punch.punchPos.y + punch.punchSize.h > this.player1.playerPos.y &&
                punch.punchPos.y < this.player1.playerPos.y + this.player1.playerSize.h &&
                punch.punchPos.x + punch.punchSize.w > this.player1.playerPos.x &&
                punch.punchPos.x < this.player1.playerPos.x + this.player1.playerSize.w) {
                this.player1.health -= this.player2.strength
            }
        })
    },

    loseHealth() {
        if (this.player1.lives === 0) {
            clearInterval(this.interval)
            this.drawGameOver2()
        }
        if (this.player2.lives === 0) {
            clearInterval(this.interval)
            this.drawGameOver1()
        }
        if (this.player1.health <= 0) {
            this.player1.lives -= 1
            this.player1.health = 100
            this.player1.playerPos.y = 200
            this.player1.playerPos.x = this.canvasSize.w * 0.3
        }
        if (this.player1.playerPos.y >= this.canvasSize.h * 2) {
            this.player1.lives -= 1
            this.player1.health = 100
            this.player1.playerPos.y = 200
            this.player1.playerPos.x = this.canvasSize.w * 0.3
        }

        if (this.player2.health <= 0) {
            this.player2.lives -= 1
            this.player2.health = 100
            this.player2.playerPos.y = 200
            this.player2.playerPos.x = this.canvasSize.w * 0.6
        }
        if (this.player2.playerPos.y >= this.canvasSize.h * 2) {
            this.player2.lives -= 1
            this.player2.health = 100
            this.player2.playerPos.y = 200
            this.player2.playerPos.x = this.canvasSize.w * 0.6
        }
    }
}