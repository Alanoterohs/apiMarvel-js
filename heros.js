//const url = 'https://developer.marvel.com/';
//const URL = `&limit=7&ts=1&apikey=58874dd85578967d1521626abeb93445&hash=96fad7526953ba1f2edc9b0c284c7734`;
const URL = `&ts=1&apikey=58874dd85578967d1521626abeb93445&hash=96fad7526953ba1f2edc9b0c284c7734`;
// const mainHeros = document.querySelector('#heros');
// const containerAllHeros = document.querySelector('#allHeros');
// const sectionHero = document.querySelector('#section-hero');
//const divHeros = document.querySelector('.heros');
//const allHeros = document.querySelector('.allHeros');
const body = document.querySelector('.app');
//const sectionHero = document.querySelector('.section-hero');
// const paginationDiv = document.querySelector('#pagination');
const aHero = document.querySelector('a-hero');


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


function showAHero(id) {
  const aHeroURL = `https://gateway.marvel.com:443/v1/public/characters/${id}?${URL}`;

  fetch(aHeroURL)
  .then(res => res.json())
  .then(json => {
    const aHero = json.data.results[0];
    const newDivToHero = document.createElement('div');
    newDivToHero.classList.add('aHero');

    const dataHero = displayHeros(aHero);
    newDivToHero.innerHTML = dataHero;
    body.appendChild(newDivToHero);

    mainHeros.style.display = 'none';
    paginationDiv.style.display = 'none';
  });
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

    mainHeros.style.display = 'none';
    paginationDiv.style.display = 'none';
  });
}

const mainHeros = document.querySelector('#heros');
const containerAllHeros = document.querySelector('#allHeros');
const sectionHero = document.querySelector('#section-hero');

function hide(section) {
  section.className = 'hidden';
}

function show(section, classname) {
  section.className = classname;
}

function getAllHeros(offset, container) {
  fetch(`https://gateway.marvel.com:443/v1/public/characters?orderBy=name&offset=${offset}&${URL}`)
  .then(res => res.json())
  .then(json => {
      pagination(json);
      console.log(json);
      json.data.results.map((data) =>
        showHeros(data, container)
      );
      return json.data.results;
    });
}

function back() {
  let offset = parseInt(sessionStorage.getItem('offset'));
  offset -= 8;
  sessionStorage.setItem('offset', offset);
  getAllHerosFunction(offset);
};

function next() {
  let offset = parseInt(sessionStorage.getItem('offset'));
  offset += 8;
  sessionStorage.setItem('offset', offset);
  getAllHerosFunction(offset);
};

const paginationDiv = document.querySelector('#pagination');

function showHeros(data, container) {
  const newDiv = document.createElement('div');
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
  container.appendChild(newDiv);
}

function pagination(data) {
  let page = data.offset;
  let limit = data.limit;
  let total = Math.ceil(data.total / limit);

  paginationDiv.innerHTML= '';

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

function getAllHerosFunction(offset) {
	hide(mainHeros);
	hide(sectionHero);
	containerAllHeros.innerHTML = '';
  getAllHeros(offset, containerAllHeros);
	show(mainHeros, 'section-hero');
}

getAllHerosFunction(0);
