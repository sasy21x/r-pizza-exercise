
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { MenuService } from './menu/menu.service';
import { MenuItemComponent } from './menu/menu-item/menu-item.component';
import { MenuDetailComponent } from './menu/menu-detail/menu-detail.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ImpastoComponent } from './impasto/impasto.component';
import { IngredienteComponent } from './ingrediente/ingrediente.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MenuEditComponent } from './menu/menu-edit/menu-edit.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MenuAddComponent } from './menu/menu-add/menu-add.component';
import { InplaceModule } from 'primeng/inplace';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    MenuItemComponent,
    MenuDetailComponent,
    ErrorPageComponent,
    ImpastoComponent,
    IngredienteComponent,
    MenuEditComponent,
    MenuAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    MultiSelectModule,
    DynamicDialogModule,
    InplaceModule,
    InputTextModule

  ],
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
