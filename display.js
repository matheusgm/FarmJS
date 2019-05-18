class Display {
    constructor(canvas) {
        this.buffer = document.createElement("canvas").getContext("2d");
        this.context = canvas.getContext("2d");
        this.renderColor = function (color) {
            this.buffer.fillStyle = color;
            this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
        };

        this.resize = function (width, height) {
            this.context.canvas.height = height;
            this.context.canvas.width = width;
            this.render();
        };
        this.resize_automatic = function (event) {
            var height, width;
            height = document.documentElement.clientHeight;
            width = document.documentElement.clientWidth;
            this.context.canvas.height = height - 32;
            this.context.canvas.width = width - 32;
            this.buffer.canvas.width = width;
            this.buffer.canvas.height = height;

            this.render();
        };
        this.handleResize = (event) => { this.resize_automatic(event); };
    }
    render() {
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
    }

    drawObject(image, source_x, source_y, destination_x, destination_y, width, height) {
        this.buffer.drawImage(image, source_x, source_y, width, height, Math.round(destination_x), Math.round(destination_y), width, height);
    }

    drawRectangle(x, y, width, height, color = "#ff0000") {

        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);

    };

    drawRect(x, y, w, h, color, stroke_w, stroke_color = "#000000") {
        this.buffer.beginPath();
        if (color != null) {
            this.buffer.fillStyle = color;
        }
        this.buffer.rect(x, y, w, h);
        if (stroke_w != undefined) {
            this.buffer.lineWidth = stroke_w;
            if (stroke_color != undefined) {
                this.buffer.strokeStyle = stroke_color;
            }
            this.buffer.stroke();
        }
    }
}