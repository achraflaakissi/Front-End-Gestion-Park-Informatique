import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class PersonnelService {

  private host:string="http://localhost:8080";
  private jwtToken:string;
  private header:any;
  constructor(private http:HttpClient, private auth:AuthenticationService) {  }
  private LoadHeader(){
    this.header=this.auth.loadToken();
  }
  getListePersonnel() {
    this.LoadHeader();
    return this.http.get(this.host+"/personnels?size=10000",this.header);
  }
  getPersonnel(link) {
    this.LoadHeader();
    return this.http.get(link,this.header);
  }
}
