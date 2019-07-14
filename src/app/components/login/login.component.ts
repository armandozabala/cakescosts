import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  pass = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    console.log(this.email + ' ' + this.pass);
      this.authService.loginEmailUser(this.email, this.pass)
      .then( (res) => {
        this.router.navigate(['home']);
      }).catch( err =>
        console.log(err)
      );
  }

}
