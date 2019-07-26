import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.css']
})
export class RecetasComponent implements OnInit {

  forma: FormGroup;
  id:string;
  recetas: any[] = [];

  constructor( public dataService: FirebaseService, public route: Router) {

    this.forma = new FormGroup({
      'name' : new FormControl('', Validators.required),
      'porcion': new FormControl('',Validators.required),
      'time':  new FormControl('',Validators.required),
      'baker':  new FormControl('null',Validators.required),
      'size':  new FormControl('null',Validators.required)
   });


  }

  ngOnInit() {
    this.getRecetas();
  }


  openReceta() {

    this.forma.reset();

    $('#addRecetaModal').modal('toggle');

  }

  confirmDelete(id){
    this.id = id;
    console.log(this.id);
    $('#deleteRecetaModal').modal('toggle');
  }

  borrar(id){
    console.log(id);
    this.dataService.deleteReceta(id).then(function(res){
      //console.log(res);
      $('#deleteRecetaModal').modal('toggle');
   }).catch(function(err){
      console.log(err);
   });
  }


  getRecetas() {
    this.dataService.getRecetas().subscribe( res => {
      this.recetas = res.map( item => {
          const id = item.payload.doc.id;
          const data = item.payload.doc.data();
          return{ id, ...data};
      });
   });
  }

  verReceta(id){

    this.route.navigate(['/receta', id]);

  }
  addReceta(forma) {

    console.log(forma)
    if(forma.status != 'INVALID'){

    this.dataService.addReceta(forma.value).then(function(res){

        $('#addRecetaModal').modal('toggle');

          console.log(res.id);

       setTimeout( () => {
          forma.reset();
       },1000);


    }).catch(function(err){
        console.log(err);
    });

  }

  }

}
