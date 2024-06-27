import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/api/v1/clientes';

  constructor(private http: HttpClient) { }

  private createAuthHeader(): HttpHeaders {
    const username = 'fulano';
    const password = 'senhaDoFulano';
    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': basicAuth
    });
  }

  adicionarCliente(cliente: Cliente): Observable<Cliente> {
    const headers = this.createAuthHeader();
    return this.http.post<Cliente>(`${this.apiUrl}/create`, cliente, { headers });
  }
}
