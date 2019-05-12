class Button extends Object {
    constructor(nome, x, y, w, h, type, img = null) {
        super(x, y, w, h)
        this.nome = nome;
        this.ativado = false;
        this.img = img;
        this.type = type;
        this.hit = false;
    }

    isAtivado() { return this.ativado; }

    setAtivado(ativado) { this.ativado = ativado; }

    color() { if (this.isAtivado()) { return "#00ffff" } else { return "#ff00ff" } }

    changeStatus() {
        this.setAtivado(!this.isAtivado());
    }

}