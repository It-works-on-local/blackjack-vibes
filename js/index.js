'use strict';

// ********** Local Storage ************

let gameTotal = localStorage.getItem('score');

let parsedTotal = JSON.parse(gameTotal);
console.log(parsedTotal);

let scoreTotal = document.getElementById('left');

for (let i = 0; i < parsedTotal.length; i++){
  if (parsedTotal[0]){
    let total = document.createElement('p');
    total.textContent = 'hello'; //parsedTotal[i];
    scoreTotal.appendChild(total);
  }
  console.log(localStorage.getItem('score'));
}
