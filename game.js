class Game {
    constructor() {
        this.world = new GameWorld();
        this.update = function (mouse) {
            this.world.update(mouse);
        }
        this.draw = function (display) {
            this.world.draw(display);
        }
        this.onClick = function () {
            this.world.onClick();
        }


    }

}

function inicializaTerrenos(i_terrenos, j_terrenos) {
    let terrenos = [];
    for (let i = 0; i < i_terrenos; i++) {
        let x = [];
        for (let j = 0; j < j_terrenos; j++) {
            x.push(null);
        }
        terrenos.push(x);
    }
    // terrenos[1][1] = new Terra();
    // terrenos[1][2] = new Terra();
    return terrenos;
}

class GameWorld {
    constructor() {
        this.width = 1200;
        this.height = 600;

        this.offset_x = 0;
        this.offset_y = 0;
        this.offset_vel = 5;
    }

    setup() {
        this.fundoSuperior = new Object(0, 0, this.width, altura_ceu);
        this.bordaInferior = new Object(0, this.height - altura_area_inferior, this.width, altura_area_inferior);
        let meio_borda = this.bordaInferior.y + 0.5 * (this.bordaInferior.height) - 25;

        this.player = new Player();
        this.player.terrenos = inicializaTerrenos(this.player.ij_mapa.i, this.player.ij_mapa.j);
        // console.log(this.player.terrenos);

        this.buttons = [
            new Button("seta", 0.1 * this.bordaInferior.getRight(), meio_borda, 50, 50, actions.SETA),
            new Button("enxada", 0.15 * this.bordaInferior.getRight(), meio_borda, 50, 50, actions.ENXADA),
            new Button("desfaz", 0.2 * this.bordaInferior.getRight(), meio_borda, 50, 50, actions.DESFAZ),
            new Button("molhar", 0.25 * this.bordaInferior.getRight(), meio_borda, 50, 50, actions.AGUA),
            new Button("plantar", 0.3 * this.bordaInferior.getRight(), meio_borda, 50, 50, actions.PLANTAR),
            new Button("recolher", 0.35 * this.bordaInferior.getRight(), meio_borda, 50, 50, actions.RECOLHER),
            new Button("loja", 0.6 * this.bordaInferior.getRight(), meio_borda, 50, 50, actions.LOJA)
        ];


        this.dist_y_terrenos = altura_ceu + dist_bordas;
        this.dist_x_terrenos = dist_bordas;


    }

    onClick() {

        if (this.player.acao == actions.LOJA) {
            // Loja aberta
            // Nao quero interar pelos terrenos
        } else if (this.player.acao == actions.INVENTARIO) {
            // Inventario aberto
            // Nao quero interar pelos terrenos
        } else {
            // Nada Aberto
            // Quero interar pelos terrenos
            if (this.bordaInferior.collideObjectMouse(this.player.mouse)) {
                console.log("Cliquei no borda Inferior")
                for (let i = 0; i < this.buttons.length; i++) {
                    if (this.buttons[i].collideObjectMouse(this.player.mouse)) {
                        this.player.acao = this.buttons[i].getAcao();
                        console.log("Cliquei no Botao: " + this.player.acao)
                        return;
                    }
                }
            } else {
                console.log("Cliquei no Mapa")
                this.player.onClick();
            }
        }


    }

    draw(display) {

        display.drawRectangle(this.fundoSuperior.x + this.offset_x, this.fundoSuperior.y + this.offset_y, this.fundoSuperior.width, this.fundoSuperior.height);

        for (let i = 0; i < this.player.terrenos.length; i++) {
            for (let j = 0; j < this.player.terrenos[i].length; j++) {
                // console.log(i,j)
                let terra = this.player.terrenos[i][j];
                if (terra != null) {
                    display.drawRectangle(terra.x + this.offset_x, terra.y + this.offset_y, terra.width, terra.height, terra.color);
                }
                display.drawRect((j * tam_terreno.w) + this.dist_x_terrenos + this.offset_x, (i * tam_terreno.h) + this.dist_y_terrenos + this.offset_y, tam_terreno.w, tam_terreno.h, null, 1, cor.GREY);
            }
        }

        display.drawRectangle(this.bordaInferior.x, this.bordaInferior.y, this.bordaInferior.width, this.bordaInferior.height);

        for (let i = 0; i < this.buttons.length; i++) {
            display.drawRectangle(this.buttons[i].x, this.buttons[i].y, this.buttons[i].width, this.buttons[i].height, this.buttons[i].color);
        }

        let i = this.player.mouse.i;
        let j = this.player.mouse.j;

        if (!this.bordaInferior.collideObjectMouse(this.player.mouse)) {
            //Clicou em um terreno valido!

            this.player.draw(display);
            if (this.player.acao != actions.SETA && this.player.isDentroTerreno()) {
                let terreno_marcacao = {
                    x: j * tam_terreno.w,
                    y: i * tam_terreno.h
                }
                let cor = "#0000ff"
                if (this.player.acao == actions.ENXADA) {
                    if (this.player.terrenos[i][j] == null) { cor = "#00ff00" } else { cor = "#ff0000" }
                }else{
                    if (this.player.terrenos[i][j] != null) { cor = "#00ff00" } else { cor = "#ff0000" }
                }
                display.drawRect(terreno_marcacao.x + this.dist_x_terrenos + this.offset_x, terreno_marcacao.y + this.dist_y_terrenos + this.offset_y, tam_terreno.w, tam_terreno.h, null, 2, cor);
            }
        }

    }

    update(mouse_position) {
        this.player.mouse = mouse_position;

        this.player.mouse.j = Math.floor((this.player.mouse.x - this.dist_x_terrenos - this.offset_x) / tam_terreno.w);
        this.player.mouse.i = Math.floor((this.player.mouse.y - this.dist_y_terrenos - this.offset_y) / tam_terreno.h);
        //console.log(player.mouse.x, player.mouse.y)
        // console.log(this.offset_x, this.offset_y)
        if (this.player.mouse.y > this.height && this.offset_y > this.height - (this.player.ij_mapa.i * tam_terreno.h) - altura_ceu - (2 * dist_bordas) - this.bordaInferior.height) {
            this.offset_y -= this.offset_vel
        } else if (this.player.mouse.y < 0 && this.offset_y < 0) {
            this.offset_y += this.offset_vel
        }
        // console.log(this.width - (this.ij_mapa.j * tam_terreno.w) - (2 * dist_bordas))
        if (this.player.mouse.x > this.width && this.offset_x > this.width - (this.player.ij_mapa.j * tam_terreno.w) - (2 * dist_bordas)) {
            this.offset_x -= this.offset_vel
        } else if (this.player.mouse.x < 0 && this.offset_x < 0) {
            this.offset_x += this.offset_vel
        }

    }
}

class ObjetoDoTerreno extends Object {
    constructor(i, j) {
        super((j * tam_terreno.w) + dist_bordas, (i * tam_terreno.h) + altura_ceu + dist_bordas, tam_terreno.w, tam_terreno.h)
        this.i = i;
        this.j = j;

    }
}

class Terra extends ObjetoDoTerreno {
    constructor(i, j) {
        super(i, j)
        this.color = "#654321";
    }

    molhar() {
        this.color = "#652143"
    }

    plantar() {
        this.color = "#00ff00"
    }

    recolher() {
        this.color = "#000000"
    }
}

