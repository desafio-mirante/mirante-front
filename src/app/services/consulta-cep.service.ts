import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Cliente} from '../domain/Cliente';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCEPService {

  constructor(private httpClient: HttpClient) { }

  buscaCEP(cep: string): Observable<any> {
    const url = `${environment.cepURL}/${cep}/json`;

    return this.httpClient.get<any>(url);
  }
}
