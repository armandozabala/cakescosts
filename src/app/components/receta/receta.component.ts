import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';

declare var $: any;

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  receta:any = {};

  cost:any;

  exampleData: any[]=[];

  ingredientes:any ={};

  ingrediente: any;

  forma: FormGroup;

  formaEdit: FormGroup;

  idReceta:any;

  constructor(public activatedRoute: ActivatedRoute, private dataService: FirebaseService) {

    this.forma = new FormGroup({
      'description' : new FormControl('', Validators.required),
      'quantity': new FormControl('',Validators.required),
      'costs':  new FormControl('')
   });

   this.forma.get('quantity')
   .valueChanges
   .subscribe(value => this.forma.get('costs')
     .setValue(isNaN(value) ? 0 : value =  (this.forma.get('quantity').value * this.cost).toFixed(4))
   );

    this.activatedRoute.params.subscribe( params => {

      console.log(params['id']);

      this.idReceta = params['id'];

      this.getIngredientes(this.idReceta);

      this.receta = this.dataService.getRecetaId(params['id']).subscribe( res => {

         this.receta = res;

      });

    });

   }

  ngOnInit() {



     this.dataService.getMaterial().subscribe( ing => {

         this.ingredientes = ing.map( item => {
          const id = item.payload.doc.id;
          const data = item.payload.doc.data();
          return{ id, ...data};
      });

      //console.log(this.ingredientes);

      this.ingredientes.forEach(element => {
          console.log(element);
          element.text = element.description;

          this.exampleData.push(element);
      });


     });
  }

  valueChange(event){
    console.log(event);

    this.cost = event.cost_unity;

    console.log(this.cost);

    this.forma.get('costs').setValue('');
    this.forma.get('quantity').setValue('');
  }


  update(event){
    console.log(event);
  }

  openIngredienteModal(){
    $('#addIngredienteModal').modal('toggle');
  }


  getIngredientes(idReceta){

    this.dataService.getIngredientesReceta(this.idReceta).subscribe( res => {

        this.ingrediente = res;

    });
  }


  addIngrediente(forma) {

    console.log(forma.value);

    this.dataService.addIngrediente(this.idReceta, forma.value).then(function(res){

      $('#addMaterialModal').modal('toggle');

        console.log(res.id);

     setTimeout( () => {
        forma.reset();
     },1000);


  }).catch(function(err){
      console.log(err);
  });

  }

}
