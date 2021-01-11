import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  edit = false;
  @Output() onRegisterClose: EventEmitter<any> = new EventEmitter<any>();
  constructor(private register: RegisterService) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  submit(): void {
    this.register.authenticate(this.form.value).subscribe(() => {
      this.register.edit = true;
      this.onRegisterClose.emit(false);
    });
  }
  close(): void {
    this.onRegisterClose.emit(false);
  }
}
