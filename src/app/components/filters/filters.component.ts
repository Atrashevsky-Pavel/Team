import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SortService} from '../../services/sort.service';
import {PagesService} from '../../services/pages.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  sortValueName = null;
  sortValueAgeStart = null;
  sortValueAgeEnd = null;
  @Output() onSort: EventEmitter<any> = new EventEmitter<any>();
  constructor(private sortService: SortService, private pagesService: PagesService) {}
  ngOnInit(): void {
    this.sortValueName = this.sortService.sortValues.sortName;
    this.sortValueAgeStart = this.sortService.sortValues.sortAgeStart;
    this.sortValueAgeEnd = this.sortService.sortValues.sortAgeEnd;
  }
  sortName(value): void {
    this.sortService.sortValues.sortName = value.target.value;
  }
  sortAgeStart(value): void {
    this.sortService.sortValues.sortAgeStart = value.target.value;
  }
  sortAgeEnd(value): void {
    this.sortService.sortValues.sortAgeEnd = value.target.value;
  }
  servicePageState(): void {
    this.pagesService.pagesState.groupPages = 0;
    this.pagesService.pagesState.page = 1;
  }
  sort(): void {
    this.servicePageState();
    this.onSort.emit();
  }
}
