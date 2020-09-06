const startGameSection = document.querySelector('.start_game_section');
const selectedGameMode = document.querySelector('.selected');
const playBtn = document.querySelector('.play_btn');
//const board = document.querySelector('.board');
const body = document.querySelector('body');

Game = {
    gamemode: '',
    player1Pos: 45,
    player2Pos: 45,
    ballPosTop: 50,
    ballPosLeft: 50,
    ballNextPosTop: 50,
    ballNextPosLeft: 50,
    ballDirection: 'lt',
    ballPower: 2,
    ballFrom: 'r',


    startGame: function () {
        if (selectedGameMode !== 'select game mode') {
            // Rid off menu
            this.gamemode = selectedGameMode.textContent;
            startGameSection.parentNode.removeChild(startGameSection);

            //Create board element whre whole game will be show
            const newBoard = document.createElement('section');
            newBoard.classList.add('board');
            body.appendChild(newBoard);

            console.log(this.gamemode);
            this.renderGame();

            if(this.gamemode == 'one player') {

                window.addEventListener('keydown', (e) => {
                    this.movePlayer1Bat(e);
                });
                setInterval(() => {
                    this.moveBall();
                }, 25);
            }
            else if(this.gamemode == 'two players'){
                window.addEventListener('keydown', (e) => {
                    this.movePlayer1Bat(e);
                    this.movePlayer2Bat(e);
                });
                setInterval(() => {
                    this.moveBall();
                }, 25);
            }
        
        }
    },

    renderGame: function () {
        const board = document.querySelector('.board');

        if (document.querySelector('.score') != null)
            board.removeChild(document.querySelector('.score'));
        if (document.querySelector('.game') != null)
            board.removeChild(document.querySelector('.game'));

        //SCORE
        const newScore = document.createElement('div');
        newScore.classList.add('score');
        board.appendChild(newScore);

        const newPlayer1Score = document.createElement('span');
        newPlayer1Score.classList.add('player1_score');
        newPlayer1Score.textContent = `P1 ${Score.player1Score}`;
        newScore.appendChild(newPlayer1Score);

        const newSpan = document.createElement('span');
        newSpan.textContent = ':';
        newScore.appendChild(newSpan);

        const newPlayer2Score = document.createElement('span');
        newPlayer2Score.classList.add('player2_score');
        newPlayer2Score.textContent = `P2 ${Score.player2Score}`;
        newScore.appendChild(newPlayer2Score);

        //GAMER
        const newGame = document.createElement('div');
        newGame.classList.add('game');
        board.appendChild(newGame);

        const newPlayer1Bat = document.createElement('div');
        newPlayer1Bat.classList.add('player1_bat');
        newPlayer1Bat.classList.add('bat');
        newPlayer1Bat.style.top = `${this.player1Pos}%`
        newGame.appendChild(newPlayer1Bat);

        const newPlayer2Bat = document.createElement('div');
        newPlayer2Bat.classList.add('player2_bat');
        newPlayer2Bat.classList.add('bat');
        newPlayer2Bat.style.top = `${this.player2Pos}%`
        newGame.appendChild(newPlayer2Bat);

        const newBall = document.createElement('div');
        newBall.classList.add('ball');
        newBall.style.top = `${this.ballPosTop}%`;
        newBall.style.left = `${this.ballPosLeft}%`;
        newGame.appendChild(newBall);
    },

    movePlayer1Bat: function(e) {
        // Firt version of code which moves bat
        const bat = document.querySelector('.player1_bat');
    
        if(e.keyCode == 65){
            let newPos = parseInt(bat.style.top[0] * 10) + parseInt(bat.style.top[1]) - 1;
            //console.log(newPos);
            if(Number.isNaN(newPos)) newPos = parseInt(bat.style.top[0]) - 1;
            //console.log(newPos)
            if(newPos > 5){
                this.player1Pos = newPos;
                this.renderGame();
            }
        }
    
        if(e.keyCode == 68){
            let newPos = parseInt(bat.style.top[0] * 10) + parseInt(bat.style.top[1]) + 1;
            if(Number.isNaN(newPos)) newPos = parseInt(bat.style.top[0]) + 1;
    
            if(newPos < 95){
                this.player1Pos = newPos;
                this.renderGame();
            }
    
            //console.log(bat.style.top[1])
        }
    },

    movePlayer2Bat: function(e) {
        // Firt version of code which moves bat
        const bat = document.querySelector('.player2_bat');
    
        if(e.keyCode == 37){
            let newPos = parseInt(bat.style.top[0] * 10) + parseInt(bat.style.top[1]) - 1;
            //console.log(newPos);
            if(Number.isNaN(newPos)) newPos = parseInt(bat.style.top[0]) - 1;
            //console.log(newPos)
            if(newPos > 5){
                this.player2Pos = newPos;
                this.renderGame();
            }
        }
    
        if(e.keyCode == 39){
            let newPos = parseInt(bat.style.top[0] * 10) + parseInt(bat.style.top[1]) + 1;
            if(Number.isNaN(newPos)) newPos = parseInt(bat.style.top[0]) + 1;
    
            if(newPos < 95){
                this.player2Pos = newPos;
                this.renderGame();
            }
    
            //console.log(bat.style.top[1])
        }
    },

    moveBall: function(e){
        /*ball direction 
            lt - left-top
            ld - left-down
            rt- right-top
            rd - right-down

          ball from
          r -right
          l -left  
        */

        if(this.ballDirection == 'lt'){
            this.ballPosLeft--;
            this.ballPosTop-=this.ballPower;
            //console.log(this.ballPosLeft, this.ballPosTop);
            if(this.ballPosTop < 3)this.ballDirection = 'ld';
            else if(this.ballPosLeft < 3) {
                const bat1 = document.querySelector('.player1_bat')

                // Check ball hit
                console.log(this.player1Pos);
                if(this.ballPosTop > this.player1Pos && this.ballPosTop < this.player1Pos + 6) {
                    this.ballDirection = 'rd';
                    console.log('hit');
                }
                else {
                    this.winAndReset('player2');
                }


            }
            this.renderGame();
        }

        if(this.ballDirection == 'ld'){
            this.ballPosLeft--;
            this.ballPosTop+=this.ballPower;
            //console.log(this.ballPosLeft, this.ballPosTop);
            if(this.ballPosLeft < 3) {
                const bat1 = document.querySelector('.player1_bat')

                // Check ball hit
                console.log(this.player1Pos);
                if(this.ballPosTop > this.player1Pos && this.ballPosTop < this.player1Pos + 6) {
                    this.ballDirection = 'rd';
                    console.log('hit');
                }
                else {
                    this.winAndReset('player2');
                }


            }
            else if(this.ballPosTop > 97) this.ballDirection = 'lt';
            this.renderGame();
        }

        if(this.ballDirection == 'rd'){
            this.ballPosLeft++;
            this.ballPosTop+=this.ballPower;
            //console.log(this.ballPosLeft, this.ballPosTop);
            if(this.ballPosTop > 97) this.ballDirection = 'rt';
            else if(this.ballPosLeft > 97) {
                if(this.ballPosTop > this.player1Pos && this.ballPosTop < this.player1Pos + 6) {
                    this.ballDirection = 'rd';
                    console.log('hit');
                }
                else {
                    this.winAndReset('player1');
                }
                this.ballDirection = 'ld';
            }
            this.renderGame();
        }

        if(this.ballDirection == 'rt'){
            this.ballPosLeft++;
            this.ballPosTop-=this.ballPower;
            //console.log(this.ballPosLeft, this.ballPosTop);
            if(this.ballPosLeft > 97){
                if(this.ballPosTop > this.player1Pos && this.ballPosTop < this.player1Pos + 6) {
                    this.ballDirection = 'rd';
                    console.log('hit');
                }
                else {
                    this.winAndReset('player1');
                }
            }
            else if(this.ballPosTop < 3) this.ballDirection = 'rd';
            
            this.renderGame();
        }

    },


    winAndReset: function(whoWon) {
        if(whoWon == 'player1'){
            Score.addPointForPlayer1();
        }
        else{
            Score.addPointForPlayer2();
        }

        const ball = document.querySelector('.ball');
        ball.parentNode.removeChild(ball);

        this.ballPosTop = 50;
        this.ballPosLeft = 50;
        /*
        const newBall = document.createElement('div');
        newBall.classList.add('ball');
        newBall.style.top = `${this.ballPosTop}%`;
        newBall.style.left = `${this.ballPosLeft}%`;
        document.querySelector('.game').appendChild(newBall);
        */
        console.log(document.querySelector('.game'));
    }
};

