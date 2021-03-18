import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDetailComponent } from './weather-detail.component';
import { WeatherService } from '../weather/weather.service';
import {HttpClientModule} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Observable } from 'rxjs';
import { foreCastData } from '../weather/weather.mockdata';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('WeatherDetailComponent', () => {
  let component: WeatherDetailComponent;
  let fixture: ComponentFixture<WeatherDetailComponent>;
  let weatherService:WeatherService;
  const getAllElementsByQuery = (queryParam: string) => {
    return fixture.debugElement.queryAll(By.css(queryParam));
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,RouterTestingModule],
      declarations: [ WeatherDetailComponent ],
      providers:[WeatherService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDetailComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.get(WeatherService);
    spyOn(weatherService, "getForecastDetails").and.callFake((city:string):Observable<any> => {
      return of(foreCastData)
    });
     fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the city five days forecast', () => {
    fixture.detectChanges();
    expect(weatherService.getForecastDetails).toHaveBeenCalled();
    let cards: DebugElement[] = getAllElementsByQuery('.weather .card');
    expect(cards.length).toBe(5);
    cards.forEach((eachCard:any,index) =>{
    let temp =  Math.round((foreCastData.list[index].main.temp -273) / 1.8)
    expect(eachCard.query(By.css('.temp')).nativeElement.textContent).toContain((foreCastData.list[index].main.temp > 0 ? '+ ' : '- ') + temp)
    expect(eachCard.query(By.css('.sealevel')).nativeElement.textContent).toContain(foreCastData.list[index].main.sea_level/1000 )
    });
  });
});
