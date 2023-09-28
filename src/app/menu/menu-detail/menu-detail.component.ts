import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Menu } from '../menu.model';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css']
})
export class MenuDetailComponent implements OnInit{
  menu: Menu;
  id: number;



  constructor(private router: Router ,private menuService: MenuService, private route : ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      if(isNaN(params['id'])){
        this.router.navigate(['/error'])
      }
      this.id = params['id'];

      if(this.menuService.menuExists(this.id)){
        this.menu = this.menuService.getMenu(this.id);
      }else{
        this.router.navigate(['/error'])
      }

    })
  }

}
