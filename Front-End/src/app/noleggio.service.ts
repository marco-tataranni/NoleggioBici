import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Utente } from './utente.model';
import { Prenotazione } from './prenotazione.model';
import { Rilascio } from './rilascio.model';
@Injectable({
  providedIn: 'root'
})
export class NoleggioService {

   constructor(private http: HttpClient) { }

  LogIn(user: string, psw:string) {
    const url = `https://3000-e005c1d1-5ac0-4c24-9817-7a52d1a80262.ws-eu01.gitpod.io/users/login/${user}/${psw}`;

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json'
    })



    let obsLogIn = this.http.get(url, { headers });
    return obsLogIn;
 //Ritorno un observable ai componenti che richiedono il servizio
  }
  Serch(user: string, psw:string) {
    const url = `https://3000-e005c1d1-5ac0-4c24-9817-7a52d1a80262.ws-eu01.gitpod.io/users/serch/${user}/${psw}`;

    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json'
    })



    let obsLogIn = this.http.get(url, { headers });
    return obsLogIn;
 //Ritorno un observable ai componenti che richiedono il servizio
  }
  sendDataPrenota( id: number,  idBici: number,  lat: number,  lng: number,  dataInizio: string,  oraInizio: string){
    let p = new Prenotazione(id, idBici, lat, lng, dataInizio, oraInizio);
    this.http.post('https://3000-b9d1e6b4-2a0d-442f-bac9-b0dcf7bdc9cf.ws-eu01.gitpod.io/users/', p).subscribe(data=>{console.log(data)});
  }

  sendDataRilascio(id: number, idBici: number, dataInizio:string, oraInizio: string, lat: number,  lng: number,  dataFine: string,  oraFine: string){
    let r = new Rilascio(id, idBici, dataInizio, oraInizio, lat, lng, dataFine, oraFine);
    this.http.post('https://3000-b9d1e6b4-2a0d-442f-bac9-b0dcf7bdc9cf.ws-eu01.gitpod.io/users/1', r).subscribe(data=>{console.log(data)});
  }

}
