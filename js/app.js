'use strict';

// ************ GLOBAL VARIABLES ************

let cardList = [];

let deck = [];
let userHand = [];
let dealerHand = [];
let playerChips = 0;
let handTotal = 0;
let bet = 0;
let dealer = document.getElementById('dealer-talk');
let form = document.createElement('form');
let insurance = false;
let count = 0;
let score = [];




// ************ CONSTRUCTOR FUNCTIONS ************

function Card (name, value){
  this.name = name;
  this.value = value;
  // this.img = `../img/${name}.jpg`; // may need to change filetype
  this.img = `../img/${name}.jpg`;
  cardList.push(this);
}


// ************ OBJECT INSTANTIATION ************
new Card('ace-spades', 11);
new Card('ace-hearts', 11);
new Card('ace-clubs', 11);
new Card('ace-diamonds', 11);
new Card('two-spades', 2);
new Card('two-hearts', 2);
new Card('two-clubs', 2);
new Card('two-diamonds', 2);
new Card('three-spades', 3);
new Card('three-hearts', 3);
new Card('three-clubs', 3);
new Card('three-diamonds', 3);
new Card('four-spades', 4);
new Card('four-hearts', 4);
new Card('four-clubs', 4);
new Card('four-diamonds', 4);
new Card('five-spades', 5);
new Card('five-hearts', 5);
new Card('five-clubs', 5);
new Card('five-diamonds', 5);
new Card('six-spades', 6);
new Card('six-hearts', 6);
new Card('six-clubs', 6);
new Card('six-diamonds', 6);
new Card('seven-spades', 7);
new Card('seven-hearts', 7);
new Card('seven-clubs', 7);
new Card('seven-diamonds', 7);
new Card('eight-spades', 8);
new Card('eight-hearts', 8);
new Card('eight-clubs', 8);
new Card('eight-diamonds', 8);
new Card('nine-spades', 9);
new Card('nine-hearts', 9);
new Card('nine-clubs', 9);
new Card('nine-diamonds', 9);
new Card('ten-spades', 10);
new Card('ten-hearts', 10);
new Card('ten-clubs', 10);
new Card('ten-diamonds', 10);
new Card('jack-spades', 10);
new Card('jack-hearts', 10);
new Card('jack-clubs', 10);
new Card('jack-diamonds', 10);
new Card('queen-spades', 10);
new Card('queen-hearts', 10);
new Card('queen-clubs', 10);
new Card('queen-diamonds', 10);
new Card('king-spades', 10);
new Card('king-hearts', 10);
new Card('king-clubs', 10);
new Card('king-diamonds', 10);










// ************ HELPER FUNCTIONS ************

// DOM manipulation for different player options.


function (min, max){ // confused about the .eslint error that I am recieving. 
  let min = min;
  let max = max;
  
  return Math.min(Math.max(5, 100))
}


// Shuffle stack of cards.

