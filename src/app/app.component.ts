import {Component} from '@angular/core';
import {ServiceService} from './services/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  filter = false;
  count: number;
  pagesListArr: Array<any>;
  pageArr: object;
  registerShow = false;
  formShow = false;
  formValues;
  constructor(private serviceService: ServiceService)  {
    this.mainCall();
  }
  mainCall(): void {
    this.count = null;
    this.serviceService.getCount().subscribe((data) => {
      this.count = data;
    });
  }
  callPages(num): void {
    const start = num * 170;
    this.serviceService.getList( start, 170)
      .subscribe((data) => {
        this.pagesListArr = data;
        this.callPage(1);
      });
  }
  callPage(num): void {
    num = num % 10;
    if (num === 0) {
      num = 10;
    }
    this.pageArr = this.pagesListArr.slice(17 * (num - 1), 17 * num);
  }
  filterShow(): void {
    this.filter = !this.filter;
  }
  closeFilter(): void {
    this.mainCall();
    this.filter = false;
  }
  register(check): void {
    this.registerShow = check;
    this.mainCall();
  }
  formCall(value): void {
    this.formShow = true;
    this.formValues = value;
  }
  formCallClose(check): void {
    this.formShow = false;
    if (check) {
      this.mainCall();
    }
  }
}
