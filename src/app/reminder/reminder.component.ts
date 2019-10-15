import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { UsersService } from '../users.service';
import { ReminderService } from '../reminder.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  reminder={content:null,user:null};Test:any;Notes:any;
  
  constructor(private authService: AuthenticationService,private userservice:UsersService,private reminderservice:ReminderService) { 
    }

  ngOnInit() {
    this.reminderservice.getReminders().subscribe(data=>{
      console.log(data);
      this.Notes=(data);
    },err=>{
      console.log('erreur please check your code ...');
    });
  }
  onSubmit(){
    this.reminder.user=this.userservice.CurrentUser._links.self.href;
    this.reminderservice.AddReminder(this.reminder).subscribe(data=>{
      this.Test=(data);
    },err=>{
      console.log('erreur please check your code ...');
    });
  }
  Onvalider(note){
    note.valider=true;
    this.reminderservice.UpdateReminder(note).subscribe(data=>{
      this.Test=(data);
      this.Notes=false;
      this.reminderservice.getReminders().subscribe(data=>{
        console.log(data);
        this.Notes=(data);
      },err=>{
        console.log('erreur please check your code ...');
      });
    },err=>{
      console.log('erreur please check your code ...');
    });
  }
}
