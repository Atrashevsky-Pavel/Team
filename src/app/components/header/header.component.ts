import {Component, EventEmitter, Output} from '@angular/core';
import {SortService} from '../../services/sort.service';
import {PagesService} from '../../services/pages.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchValue = null;
  @Output() onFilterShow: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRegisterShow: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCloseFilter: EventEmitter<any> = new EventEmitter<any>();
  constructor(private sort: SortService, private pagesService: PagesService) {}
  filter(): void {
    this.onFilterShow.emit();
  }
  searchValueSend(value): void {
    this.sort.sortValues.searchName = value.target.value;
  }
  search(): void {
    this.servicePageState();
    this.onSearch.emit();
  }
  register(): void {
    this.onRegisterShow.emit(true);
  }
  servicePageState(): void {
    this.pagesService.pagesState.groupPages = 0;
    this.pagesService.pagesState.page = 1;
  }
  dropFilters(): void {
    this.servicePageState();
    this.searchValue = null;
    this.sort.sortValues.searchName = null;
    this.sort.sortValues.sortName = null;
    this.sort.sortValues.sortAgeStart = null;
    this.sort.sortValues.sortAgeEnd = null;
    this.onCloseFilter.emit();
  }
}
