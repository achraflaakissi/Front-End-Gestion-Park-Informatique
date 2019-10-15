import { MouvementService } from '../mouvement.service';
import { EmplacementService } from '../emplacement.service';
import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../articles.service';
import {StocksService} from '../stocks.service';
import { ActivatedRoute } from '@angular/router';
import {PersonnelService} from '../personnel.service';

@Component({
  selector: 'app-one-mouvement',
  templateUrl: './one-mouvement.component.html',
  styleUrls: ['./one-mouvement.component.css']
})
export class OneMouvementComponent implements OnInit {

  UniteList:any;
  StockList:any;
  EmplacementList:any;
  PersonnelList:any;
  Articles;
  TestAdd;Linkart;
  MouvementList={unite:"",type:"",stock:"",emplacement:"",article:"",user:"",personnel:"",date_mouvement:""};
  constructor(private articleService:ArticlesService,
    private emplacementService:EmplacementService,
    private mouvementService:MouvementService,
    private personnelService:PersonnelService,
    private route: ActivatedRoute,
    private stocksService:StocksService) { }

  ngOnInit() {
    this.Linkart = this.route.snapshot.paramMap.get('link1');
    this.articleService.getArticle(this.Linkart)
    .subscribe(data=>{
      this.Articles=data;
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
      
      onSubmit(){
          if(this.MouvementList.type=="stock"){
            this.MouvementList.emplacement=null;
            this.MouvementList.personnel=null;
          }
          else if(this.MouvementList.type=="emplacement"){
            this.MouvementList.stock=null;
          }
            this.MouvementList.article=this.Articles._links.article.href;
            this.ChangeEmplacementArticle(this.MouvementList.article,this.MouvementList.emplacement,this.MouvementList.stock,this.MouvementList.type);
            this.mouvementService.AddMouvement(this.MouvementList)
            .subscribe(data=>{
              this.TestAdd=data;
            },err=>{
              console.log('erreur please check your code ...');
            });;
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
