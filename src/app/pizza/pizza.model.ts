import { Impasto } from "../impasto/impasto.model";
import { Ingrediente } from "../ingrediente/ingrediente.model";

export class Pizza{
id: number;
nome: string;
impastiId: number;
ingredientiId: number;
impasto?: Impasto;
ingredienti?: Ingrediente[];

constructor(
  id: number,
  nome: string,
  impastiId: number,
  ingredientiId: number,
  impasto?: Impasto,
  ingredienti?: Ingrediente[]
) {
  this.id = id;
  this.nome = nome;
  this.impastiId = impastiId;
  this.ingredientiId = ingredientiId;
  this.impasto = impasto;
  this.ingredienti = ingredienti;
}


}
