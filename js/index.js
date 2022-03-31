'use strict';

// ********** Local Storage ************

let gameTotal = localStorage.getItem('');

let parsedTotal = JSON.parse(gameTotal);

let stringifiedTotal = JSON.stringify();

localStorage.setItem('', stringifiedTotal);