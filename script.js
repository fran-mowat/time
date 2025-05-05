const timeStore = document.getElementsByTagName("h1")[0];

const getTime = () => {
    const current = new Date();
    const currentTime = current.toLocaleTimeString(); 
    timeStore.innerHTML = currentTime;
};

const timeUpdate = setInterval(getTime, 100);