import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthenticationService {

    private host:string="http://localhost:8080";
    public jwtToken:string;
    private roles:Array<any>=[];
    private header:any;
    public IsOnLine=false;
    public IsAdmin=true;
    public UserName="";

    constructor(private http:HttpClient){this.loadToken();}
    login(user){
      return this.http.post(this.host+"/login",user,{ observe: 'response',responseType: 'text'},);
    }
    loadToken(){
      this.jwtToken=localStorage.getItem('token');
      this.jwtToken=this.jwtToken;this.header={headers:new HttpHeaders({'authorization':this.jwtToken})}
      return this.header;
    }
    saveToken(jwt:string){
      localStorage.setItem('token',jwt);
    }
   
    logout(){
      localStorage.removeItem('token');
      this.jwtToken=null;
      this.roles=null;
    }

    isAdmin(){
      if(this.roles!=null){
        let jwtHelper=new JwtHelper();
        this.roles=jwtHelper.decodeToken(this.jwtToken).roles;
        for(let r of this.roles){
            if(r.authority=='ADMIN') return true;
        }
        return false;
      }
      else{
        return false;
      }
    }
    GetUserName(){
      let jwtHelper=new JwtHelper();
      return (jwtHelper.decodeToken(this.jwtToken).fullname);
    }

}
