import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  edit = false;
  constructor(private http: HttpClient) { }
  private urlBase = 'http://laravelteam1/';
  authenticate(values): Observable<any> {
    return  this.http.post(this.urlBase + 'authenticate', {
      ...values
    });
  }
}
