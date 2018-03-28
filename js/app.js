startMatchingGame();

/* Main function to start */
function startMatchingGame() {

// Shuffle function from    http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* Declare list of Card */
const listOfCards = [];
listOfCards[1] =`<li class="card">
                    <i class="fa fa-diamond"></i>
                </li>`;
listOfCards[2] =`<li class="card">
                    <i class="fa fa-paper-plane-o"></i>
                </li>`;
listOfCards[3] =`<li class="card">
                    <i class="fa fa-anchor"></i>
                </li>`;
listOfCards[4] =`<li class="card">
                    <i class="fa fa-bolt"></i>
                </li>`;
listOfCards[5] =`<li class="card">
                    <i class="fa fa-cube"></i>
                </li>`;
listOfCards[6] =`<li class="card">
                    <i class="fa fa-anchor"></i>
                </li>`;
listOfCards[7] =`<li class="card">
                    <i class="fa fa-leaf"></i>
                </li>`;
listOfCards[8] =`<li class="card">
                    <i class="fa fa-bicycle"></i>
                </li>`;
listOfCards[9] =`<li class="card">
                    <i class="fa fa-diamond"></i>
                </li>`;
listOfCards[10] =`<li class="card">
                    <i class="fa fa-bomb"></i>
                </li>`;
listOfCards[11] =`<li class="card">
                    <i class="fa fa-leaf"></i>
                </li>`;
listOfCards[12] =`<li class="card">
                    <i class="fa fa-bomb"></i>
                </li>`;
listOfCards[13] =`<li class="card">
                    <i class="fa fa-bolt"></i>
                </li>`;
listOfCards[14] =`<li class="card">
                    <i class="fa fa-bicycle"></i>
                </li>`;
listOfCards[15] =`<li class="card">
                    <i class="fa fa-paper-plane-o"></i>
                </li>`;
listOfCards[16] =`<li class="card">
                    <i class="fa fa-cube"></i>
                </li>`;

/* Shuffle Cards and display it*/
const shuffledCards = shuffle(listOfCards);
const shuffledCardsString = shuffledCards.join("");
const deck = document.querySelector(".deck");

deck.innerHTML = shuffledCardsString;


/* Declare const and variables */
let card = document.querySelectorAll(".card");
const moves = document.querySelectorAll(".moves");

let stars = document.querySelectorAll(".fa-star");
const star = stars[0].outerHTML;
const starsAddMain = document.querySelector(".score-panel .stars");
const starsAddFinal = document.querySelector(".final-score .stars");

const finalScore = document.querySelector(".final-score");
const restart = document.querySelectorAll(".restart");
//const replayButton = document.querySelector(".replay");

const preventMultiClick = document.createElement("div");
preventMultiClick.classList.add("non-clickable");
 
let cardList = [];
let click = 0;

let stopwatch = document.querySelector(".stopwatch")
let seconds = 0, minutes = 0, hours = 0, t;

    


for (let i = 0; i < card.length; i++) {
    /* Card on click Event */
    card[i].addEventListener("click", function clickCards(e) {
        
        preventDoubleClick();
        displaySymbol();
        addCardToList();
        
        /* Prevent Multiple clicks of cards in deck */
        if (document.querySelectorAll(".show").length == 2) {
            deck.appendChild(preventMultiClick);
            setTimeout(function() {
                deck.removeChild(preventMultiClick);
            }, 700);
        }
        
        click++;
        countMoves();
        
        /* Start Stopwatch */
        if (click == 1) {
            timeInterval();
        }
        
        /* Compare Two cards */
        if(click%2 == 0 && cardList.length != 0) {
            if(cardList[cardList.length-1].innerHTML == cardList[cardList.length-2].innerHTML) {
                lockCards();
                cardList[cardList.length-1].removeEventListener("click", clickCards);
                cardList[cardList.length-2].removeEventListener("click", clickCards);
            }
            else if (cardList[cardList.length-1].innerHTML != cardList[cardList.length-2].innerHTML){
                setTimeout(removeCards, 700);
            }
        }
        
        /* Display Final Score */
        if ((cardList.length) == 16) {
            displayFinalScore();
        }
        
        /* Rate the game */
        if (click == 40 ) {
            stars[2].parentNode.removeChild(stars[2]);
            stars[5].parentNode.removeChild(stars[5]);
        }
        else if (click == 60) {
            stars[1].parentNode.removeChild(stars[1]);
            stars[4].parentNode.removeChild(stars[4]);
        }
    });
    
    /* Display card symbol */
    function displaySymbol() {
        card[i].classList.add("show", "open");
    }
    
    /* Add card to list */
    function addCardToList() {
        cardList.push(card[i]);
    }
    
    /* Match cards and set class to matched */
    function lockCards() {
        cardList[cardList.length-1].classList.add("match");
        cardList[cardList.length-2].classList.add("match");
        cardList[cardList.length-1].classList.remove("show", "open");
        cardList[cardList.length-2].classList.remove("show", "open");
        
    }
    
    /* Remove dismatched cards */
    function removeCards() {
        cardList[cardList.length-1].classList.remove("show", "open");
        cardList[cardList.length-2].classList.remove("show", "open");
        cardList.pop();
        cardList.pop();
    }
    
    /* Prevent double click on one card */
    function preventDoubleClick() {
        if (card[i].classList.contains("show")) {
            card[i].removeEventListener("click", clickCards);
        }
    }
    
    /* Display moves count in score board and finish pop-up */
    function countMoves() {
        moves[0].textContent = parseInt(click/2);
        moves[1].textContent = parseInt(click/2);
    }
    
    /* Display final score */
    function displayFinalScore() {
        finalScore.classList.add("final-score-show");
        
        clearTimeout(tick);
        let finalTime = document.querySelector(".stopwatch-final");
        finalTime.textContent = stopwatch.textContent;
    }
    
}

/* Add action on click restart and replay */
for (let p = 0; p < restart.length; p++) {
    restart[p].addEventListener("click" , function(e) {
        stars = document.querySelectorAll(".fa-star");

        if (card.length == 16) {
            finalScore.classList.remove("final-score-show");
        }

        moves.textContent = 0;
        click = 0;
        moves[0].textContent = 0;
        moves[1].textContent = 0;

        /* Reset card class */
        for (let j = 0; j < card.length; j++) {
            card[j].className = "card";
            cardList = [];
        }

        /* Remove and set default stars */
        if (stars.length < 10) {
            for (let k = stars.length-1; k >= 0; k--) {
                if (stars[k].parentNode) {
                    stars[k].parentNode.removeChild(stars[k]);
                }
            }

            for (let l = 0; l < 3; l++) {
                starsAddMain.children[l].innerHTML = star;
                starsAddFinal.children[l].innerHTML = star;
                stars = document.querySelectorAll(".fa-star");
            }
        }

        /* Restart deck and position of cards */
        setTimeout(startMatchingGame, 300);

        /* Restart StopWatch */
        stopwatch.textContent = "00:00:00";
        seconds = 0; 
        minutes = 0; 
        hours = 0;
        clearTimeout(tick);
    });
}
    

function countTime() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    stopwatch.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    
    timeInterval();
}
    
function timeInterval() {
    tick = setTimeout(countTime, 1000);
}
 
}
