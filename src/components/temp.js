import React,{useState,useEffect} from "react";
import WeatherCard from "./weatherCard";
// api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid={c02de18bfe0aa2c49a2da5ae4ab7305b}
const Temp = () => {
const [searchValue,setSearchValue]=useState("Hubli")
const [tempInfo,setTempInfo]=useState({})
const getWeatherInfo=async()=>{
try{
let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=c02de18bfe0aa2c49a2da5ae4ab7305b`
const res=await fetch(url)
const data= await res.json()
const{temp,humidity,pressure}=data.main
const{main:weathermood}=data.weather[0]
const {name}=data
const {speed}=data.wind
const {country,sunset}=data.sys
const myNewWeatherInfo={
  temp,humidity,pressure,weathermood,name,speed,country,sunset
}
setTempInfo(myNewWeatherInfo)
console.log(data)
}catch(error){
  console.log(error)
}
}
useEffect(()=>{
getWeatherInfo();
},[])
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            autoFocus
            placeholder="🔎search..."
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e)=>{setSearchValue(e.target.value)}}
          />
          <button className="searchButton" type="button" onClick={getWeatherInfo}>
            search
          </button>
        </div>
      </div>
      {/* outr temperature card */}
     <WeatherCard tempInfo={tempInfo}/>
    </>
  );
};

export default Temp;
