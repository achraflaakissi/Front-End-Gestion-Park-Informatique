import { Component, OnInit } from '@angular/core';
import { InterventionService } from './../intervention.service';
import {StocksService} from '../stocks.service';
import {PersonnelService} from '../personnel.service';
import { EmplacementService } from '../emplacement.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-intervention',
  templateUrl: './user-intervention.component.html',
  styleUrls: ['./user-intervention.component.css']
})
export class UserInterventionComponent implements OnInit {
  Intervenetions:any;
  Intervenetion:any;
  Stock:any;
  Emplacement:any;
  Personnel:any;
  Test;
  nbrline=10;
  nbrpage:number;
  curpage=1;
  ValiderIntervention={date_prestation:null,heure_prestation:null,duree_intervention:null,description:"",valider:false}
  interventionSearch={date:"",valider:"",type:"",equipe:""};
  constructor(
    private interventionService:InterventionService,
    private personnelService:PersonnelService,
    private emplacementService:EmplacementService,
    private stocksService:StocksService,private authService: AuthenticationService,private router:Router) { 
      if(!this.authService.IsOnLine){
        this.router.navigateByUrl("/login");
      }
    }

  ngOnInit() {
    this.interventionService.getInterventionByUser(this.authService.UserName)
    .subscribe(data=>{
      this.Intervenetions = data;
      console.log(this.Intervenetions);
    },err=>{
      console.log('erreur please check your code ...');
    });
  }
  OnDetail(intervention){
    this.Intervenetion=intervention;
    if(this.Intervenetion.typeemplacement=="emplacement"){
      this.emplacementService.getEmplacement(this.Intervenetion._links.emplacement.href)
      .subscribe(data=>{
        this.Emplacement = data;
        console.log(this.Emplacement);
      },err=>{
        console.log('erreur please check your code ...');
      });
      this.personnelService.getPersonnel(this.Intervenetion._links.personnel.href)
      .subscribe(data=>{
        this.Stock = data;
        console.log(this.Stock);
      },err=>{
        console.log('erreur please check your code ...');
      });
    }
    if(this.Intervenetion.typeemplacement=="stock"){
      this.stocksService.getStock(this.Intervenetion._links.stock.href)
      .subscribe(data=>{
        this.Stock = data;
        console.log(this.Stock);
      },err=>{
        console.log('erreur please check your code ...');
      });
    }
  }
  OnValider(){
    this.ValiderIntervention.valider=true;
    this.Intervenetions=null;
    this.interventionService.UpdateIntervention(this.ValiderIntervention,this.Intervenetion._links.self.href)
      .subscribe(data=>{
        this.Test = data;
        this.interventionService.getInterventionByUser(this.authService.UserName,this.curpage-1,this.nbrline)
        .subscribe(data=>{
          this.Intervenetions = data;
          console.log(this.Intervenetions);
        },err=>{
          console.log('erreur please check your code ...');
        });
      },err=>{
        console.log('erreur please check your code ...');
      });
     
  }
  changerAffichage(){
    this.curpage=0;
    this.Intervenetions=null;
    this.interventionService.getInterventionByUser(this.authService.UserName,0,this.nbrline)
    .subscribe(data=>{
      console.log(data);
      this.Intervenetions=data;
      this.nbrpage=this.Intervenetions.page.totalPages;
    },err=>{
        this.router.navigateByUrl("/login");
      console.log('erreur please check your code ...');
    });
    
  }
  changerAffichagePage(npage){
    this.curpage=npage;
    console.log(npage);
    this.Intervenetions=null;
    this.interventionService.getInterventionByUser(this.authService.UserName,npage-1,this.nbrline)
    .subscribe(data=>{
      console.log(data);
      this.Intervenetions=data;
      this.nbrpage=this.Intervenetions.page.totalPages;
    },err=>{
        this.router.navigateByUrl("/login");
      console.log('erreur please check your code ...');
    });
    
  }
  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

}
