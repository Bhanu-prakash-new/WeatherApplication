const mockWeatherData = [
  { name: 'France', main: {temp: 300.15}, sys :{sunrise: 1616048399, sunset: 1616091961 }},
  { name: 'Spain', main: {temp: 300.15}, sys :{sunrise: 1616048399, sunset: 1616091961 }},
  { name: 'Italy', main: {temp: 300.15}, sys :{sunrise: 1616048399, sunset: 1616091961 }},
  { name: 'Turkey', main: {temp: 300.15}, sys :{sunrise: 1616048399, sunset: 1616091961 }},
  { name: 'London', main: {temp: 300.15}, sys :{sunrise: 1616048399, sunset: 1616091961 }},
];

const foreCastData ={list:[
  {dt_txt:"2021-03-18 09:00:00",main:{temp: 299.68,sea_level:1008}},
  {dt_txt:"2021-03-19 09:00:00",main:{temp: 299.68,sea_level:1008}},
  {dt_txt:"2021-03-20 09:00:00",main:{temp: 299.68,sea_level:1008}},
  {dt_txt:"2021-03-21 09:00:00",main:{temp: 299.68,sea_level:1008}},
  {dt_txt:"2021-03-22 09:00:00",main:{temp: 299.68,sea_level:1008}}
]}
export {mockWeatherData,foreCastData} 