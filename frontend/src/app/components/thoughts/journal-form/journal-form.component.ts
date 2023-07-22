import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { DataService } from 'src/app/_services/data-service.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-journal-form',
  templateUrl: './journal-form.component.html',
  styleUrls: ['./journal-form.component.css']
})
export class JournalFormComponent implements OnInit{
  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder
  ){}
 
  journalForm: FormGroup;

  adjustTextArea(event: any){
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  }

  ngOnInit(): void {
    this.journalForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),

  })

    this.journalForm.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(newFormValue => {
      this.dataService.autoSave(newFormValue);
    })

  }

 
}
