
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NoleggioService } from '../noleggio.service';
import { Utente } from '../utente.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-accesso',
  templateUrl: './accesso.component.html',
  styleUrls: ['./accesso.component.css']
})
export class AccessoComponent implements OnInit {
  user: string;
  psw:string;
  IdUtente: number;
  obsLogIn: Observable<Object>;
  obsSerch: Observable<Object>;
  postObserver : Observable<Object>;
  results:any;
  postresult:any;
  showlogin: boolean;
  showregistrazione: boolean;
  risposta:string;
  showscanner:boolean;
  showbutton:boolean;
  constructor(public noleggio: NoleggioService, private http: HttpClient) {

    this.showlogin=false;
    this.showregistrazione=false;
    this.showscanner=false;
    this.showbutton=true;
  }

  mostralogin():void{
    this.showlogin=true;
    this.showregistrazione=false;
  }
  mostraregistrazione():void{
    this.showlogin=false;
    this.showregistrazione=true;


  }


  LogIn(user: HTMLInputElement, psw: HTMLInputElement): void {

    if (!user.value && !psw.value) {
      return;
    }
    this.user = user.value;
    this.psw = psw.value;

    this.obsLogIn = this.noleggio.LogIn(this.user, this.psw);
    this.obsLogIn.subscribe((data) => {
      this.results = data;
      console.log(this.results.recordset[0][""]);
      let a : number= (this.results.recordset[0][""]);
      if (a==1)
      {
        this.risposta="log-in eseguito con successo";
        this.obsSerch= this.noleggio.Serch(this.user, this.psw);
        this.obsSerch.subscribe((data) => {
          this.results = data;
          console.log(this.results.recordset[0]["IdUtente"]);
          this.IdUtente= (this.results.recordset[0]["IdUtente"]);
        });
        this.showscanner=true;
        this.showlogin=false;
        this.showregistrazione=false;
        this.showbutton=false;
      }
      else
      {
        this.risposta="log-in fallito";

      }
    });


  }

    Registrazione(newnome: HTMLInputElement, newcognome: HTMLInputElement, newemail: HTMLInputElement,newPSW: HTMLInputElement,newcitta: HTMLInputElement): boolean {
    let newData = new Utente(newnome.value, newcognome.value, newemail.value, newPSW.value, newcitta.value);
    this.postObserver = this.http.post('https://3000-e005c1d1-5ac0-4c24-9817-7a52d1a80262.ws-eu01.gitpod.io/users/registrazione', newData);
    this.postObserver.subscribe(data =>{
      this.postresult= data;
      console.log(this.postresult.message);
      this.risposta= this.postresult.message;
    });


    return false;
  }

  ngOnInit(): void {
  }

}
