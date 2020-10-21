import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  http: HttpClient;

  // Fixes Unsupported Media Type
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }


  constructor(private url: string, http: HttpClient) {
    this.http = http;
   }

  getAll() {
    return this.http.get(this.url)
      .pipe(
        map(
          response => response
        )
      )
  }

  get(id: any) {
    return this.http.get(this.url + '/' + id)
      .pipe(
        map(
          response => response
        )
      )
  }

  create(resource: any) {
    console.log("resource");

    console.log(resource);
    return this.http.post(this.url, JSON.stringify(resource), this.httpOptions)
      .pipe(
        map(
          response => response
        )
      )
  }

  update(resource: any) {
    return this.http.put(this.url + '/' + resource.id, JSON.stringify(resource))
    .pipe(
      map(
        response => response
      )
    )
  }


  delete(id: number) {
    return this.http.delete(this.url + '/' + id) 
    .pipe(
      map(
        response => response
      )
    )
  }




}
