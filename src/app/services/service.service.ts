import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SortService} from './sort.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private urlBase = 'http://laravelteam1/';
  constructor(private http: HttpClient,
              private sortService: SortService) { }
  getCount(): Observable<any> {
    return  this.http.post(this.urlBase + 'count', {
      ...this.sortService.sortValues
    });
  }
  getList(start: number, finish: number): Observable<any> {
    return this.http.post(this.urlBase + 'list', {
      start,
      finish,
      ...this.sortService.sortValues
    });
  }

  updateItem(values): Observable<any> {
    return this.http.put(this.urlBase + 'update', {
      ...values
    });
  }
  deleteItem(id: number): Observable<any> {
    return this.http.get(this.urlBase + `delete?id=${id}`);
  }
}
