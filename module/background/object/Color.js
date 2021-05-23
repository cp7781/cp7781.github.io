export class Color {

    constructor(red, green, blue, alpha) {
        this._red = red
        this._green = green
        this._blue = blue
        this._alpha = alpha
        this.limit = {
            red: {
                minimum: 0,
                maximum: 255
            },
            green: {
                minimum: 0,
                maximum: 255
            },
            blue: {
                minimum: 0,
                maximum: 255
            }
        }
    }

    get rgba() {
        return `rgba(${Math.round(this._red)}, ${Math.round(this._green)}, ${Math.round(this._blue)}, ${this._alpha})`
    }

    set red(red) {
        if (red < this.limit.red.minimum) {
            red = this.limit.red.minimum
        } else if (red > this.limit.red.maximum) {
            red = this.limit.red.maximum
        }
        this._red = red
    }

    get red() {
        return this._red
    }

    set green(green) {
        if (green < this.limit.green.minimum) {
            green = this.limit.green.minimum
        } else if (green > this.limit.green.maximum) {
            green = this.limit.green.maximum
        }
        this._green = green
    }

    get green() {
        return this._green
    }

    set blue(blue) {
        if (blue < this.limit.blue.minimum) {
            blue = this.limit.blue.minimum
        } else if (blue > this.limit.blue.maximum) {
            blue = this.limit.blue.maximum
        }
        this._blue = blue
    }

    get blue() {
        return this._blue
    }

    set alpha(alpha) {
        if (alpha < 0) {
            alpha = 0
        } else if (alpha > 1) {
            alpha = 1
        }
        this._alpha = alpha
    }

    get alpha() {
        return this._alpha
    }

}
