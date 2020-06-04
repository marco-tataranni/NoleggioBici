import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import {formatDate} from '@angular/common';
import { NoleggioService } from '../noleggio.service';
import { Prenotazione } from '../prenotazione.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
  @Input() IdUtente : number;
  IdBici:number;
  currLat: any;
  currLng: number;
  loading: boolean;
  o :Observable<Object>;
  myDate: any;
  myTime: any;
  myDate2: any;
  myTime2: any;
  constructor(public noleggio: NoleggioService, private http: HttpClient) {}

  ngOnInit(): void {
  }
  qrResultString : string = null;
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.IdBici =+ this.qrResultString;


  }

   getCurrentLocation() : void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
        console.log(this.currLat, this.currLng);
        this.loading = true;
        this.myDate = formatDate(new Date (), 'yyyy/MM/dd', 'en'); //prende la data corrente e formattarlo come indicato nel db
        this.myTime = formatDate(new Date (), 'HH:mm:ss', 'en'); //prende l'ora correntee formattarlo nella zona giusta
        console.log(this.myDate, this.myTime);
        this.noleggio.sendDataPrenota(this.IdUtente, this.IdBici, this.currLat, this.currLng, this.myDate, this.myTime)
      });
    }
    else {
      alert("Geolocalizzazione non supportato dal browser");
    }
  }
   getCurrentLocationRilascio() : void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        this.currLat = position.coords.latitude;
        this.currLng = position.coords.longitude;
        console.log(this.currLat, this.currLng);
        this.myDate2 = formatDate(new Date (), 'yyyy/MM/dd', 'en');
        this.myTime2 = formatDate(new Date (), 'HH:mm:ss', 'en');
        console.log(this.myDate2, this.myTime2);
        this.noleggio.sendDataRilascio(this.IdUtente, this.IdBici, this.myDate, this.myTime, this.currLat, this.currLng, this.myDate2, this.myTime2);
        this.loading = false;
        this.qrResultString=null;
      });
    }
    else {
      alert("Geolocalizzazione non supportato dal browser");
    }
}

}
