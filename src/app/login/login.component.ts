import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode=0;
  constructor(private authService: AuthenticationService,  private router:Router ,private userservice:UsersService) { }

  ngOnInit() {
  }
  onLogin(formData){ 
    this.authService.login(formData).subscribe(resp=>{
      let jwtToken=resp.headers.get('Authorization');
      this.authService.saveToken(jwtToken);
      this.authService.loadToken();
      this.authService.IsOnLine=true;
      this.authService.IsAdmin=this.authService.isAdmin();
      this.authService.UserName=this.authService.GetUserName();
      this.userservice.getByUserName(this.authService.UserName).subscribe(data=>{
        this.userservice.CurrentUser=data;
        console.log(this.userservice.CurrentUser)
      }, err=>{
        console.log(err);
        console.log('see your code');
      });
      this.router.navigateByUrl("");
    }, err=>{
      console.log(err);
      this.mode=1;
    })
  }
}
