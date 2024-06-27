import { Component } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { Telefone } from '../../models/telefone';
import { ClienteService } from '../../services/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService, private snackBar: MatSnackBar) {
    this.cliente.telefones = [];
  }

  addTelefone() {
    this.cliente.telefones.push(new Telefone());
  }

  removeTelefone(index: number) {
    this.cliente.telefones.splice(index, 1);
  }

  onSubmit() {
    if (this.isNomeValido() && this.areTelefonesUnicos()) {
      this.clienteService.adicionarCliente(this.cliente).subscribe(
        response => {
          this.showSuccessMessage('Cliente adicionado com sucesso!');
          this.cliente = new Cliente();
          this.cliente.telefones = [];
        },
        error => {
          if (error.error && error.error.message && error.error.code) {
            this.showErrorMessage(`${error.error.message} (Código ${error.error.code})`);
          } else {
            this.showErrorMessage('Erro ao adicionar cliente. Tente novamente.');
          }
          console.error('Erro ao adicionar cliente:', error);
        }
      );
    }
  }

  isNomeValido(): boolean {
    const nome = this.cliente.nome.trim();
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

    if (nome.length <= 10) {
      this.showErrorMessage('O nome deve ter mais de 10 caracteres.');
      return false;
    }

    if (!regex.test(nome)) {
      this.showErrorMessage('O nome deve conter pelo menos uma letra e não pode ser composto apenas por números, símbolos ou espaços.');
      return false;
    }

    return true;
  }

  areTelefonesUnicos(): boolean {
    const telefones = this.cliente.telefones.map(t => t.numero.trim());
    const telefoneSet = new Set(telefones);
    if (telefoneSet.size !== telefones.length) {
      this.showErrorMessage('Existem números de telefone duplicados na lista.');
      return false;
    }

    return true;
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['success-snackbar']
    });
  }
}
