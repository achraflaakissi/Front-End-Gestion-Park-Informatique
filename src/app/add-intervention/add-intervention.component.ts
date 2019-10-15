import { Component, OnInit } from '@angular/core';
import { EmplacementService } from '../emplacement.service';
import {StocksService} from '../stocks.service';
import {PersonnelService} from '../personnel.service';
import { UsersService } from '../users.service';
import { InterventionService } from '../intervention.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-add-intervention',
  templateUrl: './add-intervention.component.html',
  styleUrls: ['./add-intervention.component.css']
})
export class AddInterventionComponent implements OnInit {
  intervention:any;
  userintervention={intervention:"",user:""};
  StockList:any;
  EmplacementList:any;
  PersonnelList:any;
  UsersList:any;
  userselected:any;
  names="";
  Test;
  date_tache:any;
 constructor(private interventionService:InterventionService,private personnelService:PersonnelService,private emplacementService:EmplacementService,private stocksService:StocksService,private usersService:UsersService,private authService: AuthenticationService,private router:Router) { 
    if(!this.authService.IsOnLine){
      this.router.navigateByUrl("/login");
    }
  }

  ngOnInit() {
        this.intervention={type:"tache",typeemplacement:"",equipe:"",object:"",prestation:"",description:"",date_reclamation:"",date_intervention:"",heure_intervention:"",date_prestation:"",heure_prestation:"",duree_intervention:"",valider:false,validerresponsable:false,personnel:"",emplacement:"",stock:""};
        console.log(this.intervention);
        this.stocksService.getListeStock()
        .subscribe(data=>{
          this.StockList=data;
        },err=>{
          console.log('erreur please check your code ...');
        });
        this.emplacementService.getListeEmplacement()
          .subscribe(data=>{
            this.EmplacementList=data;
          },err=>{
            console.log('erreur please check your code ...');
          });
          this.personnelService.getListePersonnel()
            .subscribe(data=>{
              this.PersonnelList=data;
            },err=>{
              console.log('erreur please check your code ...');
            });
          this.usersService.getListeUsers()
            .subscribe(data=>{
              this.UsersList=data;
            },err=>{
              console.log('erreur please check your code ...');
            });
    }
    onSubmit(){
      this.intervention.date_intervention=this.date_tache;
      this.intervention.date_reclamation=this.date_tache;
      this.names="";
      console.log(this.intervention);
      for (let user of this.UsersList._embedded.users) {
        if(this.intervention.equipe.includes(user._links.user.href)){
          this.names=this.names+user.fullname+" | ";
        }
      }
      this.userselected=this.intervention.equipe;
      this.intervention.equipe=this.names;
      this.interventionService.saveIntervention(this.intervention).subscribe(data=>{
        this.Test=data;
        this.userintervention.intervention=this.Test._links.intervention.href;
        for(let us of this.userselected){
          this.userintervention.user=us;
          this.interventionService.saveUserIntervention(this.userintervention).subscribe(data=>{
            console.log("good");
          },err=>{
            console.log('erreur please check your code ...');
          });
        }

        this.intervention={type:"tache",typeemplacement:"",equipe:"",object:"",prestation:"",description:"",date_reclamation:"",date_intervention:"",heure_intervention:"",date_prestation:"",heure_prestation:"",duree_intervention:"",valider:false,validerresponsable:false,personnel:"",emplacement:"",stock:""};
      },err=>{
        console.log('erreur please check your code ...');
      });;
    }
}
