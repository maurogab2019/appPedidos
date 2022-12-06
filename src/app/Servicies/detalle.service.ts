import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetallePedido } from '../Models/DetallePedido';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {
  resourceUrl1: string;
  constructor(private http:HttpClient) {
  this.resourceUrl1 ="https://pedidosbackend.azurewebsites.net/api/DETALLEPEDIDO/";
 }

 post(obj:DetallePedido){
    return this.http.post(this.resourceUrl1,obj) ; 
 }

 get(docOnum:number){
  return this.http.get(this.resourceUrl1+docOnum);
 }
}
