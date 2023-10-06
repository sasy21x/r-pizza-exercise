import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { Menu } from '../menu.model';
import { Pizza } from 'src/app/pizza/pizza.model';
import { PizzaService } from 'src/app/pizza/pizza.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit{

  @Input("inputMenu") menu: Menu;
  @Input() index :number;
  pizzas: Pizza[];


  constructor(private menuService: MenuService, private pizzaService: PizzaService){}

  ngOnInit(){
    console.log(this.menu);
    this.pizzas = this.pizzaService.getPizzasFromMenu(this.menu)
}




}
