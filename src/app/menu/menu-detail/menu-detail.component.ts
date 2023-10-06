import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuService } from '../menu.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Menu } from '../menu.model';
import { PizzaService } from 'src/app/pizza/pizza.service';
import { Pizza } from 'src/app/pizza/pizza.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuEditComponent } from '../menu-edit/menu-edit.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css'],
  providers: [DialogService],
  encapsulation: ViewEncapsulation.None
})

export class MenuDetailComponent implements OnInit, OnDestroy{
  menu: Menu;
  id: number; //Recuperato dall'url
  menuPizzas: Pizza[]; //tutte le pizze del menu
  modifyMode = false;
  menuChange: FormGroup;
  ref: DynamicDialogRef | undefined;
  pizzaSub: Subscription;
  pizzas: Pizza[]; //tutte le pizze
  menuChangeRefresh: Subscription;



  constructor(public dialogService: DialogService, private pizzaService: PizzaService, private router: Router ,private menuService: MenuService, private route : ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      if(isNaN(params['id'])){
        this.router.navigate(['/error'])
      }
      this.id = params['id'];
      this.pizzaSub = this.pizzaService.getPizzas().subscribe(pizzas => this.pizzas = pizzas)
        //GET MENU FROM URL
      this.menuService.getMenuById(this.id).subscribe(
        (menu: Menu) => {
          this.menu = menu;
          this.menuPizzas = this.pizzaService.getPizzasFromMenu(menu);
        },
        (error) => {
          this.router.navigate(['/error']);
          console.error(error);
        }
      );

    })

     //Refresh
     this.menuService.menuChanged.subscribe((menu: Menu[]) => {
      console.log('NOSTRO');

      console.log(menu);
      for(let menuToUpdate of menu){
        if(menuToUpdate.id === this.id){
          this.menu = menuToUpdate;
        }
      }
      this.menuPizzas = this.pizzaService.getPizzasFromMenu(this.menu);
    })

  }

  ngOnDestroy(): void {
    this.pizzaSub.unsubscribe();
    //this.menuChangeRefresh.unsubscribe();
  }



  onModify(){
    //OPENING OF DIALOG AND PASSING MENU AND SELECTED PIZZAS
    this.ref = this.dialogService.open(MenuEditComponent,{
      data:{
        menu: this.menu,
        selectedPizza: this.getSelectedPizzas(),
        ref: this.ref

      }
    })
  }

  onDelete(){
    this.router.navigate(['menu']);
    this.menuService.deleteMenuById(this.id);

  }


  getSelectedPizzas(){
    let selectedPizzas: Pizza[] = [];
    for(let pizza of this.menu.pizze){
      selectedPizzas.push(this.pizzaService.getPizzaByIdNoHttp(pizza.pizzaid, this.pizzas));
    }
    return selectedPizzas;
    }


}


