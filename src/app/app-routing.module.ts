import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutePath } from './route-path';
import { WeatherComponent } from '../app/weather/weather.component';
import { WeatherDetailComponent } from '../app/weather-detail/weather-detail.component';

const routes: Routes = [
  {
  path: RoutePath.weather,
  component: WeatherComponent,
  pathMatch: 'full',
},
{
  path: RoutePath.weatherDetail,
  component: WeatherDetailComponent
},
{
  path: RoutePath.default,
  component: WeatherComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
