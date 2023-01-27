class Platform {
    constructor(ctx, canvasSize, platformPosX, platformPosY, platformSizeW, platformSizeH) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.platformSize = {
            w: platformSizeW,
            h: platformSizeH,
        }
        this.platformPos = {
            x: platformPosX,
            y: platformPosY,

        }
        this.init()
    }

    init() {
        this.drawPlatform()

    }
    drawPlatform() {
        this.ctx.fillRect(this.platformPos.x, this.platformPos.y, this.platformSize.w, this.platformSize.h)
    }
}