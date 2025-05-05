const locationStore = document.getElementById("location");
const timeStore = document.getElementById("time");
const dateStore = document.getElementById("date");

const getLocation = () => {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            locationStore.innerHTML = `${latitude} ${longitude}`;
            console.log(`${latitude} ${longitude}`);
        }, 
        (error) => {
            console.log(`Error retrieving coordinates: ${error.code} ${error.message}`);
        });
    } else {
        console.log("Geolocation not supported by browser.");
    }
};

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
    const currentWeekday = weekdays[current.getDay()]; 

    const weekNumber = luxon.DateTime.now().weekNumber;

    dateStore.innerHTML = `${currentWeekday} ${currentDay}${ordinalIndicator} ${currentMonth} ${currentYear}, week ${weekNumber}`;
};

const dateTimeUpdate = setInterval(getDateTime, 100);
getLocation();