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

  constructor(private dataService: FirebaseService) {

    this.forma = new FormGroup({
       'description' : new FormControl('', Validators.required),
       'quantity': new FormControl('',Validators.required),
       'costs':  new FormControl('',Validators.required),
       'unity':  new FormControl('',Validators.required),
       'code':  new FormControl(''),
       'cost_unity':  new FormControl(''),
       'id':  new FormControl('')
    });



    this.forma.get('quantity')
    .valueChanges
    .subscribe(value => this.forma.get('cost_unity')
      .setValue(isNaN(value) ? 0 : value =  this.forma.get('quantity').value / this.forma.get('costs').value )
    );

     this.forma.get('costs')
     .valueChanges
     .subscribe(value => this.forma.get('cost_unity')
       .setValue(isNaN(value) ? 0 : value =  this.forma.get('quantity').value / this.forma.get('costs').value )
     );


  }

  ngOnInit(){
     this.dataService.getMaterial().subscribe( res => {
        this.materias = res.map( item => {
            const id = item.payload.doc.id;
            const data = item.payload.doc.data();
            return{ id, ...data};
        })
     })
  }

  openModal() {

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
          'code':  new FormControl(this.materia.code),
          'cost_unity':  new FormControl(this.materia.cost_unity),
          'id': new FormControl(this.materia.id),
       });

       this.forma.get('quantity')
       .valueChanges
       .subscribe(value => this.forma.get('cost_unity')
         .setValue(isNaN(value) ? 0 : value =  this.forma.get('quantity').value / this.forma.get('costs').value )
       );

        this.forma.get('costs')
        .valueChanges
        .subscribe(value => this.forma.get('cost_unity')
          .setValue(isNaN(value) ? 0 : value =  this.forma.get('quantity').value / this.forma.get('costs').value )
        );

    });
  }

  editMaterial(){

    console.log('EDIT FormGroup', this.forma.value);
    const id = this.forma.get('id').value;

    this.dataService.updateMaterial(id, this.forma.value).then(function(res){
         $('#editMaterialModal').modal('toggle');
    }).catch(function(err){
         console.log(err);
    });

  }

  addMaterial() {

    console.log('FormGroup', this.forma.value);

    console.log('FORMULARIO');

    this.dataService.addMaterial(this.forma.value).then(function(res){
        console.log(res.id);
        $('#addMaterialModal').modal('hide');
    }).catch(function(err){
        console.log(err);
    });

  }

  deleteMaterial(id: string) {
     this.dataService.deleteMaterial(id).then(function(res){
        //console.log(res);
     }).catch(function(err){
        console.log(err);
     });
  }

}