const Score = {
    player1Score: 0,
    player2Score: 0,

    addPointForPlayer1: function(){
        this.player1Score++;
        const p1Score = document.querySelector('.player1_score');
        p1Score.textContent = this.player1Score;
    },

    addPointForPlayer2: function(){
        this.player2Score++;
        const p1Score = document.querySelector('.player2_score');
        p1Score.textContent = this.player2Score;
    }
}





// MAIN

playBtn.addEventListener('click', () => {
    Game.startGame();
});

//game.innerHTML = '';

/* Cleear previous content */
//game.removeChild(document.querySelector('.bat'));
//game.removeChild(document.querySelector('.ball'));

/* CReate new content 
const newPlayer1Bat = document.createElement('div');
newPlayer1Bat.classList.add('player1_bat');
newPlayer1Bat.classList.add('bat');
game.appendChild(newPlayer1Bat);

const newPlayer2Bat = document.createElement('div');
newPlayer2Bat.classList.add('player2_bat');
newPlayer2Bat.classList.add('bat');
game.appendChild(newPlayer2Bat);

const newBall = document.querySelector('div');
newBall.classList.add('ball');
game.appendChild(newBall);

*/

/*

class Game {
    constructor(){
        this.gameMode = '';
        this.whoWon = '';
        this.THIS = this;
    }

    gameStart() {
        //this = Game;
        
        if(selectedGameMode.textContent !== 'Select game mode') {
            this.gameMode = selectedGameMode.textContent;
        }

        if(this.gameMode === 'one player'){
            this.showBoard();
            console.log(this);
            
            const gamePlay = new Gameplay();
            console.log(gamePlay);
            window.addEventListener('keydown', (e) => {
                gamePlay.movePlayer1Bat(e);
                gamePlay.printGame();
                //console.log('this: ', this);
            });
        }


        console.log(this.gameMode);
    }

    showBoard(){
        startGameSection.style.display = 'none';
        board.style.display = 'flex';
    }
}


class Gameplay {
    constructor(){
        this.THIS = this;
        
        this.player1 = document.querySelector('.player1_bat');
        this.posPlayer1 = this.player1.offsetTop;
        this.player2 = document.querySelector('.player2_bat');
        this.posPlayer2 = this.player2.offsetTop;
        this.boardSize = this.posPlayer1 * 2;
    }

    printGame(){
        const game = document.querySelector('.game');
        /* Cleear previous content 
        game.removeChild(document.querySelector('.bat'));
        game.removeChild(document.querySelector('.ball'));
    
        /* CReate new content
        const player1Bat = document.createElement('div');
        player1Bat.classList.add('player1_bat');
        player1Bat.classList.add('bat');
        game.appendChild(player1Bat);

        const player2Bat = document.createElement('div');
        player2Bat.classList.add('player2_bat');
        player2Bat.classList.add('bat');
        game.appendChild(player2Bat);

        const ball = document.querySelector('div');
        ball.classList.add('ball');
        game.appendChild(ball);

    }

    movePlayer1Bat(e){
        if(e.keyCode == '65' && this.posPlayer1 < this.boardSize - 10){
            console.log(this);
            this.posPlayer1 += this.boardSize * .02;
            this.player1.style.top = this.posPlayer1;
        }
        console.log(e.keyCode);
    }

}


/* MAIN 

const game = new Game();
console.log(game);


playBtn.addEventListener('click', game.gameStart.bind(game.THIS));


*/
