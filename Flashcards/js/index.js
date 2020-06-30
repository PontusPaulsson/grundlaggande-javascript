class CardList{
  addCard(card){
    this.cards.push(card);
  }
}
class Card{
  constructor(question, answer){
    this.question = question;
    this.answer = answer;
  }
}

const cardContainer = document.getElementById('card-container');
const questionInput = document.getElementById('question-input');
const answerInput = document.getElementById('answer-input');
const noteAdd = document.getElementById('note-add');
let saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', () => {
  addNewCard();
});

answerInput.addEventListener('input', () => {
  if(answerInput.value !== "" && questionInput.value !== "")
    saveButton.disabled = false;
  else
    saveButton.disabled = true;
});

questionInput.addEventListener('input', () => {
  if(answerInput.value !== "" && questionInput.value !== "")
    saveButton.disabled = false;
  else
    saveButton.disabled = true;
});



let clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {
  clearCards();
});
let cardList = new CardList();

function generateNewCardElement(card){
  const columnElement = document.createElement('div');
  columnElement.classList.add(...['col', 's4']);

  const cardElement = document.createElement('div');
  cardElement.classList.add(...['card', 'blue-grey', 'darken-1']);
  cardElement.id = 'card-' + card.id;


  const cardContentElement = document.createElement('div');
  cardContentElement.classList.add(...['card-content' ,'white-text']);

  const questionElement = document.createElement('span');
  questionElement.classList.add('card-title');
  questionElement.innerHTML = card.question;
  questionElement.id = 'card-' + card.id + '-question';

  const answerElement = document.createElement('p');
  answerElement.innerHTML = card.answer;
  answerElement.style.display = 'none';
  answerElement.id = 'card-' + card.id + '-answer';

  cardContentElement.appendChild(questionElement);
  cardContentElement.appendChild(answerElement);

  cardElement.appendChild(cardContentElement);

  const cardActionsElement = document.createElement('div');
  cardActionsElement.classList.add('card-action');

  const showHideElement = document.createElement('a');
  showHideElement.innerHTML = "Show answer";
  showHideElement.href = "#";
  showHideElement.id = 'card-' + card.id + '-toggle';
  showHideElement.addEventListener('click', () => {
    toggleAnswer(card.id);
  });

  const editElement = document.createElement('a');
  editElement.addEventListener('click', () => {
    editAnswer(card.id);
  });
  editElement.innerHTML = "Edit";
  editElement.href = "#";

  const deleteElement = document.createElement('a');
  deleteElement.addEventListener('click', () => {
    deleteCard(card.id);
  });
  deleteElement.innerHTML = "Delete";
  deleteElement.href = "#";

  cardActionsElement.appendChild(showHideElement);
  cardActionsElement.appendChild(editElement);
  cardActionsElement.appendChild(deleteElement);

  cardElement.appendChild(cardActionsElement);
  columnElement.appendChild(cardElement);

  cardContainer.appendChild(columnElement);
}
function addNewCard(){
  const card = new Card(questionInput.value, answerInput.value);
  generateNewCardElement(card);
  questionInput.value = "";
  answerInput.value = "";
  saveCardsToLocalStorage();
  cardList.addCard(card);
}
function deleteCard(id){
  const cardElement = document.getElementById('card-' + id);
  cardElement.parentNode.removeChild(cardElement);

  // cards = cards.filter((card) => card.id !== id);
  console.log(cards);
  saveCardsToLocalStorage();

}
function toggleAnswer(id){
  const answer = document.getElementById('card-' + id + '-answer');
  const toggle = document.getElementById('card-' + id + '-toggle');
  if(answer.style.display === 'none'){
    answer.style.display = 'block';
    toggle.innerHTML = 'Hide answer';
  }
  else {
    answer.style.display = 'none';
    toggle.innerHTML = 'Show answer';
  }
}
function editAnswer(id){
  const card = cards.find(card => card.id === id);
  answerInput.value = card.answer;
  questionInput.value = card.question;
  saveButton.innerHTML = 'Save';
  header.innerHTML = 'Edit card';
  removeEventListeners('save-button');

  saveButton = document.getElementById('save-button');
  saveButton.addEventListener('click', () => {
    saveEditedCard(id);
  });
  saveCardsToLocalStorage();
}
function saveEditedCard(id){
  const cardIndex = cards.map(function(card) {return card.id }).indexOf(id);
  cards[cardIndex].question = questionInput.value;
  cards[cardIndex].answer = answerInput.value;

  const answer = document.getElementById('card-' + id + '-answer');
  answer.innerHTML = answerInput.value;

  const question = document.getElementById('card-' + id + '-question');
  question.innerHTML = questionInput.value;

  saveButton.innerHTML = 'Add card';
  saveButton.appendChild(noteAdd);
  removeEventListeners('save-button');
  saveButton = document.getElementById('save-button');
  saveButton.addEventListener('click', () => {
    addNewCard();
  });
  questionInput.value = "";
  answerInput.value = "";
}
function clearCards(){
  cards = [];
  cardContainer.innerHTML = "";
  localStorage.setItem('cards', JSON.stringify(cards));

}
function saveCardsToLocalStorage(){
  localStorage.setItem('cards', JSON.stringify(cards));
}

// Remove all eventListeners by replacing element with clone - code copied from https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
function removeEventListeners(elementId){
  var old_element = document.getElementById(elementId);
  var new_element = old_element.cloneNode(true);
  old_element.parentNode.replaceChild(new_element, old_element);
}

/**
 * Generates a GUID string.
 * @returns {string} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser.
 * @link http://slavik.meltser.info/?p=142
 */
function guid() {
  function _p8(s) {
    var p = (Math.random().toString(16)+"000000000").substr(2,8);
    return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

// Listen for DOMContentLoaded (same as JQuery $(document).ready()) before we execute our JS code
window.addEventListener('DOMContentLoaded', (event) => {
  let cardsFromLocalStorage = localStorage.getItem('cards');
  console.log('cards in localstorage', cardsFromLocalStorage);
  if(cardsFromLocalStorage !== null){
    cards = JSON.parse(cardsFromLocalStorage);
    cards.forEach((card) => {
      generateNewCardElement(card);
    })
  }
});