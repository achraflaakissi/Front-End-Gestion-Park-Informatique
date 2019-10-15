import { MouvementService } from '../mouvement.service';
import { EmplacementService } from '../emplacement.service';
import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../articles.service';
import {StocksService} from '../stocks.service';
import {PersonnelService} from '../personnel.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mouvement',
  templateUrl: './mouvement.component.html',
  styleUrls: ['./mouvement.component.css']
})
export class MouvementComponent implements OnInit {
  UniteList:any;
  StockList:any;
  EmplacementList:any;
  PersonnelList:any;
  Articles;
  TestAdd;
  MouvementList={unite:"",type:"",stock:"",emplacement:"",article:"",user:"",personnel:"",date_mouvement:""};
  constructor(
    private articleService:ArticlesService,
    private emplacementService:EmplacementService,
    private mouvementService:MouvementService,
    private personnelService:PersonnelService,
    private stocksService:StocksService, 
    private authService: AuthenticationService, 
    private router:Router

    ) { 
      if(!this.authService.IsOnLine){
        this.router.navigateByUrl("/login");
      }
    }

  ngOnInit() {
    this.articleService.getListeDistinctUnite()
      .subscribe(data=>{
        this.UniteList=data;
      },err=>{
        console.log('erreur please check your code ...');
      });
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
  OnchangeUnite(){
    console.log(this.MouvementList);
    this.articleService.findByUnite(this.MouvementList.unite)
      .subscribe(data=>{
        this.Articles=data;
      },err=>{
        console.log('erreur please check your code ...');
      });
  }
  OnCancel(){
  }
  onSubmit(){
    if(this.MouvementList.type=="stock"){
      this.MouvementList.emplacement=null;
      this.MouvementList.personnel=null;
    }
    else if(this.MouvementList.type=="emplacement"){
      this.MouvementList.stock=null;
    }
    for(let item of this.Articles._embedded.articles){
      this.MouvementList.article=item._links.article.href;
      this.mouvementService.AddMouvement(this.MouvementList)
      .subscribe(data=>{
        this.ChangeEmplacementArticle(item._links.article.href,this.MouvementList.emplacement,this.MouvementList.stock,this.MouvementList.type)
        this.TestAdd=data;
      },err=>{
        console.log('erreur please check your code ...');
      });
    }

  }
  private ChangeEmplacementArticle(LinkArticle,LinkEmplacement,LinkStock,TypeEmplacement){
    let ArrayUpdate={"type_emplacement":TypeEmplacement,"stock":LinkStock,"emplacement":LinkEmplacement};
    this.articleService.EditArticle(LinkArticle,ArrayUpdate) .subscribe(data=>{
      console.log("emplacement de l'article actuel est changee");
    },err=>{
      console.log('erreur please check your code ...');
    });
  }
}
