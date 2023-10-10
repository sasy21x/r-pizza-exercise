import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuService } from '../menu.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Menu } from '../menu.model';
import { PizzaService } from 'src/app/pizza/pizza.service';
import { Pizza } from 'src/app/pizza/pizza.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuEditComponent } from '../menu-edit/menu-edit.component';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css'],
  providers: [DialogService],
  encapsulation: ViewEncapsulation.None
})

export class MenuDetailComponent implements OnInit, OnDestroy {
  menu: Menu;
  id: number; // Recuperato dall'url
  menuPizzas: Pizza[]; // Tutte le pizze del menu
  modifyMode = false;
  menuChange: FormGroup;
  ref: DynamicDialogRef | undefined;
  pizzaSub: Subscription;
  pizzas: Pizza[]; // Tutte le pizze
  menuChangeRefresh: Subscription;
  menuPizzaSub: Subscription;

  constructor(public dialogService: DialogService, private pizzaService: PizzaService, private router: Router, private menuService: MenuService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pizzaSub = this.pizzaService.getPizzas().subscribe(pizzas => this.pizzas = pizzas);

    this.route.params.subscribe((params: Params) => {
      if (isNaN(params['id'])) {
        this.router.navigate(['/error']);
      }
      this.id = params['id'];

      // GET MENU FROM URL
      this.menuService.getMenuById(this.id).subscribe((menu: Menu) => {
        this.menu = menu;
        this.menuPizzaSub = this.pizzaService.getPizzasFromMenu(menu).subscribe(pizzas => {
          this.menuPizzas = pizzas;
        }, (error) => {
          this.router.navigate(['/error']);
          console.error(error);
        });
      });

      // Refresh
      this.menuChangeRefresh = this.menuService.menuChanged.pipe(
        switchMap((menu: Menu[]) => {
          const menuToUpdate = menu.find((menuItem) => menuItem.id === this.id);
          if (menuToUpdate) {
            this.menu = menuToUpdate;
            return this.pizzaService.getPizzasFromMenu(this.menu);
          }
          return [];
        })
      ).subscribe((pizzas) => {
        this.menuPizzas = pizzas;
      }, (error) => {
        console.error('Errore durante la gestione dell\'observable innestato:', error);
      });
    });
  }

  ngOnDestroy(): void {
    this.pizzaSub.unsubscribe();
    this.menuChangeRefresh.unsubscribe();
    this.menuPizzaSub.unsubscribe();
  }

  onModify() {
    // OPENING OF DIALOG AND PASSING MENU AND SELECTED PIZZAS
    this.ref = this.dialogService.open(MenuEditComponent, {
      data: {
        menu: this.menu,
        selectedPizza: this.getSelectedPizzas(),
        ref: this.ref
      }
    });
  }

  onDelete() {
    this.router.navigate(['menu']);
    this.menuService.deleteMenuById(this.id);
  }

  getSelectedPizzas() {
    let selectedPizzas: Pizza[] = [];
    for (let pizza of this.menu.pizze) {
      selectedPizzas.push(this.pizzaService.getPizzaByIdNoHttp(pizza.pizzaid, this.pizzas));
    }
    return selectedPizzas;
  }
}
