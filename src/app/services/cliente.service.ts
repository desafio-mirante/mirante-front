import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Cliente} from '../domain/Cliente';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private httpClient: HttpClient) { }

  post(cliente: Cliente): Observable<any>{
    const url = `${environment.baseURL}/cliente`;
    return this.httpClient.post(url, JSON.stringify(cliente), {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  put(cliente: Cliente): Observable<any>{
    const url = `${environment.baseURL}/cliente`;
    return this.httpClient.put(url, JSON.stringify(cliente), {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  buscaTodos(): Observable<Array<Cliente>> {
    const url = environment.baseURL + '/cliente';

    return this.httpClient.get<Array<Cliente>>(url)
      .pipe(map(clientes => {
        return clientes.map(cli => {
          return {
            id: cli.id,
            nome: cli.nome,
            cpf: cli.cpf,
            emails: cli.emails,
            endereco: cli.endereco,
            telefones: cli.telefones
          };
        });

      }));
  }
}
