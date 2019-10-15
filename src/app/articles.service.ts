import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ArticlesService {
  private host:string="http://localhost:8080";
  private jwtToken:string;
  private header:any;
  constructor(private http:HttpClient, private auth:AuthenticationService) {  }
  private LoadHeader(){
    this.header=this.auth.loadToken();
  }
  getListeArticle(npage=0,nbrlines=10) {
    this.LoadHeader();
    return this.http.get(this.host+"/articles?page="+npage+"&size="+nbrlines,this.header);
  }
  getArticle(Link) {
    this.LoadHeader();
    return this.http.get(Link,this.header);
  }
  getStockArticle(Link) {
    this.LoadHeader();
    return this.http.get(Link,this.header);
  }
  getEmplacementArticle(Link) {
    this.LoadHeader();
    return this.http.get(Link,this.header);
  }
  getUserArticle(Link) {
    this.LoadHeader();
    return this.http.get(Link,this.header);
  }
  getPersoArticle(Link) {
    this.LoadHeader();
    return this.http.get(Link,this.header);
  }
  saveArticle(article) {
    this.LoadHeader();
     return this.http.post(this.host+"/articles", article,this.header); 
    }
    EditArticle(Link,article){
      this.LoadHeader();
      return this.http.patch(Link, article,this.header);
    }
    DeleteArticle(Link){
      this.LoadHeader();
      return this.http.delete(Link,this.header).subscribe(data=>{
        console.log(data);
        console.log("im here "+Link);
      },err=>{
        console.log('erreur please check your code ...');
      });;
    }
  FiltrerListeArticle(nom,mark,modele,sn,type,unite,nbr=10,page=0){
    this.LoadHeader();
    return this.http.get(this.host+"/articles/search/Filtrer?nom="+nom+"&mark"+mark+"&modele="+modele+"&sn="+sn+"&type="+type+"&unite="+unite+"&page="+page+"&size="+nbr,this.header);
  }
  ListOfUnite(unite){
    this.LoadHeader();
    return this.http.get(this.host+"/articles/search/ListOfUnite?unite="+unite,this.header);
  }
  findByUnite(unite){
    this.LoadHeader();
    return this.http.get(this.host+"/articles/search/findByUnite?unite="+unite,this.header);
  }
  getListeDistinctUnite(){
    this.LoadHeader();
    return this.http.get(this.host+"/articles/distinct-unite",this.header);
  }
  getEtatStock(){
    this.LoadHeader();
    return this.http.get(this.host+"/articles/etat-stock",this.header);
  }
  getInventerArticle(){
    this.LoadHeader();
    return this.http.get(this.host+"/articles/inventer-article",this.header);
  }
  getMaterialDonner(){
    this.LoadHeader();
    return this.http.get(this.host+"/articles/etat-materiel-donner",this.header);
  }

}
