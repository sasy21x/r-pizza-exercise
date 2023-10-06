import { Pizza } from "../pizza/pizza.model";

export class Menu {
  id: number;
  nome: string;
  data_creazione: Date;
  pizze: {pizzaid: number, prezzo:number, pizza?: Pizza}[];


  constructor(name, creationDate, pizze){
    this.nome=name;
    this.data_creazione = creationDate;
    this.pizze = pizze;
  }
}
