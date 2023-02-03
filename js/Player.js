class Player {
    constructor(ctx, canvasSize, frames, framesCounter, mainPlatformPos, mainPlatformSize, playerPosX, jumpKey, rightKey, leftKey, downKey, punchKey, whichPlayer, runningRight, runningLeft, noMove, hit, hitLeft) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.frames = frames
        this.framesCounter = framesCounter
        this.playerSize = {
            w: 140,
            h: 120
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

        this.noMoveInstance = new Image()
        this.noMoveInstance.src = noMove
        if (this.whichPlayer === 2) this.noMoveInstance.frames = 12
        if (this.whichPlayer === 1) this.noMoveInstance.frames = 18

        this.noMoveInstance.framesIndex = 0

        this.runningInstance = new Image()
        this.runningInstance.src = runningRight
        this.runningInstance.frames = 12
        this.runningInstance.framesIndex = 0

        this.runningLeftInstance = new Image()
        this.runningLeftInstance.src = runningLeft
        this.runningLeftInstance.frames = 12
        this.runningLeftInstance.framesIndex = 0

        this.hitInstance = new Image()
        this.hitInstance.src = hit
        this.hitSound = undefined,

            this.hitLeftInstance = new Image()
        this.hitLeftInstance.src = hitLeft
    }
    init(framesCounter) {
        this.setListeners()
        this.drawPlayer(framesCounter)
    }

    drawPlayer(framesCounter) {
        if (!this.canRight && !this.canLeft) {
            this.ctx.drawImage(
                this.noMoveInstance,
                this.noMoveInstance.width / this.noMoveInstance.frames * this.noMoveInstance.framesIndex,
                0,
                this.noMoveInstance.width / this.noMoveInstance.frames,
                this.noMoveInstance.height,
                this.playerPos.x,
                this.playerPos.y,
                this.playerSize.w,
                this.playerSize.h
            )
            this.animate(framesCounter)
        }
        if (this.canRight) {
            this.ctx.drawImage(
                this.runningInstance,
                this.runningInstance.width / this.runningInstance.frames * this.runningInstance.framesIndex,
                0,
                this.runningInstance.width / this.runningInstance.frames,
                this.runningInstance.height,
                this.playerPos.x,
                this.playerPos.y,
                this.playerSize.w,
                this.playerSize.h
            )

            this.animate(framesCounter)
        }
        if (this.canLeft) {
            this.ctx.drawImage(
                this.runningLeftInstance,
                this.runningLeftInstance.width / this.runningLeftInstance.frames * this.runningLeftInstance.framesIndex,
                0,
                this.runningLeftInstance.width / this.runningLeftInstance.frames,
                this.runningLeftInstance.height,
                this.playerPos.x,
                this.playerPos.y,
                this.playerSize.w,
                this.playerSize.h
            )

            this.animate(framesCounter)
        }
        this.move()
    }

    animate(framesCounter) {

        if (framesCounter % 8 == 0) {
            this.runningInstance.framesIndex++;
            this.runningLeftInstance.framesIndex++;
            this.noMoveInstance.framesIndex++
        }

        if (this.runningInstance.framesIndex >= this.runningInstance.frames) {
            this.runningInstance.framesIndex = 0
        }
        if (this.runningLeftInstance.framesIndex >= this.runningLeftInstance.frames) {
            this.runningLeftInstance.framesIndex = 0
        }
        if (this.noMoveInstance.framesIndex >= this.noMoveInstance.frames) {
            this.noMoveInstance.framesIndex = 0
        }


    }


    setListeners() {
        document.addEventListener('keydown', ({ code }) => {
            if (code === this.keys.punch && this.canPunch) {
                this.createPunch()
                if (this.canRight) {
                    this.ctx.drawImage(this.hitInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
                }
                if (this.canLeft) {
                    this.ctx.drawImage(this.hitLeftInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
                }
                if (this.whichPlayer === 1) {
                    if (!this.canRight && !this.canLeft) {
                        this.ctx.drawImage(this.hitInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
                    }
                }
                if (this.whichPlayer === 2) {
                    if (!this.canRight && !this.canLeft) {
                        this.ctx.drawImage(this.hitLeftInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
                    }
                }

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
        this.hitSound = new Audio()
        this.hitSound.src = './audio/hitSound.mp3'
        this.hitSound.play()

    }

    clearPunches() {
        setTimeout(() => {
            this.punches.pop()
        }, 1000 / this.frames)
    }
}