import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private REST_API_SERVER = "http://api.openweathermap.org/data/2.5/weather?q={cityname}&appid=3d8b309701a13f65b660fa2c64cdc517";
  private WEATHER_FORECAST = "http://api.openweathermap.org/data/2.5/forecast?q={cityname}&appid=3d8b309701a13f65b660fa2c64cdc517";

  constructor(private httpClient: HttpClient) { }

  public getWeatherData(city : string){
    return this.httpClient.get(this.REST_API_SERVER.replace('{cityname}',city));
  }

  public getForecastDetails(city : string){
    return this.httpClient.get(this.WEATHER_FORECAST.replace('{cityname}',city));
  }
}
