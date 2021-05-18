const url = 'https://developer.marvel.com/';
const publiKey =  '58874dd85578967d1521626abeb93445';
const hash = '96fad7526953ba1f2edc9b0c284c7734';
let contentDiv = '';
let mainDiv = document.querySelector('.heros');
let body = document.querySelector('.app');
let ul = document.querySelector('.list-heros');
let paginationDiv = document.querySelector('.pagination');
let aHero = document.querySelector('a-hero');


function showHeros(data, offset) {
  let newDiv = document.createElement('div');
  newDiv.classList.add('cards-heros');
  newDiv.innerHTML = `
  <li class="listCard-class">
  <h3 class="title">${data.name}</h3>
  <img
  class = "img-class"
  onclick = "showAHero(${data.id})"
  src="${data.thumbnail.path}.${data.thumbnail.extension}"
  alt="${data.name}"
  id="${data.id}">
  </li>
  `;
  mainDiv.appendChild(newDiv);
}


function getAllHeros(set) {
  let limit = 7;
  const herosURL =
  `https://gateway.marvel.com:443/v1/public/characters?offset=${set}&limit=${limit}&ts=1&apikey=${publiKey}&hash=${hash}`;
  fetch(herosURL)
  .then(res => res.json())
  .then(json => {
    console.log(json);
    pagination(json.data);
    const heros = json.data.results;
    let offset = json.data;
    heros.map(data => {
      showHeros(data, offset);
    });
  });
}



function showAHero(id) {
  const aHeroURL = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=${publiKey}&hash=${hash}`
  fetch(aHeroURL)
  .then(res => res.json())
  .then(json => {
    const aHero = json.data.results[0];
    const newDivToHero = document.createElement('div');
    newDivToHero.classList.add('aHero');
    newDivToHero.innerHTML = `
    <div class= "div-aHero">
    <div class="div-aHero">
    <h3 class="title">${aHero.name}</h3>
    <img
    class = "img-aHero"
    alt="${aHero.name}"
    src="${aHero.thumbnail.path}.${aHero.thumbnail.extension}"
    id="${aHero.id}">
    </div>
    <div class= "description-hero"><span>${aHero.description}</span>
    </div>
    <a class= "home-hero" href="index.html">Home</a>
    </div>
    `;
    body.appendChild(newDivToHero);
    mainDiv.style.display = 'none';
    paginationDiv.style.display = 'none';
  });
};


getAllHeros();

const filterSearch = document.querySelector('.search');

filterSearch.addEventListener('keypress', (event) => {
  if (event.keyCode == 13) {
    filterHero(filterSearch.value);
  }
});

function back() {
  let set = parseInt(sessionStorage.getItem('id'));
  set -= 3;
  sessionStorage.setItem('id', set);
  getAllHeros(set);
};

function next() {
  let set = parseInt(sessionStorage.getItem('id'));
  set += 4;
  sessionStorage.setItem('id', set);
  getAllHeros(set);
};

function pagination(data) {
  console.log(data);
  var page = data.offset;
  var limit = data.limit;
  var total = Math.ceil(data.total / limit);

  let newDivPag = document.createElement('div');
  let backPage = document.createElement('button');
  let nextPage = document.createElement('button');
  let space = document.createElement('span');

  backPage.textContent = '<- Back';
  backPage.addEventListener('click', back);
  nextPage.textContent = 'Next ->';
  nextPage.addEventListener('click', next);
  space.textContent = ` page number ${page} of the ${total} `;


  paginationDiv.appendChild(newDivPag);
  newDivPag.appendChild(backPage);
  newDivPag.appendChild(nextPage);
  paginationDiv.appendChild(space);
};
