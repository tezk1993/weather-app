import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DateTime } from 'luxon';
import { getCountry } from 'countries-and-timezones';

import './App.css'
import { ToggleButton } from './components/ToggleButton';

function App() {

  const[weatherData,setWeatherData] = useState({});
  const[degreeState,setDegreeState] = useState(false);
  const[location,setLocation] = useState("London");
  const [dateState, setDateState] = useState();
  const [timezone, setTimezone] = useState();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=cb5ff6626a757b0f01317380e67324ad`;
 
  useEffect(() => {
    getInitialLocation();
  },[]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      if(weatherData.name){
        const now = DateTime.now().setZone(timezone).toFormat("HH:mm:ss");
        setDateState(now);
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    }
  }, [dateState,weatherData]);

  const getInitialLocation = async () => {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    
    axios.get(`https://api.tomtom.com/search/2/reverseGeocode/${pos.coords.latitude + ", " + pos.coords.longitude}.json?key=xVXzZ1fW2FtGEe7Rjh0h2fyWGdnVoW9R&radius=1000&mapcodes`).then((response) => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${response.data.addresses[0].address.localName}&APPID=cb5ff6626a757b0f01317380e67324ad`).then((response) => {
        setWeatherData(response.data);
        const cityFormatted = response.data.name.split(' ').join('_');
        setTimezone(getCountry(response.data.sys.country).timezones.find((element) => element.includes(cityFormatted)));
      })
    })


    setLocation('');
  };

  const searchLocation = (event) =>{
   if(event.key === 'Enter'){
        axios.get(url).then((response) => {
        console.log(response.data);
        setWeatherData(response.data);
        const cityFormatted = response.data.name.split(' ').join('_');
        setTimezone(getCountry(response.data.sys.country).timezones.find((element) => element.includes(cityFormatted)));
      })
      setLocation('');

    }
  }
  


  const ConvertTemp = (kelvin) =>{
    if(degreeState){
      return Math.floor((kelvin - 273.15) * 9/5 + 32) + "°F";
    }else{
      return Math.floor(kelvin -  273.15)  + "°C";
    }
  }

  const ConvertSpeed = (speed) =>{
    if(degreeState){
      return (Math.round((speed * 2.237) * 100) / 100).toFixed(2) + " mph";
    }
    else{
      return (Math.round(speed * 100) / 100).toFixed(2) + " M/s";
    }
  }


  return (
    
    <div  className="h-svh w-full relative bg-opacity-10 bg-black text-black p-8 overflow-auto flex flex-col 
          before:content-['']  before:bg-background-pattern  bg-no-repeat before:bg-center before:bg-cover
          before:top-0 before:left-0 before:absolute before:-z-10 before:w-full before:h-full before:object-cover " 
    >
    {weatherData.main ?
      <>
        <div className='flex justify-center items-center ' >

          <input 
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder='Enter Location'
          onKeyDown={searchLocation}
          type='text'
          className= "p-4 m-4 max-sm:w-full border-2 w-1/2 bg-white font-bold text-white bg-opacity-40 placeholder:text-white placeholder:font-bold placeholder:text-lg rounded-md focus:outline-none "
          />
          <div className='w-24 h-8'>
            <ToggleButton toggleState={degreeState} toggleText="Fahrenheit" toggleFunc={setDegreeState}/>
          </div>
        </div>
        <div className='flex-1 relative flex flex-col justify-between text-white'>
          <div className='w-full mx-auto flex flex-row items-center ' >
              <div>
               <h1>{ConvertTemp(weatherData.main.temp)}</h1> 
              </div>
              <div className="w-fit relative ml-auto  md:-rotate-90 ">
               <h3>{weatherData.weather[0].main}</h3> 
              </div>
          </div>
   

          <div >
            <div className="text-white flex flex-col items-start min-w-max max-w-screen-xl w-2/5 mx-auto m-8 ">
              <h2 className=''>{weatherData.name}</h2>
              {dateState ?<h3 className='.time'>{dateState}</h3> : <h3>00:00:00</h3>}
            </div>

            <div className="flex justify-between min-w-max max-w-screen-xl w-2/5 gap-8 p-2 mx-auto rounded-md bg-white bg-opacity-30 text-center shadow-md shadow-black ">
              <div className="text-white flex flex-col gap-2">
                <p className=" font-bold">{ConvertTemp(weatherData.main.feels_like)}</p> 
                <p className="">Feels Like</p>

              </div>
              <div className="text-white flex flex-col gap-2">
                <p className="font-bold">{weatherData.main.humidity} %</p>
                <p>Humidity</p>

              </div>
              <div className="text-white flex flex-col gap-2">
                <p className="font-bold">{ConvertSpeed(weatherData.wind.speed)}</p>
                <p>Winds</p>
              </div>
            </div>
          </div>
        </div>
      </>
      : <div> </div>}
    </div>
  )
}

export default App
