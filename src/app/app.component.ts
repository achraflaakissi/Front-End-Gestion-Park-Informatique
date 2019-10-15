import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public authService: AuthenticationService,  private router:Router,private userservice:UsersService) { }
  ngOnInit() {
    if(localStorage.getItem('token')==null || localStorage.getItem('token')==""){
      this.authService.IsOnLine=false;
      this.router.navigateByUrl("/login");
    }
    else{
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
    }
  }
  SignOut(){
    this.authService.logout();
    this.authService.IsOnLine=false;
    this.router.navigateByUrl("/login");
  }
}
