import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuDetailComponent } from './menu/menu-detail/menu-detail.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MenuEditComponent } from './menu/menu-edit/menu-edit.component';


const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  {
    path: 'menu', component: MenuComponent, children: [
      { path: ':id', component: MenuDetailComponent}
  ]},
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: 'error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
