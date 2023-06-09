import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient : HttpClient) { }

  getWeather(city: string, apiKey: string): Promise<any> {
    const params = new HttpParams()
                .set("q", city)
                .set("units", "metric")
                .set("appid", apiKey);

    return lastValueFrom(
        this.httpClient.get(environment.openWeatherApiUrl
            , {params: params}));
  }
}
