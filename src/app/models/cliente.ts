import { Telefone } from './telefone';

export class Cliente {
  id: string = '';
  nome: string = '';
  endereco: string = '';
  bairro: string = '';
  telefones: Telefone[] = [];
}
