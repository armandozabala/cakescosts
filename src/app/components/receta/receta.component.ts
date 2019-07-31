import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  receta:any = {};
  materialText: any;
  material:any[]=[];
  materiales:any;

  cost:any;
  ingredienteEdit:any;
  exampleData: any[]=[];

  ingredientes:any[] =[];

  ingredientesReceta: any[]=[];
  idIngrediente:any;
  forma: FormGroup;

  formaEdit: FormGroup;

  idReceta:any;

  selectedId = '';

  constructor(public activatedRoute: ActivatedRoute, private dataService: FirebaseService) {

    this.forma = new FormGroup({
      'description' : new FormControl('', Validators.required),
      'quantity': new FormControl('',Validators.required),
      'costs':  new FormControl(''),
      'costs_unity': new FormControl('')
   });

   this.formaEdit = new FormGroup({
    'descriptionEdit' : new FormControl('', Validators.required),
    'quantityEdit': new FormControl('',Validators.required),
    'costsEdit':  new FormControl(''),
    'idReceta': new FormControl('')
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

   onChange(event) {

   console.log(event);

   console.log(event);

   this.cost = event.cost_unity;

   console.log(this.cost);

   this.formaEdit.get('quantityEdit')
   .valueChanges
   .subscribe(value => this.formaEdit.get('costsEdit')
     .setValue(isNaN(value) ? 0 : value =  (this.formaEdit.get('quantityEdit').value * this.cost).toFixed(4) )
   );

   this.forma.get('costs_unity').setValue(this.cost);
   //this.forma.get('quantity').setValue('');
}

  ngOnInit() {

    this.getMaterial()

  }



  update(event){
    console.log(event);
  }

  openIngredienteModal(){
    this.forma.reset();
    $('#addIngredienteModal').modal('toggle');
  }

  getMaterial(){
      this.dataService.getMaterial().subscribe( res => {

        this.material = res;

      });
  }

  getIngredientes(idReceta){

    this.dataService.getIngredientesReceta(idReceta).subscribe( res => {

      console.log(res);
      this.ingredientes = res;

    });
  }

  confirmDelete(id: string, material: string){
    console.log(id);
    this.idIngrediente = id;
    this.materialText = material;

    $('#confirmMaterialModal').modal('toggle');

  }


  deleteMaterialReceta(id: string) {
    this.dataService.deleteMaterialReceta(this.idReceta, id).then(function(res){
       //console.log(res);
       $('#confirmMaterialModal').modal('toggle');
    }).catch(function(err){
       console.log(err);
    });
 }

  editIngrediente(formaEdit){

    console.log(this.ingredienteEdit);
    console.log(formaEdit.value.idReceta);

    const data = {
         costs: formaEdit.value.costsEdit,
        description: formaEdit.value.descriptionEdit,
        quantity: formaEdit.value.quantityEdit

    };

    console.log(data);

    this.dataService.updateMaterialReceta(formaEdit.value.idReceta, this.ingredienteEdit, data).then(function() {

        $('#editIngredienteModal').modal('toggle');

    }).catch(function(err) {
        console.log(err);
    });



  }


  addIngrediente(forma) {

    console.log(forma.value);

    this.dataService.addIngrediente(this.idReceta, forma.value).then(function(res){

      $('#addIngredienteModal').modal('toggle');

        console.log(res.id);

     setTimeout( () => {
        forma.reset();
     },1000);


  }).catch(function(err){
      console.log(err);
  });

  }


  openEditIngrediente(id: string){

    console.log(id);

    $('#editIngredienteModal').modal('toggle');


    this.dataService.getIngredienteReceta(this.idReceta, id).subscribe(res => {

        console.log(res);
        this.materiales = res;
        this.ingredienteEdit = id;

        this.formaEdit = new FormGroup({
          'descriptionEdit' : new FormControl(this.materiales.description, Validators.required),
          'quantityEdit': new FormControl(this.materiales.quantity,Validators.required),
          'costsEdit':  new FormControl(this.materiales.costs),
          'idReceta': new FormControl(this.idReceta)
       });


    });




  }

}
