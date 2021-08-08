import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isloginFailed = false;
  constructor(
    private loginSevice: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required)
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.loginSevice.login(this.loginForm.get('name').value, this.loginForm.get('pass').value).subscribe(x => {
        if (x) {
          this.route.navigate(['/items'])
        } else {
          this.isloginFailed = true;
        }
      })
    }
  }
}
