import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class InterventionService {
  private host:string="http://localhost:8080";
  private jwtToken:string;
  private header:any;
  constructor(private http:HttpClient, private auth:AuthenticationService) {  }
  private LoadHeader(){
    this.header=this.auth.loadToken();
  }
   getListeInterventions(npage=0,nbrlines=10) {
    this.LoadHeader();
    return this.http.get(this.host+"/interventions/search/findByValiderresponsable?u=false&page="+npage+"&size="+nbrlines,this.header);
  }
  FiltrerListeIntervention(filter,npage=0,nbrlines=10){
    this.LoadHeader();
    return this.http.get(this.host+"/interventions/search/findByValiderAndTypeContainingAndEquipeContaining?v="+filter.valider+"&t="+filter.type+"&e="+filter.equipe,this.header);
  }
  saveIntervention(intervention)
  {
    this.LoadHeader();
    return this.http.post(this.host+"/interventions", intervention,this.header);
  }
  deleteIntervention(intervention)
  {
    this.LoadHeader();
    return this.http.delete(intervention,this.header).subscribe(data=>{
      console.log(data);
    },err=>{
      console.log('erreur please check your code ...');
    });;;
  }
  saveUserIntervention(userintervention)
  {
    this.LoadHeader();
    return this.http.post(this.host+"/userinterventions", userintervention,this.header);
  }
  getInterventionByUser(iduser,npage=0,nbrlines=10)
  {
    this.LoadHeader();
    return this.http.get(this.host+"/interventions/search/InterventionBYUser?u="+iduser+"&page="+npage+"&size="+nbrlines,this.header);
  }
  getInterventionOfTodayByUser(iduser,npage=0,nbrlines=5)
  {
    this.LoadHeader();
    return this.http.get(this.host+"/interventions/search/InterventionOfTodayByUser?u="+iduser+"&page="+npage+"&size="+nbrlines,this.header);
  }
  
  UpdateIntervention(intervention,link)
  {
    this.LoadHeader();
    return this.http.patch(link, intervention,this.header);
  }
}
