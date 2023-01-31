class Player {
    constructor(ctx, canvasSize, frames, framesCounter, mainPlatformPos, mainPlatformSize, playerPosX, jumpKey, rightKey, leftKey, downKey, punchKey, whichPlayer) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.frames = frames
        this.framesCounter = framesCounter
        this.playerSize = {
            w: 90,
            h: 110
        }
        this.mainPlatformPos = mainPlatformPos
        this.mainPlatformSize = mainPlatformSize
        this.playerPos = {
            x: playerPosX,
            y: mainPlatformPos.y - this.playerSize.h,
        }
        this.keys = {
            jump: jumpKey,
            right: rightKey,
            left: leftKey,
            down: downKey,
            punch: punchKey
        }
        this.canRight = false
        this.canLeft = false
        this.canJump = false
        this.canDown = false
        this.playerVel = { x: 5, y: 0 }
        this.gravity = 0.5
        this.whichPlayer = whichPlayer
        this.punches = []
        this.canPunch = true
        this.health = 100
        this.lives = 3
        this.strength = 10
    }
    init() {
        this.setListeners()
        this.drawPlayer()
    }

    drawPlayer() {
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
        this.move()
    }

    setListeners() {
        document.addEventListener('keydown', ({ code }) => {
            if (code === this.keys.punch && this.canPunch) {
                this.createPunch()
                this.clearPunches()
                this.canPunch = false
            }
            if (code === this.keys.right) this.canRight = true
            if (code === this.keys.left) this.canLeft = true
            if (code === this.keys.jump) {
                if (this.playerVel.y === 0) this.canJump = true
            }
            if (code === this.keys.down) {
                if (this.playerVel.y === 0 && (this.playerPos.y + this.playerSize.h <= this.canvasSize.h * 0.5)) {
                    this.canDown = true
                }
            }
        })
        document.addEventListener('keyup', ({ code }) => {
            if (code === this.keys.right) this.canRight = false
            if (code === this.keys.left) this.canLeft = false
        })
    }

    move() {
        this.canRight === true ? this.playerPos.x += this.playerVel.x : this.playerPos.x
        this.canLeft === true ? this.playerPos.x -= this.playerVel.x : this.playerPos.x
        this.moveY()
        this.jump()
        this.down()
    }
    jump() {
        if (this.canJump) {
            this.playerVel.y -= 16
            this.canJump = false
        }
    }

    down() {
        if (this.canDown) {
            this.playerPos.y += this.playerVel.y
            this.playerVel.y += 3
            this.canDown = false
        }
    }

    moveY() {
        this.playerPos.y += this.playerVel.y


        if (this.playerPos.y + this.playerSize.h < this.mainPlatformPos.y) {
            this.playerVel.y += this.gravity
        } else {
            this.playerVel.y = 5
        }
        if (this.playerPos.y + this.playerSize.h + this.playerVel.y >= this.mainPlatformPos.y &&
            this.playerPos.y + this.playerSize.h <= this.mainPlatformPos.y &&
            this.playerPos.x <= this.mainPlatformPos.x + this.mainPlatformSize.w &&
            this.playerPos.x + this.playerSize.w >= this.mainPlatformPos.x) {
            this.playerVel.y = 0
        }
    }

    createPunch() {
        this.punches.push(new Punch(this.ctx, this.canvasSize, this.playerPos, this.playerSize, this.canRight, this.canLeft, this.whichPlayer))
        this.punches[0].init()
    }

    clearPunches() {
        setTimeout(() => {
            this.punches.pop()
        }, 1000 / this.frames)
    }
}