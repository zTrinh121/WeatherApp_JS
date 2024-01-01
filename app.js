var body = document.querySelector('body');
var search = document.querySelector('.search');
var city = document.querySelector('.city');
var country = document.querySelector('.country');
var value = document.querySelector('.value');
var time = document.querySelector('.time');
var shortDesc = document.querySelector('.short-desc');
var visibility = document.querySelector('.visibility span');
var wind = document.querySelector('.wind span');
var sun = document.querySelector('.sun span');
var content = document.querySelector('.content');

content.classList.add('hide');


async function changeWeatherUI(citySearch){
    console.log(search.value==="");
    let apiNameURL = `https://api.openweathermap.org/geo/1.0/direct?q=${citySearch}&limit=5&appid=40889c402e27a93d3fa626c43f92d580
    `;
    let nameData = await fetch(apiNameURL).then(res => res.json());
    if(nameData.cod === '400' || search.value==="" || nameData.length === 0){
        content.classList.add('hide');
    }else{
        content.classList.remove('hide');
        console.log(nameData[0]);
        const lat = nameData[0].lat
        const lon = nameData[0].lon
        let apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=40889c402e27a93d3fa626c43f92d580`
        let weatherData = await fetch(apiWeatherURL).then(res => res.json());
        console.log(weatherData);
        city.innerText = nameData[0].name;
        country.innerText = nameData[0].country;
        shortDesc.innerText = weatherData.weather[0].main;
        wind.innerText = weatherData.wind.speed + "m/s";
        visibility.innerText = weatherData.visibility + "m";
        sun.innerText = weatherData.main.humidity + "%"
        value.innerText = Math.round(weatherData.main.temp - 273.15);
        time.innerText = new Date().toLocaleString('vi');
        if(value.innerText <= 20){
            body.setAttribute('class', 'cool')
        }else if(value.innerText > 20 && value.innerText <=29){
            body.setAttribute('class', 'warm')
        }else{
            body.setAttribute('class', 'hot')
        }
    }
    
   
        
    
}   
search.addEventListener('keypress', function(e){
    if(e.code === 'Enter'){
        let citySearch = search.value.trim()
        changeWeatherUI(citySearch);
    }
} )