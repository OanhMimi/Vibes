import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Thought } from '../shared/interface/thought';

const API_URL_THOUGHT = 'http://localhost:3000/api/thoughts/';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  autoSave(formValue: any): Observable<Thought> {
    return this.http.post<Thought>(API_URL_THOUGHT, formValue)
  }
}
