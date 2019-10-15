import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UsersService {

  private host:string="http://localhost:8080";
  private jwtToken:string;
  private header:any;
  public CurrentUser:any;
  constructor(private http:HttpClient, private auth:AuthenticationService) {  }
  private LoadHeader(){
    this.header=this.auth.loadToken();
  }
  getListeUsers() {
    this.LoadHeader();
    return this.http.get(this.host+"/users",this.header);
  }
  getByUserName(username) {
    this.LoadHeader();
    return this.http.get(this.host+"/users/search/findByUsername?username="+username,this.header);
  }

}
