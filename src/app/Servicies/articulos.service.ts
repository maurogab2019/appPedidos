import { Injectable } from '@angular/core';
import { Articulo } from '../Models/Articulo';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  resourceUrl: string;
  resourceUrl1: string;

  constructor(private httpClient: HttpClient) { 
    this.resourceUrl = "https://pedidosbackend.azurewebsites.net/api/ARTICULO/";
    this.resourceUrl1 = "https://pedidosbackend.azurewebsites.net/api/ARTICULO1/";
  }


  getArticulos(nombre:string){
    return this.httpClient.get(this.resourceUrl1+nombre);
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  put(id:number,cantidad:number,obj:Articulo){
    return this.httpClient.put(this.resourceUrl1+id+"/"+cantidad,obj);
  }

  post(obj:Articulo){
    return this.httpClient.post(this.resourceUrl,obj);
  }

  putComun(id:number,obj:Articulo){
     return this.httpClient.put(this.resourceUrl+id,obj);
  }

  delete(id:number){
    return this.httpClient.delete(this.resourceUrl+id);
  }
}
