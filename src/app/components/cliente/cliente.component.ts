import { Component } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { Telefone } from '../../models/telefone';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService) { }

  addTelefone() {
    this.cliente.telefones.push(new Telefone());
  }

  removeTelefone(index: number) {
    this.cliente.telefones.splice(index, 1);
  }

  onSubmit() {
    if (this.isNomeValido() && this.isTelefoneUnico()) {
      this.clienteService.adicionarCliente(this.cliente);
      this.cliente = new Cliente();
    }
  }

  isNomeValido(): boolean {
    return this.cliente.nome.length > 10 && !this.clienteService.clienteExiste(this.cliente.nome);
  }

  isTelefoneUnico(): boolean {
    return this.cliente.telefones.every(t => !this.clienteService.telefoneExiste(t.numero));
  }
}
