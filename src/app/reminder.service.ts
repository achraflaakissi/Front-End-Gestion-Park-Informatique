import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ReminderService {
  private host:string="http://localhost:8080";
  private jwtToken:string;
  private header:any;
  constructor(private http:HttpClient, private auth:AuthenticationService) {  }
  private LoadHeader(){
    this.header=this.auth.loadToken();
  }
  getReminders() {
    this.LoadHeader();
    return this.http.get(this.host+"/reminders",this.header);
  }
  AddReminder(reminder){
    this.LoadHeader();
    return this.http.post(this.host+"/reminders", reminder,this.header);
  }
  UpdateReminder(reminder){
    this.LoadHeader();
    return this.http.patch(reminder._links.self.href, reminder,this.header);
  }
}
