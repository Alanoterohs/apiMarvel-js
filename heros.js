//const url = 'https://developer.marvel.com/';
const URL = `&limit=7&ts=1&apikey=58874dd85578967d1521626abeb93445&hash=96fad7526953ba1f2edc9b0c284c7734`;
let divHeros = document.querySelector('.heros');
let body = document.querySelector('.app');
let ul = document.querySelector('.list-heros');
let paginationDiv = document.querySelector('.pagination');
let aHero = document.querySelector('a-hero');

function displayHeros(data) {
  const displayHero = `
  <div class= "div-aHero">
  <div class="div-aHero">
  <h3 class="title">${data.name}</h3>
  <img
  class = "img-aHero"
  alt="${data.name}"
  src="${data.thumbnail.path}.${data.thumbnail.extension}"
  id="${data.id}">
  </div>
  <div class= "description-hero"><span>${data.description}</span>
  </div>
  <a class= "home-hero" href="index.html">Home</a>
  </div>
  `;
  return displayHero;
}

function getAllHeros(set) {
  const herosURL = `https://gateway.marvel.com:443/v1/public/characters?offset=${set}&${URL}`;

  fetch(herosURL)
  .then(res => res.json())
  .then(json => {
    pagination(json.data);
    const heros = json.data.results;
    heros.map(data => {
      showHeros(data);
    });
  });
}

function showHeros(data) {
  // divHeros.style.display = 'none';
  // paginationDiv.style.display = 'none';
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
  divHeros.appendChild(newDiv);
}

function showAHero(id) {
  const aHeroURL = `https://gateway.marvel.com:443/v1/public/characters/${id}?${URL}`;

  fetch(aHeroURL)
  .then(res => res.json())
  .then(json => {
    const aHero = json.data.results[0];
    let newDivToHero = document.createElement('div');
    newDivToHero.classList.add('aHero');

    const dataHero = displayHeros(aHero);
    newDivToHero.innerHTML = dataHero;
    body.appendChild(newDivToHero);

    divHeros.style.display = 'none';
    paginationDiv.style.display = 'none';
  });
};

function pagination(data) {
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

function back() {
  let offset = parseInt(sessionStorage.getItem('offset'));
  offset -= 8;
  sessionStorage.setItem('offset', offset);
  getAllHeros(offset);
};

function next() {
  let offset = parseInt(sessionStorage.getItem('offset'));
  offset += 8;
  sessionStorage.setItem('offset', offset);
  getAllHeros(offset);
};

const filterSearch = document.querySelector('.search');
filterSearch.addEventListener('keypress', (event) => {
  if (event.keyCode == 13) {
    console.log(filterSearch.value);
    search(filterSearch.value);
  }
});

function search(name) {
  const searchHero =
  `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&${URL}`;
  fetch(searchHero)
  .then(res => res.json())
  .then(json => {
    const searchHero = json.data.results[0];
    let divSearchHero = document.createElement('div');

    const dataSearchHero = displayHeros(searchHero);
    divSearchHero.innerHTML = dataSearchHero;
    body.appendChild(divSearchHero);

    divHeros.style.display = 'none';
    paginationDiv.style.display = 'none';
  });
}

getAllHeros(0); //seteo el offset