function shuffle(){
  deck = [];
  for(let i = 0; i < cardList.length; i++){
    let index = Math.floor(Math.random() * cardList.length);
    if (!deck.includes(cardList[index])){
      deck.push(cardList[index]);
    } else {
      while(deck.includes(cardList[index])){
        if (!deck.includes(cardList[index])){
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

  if(deck > 10){ // Creating a new round if userHand is less than 10?
    betting();
  }else{
    renderDealer();
    renderPlayer();
  }



  if(dealerHand[0].value === 11) {
    // Dealer asks players if they want insurance
    talkbox('Would you like insurance?');
    // DOM MANIPULATION - open a form to get player response
    dealer.appendChild(form);
    form.setAttribute('id', 'insurance');
    let formField = document.createElement('fieldset');
    form.appendChild(formField);
    let yes = document.createElement('button');
    yes.setAttribute('type', 'submit');
    yes.textContent = 'Yes';
    formField.appendChild(yes);
    yes.addEventListener('click', handleInsureYes);
    let no = document.createElement('button');
    no.setAttribute('type', 'submit');
    no.textContent = 'No';
    formField.appendChild(no);
    no.addEventListener('click', handleInsureNo);


  }

  for(let i in dealerHand) {
    handTotal+=dealerHand[i].value;
  }

  if(handTotal === 21){
    if(insurance === true){
      playerChips += bet;
      bet = 0;
      // Dealer informs player they have 21
      talkbox('I have a blackjack, you can keep your bet.');
      userHand = [];
      renderPlayer();
      dealerHand = [];
      renderDealer();
    } else{
      bet = 0;
      // Dealer informs player they have 21
      talkbox('Unfortunately for you, I have a blackjack.');
      userHand = [];
      dealerHand = [];
    }
    return;
  }



  handTotal = 0;
  for(let i in userHand) {
    handTotal += userHand[i].value;
  }
  if(handTotal === 21){
    let payout = bet * 2.5;
    playerChips += payout;
    // Dealer informs player the player has 21
    talkbox('Congratulations, you have a blackjack!');
    userHand = [];
    dealerHand = [];
  } else{
    // Dealer informs player of hand total
    talkbox(`Your current total is ${handTotal}`);
  }
}

// Player wants a card.

function hit(){
  let card = deck.pop();
  userHand.push(card);
  renderPlayer();
  let handTotal = 0;
  for(let i in userHand){
    handTotal += userHand[i].value;
  }
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
    if (handTotal > 21){
      bet = 0;
      userHand = [];
      renderPlayer();
      dealerHand = [];
      renderDealer();
      talkbox('Sorry, your total is too high.');
    }else{
      talkbox(`Your total is ${handTotal}`);
    }


  } else {
    talkbox(`Your total is ${handTotal}`);
  }
  if (userHand >= 21){ //Creating new round if userHand is greater than or equal to 21.
    newRound();
  }
}

// Player bet.
function betting() {
  if(playerChips <= 0) { //NEED TO PULL NUMBERS FROM LOCAL STORAGE FOR SAVE GAME -------------------------------------------------
    for(let i in score){
      while(!score[i]){
        count;
      }
    }
    let stringScore = JSON.stringify(score);
    localStorage.setItem('score', stringScore);
  } else {
    // Add money to bet based on form input in gameroom.html
    talkbox('Please enter your bet.');
    let betForm = document.createElement('form');
    dealer.appendChild(betForm);
    let userBet = document.createElement('fieldset');
    betForm.appendChild(userBet);
    let betLabel = document.createElement('label');
    betLabel.setAttribute('for', 'bet');
    userBet.appendChild(betLabel);
    let betInput = document.createElement('input');
    betInput.type = 'number';
    betInput.id = 'bet';
    betInput.name = 'bet';
    userBet.appendChild(betInput);
    let betSubmit = document.createElement('button');
    betSubmit.type = 'submit';
    betSubmit.textContent = 'Bet';
    userBet.appendChild(betSubmit);

    betForm.addEventListener('submit', handleBet);
    // Remove money from playerChips equal to the amount bet
  }

}

// Double.
function double() { // IN PROGRESS
  let oneMoreCard = deck.pop();
  userHand.push(oneMoreCard);
  handTotal = 0;
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
  }
}



// Split.
function split() {

}

// Pass/Dealer takes over.
function pass() {

}

// If the dealer and the player both have cards under 22, check who wins!!

// Replace dealer text
function talkbox(statement) {
  if(dealer.hasChildNodes()) {
    dealer.removeChild(dealer.firstChild);
  }
  let dialogue = document.createElement('p');
  dialogue.setAttribute('id', 'dialogue');
  dialogue.textContent = statement;
  dealer.appendChild(dialogue);
}

// ************ DOM MANIPULATION FOR DEALER & USER CARDS ************


// Any time the player or dealer gets a new card, re-render their hand. run through user/dealer hand to append images to match the 'container' names.
function renderOptions(){

  dealer.appendChild(form);
  form.setAttribute('id', 'insurance');
  let formField = document.createElement('fieldset');
  form.appendChild(formField);

  let hit = document.createElement('button');
  hit.setAttribute('type', 'submit');
  hit.textContent = 'hit';
  formField.appendChild(hit);
  hit.addEventListener('click', handleHit);

  let double = document.createElement('button');
  double.setAttribute('type', 'submit');
  double.textContent = 'double';
  formField.appendChild(double);
  double.addEventListener('click', handleDouble);

  let split = document.createElement('button');
  split.setAttribute('type', 'submit');
  split.textContent = 'split';
  formField.appendChild(split);
  split.addEventListener('click', handleSplit);

  let stand = document.createElement('button');
  stand.setAttribute('type', 'submit');
  stand.textContent = 'stand';
  formField.appendChild(stand);
  stand.addEventListener('click', handleStand);
}

function renderDealer (){
  let dealerContainer = document.getElementById('dealer-container');

  if(dealerContainer.hasChildNodes()) {
    while(dealerContainer.hasChildNodes()){
      dealerContainer.removeChild(dealerContainer.firstChild);
    }
  }

  for(let i in dealerHand){

    let bjvImg = document.createElement('img');
    bjvImg.src = dealerHand[i].img;
    bjvImg.alt = dealerHand[i].name;
    dealerContainer.appendChild(bjvImg);

  }
}

function renderPlayer(){
  let playerContainer = document.getElementById('player-container');

  if(playerContainer.hasChildNodes()) {
    while(playerContainer.hasChildNodes()){
      playerContainer.removeChild(playerContainer.firstChild);
    }
  }

  for(let i in userHand){
    let bjvImg = document.createElement('img');
    bjvImg.src = userHand[i].img;
    bjvImg.alt = userHand[i].name;
    playerContainer.appendChild(bjvImg);

  }
}

// ************ EVENT HANDLERS ************


function handleInsureYes(event){
  event.preventDefault();
  insurance = true;

  let insuredBet = bet * 0.5;
  playerChips -= insuredBet;
  bet += insuredBet;
  form.removeChild(form.firstChild);
}

function handleInsureNo(event){
  event.preventDefault();
  insurance = false;
  form.removeChild(form.firstChild);
}

function handleHit(event){
  event.preventDefault();

  hit();
}

function handleDouble(event){
  event.preventDefault();

  double();
}

function handleSplit(event){
  event.preventDefault();

  split();
}

function handleStand(event){
  event.preventDefault();

  stand();
  if (deck.length > 10){
    turnOrder();
  }else {
    newRound();
  }
}

function handleBet(event){
  event.preventDefault();

  while(dealer.hasChildNodes()){
    dealer.removeChild(dealer.firstChild);
  }

  count++;
  let totalBet = +event.target.bet.value;
  playerChips-=totalBet;

  openingHand();

  if (userHand.length > 0) {
    renderOptions();
  } else {
    betting();
  }
}



// ************ TURN ORDER ***********

function newRound(){
  shuffle();
  betting();
}
newRound();



