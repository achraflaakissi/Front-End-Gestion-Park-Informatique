import { UsersService } from './users.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { ArticlesService } from  './articles.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ArticleComponent } from './article/article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewArticleComponent } from './new-article/new-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { DeleteArticleComponent } from './delete-article/delete-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { MouvementService } from './mouvement.service';
import { InterventionService } from './intervention.service';
import { AuthenticationService } from './authentication.service';

import { MouvementComponent } from './mouvement/mouvement.component';
import { StocksService } from './stocks.service';
import { EmplacementService } from './emplacement.service';
import { PersonnelService } from './personnel.service';
import { OneMouvementComponent } from './one-mouvement/one-mouvement.component';
import { InterventionComponent } from './intervention/intervention.component';
import { AddInterventionComponent } from './add-intervention/add-intervention.component';
import { UserInterventionComponent } from './user-intervention/user-intervention.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddInterventionByUserComponent } from './add-intervention-by-user/add-intervention-by-user.component';
import { ReminderComponent } from './reminder/reminder.component';
import { ReminderService } from './reminder.service';
import { DatePipe } from '@angular/common'

const routes:Routes=[
  {path:'',component:HomeComponent},
  {path:'article',component:ArticleComponent},
  {path:'article/add',component:NewArticleComponent},
  {path:'article/edit/:link1',component:NewArticleComponent},
  {path:'article/onemouvement/:link1',component:OneMouvementComponent},
  { path: 'article/edit', component: UpdateArticleComponent },
  { path: 'article/detail/:link1/:link2', component: DetailArticleComponent },
  { path: 'article/delete/:link1', component: DeleteArticleComponent },
  {path:'mouvement/unite',component:MouvementComponent},
  {path:'intervention',component:InterventionComponent},
  {path:'intervention/new',component:AddInterventionComponent},
  {path:'intervention/byuser',component:UserInterventionComponent},
  {path:'intervention/add/byuser',component:AddInterventionByUserComponent},
  {path:'reminder',component:ReminderComponent},
  {path:'login',component:LoginComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    NewArticleComponent,
    UpdateArticleComponent,
    DeleteArticleComponent,
    DetailArticleComponent,
    MouvementComponent,
    OneMouvementComponent,
    InterventionComponent,
    AddInterventionComponent,
    UserInterventionComponent,
    LoginComponent,
    HomeComponent,
    AddInterventionByUserComponent,
    ReminderComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,RouterModule.forRoot(routes),FormsModule, ReactiveFormsModule
  ],
  providers: [DatePipe,AuthenticationService,ReminderService,ArticlesService,MouvementService,StocksService,EmplacementService,PersonnelService,InterventionService,UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
