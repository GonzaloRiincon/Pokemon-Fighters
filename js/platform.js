class Platform {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.platformSize = {
            w: this.canvasSize.w,
            h: this.canvasSize.h,
        }
    }

}