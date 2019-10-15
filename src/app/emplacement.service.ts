import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class EmplacementService {
  private host:string="http://localhost:8080";
  private jwtToken:string;
  private header:any;
  constructor(private http:HttpClient, private auth:AuthenticationService) {  }
  private LoadHeader(){
    this.header=this.auth.loadToken();
  }
  getListeEmplacement() {
    this.LoadHeader();
    return this.http.get(this.host+"/emplacements?size=10000",this.header);
  }
  getEmplacement(link) {
    this.LoadHeader();
    return this.http.get(link,this.header);
  }
}
