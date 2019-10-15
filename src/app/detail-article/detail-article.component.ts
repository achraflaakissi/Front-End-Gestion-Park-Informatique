import { MouvementService } from '../mouvement.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ArticlesService} from '../articles.service';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {
  Linkart;LinkMv;ArticleDetail;ArticleHistoriques;
  detailMouvement={type:null,emplacement:null,date:null,perso:null,user:null};
  TestAdd;
  selectfile:File=null;
  EmplacementActuel;
  constructor(
    private http:HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private articleService:ArticlesService,
    private mouvementService:MouvementService
  ) { }

  ngOnInit() {
    this.Linkart = this.route.snapshot.paramMap.get('link1');
    this.LinkMv = this.route.snapshot.paramMap.get('link2');
    this.articleService.getArticle(this.Linkart).subscribe(data=>{
      this.ArticleDetail=data;
      if(this.ArticleDetail.type_emplacement=="stock"){
          this.articleService.getStockArticle(this.ArticleDetail._links.stock.href).subscribe(data=>{
            this.EmplacementActuel=data;
            console.log(this.EmplacementActuel);
          },err=>{
            console.log('erreur please check your code ...');
          });
      }
      else{
        this.articleService.getEmplacementArticle(this.ArticleDetail._links.emplacement.href).subscribe(data=>{
          this.EmplacementActuel=data;
          console.log(this.EmplacementActuel);
        },err=>{
          console.log('erreur please check your code ...');
        });
      }
    },err=>{
      console.log('erreur please check your code ...');
    });
    this.mouvementService.getMouvements(this.LinkMv).subscribe(data=>{
      this.ArticleHistoriques=data;
    },err=>{
      console.log('erreur please check your code ...');
    });

  }
  onEdit(Linkart){
    this.router.navigate(["/article/edit",Linkart]);
  }
  OnDetail(historique){
    console.log(historique);
    this.detailMouvement.type=historique.type;
    this.detailMouvement.date=historique.date_mouvement;
    this.articleService.getUserArticle(historique._links.user.href).subscribe(data=>{
      this.detailMouvement.user=data;
      this.detailMouvement.user=this.detailMouvement.user.fullname;
    },err=>{
      console.log('erreur please check your code ...');
    });
    if(historique.type=="stock"){
      this.articleService.getStockArticle(historique._links.stock.href).subscribe(data=>{
        this.detailMouvement.emplacement=data;
        this.detailMouvement.emplacement=this.detailMouvement.emplacement.nom;
      },err=>{
        console.log('erreur please check your code ...');
      });
    }
    else if(historique.type=="emplacement"){
      this.articleService.getEmplacementArticle(historique._links.emplacement.href).subscribe(data=>{
        this.detailMouvement.emplacement=data;
        this.detailMouvement.emplacement=this.detailMouvement.emplacement.nom;
      },err=>{
        console.log('erreur please check your code ...');
      });
      this.articleService.getPersoArticle(historique._links.personnel.href).subscribe(data=>{
        this.detailMouvement.perso=data;
        this.detailMouvement.perso=this.detailMouvement.perso.fullname;
      },err=>{
        console.log('erreur please check your code ...');
      });
    }
  }
  onMouvement(ArtLink){
    this.router.navigate(["/article/onemouvement",ArtLink]);
  }
  OnDeleteMouvement(MouvementLink){
      if (confirm('Voulez Vous Vraiment supprimer ce mouvement !!')) {
        this.mouvementService.DeleteMouvement(MouvementLink)
        .subscribe(data=>{
          this.TestAdd=data;
        },err=>{
          console.log('erreur please check your code ...');
        });
        this.mouvementService.getMouvements(this.LinkMv).subscribe(data=>{
          this.ArticleHistoriques=data;
        },err=>{
          console.log('erreur please check your code ...');
        });
    } else {
        // Do nothing!
    }
  }
  Onchange(event){
    this.selectfile=<File>event.target.files[0];
    console.log(event);
  }
  onSubmit(id){
    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    const fd = new FormData();
    fd.append('file',this.selectfile,this.selectfile.name);
    fd.append('id',id);
    this.http.post('http://localhost:8080/upload',fd).subscribe(res=>{

    })
  }
}
