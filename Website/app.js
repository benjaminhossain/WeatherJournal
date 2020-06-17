/* Global Variables */
const personalKey = 'd10257e2889938b6f8f22f5bc4337037';

//GET Method
const getData = async (finalURL) => {
    const request = await fetch (finalURL);
    try {
        const weatherData = await request.json;
        console.log (weatherData);
        console.log(weatherData.main['temp']);
        //console.log(weatherData.main['temp']);
        return weatherData;
    } catch (error){
        console.log('error', error);
     }
}

//POST Method
const postData = async(url = '', data = {}) => {
    console.log('postData', data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
   
    try {
        const newData = await response.json();
        console.log('newData ', newData);
        return newData;
    }catch(error) {
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
  const finalURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipInput},us&APPID=${personalKey}`
   console.log(finalURL);

  getData(finalURL)
    .then((weatherData) => {
     postData('/add', {date: newDate, userResponse: feelings});
   });
}