import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class MouvementService {

  private host:string="http://localhost:8080";
  private jwtToken:string;
  private header:any;
  constructor(private http:HttpClient, private auth:AuthenticationService) {  }
  private LoadHeader(){
    this.header=this.auth.loadToken();
  }
   getMouvements(Link) {
    this.LoadHeader();
    return this.http.get(Link,this.header);
  }
  AddMouvement(mouvement){
    this.LoadHeader();
    return this.http.post(this.host+"/mouvements", mouvement,this.header);
  }
  DeleteMouvement(mouvement){
    this.LoadHeader();
    return this.http.delete(mouvement,this.header);
  }
}
