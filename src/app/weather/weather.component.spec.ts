import { ComponentFixture, TestBed ,async, inject} from '@angular/core/testing';

import { WeatherComponent } from './weather.component';
import { WeatherDetailComponent } from '../weather-detail/weather-detail.component';
import {WeatherService} from './weather.service';
import { RouterTestingModule } from '@angular/router/testing';
import { mockWeatherData } from './weather.mockdata'
import { of, Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherService:WeatherService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [  
            RouterTestingModule.withRoutes([
                { path: 'weatherDetail/:city', component: WeatherDetailComponent }
               ]),
            HttpClientTestingModule,HttpClientModule
        ],
        declarations: [WeatherComponent, WeatherDetailComponent],
        providers: [
          WeatherService,
        ]
    }).compileComponents().then(() => {
        fixture = TestBed.createComponent(WeatherComponent);
    });
}));

 
const getAllElementsByQuery = (queryParam: string) => {
  return fixture.debugElement.queryAll(By.css(queryParam));
};

const converttoTime = (date) => {
    let dateObj = new Date(date);
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let seconds = dateObj.getSeconds();

    let timeString =
      (hours > 12
        ? (hours - 12).toString().padStart(2, "0")
        : hours.toString().padStart(2, "0")) +
          ":" +
          minutes.toString().padStart(2, "0") +
          ":" +
          seconds.toString().padStart(2, "0");
    return timeString;
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    weatherService = TestBed.get(WeatherService);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    spyOn(weatherService, "getWeatherData").and.callFake((city:string):Observable<any> => {
      return of(mockWeatherData.filter(y => y.name === city)[0])
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the list of the european countries', () => {
    expect(weatherService.getWeatherData).toHaveBeenCalledTimes(5)
    let cards: DebugElement[] = getAllElementsByQuery('.weather .card');
    expect(cards.length).toBe(5);
    cards.forEach((eachCard:any,index) =>{
      expect(eachCard.query(By.css('.title')).nativeElement.textContent).toBe(mockWeatherData[index].name);
      let temp =  Math.round((mockWeatherData[index].main.temp -273) / 1.8)
      expect(eachCard.query(By.css('.temp')).nativeElement.textContent).toContain((mockWeatherData[index].main.temp > 0 ? '+ ' : '- ') + temp)
      expect(eachCard.query(By.css('.sunrise')).nativeElement.textContent).toContain(converttoTime(mockWeatherData[index].sys.sunrise))
      expect(eachCard.query(By.css('.sunset')).nativeElement.textContent).toContain(converttoTime(mockWeatherData[index].sys.sunset))
    });
  });

 it('should naviage to details page on click of the card',
    async(inject([Router, Location], (router: Router, location: Location) => {
     const card = fixture.debugElement.query(By.css('.card:first-child'));
    card.nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/weatherDetail/France');
      });
  })));


});
