import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { MenuService } from '../menu.service';
import { PizzaService } from 'src/app/pizza/pizza.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Pizza } from 'src/app/pizza/pizza.model';
import { Menu } from '../menu.model';
import { Subscription } from 'rxjs';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css'],
})
export class MenuEditComponent implements OnInit, OnDestroy{
  menuForm: FormGroup;
  pizzaSub: Subscription;
  pizzaOptions: Pizza[];
  menu: Menu;
  ref;

  constructor(private dialogConfig:DynamicDialogConfig ,private primengConfig: PrimeNGConfig, private router: Router, private route: ActivatedRoute, private menuService: MenuService, private pizzaService: PizzaService) {}

  ngOnInit() {
    this.menu = this.dialogConfig.data.menu;
    this.pizzaSub = this.pizzaService.getPizzas().subscribe(pizzas => this.pizzaOptions = pizzas)
    this.primengConfig.ripple = true;
    //Costruzione form
    this.initForm();
    this.ref = this.dialogConfig.data.ref;
     this.menuForm.statusChanges.subscribe((value) => {
        console.log(value);
      });



  }

  ngOnDestroy(): void {
    this.pizzaSub.unsubscribe();
  }


  onSubmit() {
    console.log(this.menuForm.value);
    const formData = this.menuForm.value;
    const pizzaIds: number[] = [];
    for (let i = 0; i < formData.pizze.length; i++) {
      pizzaIds.push(formData.pizze[i].id);
    }
    const pizzeArray: { pizzaid: number, prezzo: number, pizza: Pizza }[] = pizzaIds.map((pizzaId) => {
      return {
        pizzaid: pizzaId,
        prezzo: 20,
        pizza: this.pizzaService.getPizzaByIdNoHttp(pizzaId, this.pizzaOptions)
      };
    });

    let nome = this.menu.nome;
    if (formData.nome !== nome) {
      nome = formData.nome;
    }
    const formToSend = new Menu(nome, this.menu.data_creazione, pizzeArray);
    this.menuService.changeMenu(this.menu.id, formToSend);
    this.menuForm.reset();
    if (this.ref) {
      this.ref.close();
    }
  }

  BasicShow: boolean = false;

  showDialog() {
    this.BasicShow = true;
  }

  initForm(){
    this.menuForm = new FormGroup({
      nome: new FormControl(this.menu.nome, [Validators.required]),
      pizze: new FormControl(this.dialogConfig.data.selectedPizza),
    })
  }



}
