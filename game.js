var input = document.getElementById('name');
var player_name = document.getElementById('player-name');
var submit_btn = document.getElementById('submit-btn');
var start = document.getElementById('start-btn');
var Restart = document.getElementById('reset-btn');
var current_score = document.getElementById('current-score');
var maxScore = document.getElementById('max-score');
var game_over = document.getElementById('game-over');

var ball = document.getElementById('ball');
var rod1 = document.getElementById('rod1');
var rod2 = document.getElementById('rod2');
var app = document.getElementById('gameapp');

ball.style.visibility = 'hidden';
game_over.style.visibility = 'hidden';
Restart.style.visibility = 'hidden';

                                                                // important global variables

var score = null;
var gameOn = false;

var ballSpeed_X = 3;
var ballSpeed_Y = 3;

// Start Game Function

function startGame(){
    ball.style.visibility = 'visible';
}

start.addEventListener('click', startGame);

var max_height = app.getBoundingClientRect().height;
var max_width = app.getBoundingClientRect().width;

                                                                    // Restart Game Function

function restart(){
    gameOn = false;
    game_over.style.visibility = 'hidden';
    score = 0;
    current_score.innerHTML = score;
    Restart.style.visibility = 'hidden';
}

Restart.addEventListener('click', restart);

                                                                    // Set score function

function setScore(score){
    if (parseInt(score)*100 > parseInt(maxScore.innerHTML)){
        maxScore.innerHTML = score*100;
        localStorage.setItem(maxScore, maxScore.innerHTML);
    }
    current_score.innerHTML = score * 100;
}

                                                                // Window event listener function 

window.addEventListener('keydown', function (event) {

    let rodSpeed = 22;
    let rodRect = rod1.getBoundingClientRect()

    if(event.code == 'ArrowRight' && (rodRect.x + rodRect.width < (max_width + app.getBoundingClientRect().left - parseInt(20)))){
        rod1.style.left = rodSpeed + (rodRect.x) + 'px';
        rod2.style.left = rod1.style.left;
    }
    else if(event.code == 'ArrowLeft' && (rodRect.left > app.getBoundingClientRect().left && rodRect.x > 0) ){
        rod1.style.left = (rodRect.x) - rodSpeed + 'px';
        rod2.style.left = rod1.style.left;
    }

    if (event.code == 'Enter' && gameOn == false){

        gameOn = true;
        score = 0;

        // get dimensions of ball and rods
        let ballX = ball.getBoundingClientRect().x;
        let ballY = ball.getBoundingClientRect().y;
        let ballDiameter = ball.getBoundingClientRect().width;
        let ballPosition = ballX + ballDiameter/2;

        let rod1_height = rod1.offsetHeight + parseInt(15);
        let rod1_width = rod1.offsetWidth;

        let rod2_height = rod2.offsetHeight;
        let rod2_width = rod2.offsetWidth;

        var movement = setInterval(function(event){
            ballX += ballSpeed_X;
            ballY += ballSpeed_Y;

            // move ball
            ball.style.left = ballX + 'px';
            ball.style.top = ballY + 'px';

            if(ballX > max_width + app.getBoundingClientRect().left - parseInt(20) || ballX < app.getBoundingClientRect().left){
                ballSpeed_X = -ballSpeed_X;
            }

            else if(ballY <= rod1_height){
                ballSpeed_Y = - ballSpeed_Y;
                score++;

                // check if game ends
                if (ballX < rod1.getBoundingClientRect().x || ballX > rod1_width + rod1.getBoundingClientRect().x){
                    clearInterval(movement);
                    setScore(score-1);
                    Restart.style.visibility = 'visible';
                    game_over.style.visibility = 'visible';
                }
            }

            else if(ballY >= max_height - rod2_height){
                ballSpeed_Y = - ballSpeed_Y;
                score++;

                if (ballX < rod2.getBoundingClientRect().x || ballX > rod2_width + rod2.getBoundingClientRect().x){
                    clearInterval(movement);
                    setScore(score-1);
                    Restart.style.visibility = 'visible';
                    game_over.style.visibility = 'visible';
                }
            }

        }, 8);
    }
});

                                                                // Submit Buttom Event Listener Function

submit_btn.addEventListener('click', function(){
    let name = input.value;
    player_name.innerHTML = name;
})