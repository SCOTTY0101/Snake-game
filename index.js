//building the classic snake game.
// x rows >>>>

//y 
//down the way


//building the game board using object (key/value pair).
let game = {
    counter: 0, //varaiable to make the tick function work.
    score: 0,
    timer: null,
    board : [
    'bbbbbbbbbbbbbbbbbbbbb',
    'b                   b',
    'b                   b',
    'b                   b',
    'b                   b',
    'b                   b',
    'b                   b',
    'b                   b',
    'b                   b',
    'b                   b',
    'b                   b',
    'b                   b',
    'bbbbbbbbbbbbbbbbbbbbb'
    ],
    redApple : [
        { x : 15, y : 10}
    ],
    rottenApple : [
        { x : 5, y : 5}
    ],
    goldApple : [
        { x : 1, y : 1}
    ],
    tick: function() {
            window.clearTimeout(game.timer);
            game.counter++;
            if (game.counter % 10 == 0) {
                game.addRedApple();
            }
            if (game.counter % 20 == 0) {
                game.addRottenApple();
            }
            if (game.counter % 60 == 0) {
                game.addGoldApple();
            }
            let result = snake.move();
            if (result == 'gameover') {
                alert(`Game over. You scored: ${game.score}`);
               // location.reload(); //auto reload is turn off.
                return;
            }
            graphics.drawGame();
            game.timer = window.setTimeout('game.tick()', 1000); //setTimeout is linked to game.timer varable.
        },
        addRedApple : function() {
            let randonY = Math.floor(Math.random() * game.board.length) + 0;
            let randomX = Math.floor(Math.random() * game.board[randonY].length) + 0;
            let randomLocation = {x: randomX, y: randonY};
            if ( game.isEmpty(randomLocation) && !game.isRedApple(randomLocation)) {
                game.redApple.push(randomLocation); 
            }
        },
        addRottenApple : function() {
            let randonY = Math.floor(Math.random() * game.board.length) + 0;
            let randomX = Math.floor(Math.random() * game.board[randonY].length) + 0;
            let randomLocation = {x: randomX, y: randonY};
            if ( game.isEmpty(randomLocation) && !game.isBadApple(randomLocation)) {
                game.rottenApple.push(randomLocation); //last code
            }
        },
        addGoldApple : function() {
            let randonY = Math.floor(Math.random() * game.board.length) + 0;
            let randomX = Math.floor(Math.random() * game.board[randonY].length) + 0;
            let randomLocation = {x: randomX, y: randonY};
            if ( game.isEmpty(randomLocation) && !game.isGoldApple(randomLocation)) {
                game.goldApple.push(randomLocation); //last code
            }
        },
        isEmpty : function(location) {
            return game.board[location.y][location.x] == ' ';
        },
        isWall : function(location) {
            return game.board[location.y][location.x] == 'b';
        },
        isRedApple: function(location) {
            for(let apple = 0; apple < game.redApple.length; apple++) {
                let redApple = game.redApple[apple];
                if (location.x == redApple.x && location.y == redApple.y) {
                    game.redApple.splice(apple, 1);
                    return true;
                }
            }
            return false;
        },
        isBadApple : function(location) {
            for(let badApple = 0; badApple < game.rottenApple.length; badApple++) {
                let rottenApple = game.rottenApple[badApple];
                if (location.x == rottenApple.x && location.y == rottenApple.y) {
                    game.rottenApple.splice(badApple, 1);
                    return true;
                }
            }
            return false;
        },
        isGoldApple : function(location) {
            for(let goodApple = 0; goodApple < game.goldApple.length; goodApple++) {
                let goldApple = game.goldApple[goodApple];
                if (location.x == goldApple.x && location.y == goldApple.y) {
                    game.goldApple.splice(goldApple, 1);
                    return true;
                }
            }
            return false;
        }
    
};

