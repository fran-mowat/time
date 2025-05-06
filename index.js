const timeStore = document.getElementById("time");
const dateStore = document.getElementById("date");
const weekStore = document.getElementById("week");

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
