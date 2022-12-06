import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Articulo } from '../Models/Articulo';
import { ArticulosService } from '../Servicies/articulos.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  ListaArticulos:Articulo[] = [];
  MostrarTabla:string="NO";
  MostrarSinResul:string="NO";
  submitted = false;
  accionABMC="L";
  constructor(private servicioArticulo:ArticulosService) { }

  ngOnInit(): void {
  }
  FormBusqueda = new FormGroup({
    Nombre: new FormControl(null),
  });

  getArticulos(){
    this.servicioArticulo.getArticulos(this.FormBusqueda.value.Nombre).subscribe((res:any)=> {
        this.ListaArticulos =res;  
    });
    if(this.ListaArticulos.length >0 ){
      this.MostrarTabla="SI";
      this.MostrarSinResul="NO";
    }
    else{this.MostrarSinResul="SI"}
  }


  
  FormRegistro = new FormGroup({
    idArticulo: new FormControl(13),
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    descripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    precioLista: new FormControl(null, [
      Validators.required,
      Validators.pattern('[0-9],{1,9}'),
    ]),
    stockActuak: new FormControl(null, [
      Validators.required,
    ]),
    fechaAlta: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
      ),
    ]),
    tipoArticulo: new FormControl(2),
  });
  

  agregar(){
    this.accionABMC="A";
    this.FormRegistro.reset();

  }

  Modificar(item:Articulo){
    this.accionABMC="M";
    this.FormRegistro.markAsTouched();
    this.FormRegistro.patchValue(item);
  }

  aaa(){
    console.log("asasass")
  }

  volver(){
    this.accionABMC="L";
    console.log(this.FormRegistro.invalid)
  }
  Grabar(){
    this.submitted = true;
    const itemCopy = { ...this.FormRegistro.value };
    // if (this.FormRegistro.invalid) {
    //   console.log("aa");
    //   return;
    // }
    if (this.accionABMC == "A") {
      itemCopy.idArticulo=0;
      itemCopy.tipoArticulo=2;
      console.log(itemCopy,this.accionABMC);
      this.servicioArticulo.post(itemCopy).subscribe((res: any) => {
        this.accionABMC="L";
        this.getArticulos();
        alert("Registrado correctamente !!!");
      });
    }
    else{
      this.servicioArticulo.putComun(itemCopy.idArticulo,itemCopy).subscribe((res:any)=>{
        this.accionABMC="L";
        this.getArticulos();
        alert("Modificado correctamente !!!");
      })
    }
  }

  borrar(item:Articulo){
    this.servicioArticulo.delete(item.idArticulo).subscribe((res:any)=>{
        alert("ARTICULO "+item.nombre + "ELIMINADO CORRECTAMENTE");
        this.getArticulos();
    });
  }
}