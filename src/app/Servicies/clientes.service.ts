import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  resourceUrl1: string;

  constructor(private httpCliente:HttpClient) { 
    this.resourceUrl1= "https://pedidosbackend.azurewebsites.net/api/CLIENTESS/"; 
  }

  getClientesNombre(nombre:string){
    return this.httpCliente.get(this.resourceUrl1+nombre);
  }

}
