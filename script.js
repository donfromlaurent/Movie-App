'use strict';

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1bee3288995e6d1c702a9c3df55771ff&page=2';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=1bee3288995e6d1c702a9c3df55771ff';
const main = document.getElementById("main");
const form = document.getElementById("search_form");
const search = document.getElementById("search");
const logo = document.querySelector(".logo");

getMovies(API_URL);

async function getMovies(url){
	const res = await fetch(url);
	const data = await res.json();

	console.log(data)
	if(data.results.length === 0){
		main.innerHTML = '';

		const createErrorEl = document.createElement("div");
		createErrorEl.innerHTML = `<h1>Sorry! The movie does not exist </h1>`;
		main.appendChild(createErrorEl);
	}
	else{
		showMovies(data.results);
	}
}

function  showMovies(movie) {
	main.innerHTML = "";
	movie.forEach((movie) => {
		const {title, poster_path, vote_average, overview} = movie;
		const createEl = document.createElement('div');
		createEl.classList.add('movie');

		createEl.innerHTML = `
		<img src="${IMG_PATH + poster_path}" alt="movie image" class="movie-img" />
		<div class="movie-info">
			<h3>${title}</h3>
			<span class="${getOverviewRating(vote_average)}">${vote_average}</span>
		</div>
		<div class="overview">
			<h3 class="overview">
			${overview}
			</h3>
		</div>
		`;

		main.appendChild(createEl);
	});
}

function getOverviewRating(rating) {
	if(rating >= 8){
		return 'green';
	}
	else if(rating >= 5){
		return 'orange';
	}
	else{
		return 'red';
	}
}

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const searchTerm = search.value;

	if(searchTerm && searchTerm !==""){
		getMovies(SEARCH_URL + searchTerm);
		search.value = "";
	}
	else{
		window.location.reload();
	}
});

logo.addEventListener("click", () => {
	main.innerHTML = "";
	getMovies(API_URL);
});