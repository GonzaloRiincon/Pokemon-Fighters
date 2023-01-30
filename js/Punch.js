class Punch {
    constructor(ctx, canvasSize, playerPos, playerSize, canRight, canLeft) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerPos = playerPos
        this.playerSize = playerSize
        this.canRight = canRight
        this.canLeft = canLeft
        this.punchSize = {
            w: 70,
            h: 100
        }
        this.punchPos = {
            x: undefined,
            y: undefined
        }
    }
    init() {
        this.drawPunch()
    }
    drawPunch() {
        if (this.canLeft) {
            this.punchPos.x = this.playerPos.x - this.punchSize.w
            this.punchPos.y = this.playerPos.y - 20
            this.ctx.fillRect(this.punchPos.x, this.punchPos.y, this.punchSize.w, this.punchSize.h)
        }
        if (this.canRight) {
            this.punchPos.x = this.playerPos.x + this.punchSize.w
            this.punchPos.y = this.playerPos.y - 20
            this.ctx.fillRect(this.punchPos.x, this.punchPos.y, this.punchSize.w, this.punchSize.h)
        }
        if (!this.canLeft && !this.canRight) {
            this.punchPos.x = this.playerPos.x + this.playerSize.w
            this.punchPos.y = this.playerPos.y - 20
            this.ctx.fillRect(this.punchPos.x, this.punchPos.y, this.punchSize.w, this.punchSize.h)
        }
    }
}