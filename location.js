const selectedLocation = document.getElementById("location").innerHTML;
const timeStore = document.getElementById("time");
const dateStore = document.getElementById("date");
const weekStore = document.getElementById("week");

const getDateTime = () => {
    const dateTime = getTimeZone(selectedLocation);
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

    dateStore.innerHTML = `${currentWeekday} ${currentDay}<sup>${ordinalIndicator}</sup> ${currentMonth} ${currentYear},`;
};

const getTimeZone = (selectedLocation) => {
    if (selectedLocation === "New York"){
        const options = { timeZone: "America/New_York", hour12: false };
        const dateTime = new Date().toLocaleString("en-US", options);
        return dateTime; 
    }
};

const dateTimeUpdate = setInterval(getDateTime, 500);