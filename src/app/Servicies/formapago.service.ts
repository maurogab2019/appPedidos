import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormaPago } from '../Models/FormaPago';

@Injectable({
  providedIn: 'root'
})
export class FormapagoService {
  resourceUrl: string;
constructor(private http:HttpClient) { 
  this.resourceUrl = "https://pedidosbackend.azurewebsites.net/api/FORMAPAGO/";
}


  getFormaPagoId(nombre:string):Observable<FormaPago[]>{
    return this.http.get<FormaPago[]>(this.resourceUrl+nombre);
  }
  
  getFormaPago(){
    return this.http.get(this.resourceUrl);
  }

}
