import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  info = new BehaviorSubject('information');
  http: HttpClient;



  // Fixes Unsupported Media Type
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }


  constructor(private url: string, http: HttpClient) {
    this.http = http;
   }

   getInfo(): Observable<string> {
    return this.info.asObservable();
  }

  getInfoValue(): string {
    return this.info.getValue();
  }

  setInfo(val: string) {
    this.info.next(val);
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
    // this.setInfo('Object created');

    return this.http.post(this.url, JSON.stringify(resource), this.httpOptions)
      .pipe(
        map(
          response => response
        )
      )

  }

  update(resource: any) {
    console.log('service')
    console.log(resource.id)
    this.setInfo('Object updated');

    return this.http.put(this.url + '/' + resource.id, JSON.stringify(resource), this.httpOptions)
    .pipe(
      map(
        response => response
      )
    )
  }


  delete(id: number) {
    this.setInfo('Object deleted');

    return this.http.delete(this.url + '/' + id, this.httpOptions) 
    .pipe(
      map(
        response => response
      )
    )
  }




}
