import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clientes: Cliente[] = [];

  constructor() { }

  adicionarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
  }

  obterClientes(): Cliente[] {
    return this.clientes;
  }

  clienteExiste(nome: string): boolean {
    return this.clientes.some(c => c.nome === nome);
  }

  telefoneExiste(numero: string): boolean {
    return this.clientes.some(c => c.telefones.some(t => t.numero === numero));
  }
}
