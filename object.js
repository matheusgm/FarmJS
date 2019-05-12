
class Object {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    collideObjectMouse(mouse) {

        if (this.getRight() < mouse.x ||
            this.getBottom() < mouse.y ||
            this.getLeft() > mouse.x ||
            this.getTop() > mouse.y) return false;

        return true;

    }

    collideObject(object) {

        if (this.getRight() < object.getLeft() ||
            this.getBottom() < object.getTop() ||
            this.getLeft() > object.getRight() ||
            this.getTop() > object.getBottom()) return false;

        return true;

    }
    collideObjectCenter(object) {

        let center_x = object.getCenterX();
        let center_y = object.getCenterY();

        if (center_x < this.getLeft() || center_x > this.getRight() ||
            center_y < this.getTop() || center_y > this.getBottom()) return false;

        return true;

    }

    getBottom() { return this.y + this.height; }
    getCenterX() { return this.x + this.width * 0.5; }
    getCenterY() { return this.y + this.height * 0.5; }
    getLeft() { return this.x; }
    getRight() { return this.x + this.width; }
    getTop() { return this.y; }
    setBottom(y) { this.y = y - this.height; }
    setCenterX(x) { this.x = x - this.width * 0.5; }
    setCenterY(y) { this.y = y - this.height * 0.5; }
    setLeft(x) { this.x = x; }
    setRight(x) { this.x = x - this.width; }
    setTop(y) { this.y = y; }
}