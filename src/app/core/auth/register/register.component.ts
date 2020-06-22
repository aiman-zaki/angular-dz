import { AuthModel } from './../../../shared/models/auth.model';
import { AuthService } from './../state/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup} from '@angular/forms';
import { ToastService } from 'src/app/shared/toast/toast.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup


  constructor(private router:Router,private formBuilder:FormBuilder,private toastService:ToastService,private service:AuthService) {
    this.registerForm = this.formBuilder.group({
      email:null,
      password:null,
      confirm_password:null,
    })
   }

  onSubmit(formValue:any) {
    let auth:AuthModel = {
      email:formValue.email,
      password:formValue.password,
    }
    this.service.regster(auth).subscribe()

  }

  ngOnInit(): void {

  }

}
