/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, PRoundScore, PRoundScore1,
    limit;
var playing = true;
 var dice,dice1;

init();

//document.querySelector('#current-'+ activePlayer).innerHTML="<em>" +dice+ "</em>";




document.querySelector(".dice").style.display = "none";
document.querySelector(".dice1").style.display = "none";


document.querySelector('.btn-roll').addEventListener('click', function() {
    if (playing) {
        // Random number   
        dice = Math.floor(Math.random() * 6) + 1;
        dice1 = Math.floor(Math.random() * 6) + 1;
        // Display the results
        var diceDOM = document.querySelector('.dice');
        var diceDOM1 = document.querySelector('.dice1');

        diceDOM.style.display = 'block';
        diceDOM1.style.display = 'block';

        diceDOM.src = 'dice-' + dice + '.png';
        diceDOM1.src = 'dice-' + dice1 + '.png';

        // update score IF the RNG did not threw 1 

        if (dice === 1 || dice1===1) {
            //add score
            nextPlayer();

            //testing perposes
            console.log('dice 1= '+dice);
            console.log('dice 2= '+dice1);
            


        } else if(dice1 ===6 && dice ===6){
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
            
            console.log('super greedy------- 2 6s')
            
        }
        
        else {
            
            roundScore += +dice + +dice1;
            if (((dice === 6 && PRoundScore === 6)||dice1 === 6 && PRoundScore === 6)
                    ||((dice === 6 && PRoundScore1 === 6)||dice1 === 6 && PRoundScore1 === 6)) {

                document.querySelector('#score-' + activePlayer).textContent = 0;
                console.log(PRoundScore + ' prev');
                console.log(dice + ' current');
                PRoundScore = 0;
                PRoundScore = 1;
                console.log('greedy')
                nextPlayer();

            } else {

                PRoundScore = dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;


            }



            //LONG WAy 
            /*
            if(activePlayer===1){ 
                
            document.querySelector('.player-1-panel').classList.add('active');
            document.querySelector('.player-0-panel').classList.remove('active');
        }
        else{
            document.querySelector('.player-1-panel').classList.remove('active');
            document.querySelector('.player-0-panel').classList.add('active');
        }
        }
        */
        }
    }

});


document.querySelector('.btn-hold').addEventListener('click', function() {

    if (playing) {
        

        // add current to glopal score
        scores[activePlayer] += roundScore;

        //change the gui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        document.querySelector('#current-' + activePlayer).textContent = 0;

         
       var limit;
       if(!document.querySelector('.limit').value){
           limit=100;
       }
       else
       limit = document.querySelector('.limit').value;

    if (scores[activePlayer] >= limit) {
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER !';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

        playing = false;

    } else {
        nextPlayer();
    }

    }
});

function nextPlayer() {
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    (activePlayer === 0) ? activePlayer = 1: activePlayer = 0;
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
}




document.querySelector('.btn-new').addEventListener('click', init);

function init() {

    playing = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;


    document.getElementById('score-0').innerHTML = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').innerHTML = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('name-0').textContent = 'player 1';
    document.getElementById('name-1').textContent = 'player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');


}

function onOne() {
    document.getElementById('score-0').innerHTML = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').innerHTML = 0;
    document.getElementById('current-1').textContent = 0;
}