//building the snake using objects (key/value pair).
let snake = {
    part : [
        {x : 8, y : 6},
        {x : 7, y : 6},
        {x : 6, y : 6}
        ],
            facing : 'right',
                next: function() {
                    let snakeHead = snake.part[0];
                    let targetX = snakeHead.x;
                    let targetY = snakeHead.y;
                    targetX = snake.facing == 'right' ? targetX+1 : targetX;
                    targetX = snake.facing == 'left' ? targetX-1 : targetX;
                    targetY = snake.facing == 'up' ? targetY-1 : targetY;
                    targetY = snake.facing == 'down' ? targetY+1: targetY;
                    return {x : targetX, y : targetY};
                },
            move: function() {
                    let location = snake.next();

                    if (game.isEmpty(location)) {
                    snake.part.unshift(location);
                    snake.part.pop();
                    }

                    if (game.isWall(location)) {
                        return 'gameover';
                    }
                    if (game.isRedApple(location)) {
                        snake.part.unshift(location);
                        game.score += 10;
                    }
                    if (game.isBadApple(location)) {
                        return 'gameover';
                    } 
                    if (game.isGoldApple(location)) {
                        snake.part.unshift(location);
                        game.score += 500;
                    }

                }

    };
let graphics = {
    canvas : document.getElementById("canvas"),
    square : 20,

    drawBoard : function(ctx) {
        let axisY = 0;

            game.board.forEach((grid) => {
            let axisX = 0;
               grid = grid.split('');
                    grid.forEach((boarder) => {
                        if (boarder == 'b') {
                            ctx.fillStyle = 'black';
                            ctx.fillRect(axisX, axisY, graphics.square, graphics.square);
                        }
                        axisX += graphics.square;
                    });
                axisY += graphics.square;
        });
    },

    drawRedApple : function(ctx) {
        game.redApple.forEach((redApple) => {
            axisX = redApple.x * graphics.square;
            axisY = redApple.y * graphics.square;
            ctx.fillStyle = '#DC143C' //'Crimson';
            ctx.fillRect(axisX, axisY, graphics.square, graphics.square);

        })
    },
    drawRottenApple : function(ctx) {
        game.rottenApple.forEach((rottenApple) => { 
           axisX = rottenApple.x * graphics.square;
           axisY = rottenApple.y * graphics.square;
           ctx.fillStyle = '#B8860B '; //'DarkGoldenRod' medium dark shade of yellow.
           ctx.fillRect(axisX, axisY, graphics.square, graphics.square);
        })
    },
    drawGoldApple : function(ctx) {
        game.goldApple.forEach((goldApple) => {
            axisX = goldApple.x * graphics.square;
            axisY = goldApple.y * graphics.square;
            ctx.fillStyle = '#FFD700'; //Gold
            ctx.fillRect(axisX, axisY, graphics.square, graphics.square);
        })
    },
    drawSnake : function(ctx) {
        snake.part.forEach((part) => {
                axisX = part.x * graphics.square;
                axisY = part.y * graphics.square;
                ctx.fillStyle = '#00FF00'; //Lime 
                ctx.fillRect(axisX, axisY, graphics.square, graphics.square);
        });
    
    },
    
    //calls all graphic functions
    drawGame: function() {
        let ctx = graphics.canvas.getContext("2d");
        ctx.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height);
        graphics.drawBoard(ctx);
        graphics.drawRedApple(ctx);
        graphics.drawRottenApple(ctx);
        graphics.drawGoldApple(ctx);
        graphics.drawSnake(ctx);
        
        },
// end of graphics object literals.
};
//graphics.drawGame(); //calls all graphics function.

let gameControl = {
    processInput: function(keyPressed) {
        let key = keyPressed.key.toLowerCase();
        let targetDirection = snake.facing;
        if (key == 'p' && targetDirection != 'down') {
            targetDirection = 'up'
        } else if (key == 'l' && targetDirection != 'up') {
            targetDirection = 'down'
        } else if (key == 'a' && targetDirection != 'right') {
            targetDirection = 'left'
        } else if (key == 's' && targetDirection != 'left') {
            targetDirection = 'right'
        }
        snake.facing = targetDirection;
        game.tick();
    },
    startGame : function() {
        window.addEventListener('keypress', gameControl.processInput, false);
        game.tick();
    }
};
gameControl.startGame();

