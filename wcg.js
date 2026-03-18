const WCG = class {

    /**
     * Create a new Graphics instance
     * 
     * WHAT TO PASS:
     * - HTMLCanvasElement (canvas itself)
     * - OR string selector like "canvas" or "#myCanvas"
     * 
     * WHAT IT DOES:
     * - Finds the canvas
     * - Creates 2D drawing context
     */
    constructor() {

        // Convert selector string to actual canvas element
        this.canvas = document.querySelector('canvas.wcg')

        if (!this.canvas) {
            throw new Error("Canvas not found");
        }

        /**
         * Canvas 2D context (used for all drawing operations)
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = this.canvas.getContext("2d");

        /**
         * Current fill color
         * Used when drawing filled shapes
         * @type {string}
         */
        this._fillStyle = "#000";

        /**
         * Current stroke color (outline color)
         * @type {string}
         */
        this._strokeStyle = "#000";

        /**
         * Line thickness for stroke
         * @type {number}
         */
        this._lineWidth = 1;
    }

    /**
     * set canvas size :-
        *width
        *height 
     * @param {Number} width 
     * @param {Number} height 
     */
    setSize(width,height){

        /**
         * @type {Number}
         */
        this.canvas.width = width;

        /**
         * @type {Number}
         */
        this.canvas.height = height;

    }
    /* =========================
       BASIC CONTROL
    ========================= */

    /**
     * Clear the entire canvas
     * 
     * WHAT IT DOES:
     * - Removes all drawings from canvas
     * 
     * RETURNS:
     * - this (for chaining)
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return this;
    }

    /**
     * Fill the entire canvas with a color
     * @param {string} color - any valid CSS color
     * 
     * EXAMPLE:
     * g.background("black")
     */
    background(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        return this;
    }

    /* =========================
       STYLE METHODS
    ========================= */

    /**
     * Set fill color for shapes
     * @param {string} color - CSS color
     * 
     * EFFECT:
     * - Next shapes will be filled with this color
     */
    fill(color) {
        this._fillStyle = color;
        return this;
    }

    /**
     * Set stroke (outline)
     * @param {string} color - outline color
     * @param {number} width - line thickness
     * 
     * EFFECT:
     * - Used in lines and shape borders
     */
    stroke(color, width = 1) {
        this._strokeStyle = color;
        this._lineWidth = width;
        return this;
    }

    /* =========================
       SHAPES
    ========================= */

    /**
     * Draw rectangle
     * @param {number} x - start position (horizontal)
     * @param {number} y - start position (vertical)
     * @param {number} w - width of rectangle
     * @param {number} h - height of rectangle
     * 
     * OUTPUT:
     * - draws rectangle on canvas
     */
    rect(x, y, w, h) {

        const ctx = this.ctx;

        ctx.beginPath();
        ctx.rect(x, y, w, h);

        // Fill shape if fill is set
        if (this._fillStyle) {
            ctx.fillStyle = this._fillStyle;
            ctx.fill();
        }

        // Draw border if stroke is set
        if (this._strokeStyle) {
            ctx.strokeStyle = this._strokeStyle;
            ctx.lineWidth = this._lineWidth;
            ctx.stroke();
        }

        return this;
    }

    /**
     * Draw circle
     * @param {number} x - center X
     * @param {number} y - center Y
     * @param {number} r - radius
     */
    circle(x, y, r) {

        const ctx = this.ctx;

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);

        if (this._fillStyle) {
            ctx.fillStyle = this._fillStyle;
            ctx.fill();
        }

        if (this._strokeStyle) {
            ctx.strokeStyle = this._strokeStyle;
            ctx.lineWidth = this._lineWidth;
            ctx.stroke();
        }

        return this;
    }

    /**
     * Draw line between two points
     * @param {number} x1 - start X
     * @param {number} y1 - start Y
     * @param {number} x2 - end X
     * @param {number} y2 - end Y
     */
    line(x1, y1, x2, y2) {

        const ctx = this.ctx;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        ctx.strokeStyle = this._strokeStyle;
        ctx.lineWidth = this._lineWidth;
        ctx.stroke();

        return this;
    }

    /* =========================
       TRANSFORMS
    ========================= */

    /**
     * Save current transform state
     * 
     * IMPORTANT:
     * - Use before translate/rotate/scale
     */
    save() {
        this.ctx.save();
        return this;
    }

    /**
     * Restore previous transform state
     */
    restore() {
        this.ctx.restore();
        return this;
    }

    /**
     * Move drawing origin
     * @param {number} x 
     * @param {number} y 
     */
    translate(x, y) {
        this.ctx.translate(x, y);
        return this;
    }

    /**
     * Rotate canvas
     * @param {number} angle - in radians
     */
    rotate(angle) {
        this.ctx.rotate(angle);
        return this;
    }

    /**
     * Scale drawing
     * @param {number} x 
     * @param {number} y 
     */
    scale(x, y) {
        this.ctx.scale(x, y);
        return this;
    }

    /* =========================
       TEXT
    ========================= */

    /**
     * Draw text on canvas
     * @param {string} txt - text to display
     * @param {number} x - position X
     * @param {number} y - position Y
     * @param {number} size - font size
     * @param {string} font - font family
     */
    text(txt, x, y, size = 16, font = "Arial") {

        this.ctx.fillStyle = this._fillStyle;
        this.ctx.font = `${size}px ${font}`;
        this.ctx.fillText(txt, x, y);

        return this;
    }
}