const selectedLocation = document.getElementById("location").innerHTML;
const timeStore = document.getElementById("time");
const dateStore = document.getElementById("date");
const weekStore = document.getElementById("week");

const getDateTime = () => {
    const [timeZone, locale] = getTimeZone(selectedLocation);

    const options = { timeZone: timeZone, hour12: false };
    const dateTime = new Date().toLocaleString(locale, options);

    const [date, time] = dateTime.split(" "); 

    timeStore.innerHTML = time;

    const currentDate = new Date(date);
    const currentYear = currentDate.getFullYear(); 

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = months[currentDate.getMonth()]; 

    const currentDay = currentDate.getDate(); 
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
    const currentWeekday = weekdays[currentDate.getDay() - 1]; 

    const weekNumber = luxon.DateTime.now().setZone(timeZone).weekNumber;
    weekStore.innerHTML = `week ${weekNumber}`;

    dateStore.innerHTML = `${currentWeekday} ${currentDay}<sup>${ordinalIndicator}</sup> ${currentMonth} ${currentYear},`;
};

const getTimeZone = (selectedLocation) => {
    let timeZone = ""; 
    let locale = "en-US"; 
    if (selectedLocation === "New York"){
        timeZone = "America/New_York";
    } else if (selectedLocation === "Paris"){
        timeZone = "Europe/Paris";
    } else if (selectedLocation === "Los Angeles"){
        timeZone = "America/Los_Angeles";
    }
    return [timeZone, locale]; 
};

const dateTimeUpdate = setInterval(getDateTime, 500);