import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../menu.service';
import { Menu } from '../menu.model';
import { Pizza } from 'src/app/pizza/pizza.model';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-menu-add',
  templateUrl: './menu-add.component.html',
  styleUrls: ['./menu-add.component.css']
})
export class MenuAddComponent implements OnInit, OnDestroy{
  menuForm: FormGroup;
  ref

  constructor(private dialogConfig:DynamicDialogConfig,private menuService: MenuService){}


  ngOnInit(): void {
    this.ref = this.dialogConfig.data.ref;
    this.initForm();

  }



  ngOnDestroy(): void {

  }

  onSubmit(){
    let pizze: Pizza[] = []
    const menu: Menu = new Menu(this.menuForm.value.nome,new Date(), pizze);
    this.menuService.addMenu(menu)
    this.menuForm.reset();
    if (this.ref) {
      this.ref.close();
    }
  }


  initForm(){
    this.menuForm = new FormGroup({
      nome: new FormControl(null, [Validators.required])
    })
  }



}

