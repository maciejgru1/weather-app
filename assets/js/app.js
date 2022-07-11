let weatherForm = document.querySelector(".weather__form")
let weatherCity = document.querySelector(".weather__city")
let weatherAPI = document.querySelector(".weather__api")
let weatherLoader = document.querySelector(".weather__loader")
let showLoaderTime = 800
let map = ''

let apiUrl = 'https://api.weatherapi.com/v1/forecast.json?key=b765b0f794c749988ea74040220907&aqi=no&&days=4&q='


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let city = weatherCity.value
    if (city === "") {
        weatherCity.style.border = "2px solid red"
        return false
    }

    showLoader();

    let fullAPIaddresscall = apiUrl + city

    weatherCity.style.border = "none"

    fetch(fullAPIaddresscall)
        .then(
            response => {
                if (!response.ok) {
                    throw Error(response.json())
                }
                return response.json()
            })
        .then(data => {
            let view = ''
            view += `<div class="weather__leftside">`
            view += `<div class="weather__mainInfo">`
            view += `<div class="weather__temp">
                    <span class="degree">${data.current.temp_c}</span>
                    <span class="unit">&deg;</span>
                </div>`

            view += `<div class="weather_data">
                <p>Rainfall: <b>${data.current.precip_mm} mm</b></p>
                <p>Humidity: <b>${data.current.humidity}%</b></p>
                <p>Wind: <b>${data.current.wind_kph} kph</b></p>
                </div>`

            view += `<div class="weather_icon"><img src="${data.current.condition.icon}" alt="${data.current.condition.text}"></div>`

            view += `</div>`

            //next days

            view += `<h2 class="weather__next"> Next days </h2>`

            view += `<div class="weather__days">`

            data.forecast.forecastday.forEach((day) => {
                view += `<div class="weather__day">`
                view += `<div class="weather__date"> ${day.date} </div>`
                view += `<div class="weather_icon"><img src="${day.day.condition.icon}" alt="${day.day.condition.text}"></div>`
                view += `<div class="weather__avgtemp"> ${day.day.avgtemp_c} <span class="unit">&deg;</span></div>`
                view += `</div>`
            })

            view += `</div></div>`

            view += `<div class="weather__rightside"><div id="weather__map" class="weather__map"></div></div>`

            setTimeout(() => {
                weatherAPI.innerHTML = view
                showMap(data.location.lat, data.location.lon)
            }, showLoaderTime)

            hideLoader()
        }).catch(error => {
            setTimeout(() => {
                weatherAPI.innerHTML = '<div class="weather__error">City has not been found or try again later</div>'
            }, showLoaderTime)
            hideLoader()
        })

})

let showLoader = () => {
    weatherLoader.style.display = 'block'
    clearApiData()
}

let hideLoader = () => {

    setTimeout(() => {
        weatherLoader.style.display = 'none'
    }, showLoaderTime)
}

let clearApiData = () => {
    weatherAPI.innerHTML = ''
}

weatherCity.addEventListener('keyup', () => {
    if (weatherCity.value === '') {
        clearApiData()
    }
})

let showMap = (lat, lng) => {
    map = new google.maps.Map(document.getElementById("weather__map"), {
        center: { lat, lng },
        zoom: 10,
        styles: [
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e9e9e9"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dedede"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ffffff"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "saturation": 36
                    },
                    {
                        "color": "#333333"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#fefefe"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            }
        ]
    });

    new google.maps.Marker({
        position: { lat, lng },
        map,
        title: "Location",
    });
}