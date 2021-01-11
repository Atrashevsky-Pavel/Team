import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  pagesState = {
    page: 1,
    groupPages: 0
  };
}
