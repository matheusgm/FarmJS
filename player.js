class Player {
    constructor() {
        this.terrenos = []
        this.acao = actions.SETA;
        this.mouse = {
            i: 0,
            j: 0,
            x: 0,
            y: 0
        }
        this.ij_mapa = {
            i: 10,
            j: 16
        }
    }

    isDentroTerreno() {
        return this.mouse.i >= 0 && this.mouse.j >= 0 && this.mouse.i < this.ij_mapa.i && this.mouse.j < this.ij_mapa.j
    }

    onClick() {
        let i = this.mouse.i;
        let j = this.mouse.j;

        if (this.isDentroTerreno()) {
            //Clicou em um terreno valido!
            if (this.acao == actions.SETA) {
                this.analisarTerreno(i, j);
            } else if (this.acao == actions.ENXADA) {
                this.addTerreno(new Terra(i, j));
            } else if (this.acao == actions.DESFAZ) {
                this.removeTerreno(i, j);
            } else if (this.acao == actions.AGUA) {
                this.molharTerreno(i, j);
            } else if (this.acao == actions.PLANTAR) {
                this.plantarSemente(i, j);
            } else if (this.acao == actions.RECOLHER) {
                this.recolherPlantacao(i, j);
            }
        }
    }

    draw(display) {
        // console.log(terreno_marcacao, this.offset_x, this.offset_y)
        if (this.acao == actions.SETA) {

        } else if (this.acao == actions.ENXADA) {
            display.drawRectangle(this.mouse.x - (tam_terreno.w / 2), this.mouse.y - (tam_terreno.h / 2), tam_terreno.w, tam_terreno.h, cor.YELLOW);
        } else if (this.acao == actions.DESFAZ) {

        } else if (this.acao == actions.AGUA) {

        } else if (this.acao == actions.PLANTAR) {

        } else if (this.acao == actions.RECOLHER) {

        }

    }

    update() {

    }

    addTerreno(novo_terreno) {
        let i = novo_terreno.i;
        let j = novo_terreno.j;
        let terreno = this.terrenos[i][j];
        if (terreno == null) {
            this.terrenos[i][j] = novo_terreno;
            console.log("Terreno novo adicionado!");
        } else {
            console.log("Terreno já existe!");
        }

    }

    removeTerreno(i, j) {
        let terreno = this.terrenos[i][j];
        if (terreno != null) {
            this.terrenos[i][j] = null;
            console.log("Terreno [" + i + "][" + j + "] removido!");
        } else {
            console.log("Nao existe terreno para Remover!")
        }

    }

    analisarTerreno(i, j) {
        let terreno = this.terrenos[i][j];
        if (terreno != null) {
            console.log("Analisando o terreno: [" + i + "][" + j + "]");
            console.log(terreno)
        } else {
            console.log("Nao existe terreno para Analisar!")
        }

    }

    molharTerreno(i, j) {
        let terreno = this.terrenos[i][j];
        if (terreno != null) {
            terreno.molhar();
        } else {
            console.log("Nao existe terreno para Molhar!")
        }

    }

    plantarSemente(i, j) {
        let terreno = this.terrenos[i][j];
        if (terreno != null) {
            terreno.plantar();
        } else {
            console.log("Nao existe terreno para Plantar!")
        }

    }

    recolherPlantacao(i, j) {
        let terreno = this.terrenos[i][j];
        if (terreno != null) {
            terreno.recolher();
        } else {
            console.log("Nao existe terreno para Recolher!")
        }

    }
}