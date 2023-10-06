import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from './menu.model';
import { MenuService } from './menu.service';
import { Subscription} from 'rxjs';
import { isFormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuAddComponent } from './menu-add/menu-add.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [DialogService]
})
export class MenuComponent implements OnInit{
  menus: Menu[] = [];
  isFetching=false;
  error= null;
  errorSub: Subscription;
  getSub: Subscription;
  menuChangeRefresh: Subscription;
  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService, private router: Router, private menuService: MenuService, private route : ActivatedRoute){}

  ngOnInit(): void {
    this.isFetching = true;
    this.menuChangeRefresh = this.menuService.menuChanged.subscribe((menu: Menu[]) => {
      this.menus = menu;
    })
    this.getSub = this.getBySubscription(); // inizializza l'array


    this.errorSub = this.menuService.error.subscribe(errorMessage => {this.error= errorMessage})
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
    this.getSub.unsubscribe();
    this.menuChangeRefresh.unsubscribe();
   }



  onNewMenu(){
    this.ref = this.dialogService.open(MenuAddComponent,{
      data: {
        ref: this.ref
      }
    });
  }


onRefreshMenus(){
    this.isFetching=true;
    this.getSub= this.getBySubscription();
  }
    onHandleError(){
      this.error = null
      this.isFetching=false;
    }
    getBySubscription(){
      return this.menuService.getMenus().subscribe(menu => {
        this.isFetching = false;
        this.menus = menu;
      }, error =>{
        this.error = error;
      })
    }



  }
