import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../articles.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {
  Articles;LinkartEdit:any;
  showdetail=0;
  showbtn=1;
  articleSearch:any;
  constructor(
    private route: ActivatedRoute,
    private articleService:ArticlesService
    ) { }

  ngOnInit() {
    this.LinkartEdit = this.route.snapshot.paramMap.get('link1');
    if(this.LinkartEdit){
      this.articleSearch={nom:"",materialdonner:false,mark:"",modele:"",sn:"",type:"",unite:"",designation:"",cpu:"",ram:"",hdd:"",pouce:"",port:"",lumens:"",length:"",date_mise_service:"",sessionlogin:"",sessionpassword:"",antivirus:"",antiviruslicence:"",anydesk:"",anydeskid:"",anydeskpassword:"",eyebeam:"",eyebeamSIP:"",fqdn:"",system:"",wifissid:"",wifipass:"",ip:""};
      this.articleService.getArticle(this.LinkartEdit).subscribe(data => { this.articleSearch = data; });
    }else{
      this.LinkartEdit=false;
      this.articleSearch={nom:"",materialdonner:"",mark:"",modele:"",sn:"",type:"",unite:"",designation:"",cpu:"",ram:"",hdd:"",pouce:"",port:"",lumens:"",length:"",date_mise_service:"",sessionlogin:"",sessionpassword:"",antivirus:"",antiviruslicence:"",anydesk:"",anydeskid:"",anydeskpassword:"",eyebeam:"",eyebeamSIP:"",fqdn:"",system:"",wifissid:"",wifipass:"",ip:""};
    }
  }
  onSubmit() {
    if(this.LinkartEdit){
      this.articleService.EditArticle(this.LinkartEdit,this.articleSearch)
      .subscribe(data => { this.Articles = data; });
    }
    else{
      this.articleService.saveArticle(this.articleSearch)
      .subscribe(data => { this.Articles = data; });
      this.articleSearch={nom:"",materialdonner:"",mark:"",modele:"",sn:"",type:"",unite:"",designation:"",cpu:"",ram:"",hdd:"",pouce:"",port:"",lumens:"",length:"",date_mise_service:"",sessionlogin:"",sessionpassword:"",antivirus:"",antiviruslicence:"",anydesk:"",anydeskid:"",anydeskpassword:"",eyebeam:"",eyebeamSIP:"",fqdn:"",system:"",wifissid:"",wifipass:"",ip:""};
    }
  }
  onCancel() {
    this.articleSearch={nom:"",materialdonner:"",mark:"",modele:"",sn:"",type:"",unite:"",designation:"",cpu:"",ram:"",hdd:"",pouce:"",port:"",lumens:"",length:"",date_mise_service:"",sessionlogin:"",sessionpassword:"",antivirus:"",antiviruslicence:"",anydesk:"",anydeskid:"",anydeskpassword:"",eyebeam:"",eyebeamSIP:"",fqdn:"",system:"",wifissid:"",wifipass:"",ip:""};
    console.log(this.articleSearch);
  }
  showDetail(test){
    if(test=="down"){
      this.showdetail=1;
      this.showbtn=0;
    }
    else{
      this.showdetail=0;
      this.showbtn=1;
    }

  }
}
