import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";


@Component({
  selector: 'at-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectForm: FormGroup;

  minProjectDate = new Date();

  allDevs = [

    { label: 'Jill', value: 'Jill Cool' },
    { label: 'Joe', value: 'Joe Cool' },
    { label: 'Mary', value: 'Mary Cool' },
    { label: 'Susan', value: 'Susan Jones' },
    { label: 'Phil', value: 'Phil Stephens' },
    { label: 'Karen', value: 'Karen Phillips' },
    { label: 'Chris', value: 'Chris Hampton' },
    { label: 'Si', value: 'Si Chew' },
    { label: 'Terri', value: 'Terri Smith' }

  ]


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.projectForm = this.fb.group({
      // '' is a default value
      'projectId': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      'description': ['My cool project', [Validators.required, Validators.maxLength(120)]],
      'startDate': [new Date(), Validators.required],
      'projectType': ['B'],
      'selectedDevs': [[]],
      'rating': [3]
    })

  }

  hasFormErrors() {
    return !this.projectForm.valid;
  }

  /*
    fieldErrors(field:string) {
        let controlState = this.projectForm.controls[field];
        return(controleState.dirty && controlState.errors) ? controlsState.errors : null;
    }
  */

  onSubmit() {
    alert(JSON.stringify(this.projectForm.value));
  }
}
