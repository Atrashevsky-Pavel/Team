import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  sortValues = {
    searchName: null,
    sortName: null,
    sortAgeStart: null,
    sortAgeEnd: null
  };
}
