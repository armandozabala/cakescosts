import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  isLogged = false;
  title = 'cakescosts';

  constructor(private authService: FirebaseService) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {

    this.authService.isAuth().subscribe( auth => {

     /* if (auth) {
        console.log("SI");
        this.isLogged = true;
      } else {
        console.log("NO");
        this.isLogged = false;
      }*/
    });
}


}
