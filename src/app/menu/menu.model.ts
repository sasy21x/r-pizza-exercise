export class Menu {
  name: string;
  creationDate: Date;
  pizze: Pizza[];


  constructor(name, creationDate){
    this.name=name;
    this.creationDate = creationDate;
  }
}
