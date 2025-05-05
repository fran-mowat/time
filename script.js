const locationStore = document.getElementById("location");
const sunriseStore = document.getElementById("sunrise");
const sunsetStore = document.getElementById("sunset");
const timeStore = document.getElementById("time");
const dateStore = document.getElementById("date");
const weekStore = document.getElementById("week");

const getLocation = () => {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            getSunTimes(latitude, longitude);
            getCity(latitude, longitude);
        }, 
        (error) => {
            console.log(`Error retrieving coordinates: ${error.code} ${error.message}`);
        });
    } else {
        console.log("Geolocation not supported by browser.");
    }
};

//retrieving sunrise and sunset times from https://sunrise-sunset.org/ API
const getSunTimes = async (latitude, longitude) => {
    try{
        const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=today`);
        if (!response.ok) throw Error("Error fetching sunrise and sunset times");
        const data = await response.json(); 

        let sunriseTime = convertTime(data.results.sunrise); 
        let sunsetTime = convertTime(data.results.sunset);

        sunriseStore.innerHTML = `Sunrise: ${sunriseTime}`; 
        sunsetStore.innerHTML = `Sunset: ${sunsetTime}`;
    } catch (error){
        console.log(error);
    }
};

const getCity = async (latitude, longitude) => {
    try{
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`);
        if (!response.ok) throw new Error("Error reverse geocoding coordinates");
        const data = await response.json(); 
        locationStore.innerHTML = `Time in ${data.results[0].components.city}:` || "";
    } catch (error){
        console.log(error);
    }
};

const convertTime = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");
    if (modifier === "PM" && hours != "12"){
        hours = parseInt(hours, 10) + 12; 
    } else if (modifier === "AM" && hours === "12"){
        hours = "00";
    }

    hours = hours.toString().padStart(2, "0");

    return `${hours}:${minutes}`;
}

const getDateTime = () => {
    const current = new Date();
    const currentTime = current.toLocaleTimeString(); 
    timeStore.innerHTML = currentTime;

    const currentYear = current.getFullYear(); 

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = months[current.getMonth()]; 

    const currentDay = current.getDate(); 
    let ordinalIndicator; 
    if (currentDay == 1 || currentDay == 21 || currentDay == 31){
        ordinalIndicator = "st";
    } else if (currentDay == 2 || currentDay == 22){
        ordinalIndicator = "nd";
    } else if (currentDay == 3 || currentDay == 23){
        ordinalIndicator = "rd"; 
    } else {
        ordinalIndicator = "th"; 
    }

    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const currentWeekday = weekdays[current.getDay() - 1]; 

    const weekNumber = luxon.DateTime.now().weekNumber;

    dateStore.innerHTML = `${currentWeekday} ${currentDay}<sup>${ordinalIndicator}</sup> ${currentMonth} ${currentYear},`;
    weekStore.innerHTML = `week ${weekNumber}`;
};

const dateTimeUpdate = setInterval(getDateTime, 500);
getLocation();

const themeToggle = document.getElementById("toggle-container");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")
})