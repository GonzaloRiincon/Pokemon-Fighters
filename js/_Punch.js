class Punch {
    constructor(ctx, canvasSize, playerPos, playerSize, canRight, canLeft, whichPlayer) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.whichPlayer = whichPlayer
        this.playerPos = playerPos
        this.playerSize = playerSize
        this.canRight = canRight
        this.canLeft = canLeft
        this.punchInstance = undefined
        this.punchSize = {
            w: 70,
            h: 100
        }
        this.punchPos = {
            x: this.playerPos.x - this.punchSize.w,
            y: this.playerPos.y - 20
        }
    }
    init() {
        this.createPunchEffect()
        this.drawPunch()
    }
    createPunchEffect() {
        this.punchInstance = new Image()
        this.punchInstance.src = './img/punchEffect.png'
    }

    drawPunch() {
        if (this.canLeft) {
            this.punchPos.x = this.playerPos.x - this.punchSize.w
            this.punchPos.y = this.playerPos.y - 20
            // this.ctx.drawImage(this.punchInstance, this.punchPos.x, this.punchPos.y, this.punchSize.w, this.punchSize.h)
            this.ctx.fillStyle = "rgba(255, 255, 255, 0)"
            this.ctx.fillRect(this.punchPos.x, this.punchPos.y, this.punchSize.w, this.punchSize.h)
        }
        if (this.canRight) {
            this.punchPos.x = this.playerPos.x + this.punchSize.w
            this.punchPos.y = this.playerPos.y - 20
            // this.ctx.drawImage(this.punchInstance, this.punchPos.x, this.punchPos.y, this.punchSize.w, this.punchSize.h)
            this.ctx.fillStyle = "rgba(255, 255, 255, 0)"
            this.ctx.fillRect(this.punchPos.x, this.punchPos.y, this.punchSize.w, this.punchSize.h)
        }
        if (!this.canLeft && !this.canRight) {
            if (this.whichPlayer === 1) {
                this.punchPos.x = this.playerPos.x + this.playerSize.w
                this.punchPos.y = this.playerPos.y - 20
                // this.ctx.drawImage(this.punchInstance, this.punchPos.x, this.punchPos.y, this.punchSize.w, this.punchSize.h)
                this.ctx.fillStyle = "rgba(255, 255, 255, 0)"
                this.ctx.fillRect(this.punchPos.x, this.punchPos.y, this.punchSize.w, this.punchSize.h)
            }
            if (this.whichPlayer === 2) {
                this.punchPos.x = this.playerPos.x - this.punchSize.w
                this.punchPos.y = this.playerPos.y - 20
                // this.ctx.drawImage(this.punchInstance, this.punchPos.x, this.punchPos.y, this.punchSize.w, this.punchSize.h)
                this.ctx.fillStyle = "rgba(255, 255, 255, 0)"
                this.ctx.fillRect(this.punchPos.x, this.punchPos.y, this.punchSize.w, this.punchSize.h)
            }
        }
    }
}