/* Global Variables */
const personalKey = 'd10257e2889938b6f8f22f5bc4337037';

//GET Method - Gets the weatherAPI data
const getData = async (finalURL) => {
    const request = await fetch (finalURL);
     try {
        const weatherData = await request.json();
        console.log (weatherData);
        console.log(weatherData.main['temp']); //gets the temperature 
        return weatherData;
    } catch (error){
        console.log('error', error);
     }
}

//POST Method
const postData = async(url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error) {
        console.log("error", error);
    }
};

//Update UI - Updates the UI according to most recent entry
const updateUI = async() => {
    const request = await fetch('/all');
    console.log ('UpdateUI request ', request);
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = "Today is, " + allData.date;
        document.getElementById('temp').innerHTML = "It's " + allData.temperature.toFixed() + 'F';
        document.getElementById('content').innerHTML = "You're feeling " + allData.userResponse;
    }
    catch(error){
        console.log("error", error);
    }
};

//Event listener
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
  const zipInput = document.getElementById('zip').value;
  const userResponse = document.getElementById('feelings').value;
  const d = new Date();
  const newDate = d.toDateString();
  const finalURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipInput},us&units=imperial&APPID=${personalKey}`;
   console.log(finalURL);

  getData(finalURL)
    .then((weatherData) => {
        postData('/add', {temperature: weatherData.main['temp'], date: newDate, userResponse: userResponse});
   })
   .then(updateUI)
}
