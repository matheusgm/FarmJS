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

class GameWorld {
    constructor() {
        this.width = 1200;
        this.height = 600;
        this.button_ativo = null;
        this.mouse_position = {};
    }

    setup() {
        this.bordaInferior = new Object(0, this.height - 119, this.width, 119);
        let meio_borda = this.bordaInferior.y + 0.5 * (this.bordaInferior.height) - 25;
        this.buttons = [new Button("enxada", 0.7 * this.bordaInferior.getRight(), meio_borda, 50, 50, "fast", new Terra(-100, -100)),
        new Button("desfaz", 0.8 * this.bordaInferior.getRight(), meio_borda, 50, 50, "fast", new Object(-100, -100, 80, 60)),
        new Button("loja", 0.9 * this.bordaInferior.getRight(), meio_borda, 50, 50, "slow")
        ];
        this.terras = [new Terra(80, 60), new Terra(160, 60), new Terra(80, 120), new Terra(160, 120)];

    }

    onClick() {
        for (let i = 0; i < this.buttons.length; i++) {
            if (this.buttons[i].collideObjectMouse(this.mouse_position)) {
                if (!this.buttons[i].isAtivado()) {
                    if (this.button_ativo != null) {
                        this.button_ativo.setAtivado(false);
                    }
                    if (this.buttons[i].type == "fast") {
                        this.buttons[i].setAtivado(true);
                        this.button_ativo = this.buttons[i];
                    } else {
                        this.button_ativo = null;
                    }
                } else {
                    this.button_ativo = null;
                    this.buttons[i].setAtivado(false);
                }
                return;
            }
        }
        //console.log(this.button_ativo)
        if (this.button_ativo != null) {
            let indice = -1;
            for (let i = 0; i < this.terras.length; i++) {
                if (this.terras[i].x == this.button_ativo.img.x && this.terras[i].y == this.button_ativo.img.y) {
                    indice = i;
                    break;
                }
            }
            // console.log(this.button_ativo.nome, indice)
            if (this.button_ativo.nome == "enxada" && indice == -1 && !this.button_ativo.hit) {
                this.terras.push(new Terra(this.button_ativo.img.x, this.button_ativo.img.y)); // Adiciona terra da lista
            } else if (this.button_ativo.nome == "desfaz" && indice != -1 && !this.button_ativo.hit) {
                this.terras.splice(indice, 1); // Remove terra da lista
            }
        } else {
            let indice = -1;
            for (let i = 0; i < this.terras.length; i++) {
                if (this.terras[i].collideObjectMouse(this.mouse_position)) {
                    console.log("Clicou: " + String(i))
                    this.terras[i].molhar();
                }
            }
        }
    }

    draw(display) {

        display.drawRectangle(this.bordaInferior.x, this.bordaInferior.y, this.bordaInferior.width, this.bordaInferior.height);

        for (let i = 0; i < this.terras.length; i++) {
            display.drawRectangle(this.terras[i].x, this.terras[i].y, this.terras[i].width, this.terras[i].height, this.terras[i].color);
        }

        for (let i = 0; i < this.buttons.length; i++) {
            display.drawRectangle(this.buttons[i].x, this.buttons[i].y, this.buttons[i].width, this.buttons[i].height, this.buttons[i].color());
            if (this.buttons[i].isAtivado() && !this.buttons[i].hit) {
                display.drawRectangle(this.buttons[i].img.x, this.buttons[i].img.y, this.buttons[i].img.width, this.buttons[i].img.height, this.buttons[i].img.color);
            }
        }

        // for(let i = 1; i <= 10; i++){
        //     display.drawRectangle(i*100,0,1,600);
        // }
    }

    update(mouse_position) {
        this.mouse_position = mouse_position;
        if (this.button_ativo != null) {
            let terra = this.button_ativo.img;
            terra.x = ((Math.floor((mouse_position.x) / terra.width) + 1) * terra.width) - terra.width;
            terra.y = ((Math.floor((mouse_position.y) / terra.height) + 1) * terra.height) - terra.height;
            if (this.button_ativo.img.collideObject(this.bordaInferior)) {
                this.button_ativo.hit = true;
            } else {
                this.button_ativo.hit = false;
            }
        }

    }
}

class Terra extends Object {
    constructor(x, y) {
        super(x, y, 80, 60)
        this.color = "#654321";
    }

    molhar() {
        this.color = "#652143"
    }


}