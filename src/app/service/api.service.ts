import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormField } from '../Model/form-field.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getFormField(): Observable<FormField> {
    return this.http.get<FormField>('../../assets/FormFields.json');
  }
}
