'use strict';

// ************ GLOBAL VARIABLES ************

let cardList = [];

let deck = [];
let userHand = [];
let dealerHand = [];
let playerChips = 0;
let handTotal = 0;
let bet = 0;
let getElementById = 'dealer-talk'
let insurance = false;


// ************ CONSTRUCTOR FUNCTIONS ************

function Card (name, value){
  this.name = name;
  this.value = value;
  this.img = `img/${name}.jpg`; // may need to change filetype

  cardList.push(this);
}


// ************ OBJECT INSTANTIATION ************
new Card('ace-diamonds', 11);

new Card('ace-spades', 11);
new Card('ace-hearts', 11);
new Card('ace-clubs', 11);
new Card('ace-diamonds', 11);
// new Card('two-spades', 2);
// new Card('two-hearts', 2);
// new Card('two-clubs', 2);
// new Card('two-diamonds', 2);
// new Card('three-spades', 3);
// new Card('three-hearts', 3);
// new Card('three-clubs', 3);
// new Card('three-diamonds', 3);
// new Card('four-spades', 4);
// new Card('four-hearts', 4);
// new Card('four-clubs', 4);
// new Card('four-diamonds', 4);
// new Card('five-spades', 5);
// new Card('five-hearts', 5);
// new Card('five-clubs', 5);
// new Card('five-diamonds', 5);
// new Card('six-spades', 6);
// new Card('six-hearts', 6);
// new Card('six-clubs', 6);
// new Card('six-diamonds', 6);
// new Card('seven-spades', 7);
// new Card('seven-hearts', 7);
// new Card('seven-clubs', 7);
// new Card('seven-diamonds', 7);
// new Card('eight-spades', 8);
// new Card('eight-hearts', 8);
// new Card('eight-clubs', 8);
// new Card('eight-diamonds', 8);
// new Card('nine-spades', 9);
// new Card('nine-hearts', 9);
// new Card('nine-clubs', 9);
// new Card('nine-diamonds', 9);
// new Card('ten-spades', 10);
// new Card('ten-hearts', 10);
// new Card('ten-clubs', 10);
// new Card('ten-diamonds', 10);
// new Card('jack-spades', 10);
// new Card('jack-hearts', 10);
// new Card('jack-clubs', 10);
// new Card('jack-diamonds', 10);
// new Card('queen-spades', 10);
// new Card('queen-hearts', 10);
// new Card('queen-clubs', 10);
// new Card('queen-diamonds', 10);
// new Card('king-spades', 10);
// new Card('king-hearts', 10);
// new Card('king-clubs', 10);
// new Card('king-diamonds', 10);










// ************ HELPER FUNCTIONS ************

// Shuffle stack of cards.

function shuffle(){
  deck = [];
  for(let i in cardList){
    let index = Math.floor(Math.random() * cardList.length);
    if (!deck.includes(index)){
      deck.push(cardList[index]);
    } else {
      while(deck.includes(index)){
        if (!deck.includes(index)){
          deck.push(cardList[index]);
        } else {
          index = Math.floor(Math.random() * cardList.length);

        }
      }

    }
  }

}

// Deals opening hand to dealer and user

function openingHand(){
  let handTotal = 0;
  let card = deck.pop();
  userHand[0] = card;
  card = deck.pop();
  dealerHand[0] = card;
  card = deck.pop();
  userHand[1] = card;
  card = deck.pop();
  dealerHand[1] = card;

  if(dealerHand[0].value === 11) {
    // Dealer asks players if they want insurance

    // Player has choice to risk .5 times their bet extra || if dealer has 21, player keeps bet, if not, lose insurance
    if(bet = 1) {// placeholder for if player takes insurance
      insurance = true;
    }
  }

  for(let i in dealerHand) {
    handTotal+=dealerHand[i].value;
  }

  if(handTotal === 21){
    if(insurance === true){
      playerChips += bet;
      bet = 0;
      // Dealer informs player they have 21
    } else{
      bet = 0;
      // Dealer informs player they have 21
      userHand = [];
      dealerHand = [];
    }
    return;
  }

  if(insurance === true) {
    bet = 0;
    return;
  }

  for(let i in userHand) {
    handTotal+=userHand[i].value;
  }
  if(handTotal === 21){
    let payout = bet * 2.5;
    playerChips+=payout;
    // Dealer informs player the player has 21
    userHand = [];
    dealerHand = [];
  }
  // Dealer informs player of hand total
  // for(let i in userHand){
  //   document.getElementById??  //********* DEALER TALK ********* - JW
  // }
}

// Player wants a card.

function hit(){
  let card = deck.pop();
  userHand.push(card);
  let handTotal = 0;
  for(let i in userHand){
    handTotal += userHand[i].value;
  }
  if (handTotal > 21){
    if (handTotal > 21){ 
      let aces = 0;
      for(let i in userHand) {
        if (userHand[i].value === 11){
          aces ++;
          while(handTotal > 21 && aces > 0){
          handTotal -= 10;
          }
        }
      }
    } else {
      bet = 0;
      userHand = [];
      dealerHand = [];
    }
  } else {
  // Dealer informs player of what their hand total is.
  }
}

// Player bet.
function betting() {
  // Add money to bet based on form input in gameroom.html

  // Remove money from playerChips equal to the amount bet
}

// Double.
function double() {
  let oneMoreCard = deck.pop();
  userHand.push(oneMoreCard);
  handTotal = 0;
  for(let i in userHand){
    handTotal += userHand[i].value;
  }
    if (handTotal > 21){ 
      for(let i in userHand) {
        if (userHand[i].value === 11){
          handTotal -= 10;
        }
      }
    } else {
      bet = 0;
      userHand = [];
      dealerHand = [];
    }
      
    

  }
  


// Split.
function split() {

}

// Pass/Dealer takes over.
function pass() {

}

// If the dealer and the player both have cards under 22, check who wins!!

// ************ TURN ORDER ************

shuffle();
openingHand();

if(userHand.length > 0) {

}
