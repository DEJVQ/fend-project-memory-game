/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

var listOfCards = [];
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

const shuffledCards = shuffle(listOfCards);
const shuffledCardsString = shuffledCards.join("");
const deck = document.querySelector(".deck");

deck.innerHTML = shuffledCardsString;

/*
 |* set up the event listener for a card. If a card is clicked:
 |*  - display the card's symbol (put this functionality in another function that you call from this one)
 |*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 |*  - if the list already has another card, check to see if the two cards match
 |*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 |*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 |*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
const card = document.querySelectorAll(".card");
const moves = document.querySelectorAll(".moves");
const finalScore = document.querySelector(".final-score");
const restart = document.querySelector(".restart");

let cardList = [];
let click = 0;

for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", function clickCards() {
        
        preventDoubleClick();
        displaySymbol();
        addCardToList();
        if (document.querySelectorAll(".show").length == 2) {
            //alert("dsa");
        }
        
        click++;
        countMoves();
        
        if(click%2 == 0 && cardList.length != 0) {
            if(cardList[cardList.length-1].innerHTML == cardList[cardList.length-2].innerHTML) {
                lockCards();
            }
            else if (cardList[cardList.length-1].innerHTML != cardList[cardList.length-2].innerHTML){
                setTimeout(removeCards, 700);
            }
        }
        if ((cardList.length) == 16) {
            displayFinalScore();
        }
    });
    
    function displaySymbol() {
        card[i].classList.add("show", "open");
    }
    
    function addCardToList() {
        cardList.push(card[i]);
    }
    function lockCards() {
        cardList[cardList.length-1].classList.add("match");
        cardList[cardList.length-2].classList.add("match");
    }
    function removeCards() {
        cardList[cardList.length-1].classList.remove("show", "open");
        cardList[cardList.length-2].classList.remove("show", "open");
        cardList.pop();
        cardList.pop();
    }
    function preventDoubleClick() {
        if (card[i].classList.contains("show")) {
            card[i].removeEventListener("click", clickCards);
        }
    }
    function countMoves() {
        moves[0].textContent = parseInt(click/2);
        moves[1].textContent = parseInt(click/2);
    }
    function displayFinalScore() {
        finalScore.classList.add("final-score-show");
    }
    
}
restart.addEventListener("click" , function() {
    moves.textContent = 0;
    click = 0;
    moves[0].textContent = 0;
    moves[1].textContent = 0;
    for (let j = 0; j < card.length; j++) {
        card[j].className = "card";
        cardList = [];
    }
});
