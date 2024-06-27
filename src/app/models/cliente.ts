import { Telefone } from './telefone';

export class Cliente {
  nome: string = '';
  endereco: string = '';
  bairro: string = '';
  telefones: Telefone[] = [];
}
