import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormField, FormFieldJSON } from 'src/app/Model/form-field.model';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'sm-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss'],
})
export class MemberFormComponent implements OnInit {
  formFields: FormFieldJSON[] = [];
  dynamicForm = this.fb.group({});

  constructor(private api: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getDynamicFormField();
  }

  getDynamicFormField() {
    this.api.getFormField().subscribe((resp: FormField) => {
      console.log(resp);
      this.formFields = resp.data;
      this.setDynamicForm(resp.data);
    });
  }

  setDynamicForm(controls: FormFieldJSON[]) {
    for (let control of controls) {
      const validators = [];
      if (control.validators?.required) {
        validators.push(Validators.required);
      }
      this.dynamicForm.addControl(
        control.name,
        this.fb.control(control.value, validators)
      );
    }
  }

  saveForm() {
    console.log(this.dynamicForm.value);
  }
}
