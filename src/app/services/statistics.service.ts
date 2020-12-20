import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService extends DataService {


  constructor(private httpClient: HttpClient) { 
    super('http://localhost:90/statistics', httpClient)
  }
}
