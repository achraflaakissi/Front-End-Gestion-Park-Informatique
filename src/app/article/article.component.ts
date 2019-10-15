import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../articles.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  Articles;
  articleSearch={nom:"",mark:"",modele:"",sn:"",type:"",unite:""};
  nbrline=10;
  etatfilter=false;
  nbrpage:number;
  constructor(
    private articleService:ArticlesService,
    private router:Router
  ) { }

  ngOnInit() {
    this.articleService.getListeArticle()
      .subscribe(data=>{
        console.log(data);
        this.Articles=data;
        this.nbrpage=this.Articles.page.totalPages;
      },err=>{
          this.router.navigateByUrl("/login");
        console.log('erreur please check your code ...');
      });
  }
  onSubmit() {
    this.etatfilter=true;
    this.Articles=null;
    this.articleService.FiltrerListeArticle(this.articleSearch.nom,this.articleSearch.mark,this.articleSearch.modele,this.articleSearch.sn,this.articleSearch.type,this.articleSearch.unite)
      .subscribe(data=>{
        this.Articles=data;
      },err=>{
        console.log('erreur please check your code ...');
      });
    console.log(this.articleSearch);
  }
  onCancel() {
    this.articleSearch={nom:"",mark:"",modele:"",sn:"",type:"",unite:""};
    console.log(this.articleSearch);
  }
  onEdit(Linkart){
    console.log(Linkart);
    this.router.navigate(["/article/edit",Linkart]);
  }
  DeleteArticle(Linkart){
    if(confirm("Voulez vous vraiment supprimer ce article "+name)) {
      this.articleService.DeleteArticle(Linkart);
    }
    
  }
  OnDetail(Linkart,LinkMv){
    this.router.navigate(["/article/detail",Linkart,LinkMv]);
  }
  changerAffichage(){
    this.Articles=null;
    if(this.etatfilter==true){
      this.articleService.FiltrerListeArticle(this.articleSearch.nom,this.articleSearch.mark,this.articleSearch.modele,this.articleSearch.sn,this.articleSearch.type,this.articleSearch.unite,this.nbrline,0)
      .subscribe(data=>{
        this.Articles=data;
      },err=>{
        console.log('erreur please check your code ...');
      });
    }
    else{
      this.articleService.getListeArticle(0,this.nbrline)
      .subscribe(data=>{
        console.log(data);
        this.Articles=data;
        this.nbrpage=this.Articles.page.totalPages;
      },err=>{
          this.router.navigateByUrl("/login");
        console.log('erreur please check your code ...');
      });
    }
    
    
  }
  changerAffichagePage(npage){
    this.Articles=null;
    if(this.etatfilter==true){
      this.articleService.FiltrerListeArticle(this.articleSearch.nom,this.articleSearch.mark,this.articleSearch.modele,this.articleSearch.sn,this.articleSearch.type,this.articleSearch.unite,this.nbrline,npage-1)
      .subscribe(data=>{
        this.Articles=data;
        this.nbrpage=this.Articles.page.totalPages;
      },err=>{
        console.log('erreur please check your code ...');
      });
    }else{
      this.articleService.getListeArticle(npage-1,this.nbrline)
      .subscribe(data=>{
        console.log(data);
        this.Articles=data;
        this.nbrpage=this.Articles.page.totalPages;
      },err=>{
          this.router.navigateByUrl("/login");
        console.log('erreur please check your code ...');
      });
    }
    
    
  }
  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
}
