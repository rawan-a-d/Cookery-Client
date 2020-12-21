import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  url = 'http://localhost:90/statistics';

  constructor(private http: HttpClient) { 
  }


  get(statisticType: string) {
    return this.http.get(this.url + "?type=" + statisticType)
      .pipe(
        map(
          response => response
        )
      )
  }
}
