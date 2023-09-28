export class Menu {
  name: string;
  creationDate: Date;
  pizze: Pizza[];


  constructor(name, creationDate, pizze){
    this.name=name;
    this.creationDate = creationDate;
    this.pizze = pizze;
  }
}
