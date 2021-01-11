import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PagesService} from '../../services/pages.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit{
  @Input() count1;
  @Output() onPages: EventEmitter<number> = new EventEmitter<number>();
  @Output() onPage: EventEmitter<number> = new EventEmitter<number>();
  numberButtonGroups: number;
  buttons = [];
  currentButtons = [];
  currentPageGroup = 0;
  currentPage = 1;
  forward = false;
  back = false;
  constructor(private pagesService: PagesService) {}
  ngOnInit(): void {
    this.currentPageGroup = this.pagesService.pagesState.groupPages;
    this.currentPage = this.pagesService.pagesState.page;
    const count = this.count1 % 170;
    let pageGroups = Math.trunc(this.count1 / 170);
    if (count) {
         pageGroups++;
     }
    this.numberButtonGroups = pageGroups;
    let idxPage = 1;
    let idxGroup = 1;
    for (let i = 0; i < pageGroups; i++) {
      this.buttons[i] = [];
      while (idxPage <= (170 * (i + 1)) && idxPage < this.count1) {
        if (idxPage % 17 === 0) {
          this.buttons[i].push(idxGroup);
          idxGroup++;
        }
        if (Math.trunc(this.count1 / 17) * 17 < idxPage ) {
          this.buttons[i].push(idxGroup);
          idxGroup++;
          break;
        }
        idxPage++;
      }
    }
    this.changeGroup();
  }
  changeGroup(): void {
    this.currentButtons = this.buttons[this.currentPageGroup];
    this.forwardAndBack();
  }
  forwardAndBack(): void {
    this.forward = !!this.buttons[this.currentPageGroup + 1];
    this.back = !!this.buttons[this.currentPageGroup - 1];
    this.onPages.emit(this.currentPageGroup);
  }
  forwardCall(): void {
    this.currentPageGroup++;
    this.currentPage = this.currentPage + 10;
    this.changeGroup();
    this.servicePageState();
  }
  backCall(): void {
    this.currentPageGroup--;
    this.currentPage = this.currentPage - 10;
    this.changeGroup();
    this.servicePageState();
  }
  callPage(page: number): void {
    this.currentPage = page;
    this.onPage.emit(page);
    this.servicePageState();
  }
  servicePageState(): void {
    this.pagesService.pagesState.groupPages = this.currentPageGroup;
    this.pagesService.pagesState.page = this.currentPage;
  }
}
