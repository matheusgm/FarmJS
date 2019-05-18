window.addEventListener("load", function (event) {

    function findScreenCoords(mouseEvent) {
        var xpos;
        var ypos;
        if (mouseEvent) {
            //FireFox
            xpos = mouseEvent.pageX;
            ypos = mouseEvent.pageY;
        } else {
            //IE
            xpos = window.event.screenX;
            ypos = window.event.screenY;
        }
        mouse_position.x = xpos - 11;
        mouse_position.y = ypos - 11;

        //console.log(xpos, ypos)

    }

    function onClick(event) {
        game.onClick()
    }

    var render = function () {

        display.renderColor("#ffffff");

        game.draw(display);

        //display.renderColor(game.color);
        display.render();

    };

    var update = function () {
        // console.log(mouse_position.x,mouse_position.y)
        game.update(mouse_position);

    };
    var canvas = document.getElementById("canvas");
    var display = new Display(canvas);
    var game = new Game();
    var engine = new Engine(1000 / 30, render, update);
    var mouse_position = {
        x: 0,
        y: 0
    }

    display.buffer.canvas.width = game.world.width;
    display.buffer.canvas.height = game.world.height;


    game.world.setup();

    display.resize(1200, 600);
    //display.resize_automatic();
    engine.start();

    canvas.onmousemove = findScreenCoords;
    canvas.addEventListener("click", onClick, false);

});