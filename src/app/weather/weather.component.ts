import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export interface weatherData {
  name: string;
  temp: number;
  sunrise: number;
  sunset: number;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  weatherData: weatherData[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    let cities:string[] = ['France', 'Spain', 'Italy', 'Turkey', 'London'];
    
    forkJoin(
      cities.map(city =>
        this.weatherService.getWeatherData(city).pipe(
          map((data) =>  data)
    ).subscribe((response: any) => {
      let {name,main:{temp},sys:{sunrise,sunset}} = response;
      this.weatherData.push({name,temp: Math.round((temp -273) / 1.8),sunrise,sunset})
     })));
  }
}
