import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/app/environment/environment';
import { Weather } from 'src/app/model/weather';
import { CitiesRepository } from 'src/app/repositories/cities.repo';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weatherdetails',
  templateUrl: './weatherdetails.component.html',
  styleUrls: ['./weatherdetails.component.css']
})
export class WeatherdetailsComponent implements OnInit,OnDestroy{

  param$!: Subscription
  private city: string = ""
  openweatherApiKey: string = environment.openWeatherApiKey;
  model = new Weather(this.city, 0,0,0,"", "", 0,0);


  constructor(private router:Router,private activatedRoute:ActivatedRoute, private citiesRepo:CitiesRepository, private weatherSvc:WeatherService) { }

  ngOnInit(): void {
      this.param$=this.activatedRoute.params.subscribe(
        (selectedCity)=>{
          this.city=selectedCity['city'];
        });
        this.getWeatherDetailsFromAPI(this.city);
  }
  ngOnDestroy(): void {
    this.param$.unsubscribe();    
  }

  getWeatherDetailsFromAPI(city : string){
    this.weatherSvc.getWeather(city,this.openweatherApiKey).then(async (result) =>{
      const cityImageUrl = await this.citiesRepo.getCityImageUrl(city);
      this.model = new Weather(
        city,
        result.main.temp,
        result.main.pressure,
        result.main.humidity,
        result.weather[0].description,
        cityImageUrl,
        result.wind.degree,
        result.wind.speed
      )
    }).catch( (err)=>{
      this.router.navigate(['']);
    })
  }

}
