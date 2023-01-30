class MainPlatform {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.platformSize = {
            w: this.canvasSize.w - (this.canvasSize.w * 2 / 5),
            h: this.canvasSize.h - (this.canvasSize.h - this.canvasSize.h * 0.5),
        }
        this.platformPos = {
            x: this.canvasSize.w * 0.2,
            y: this.canvasSize.h * 0.7,
        }
    }

    init() {
        this.drawPlatform()

    }
    drawPlatform() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.platformPos.x, this.platformPos.y, this.platformSize.w, this.platformSize.h)
    }
}