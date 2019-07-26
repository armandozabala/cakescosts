import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged: boolean = false;

  constructor(private authService: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  getCurrentUser(){
      this.authService.isAuth().subscribe( auth => {

       /* if(auth){
          console.log("SI");
          this.isLogged = true;
        }else{
          console.log("NO");
          this.isLogged = false;
        }*/
      });
  }

}
