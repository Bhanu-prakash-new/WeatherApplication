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
      console.log(response,'try')
       this.weatherData =  response.list.reduce((obj,data) => {
        if(data.dt_txt.includes("09:00:00")){
          let {dt_txt:date,main:{temp,sea_level}} = data;
          obj.push({temp,sea_level,date})
         }
        return obj;
      },[])
      console.log(this.weatherData);
    });
  }

  ngOnInit() :void {
    this.getForecastDetails();
  }
}
