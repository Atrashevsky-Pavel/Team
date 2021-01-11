import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ServiceService} from '../../services/service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() values;
  @Output() onFormClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  constructor( private serviceService: ServiceService ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.values.name, [Validators.required]),
      surname: new FormControl(this.values.surname, [Validators.required]),
      profession: new FormControl(this.values.profession, [Validators.required]),
      age: new FormControl(this.values.age, [Validators.required])
    });
  }
  close(): void {
    this.onFormClose.emit(false);
  }
  submit(): void {
    this.serviceService.updateItem(
      {...this.form.value, id: this.values.id}
    ).subscribe(() => {
      this.onFormClose.emit( true);
      }, (error) => {
        this.onFormClose.emit(false);
        alert('error');
      });
  }
}
