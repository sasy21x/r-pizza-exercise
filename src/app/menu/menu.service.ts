import { Injectable } from "@angular/core";
import { Menu } from "./menu.model";


@Injectable()
export class MenuService{
  private menus: Menu[] = [
    new Menu("Menu1",
     '19/01/2010'),
     new Menu("Menu2",
     '19/01/2015'),
     new Menu("Menu3",
     '19/01/2019'),
  ];

//Modifica
  getMenus(){
    return this.menus;
  }

  getMenu(id: number){
    return this.menus[id];
  }

  menuExists(id: number): boolean {
    return id >= 0 && id < this.menus.length; // Verifica se l'ID è un indice valido nell'array
  }


}
