import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AppComponent } from '../app.component';
import { InterventionService } from '../intervention.service';
import { EmplacementService } from '../emplacement.service';
import { PersonnelService } from '../personnel.service';
import { Router } from '@angular/router';
import { StocksService } from '../stocks.service';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  current_day="";
  current_date="";
  weather_desription:any;
  Intervenetions:any;
  Intervenetion:any;
  Stock:any;
  Emplacement:any;
  EtatStock:any;
  InventerArticle:any;
  Personnel:any;
  MaterialDonner:any;
  Test;
  nbrline=5;
  nbrpage:number;
  curpage=1;
  ValiderIntervention={date_prestation:null,heure_prestation:null,duree_intervention:null,valider:false}
  constructor(
    private http:HttpClient,
    private interventionService:InterventionService,
    private personnelService:PersonnelService,
    private emplacementService:EmplacementService,
    private stocksService:StocksService,
    private authService: AuthenticationService,
    private articlesService: ArticlesService,
    private router:Router
    ) { }

  ngOnInit() {
    // meteo code start
    let today:any;
    today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    today = mm + '/' + dd + '/' + yyyy;
    var weekday = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
    var monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    let a = new Date(today);
    this.current_day=(weekday[a.getDay()]);
    this.current_date=(dd+" "+monthNames[a.getMonth()]+", "+yyyy);
    this.http.get("http://api.openweathermap.org/data/2.5/weather?q=marrakech&APPID=e2f6679433e46a74dbb662b8237baed3&lang=fr&units=metric")
      .subscribe(data=>{
        console.log(data);
        this.weather_desription=data;
      },err=>{
        console.log('erreur please check your code ...');
      });
    //meteo code end

    // Start liste des Interventions
    this.interventionService.getInterventionOfTodayByUser(this.authService.UserName) .subscribe(data=>{
      this.Intervenetions=data;
    },err=>{
      console.log('erreur please check your code ...');
    });
    // End liste des Interventions

    // Start Etat Stock
    this.articlesService.getEtatStock() .subscribe(data=>{
      console.log(data);
      this.EtatStock=(data);
    },err=>{
      console.log('erreur please check your code ...');
    });
    // End Etat Stock

    // Start Inventer Article
    this.articlesService.getInventerArticle().subscribe(data=>{
      this.InventerArticle=(data);
    },err=>{
      console.log('erreur please check your code ...');
    });
    // End Inventer Article

    //Etat Material Donner
    this.articlesService.getMaterialDonner().subscribe(data=>{
      this.MaterialDonner=(data);
    },err=>{
      console.log('erreur please check your code ...');
    });
      
    //End Material Donner

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
    this.interventionService.UpdateIntervention(this.ValiderIntervention,this.Intervenetion._links.self.href)
      .subscribe(data=>{
        this.Test = data;
        this.Intervenetions=null;
        this.interventionService.getInterventionOfTodayByUser(this.authService.UserName,this.curpage,this.nbrline) .subscribe(data=>{
          this.Intervenetions=data;
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
    this.interventionService.getInterventionOfTodayByUser(this.authService.UserName,0,this.nbrline)
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
    this.interventionService.getInterventionOfTodayByUser(this.authService.UserName,npage-1,this.nbrline)
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
