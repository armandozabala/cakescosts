import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Materia } from '../../model/interfaces';

declare var $: any;

@Component({
  selector: 'app-materiaprima',
  templateUrl: './materiaprima.component.html',
  styleUrls: ['./materiaprima.component.css']
})
export class MateriaprimaComponent implements OnInit {

  description: any;

  forma: FormGroup;

  formaEdit: FormGroup;

  materias: any[] = [];

  materia: any;

  materialText:any;

  ids:any;

  constructor(private dataService: FirebaseService) {

    this.forma = new FormGroup({
       'description' : new FormControl('', Validators.required),
       'quantity': new FormControl('',Validators.required),
       'costs':  new FormControl('',Validators.required),
       'unity':  new FormControl('null',Validators.required),
       'code':  new FormControl(''),
       'cost_unity':  new FormControl('')
    });



    this.forma.get('quantity')
    .valueChanges
    .subscribe(value => this.forma.get('cost_unity')
      .setValue(isNaN(value) ? 0 : value =  (this.forma.get('quantity').value / this.forma.get('costs').value).toFixed(4) )
    );

     this.forma.get('costs')
     .valueChanges
     .subscribe(value => this.forma.get('cost_unity')
       .setValue(isNaN(value) ? 0 : value =  (this.forma.get('quantity').value / this.forma.get('costs').value).toFixed(4) )
     );


  }

  ngOnInit(){
     this.dataService.getMaterial().subscribe( res => {
        this.materias = res;
     })
  }

  openModal() {

    this.forma.reset();

    $('#addMaterialModal').modal('toggle');

  }

 editModal(id: string) {

    console.log(id);

    $('#editMaterialModal').modal('toggle');

    this.dataService.getMaterialId(id).subscribe( (res) => {

        this.materia = res;
        this.materia.id = id;


        this.forma = new FormGroup({
          'description' : new FormControl(this.materia.description, Validators.required),
          'quantity': new FormControl(this.materia.quantity,Validators.required),
          'costs':  new FormControl(this.materia.costs,Validators.required),
          'unity':  new FormControl(this.materia.unity,Validators.required),
          'code':  new FormControl(this.materia.code.toUpperCase()),
          'cost_unity':  new FormControl(this.materia.cost_unity)
       });

       this.forma.get('quantity')
       .valueChanges
       .subscribe(value => this.forma.get('cost_unity')
         .setValue(isNaN(value) ? 0 : value =  (this.forma.get('quantity').value / this.forma.get('costs').value).toFixed(4) )
       );

        this.forma.get('costs')
        .valueChanges
        .subscribe(value => this.forma.get('cost_unity')
          .setValue(isNaN(value) ? 0 : value = (this.forma.get('quantity').value / this.forma.get('costs').value).toFixed(4) )
        );




    });
  }

  editMaterial(forma:any){

    console.log(forma);
    forma.value.code = forma.value.code.toUpperCase();
    console.log(this.materia.id);
    const id = this.materia.id;

    this.dataService.updateMaterial(id, forma.value).then(function(res){

         $('#editMaterialModal').modal('toggle');

         //setTimeout( () => {
            this.forma.reset();
         //},1000);

    }).catch(function(err){
         console.log(err);
    });

  }

  addMaterial(forma) {


    forma.value.code = forma.value.code.toUpperCase();

    this.dataService.addMaterial(forma.value).then(function(res){

        $('#addMaterialModal').modal('toggle');

          console.log(res.id);

       setTimeout( () => {
          forma.reset();
       },1000);


    }).catch(function(err){
        console.log(err);
    });

  }


  confirmDelete(ids: string, materialText: string){
    console.log(ids);
    this.ids = ids;
    this.materialText = materialText;

    $('#confirmMaterialModal').modal('toggle');
  }

  deleteMaterial(id: string) {
     this.dataService.deleteMaterial(id).then(function(res){
        //console.log(res);
        $('#confirmMaterialModal').modal('toggle');
     }).catch(function(err){
        console.log(err);
     });
  }

}
