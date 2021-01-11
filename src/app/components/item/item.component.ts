import {Component, DoCheck, EventEmitter, Input, Output} from '@angular/core';
import {ServiceService} from '../../services/service.service';
import {RegisterService} from '../../services/register.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements DoCheck {
  editCan = false;
  @Input() item;
  @Output() onAfterSubmit: EventEmitter<number> = new EventEmitter<number>();
  @Output() onFormShow: EventEmitter<number> = new EventEmitter<number>();
  constructor(private serviceService: ServiceService, private register: RegisterService ) {


  }
  ngDoCheck() {
    this.editCan = this.register.edit;
    console.log('item');
  }
  edit(index): void {
    this.onFormShow.emit(this.item[index]);
  }
  deleteItem(id): void {
    this.serviceService.deleteItem(id).subscribe(
      () => {
        alert('Запись удалена');
        this.onAfterSubmit.emit();
    }, () => {
        alert('Ошибка');
      });
  }
}
