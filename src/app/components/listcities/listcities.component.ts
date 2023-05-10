import { Component, OnInit } from '@angular/core';
import { CitiesRepository } from 'src/app/repositories/cities.repo';

@Component({
  selector: 'app-listcities',
  templateUrl: './listcities.component.html',
  styleUrls: ['./listcities.component.css']
})
export class ListcitiesComponent implements OnInit {
  cities: any;

  constructor(private citiesRepo:CitiesRepository) { }

  async ngOnInit(): Promise<void> {
      this.cities = await this.citiesRepo.getAllCities();
  }
}
