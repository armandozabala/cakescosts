import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-materiaprima',
  templateUrl: './materiaprima.component.html',
  styleUrls: ['./materiaprima.component.css']
})
export class MateriaprimaComponent  {

  description: any;

  forma: FormGroup;

  materias: any[] = [
    {
      codigo: '1',
      descripcion: 'X',
      cantidad: 100,
      costo: 1000,
      costoUnidad: 1000
    },
    {
      codigo: '2',
      descripcion: 'X',
      cantidad: 100,
      costo: 1000,
      costoUnidad: 1000
    }
  ];

  constructor() {

    this.forma = new FormGroup({
       'description' : new FormControl('Material'),
       'cantidad':  new FormControl('Cantidad'),
    });

  }

  abrirModal() {

    $('#myModal').modal('toggle');

  }

  addMateria(forma: NgForm) {

    console.log('ngForm', forma);

    console.log('FORMULARIO');

    console.log(this.description);

     const mat =    {
      codigo: '2',
      descripcion: 'X',
      cantidad: 100,
      costo: 1000,
      costoUnidad: 1000
    };

    this.materias.push(mat);

    //$('#myModal').modal('hide');

  }

}
