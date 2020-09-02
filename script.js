const startGameSection = document.querySelector('.start_game_section');
const playBtn = document.querySelector('.play_btn');
const selectedGameMode = document.querySelector('.selected');
const board = document.querySelector('.board');

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
            this.printBoard();
            console.log(this);
        }


        console.log(this.gameMode);
    }

    printBoard(){
        startGameSection.style.display = 'none';
        board.style.display = 'flex';
    }
}


/* MAIN */

const game = new Game();
console.log(game);


playBtn.addEventListener('click', game.gameStart.bind(game.THIS));