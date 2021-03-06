window.addEventListener("load", () => {

    const search = document.querySelector('.search');
    const cardConteiner = document.querySelector('.cardContainer');
     //Запрос API фильмы
    function getFilm() {
        return axios.get('https://swapi.co/api/films')
            .then(function (response) {
                for (let i = 0; i < response.data.results.length; i++) {
                    const loaderCard = document.querySelector('.loaderCard');
                    loaderCard.style.display = 'none';
                    const loaderCard__Container = document.querySelector('.loaderCard__Container');
                    loaderCard__Container.style.display = 'none';
                    const newcard = document.createElement("div");
                    newcard.classList.add("card");
                    newcard.innerHTML = `<div class="loader"></div><div class="img__pixabay"></div><div class="container"><h4 class="filmTitle"><a class="filmUrl" href=${response.data.results[i].url}>${response.data.results[i].title}</a></h4><p class="director">${response.data.results[i].director}</p></div>`;
                    cardConteiner.insertBefore(newcard, cardConteiner.lastElementChild);

                }
                return response.data.results;
            })
            .then(getImage)
            .catch(console.log)
    }

    getFilm();

    //запрос API на картинку
    function getImage(films) {
        // console.log(films);
        let API_KEY = '14082008-771b0f9b47719e2f6a1f8fc90';
        const img__pixabay = document.querySelectorAll('.img__pixabay');
        counter = img__pixabay.length;
         for (let i = 0; i < counter; i++) {
            let URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(films[i].title);
            axios.get(`${URL}`)
                .then(function (response) {
                    const loader = document.querySelectorAll('.loader');
                    for (let j = 0; j < img__pixabay.length; j++) {
                        loader[j].style.display = 'none';
                    }
                    if (response.data.totalHits !== 0) {
                        if (counter > 7){
                            let n = counter;
                            img__pixabay[i+n-7].innerHTML = `<div><img src="${response.data.hits[0].webformatURL}" alt=""/></div>`
                        } else {img__pixabay[i].innerHTML = `<div><img src="${response.data.hits[0].webformatURL}" alt=""/></div>`}

                    } else {
                        if (counter > 7){
                            let n = counter;
                            console.log(`Неудалось найти картинку по названию ${films[i].title}`);
                            img__pixabay[i+n-7].innerHTML = `<img src="img/Placeholder.png" alt=""/>`;
                        } else {
                            console.log(`Неудалось найти картинку по названию ${films[i].title}`);
                            img__pixabay[i].innerHTML = `<img src="img/Placeholder.png" alt=""/>`;
                        }
                    }

                })
                .catch(console.log);
        }
    }

    //кнопка прогрузки
    const info = document.querySelector('.info');
    info.addEventListener('click', getFilm);


    //Поиск по загруженым фильмам
    function searchFilm() {
        const filmTitle = document.querySelectorAll('.filmTitle');
        let input, card, a, i, filter;
        card = document.querySelectorAll('.card');
        input = document.querySelector('.search');
        filter = input.value.toUpperCase();
        for (i = 0; i < card.length; i++) {
            const cardContainer = document.querySelector('.cardContainer');
            a = filmTitle[i].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                card[i].style.display = "";
                card[i].style.margin = '';
                cardContainer.style.justifyContent = 'space-evenly';
                card[i].style.justifyContent = 'space-around';
            } else {
                card[i].style.display = "none";

            }
        }
    }
    //запуск поиска фильмов
    search.onkeyup = searchFilm;

});