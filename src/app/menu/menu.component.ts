import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from './menu.model';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  menus: Menu[];


  constructor(private router: Router, private menuService: MenuService, private route : ActivatedRoute){}


  ngOnInit(): void {
    this.menus = this.menuService.getMenus();
  }


  onNewMenu(){

  this.router.navigate(['new'], {relativeTo: this.route})

    }


  }
