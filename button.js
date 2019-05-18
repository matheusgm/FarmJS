class Button extends Object {
    constructor(nome, x, y, w, h, acao, img = null) {
        super(x, y, w, h)
        this.nome = nome;
        this.acao = acao;
        this.img = img;
        this.color = "#ff00ff";
    }

    getAcao() {
        return this.acao;
    }


}