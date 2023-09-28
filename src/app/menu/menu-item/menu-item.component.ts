import { Component, Input } from '@angular/core';
import { MenuService } from '../menu.service';
import { Menu } from '../menu.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {

  @Input("inputMenu") menu: Menu;
  @Input() index :number;


  constructor(private menuService: MenuService){}



}
