import { Component, OnInit } from '@angular/core';
import { EmplacementService } from '../emplacement.service';
import {StocksService} from '../stocks.service';
import {PersonnelService} from '../personnel.service';
import { UsersService } from '../users.service';
import { InterventionService } from '../intervention.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-add-intervention-by-user',
  templateUrl: './add-intervention-by-user.component.html',
  styleUrls: ['./add-intervention-by-user.component.css']
})
export class AddInterventionByUserComponent implements OnInit {
  intervention={type:"reclamation",typeemplacement:"",equipe:"",object:"",prestation:"",description:"",date_reclamation:"",date_intervention:"",heure_intervention:"",date_prestation:"",heure_prestation:"",duree_intervention:"",valider:true,validerresponsable:false,personnel:"",emplacement:"",stock:""};
  userintervention={intervention:"",user:""};
  StockList:any;
  EmplacementList:any;
  PersonnelList:any;
  UsersList:any;
  userselected:any;
  names="";
  Test;
  constructor(private interventionService:InterventionService,private personnelService:PersonnelService,private emplacementService:EmplacementService,private stocksService:StocksService,private usersService:UsersService,private authService: AuthenticationService,private router:Router) { 
    if(!this.authService.IsOnLine){
      this.router.navigateByUrl("/login");
    }
  }

  ngOnInit() {
    this.intervention={type:"reclamation",typeemplacement:"",equipe:this.usersService.CurrentUser.fullname,object:"",prestation:"",description:"",date_reclamation:"",date_intervention:"",heure_intervention:"",date_prestation:"",heure_prestation:"",duree_intervention:"",valider:true,validerresponsable:false,personnel:"",emplacement:"",stock:""};
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
  }

  onSubmit(){
    this.interventionService.saveIntervention(this.intervention).subscribe(data=>{
    this.Test=data;
    this.userintervention.intervention=this.Test._links.intervention.href;
    this.userintervention.user=this.usersService.CurrentUser._links.self.href;
    this.interventionService.saveUserIntervention(this.userintervention).subscribe(data=>{
      console.log("good");
    },err=>{
      console.log('erreur please check your code ...');
    });
    },err=>{
      console.log('erreur please check your code ...');
    });;
  }
}
