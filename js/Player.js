class Player {
    constructor(ctx, canvasSize, mainPlatformPos, mainPlatformSize, playerPosX, jumpKey, rightKey, leftKey, punchKey) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerSize = {
            w: 100,
            h: 130
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
            punch: punchKey
        }
        this.canRight = false
        this.canLeft = false
        this.playerVel = { x: 5, y: 0 }
        this.gravity = 0.4
        this.canJump = false
        this.punch = undefined
        this.canPunch = true
    }
    init() {
        this.setListeners()
        this.createPunch()
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
                this.punch.init()
                this.canPunch = false
            }
            if (code === this.keys.right) this.canRight = true
            if (code === this.keys.left) this.canLeft = true
            if (code === this.keys.jump) {
                if (this.playerVel.y === 0) this.canJump = true
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
    }
    jump() {
        if (this.canJump) {
            this.playerVel.y -= 15
            this.canJump = false
        }
    }
    moveY() {
        this.playerPos.y += this.playerVel.y

        if (this.playerPos.y >= this.canvasSize.h * 2.5) {
            this.playerPos.y = 200
            this.playerPos.x = this.canvasSize.w * 0.3
        }

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
        this.punch = new Punch(this.ctx, this.canvasSize, this.playerPos, this.playerSize, this.canRight, this.canLeft)
    }
}