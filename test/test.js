//const game = document.querySelector('.game');

function renderBat() {
    const bat = document.createElement('div');
    bat.classList.add('bat');
    bat.style.top = '40%';
    bat.style.left = '2%';
    //bat.style.transform = 'translate(-50%, -50%)';
    game.appendChild(bat);
}

function updateAndRenderBat(newPos) {
    console.log(document.querySelector('.bat'));
    game.removeChild(document.querySelector('.bat'));
    const bat = document.createElement('div');
    bat.classList.add('bat');
    bat.style.top = `${newPos}%`;
    bat.style.left = '2%';
    //bat.style.transform = 'translate(-50%, -50%)'
    game.appendChild(bat);
}


function moveBat(e) {
    //console.log(e.keyCode);
    const bats = document.querySelector('bat').childNodes;
    const bat = bats[0];

    const pos = bats[0].style.top;



    if(e.keyCode == 65){
        let newPos = parseInt(bats[0].style.top[0] * 10) + parseInt(bats[0].style.top[1]) - 1;
        console.log(newPos);
        if(Number.isNaN(newPos)) newPos = parseInt(bats[0].style.top[0]) - 1;
        console.log(newPos)
        if(newPos > 0){
            updateAndRenderBat(newPos);
        }

        
    }

    if(e.keyCode == 68){
        let newPos = parseInt(bats[0].style.top[0] * 10) + parseInt(bats[0].style.top[1]) + 1;
        if(Number.isNaN(newPos)) newPos = parseInt(bats[0].style.top[0]) + 1;

        if(newPos < 92){
            updateAndRenderBat(newPos);
        }

        console.log(bat.style.top[1])
    }
}


renderBat();
const bat = document.querySelector('bat');
window.addEventListener('keydown', moveBat);
