import { FormGroup,FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AuthService } from '../state/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup

  constructor(private formBuilder:FormBuilder,private toastService:ToastService,private service:AuthService) {
    this.loginForm = this.formBuilder.group({
      email:null,
      password:null,
    })
   }

  onSubmit(formValue:any){
    this.service.login({
      email:formValue.email,
      password:formValue.password
    }).subscribe()
  }

  ngOnInit(): void {
  }

}
