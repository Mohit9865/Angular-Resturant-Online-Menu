import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
registration:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.registration = this.fb.group({
      Email:['',Validators.compose([Validators.required,Validators.email])],
      Password:['',Validators.compose([Validators.required])],
      ConfirmPassword:['',Validators.compose([Validators.required])]
    })
  }

}
