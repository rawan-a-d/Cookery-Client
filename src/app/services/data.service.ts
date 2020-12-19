import { AuthHttpInterceptor } from './auth-http.interceptor';
import { HttpClient, HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  info = new BehaviorSubject('information');
  http: HttpClient;

  constructor(private url: string, http: HttpClient) {
    this.http = http;
   }
  requestCounter: number;

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

    return this.http.post(this.url, JSON.stringify(resource))
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

    return this.http.put(this.url + '/' + resource.id, JSON.stringify(resource))
    .pipe(
      map(
        response => response
      )
    )
  }


  delete(id: number) {
    this.setInfo('Object deleted');

    return this.http.delete(this.url + '/' + id) 
    .pipe(
      map(
        response => response
      )
    )
  }




}
