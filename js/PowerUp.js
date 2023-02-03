class PowerUp {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.powerUpInstance = undefined
        this.powerUpSize = {
            w: 70,
            h: 70
        }
        this.powerUpPos = {
            x: Math.random() * ((this.canvasSize.w - 150) - 150) + 150,
            y: Math.random() * (this.canvasSize.h / 2 - 150) + 150
        }
    }

    init() {
        this.createPowerUp()
        this.drawPowerUp()
    }
    createPowerUp() {
        this.powerUpInstance = new Image()
        this.powerUpInstance.src = './img/powerUp.png'
    }
    drawPowerUp() {
        this.ctx.drawImage(this.powerUpInstance, this.powerUpPos.x, this.powerUpPos.y, this.powerUpSize.w, this.powerUpSize.h)
    }

}