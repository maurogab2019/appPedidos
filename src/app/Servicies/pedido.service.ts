import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../Models/Pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  recursoUrl:string;
  recursoUrl1:string;
  constructor(private httpClient:HttpClient) { 
  this.recursoUrl = "https://pedidosbackend.azurewebsites.net/api/PEDIDO/";
  this.recursoUrl1 = "https://pedidosbackend.azurewebsites.net/api/PEDIDO1/";
}
  
  post(obj:Pedido){
    return this.httpClient.post(this.recursoUrl,obj);
  }
  getPedidosFiltro(numeroPedido:number,numeroDoc:number){
    return this.httpClient.get(this.recursoUrl1+numeroPedido+"/"+numeroDoc);
  }

}
