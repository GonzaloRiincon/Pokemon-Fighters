class Platform {
    constructor(ctx, canvasSize, platformPosX, platformSizeW, movement) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.platformInstance = undefined
        this.platformSize = { w: platformSizeW, h: 25 }
        this.platformPos = { x: platformPosX, y: this.canvasSize.h * 0.5 }
        this.platformSpeed = { x: 1, y: 0 }
        this.movement = movement
    }

    init() {
        this.createPlatform()
        this.drawPlatform()
        this.moveP0()
        this.moveP1()
        this.moveP2()
    }
    createPlatform() {
        this.platformInstance = new Image()
        this.platformInstance.src = './img/platforms.png'
    }

    drawPlatform() {
        this.ctx.drawImage(this.platformInstance, this.platformPos.x, this.platformPos.y, this.platformSize.w, this.platformSize.h)
        // this.ctx.fillStyle = 'black'
        // this.ctx.fillRect(this.platformPos.x, this.platformPos.y, this.platformSize.w, this.platformSize.h)

    }

    moveP1() {
        if (this.movement = 1) {
            if (this.platformPos.x > this.canvasSize.w * 0.05 && this.platformPos.x < this.canvasSize.w * 0.25) {
                this.platformPos.x -= this.platformSpeed.x
            }
            if (this.platformPos.x === this.canvasSize.w * 0.05 || this.platformPos.x === this.canvasSize.w * 0.25) {
                this.platformSpeed.x *= -1
                this.platformPos.x -= this.platformSpeed.x
            }
        }
    }

    moveP2() {
        if (this.movement = 2) {
            if (this.platformPos.x > this.canvasSize.w * 0.55 && this.platformPos.x < this.canvasSize.w * 0.75) {
                this.platformPos.x -= this.platformSpeed.x
            }
            if (this.platformPos.x === this.canvasSize.w * 0.55 || this.platformPos.x === this.canvasSize.w * 0.75) {
                this.platformSpeed.x *= -1
                this.platformPos.x -= this.platformSpeed.x
            }
        }
    }

    moveP0() {
        if (this.movement = 0) {
            this.platformSpeed.x = 0
        }
    }
}