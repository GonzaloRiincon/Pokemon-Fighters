class MainPlatform {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.platformSize = {
            w: this.canvasSize.w * 0.7,
            h: this.canvasSize.h - (this.canvasSize.h - this.canvasSize.h * 0.5),
        }
        this.platformPos = {
            x: this.canvasSize.w * 0.15,
            y: this.canvasSize.h * 0.72,
        }
    }

    init() {
        this.drawPlatform()

    }
    drawPlatform() {
        this.ctx.fillStyle = "rgba(255, 255, 255, 0)"
        this.ctx.fillRect(this.platformPos.x, this.platformPos.y, this.platformSize.w, this.platformSize.h)
    }
}