import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss']
})
 
export class WeatherDetailComponent implements OnInit {
  public cityname: string = 'bar';
  public weatherData = [];

  constructor(private weatherService: WeatherService,protected route: ActivatedRoute) {
  }

  getForecastDetails(): void {
    this.cityname = this.route.snapshot.params['city'];
    this.weatherService.getForecastDetails(this.cityname).subscribe((response: any) => {
       this.weatherData =  response.list.reduce((obj,data) => {
        if(data.dt_txt.includes("09:00:00")){
          let {dt_txt:date,main:{temp,sea_level}} = data;
          obj.push({temp: Math.round((temp -273) / 1.8),sea_level:sea_level/1000,date})
         }
        return obj;
      },[])
    });
  }

  ngOnInit() :void {
    this.getForecastDetails();
  }
}
