import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcityComponent } from './components/addcity/addcity.component';
import { ListcitiesComponent } from './components/listcities/listcities.component';
import { WeatherdetailsComponent } from './components/weatherdetails/weatherdetails.component';

const routes: Routes = [
  {path:'', component: ListcitiesComponent},
  {path:'add-city', component: AddcityComponent},
  {path:'weather/:city', component: WeatherdetailsComponent},
  {path: '**', redirectTo: '', pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
