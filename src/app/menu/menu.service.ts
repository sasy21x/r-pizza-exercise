import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Menu } from "./menu.model";
import { Observable, Subject, catchError, map, mergeMap, throwError } from "rxjs";


@Injectable()
export class MenuService{
  baseUrl: string = "http://localhost:3000/menu";
  error = new Subject<string>
  menuChanged = new Subject<Menu[]>

constructor(private http: HttpClient){}



// Chiamata Post per aggiungere un Menu
addMenu(menu: Menu){
  const menuData: Menu = menu;

  this.http
    .post<{name: string}>(
      this.baseUrl,
      menuData
    )
    .subscribe(responseData => {
      console.log(responseData);
      this.getMenus().subscribe((updatedMenus) => {
        this.menuChanged.next(updatedMenus);
      });
    }, error => { this.error.next(error.message); }
    );
    //Aggiorna
}
// Chiamata Patch per modificare un Menu
changeMenu(menuId: number, menu: Menu){
  const url = `${this.baseUrl}/${menuId}`;
  this.http.patch(url, menu, { headers: { 'Content-Type': 'application/json' } }).pipe(
    mergeMap(() => this.getMenus()),
    catchError(error => {
      this.error.next(error.message);
      return throwError(error);
    })
  ).subscribe(updatedMenus => {
    this.menuChanged.next(updatedMenus);
  });
}



  //get dei menu
   getMenus(){

    return this.http.get<{[key: string]: Menu}>(this.baseUrl).pipe(
      map((responseData ) => {
      const postsArray: Menu[] = [];
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
             postsArray.push({...responseData[key]});
        }

      }
      return postsArray;
    }), catchError(errorRes => {
            return throwError(errorRes);
    }))

  }


  getMenuById(menuId: number): Observable<Menu> {
    const url = `${this.baseUrl}/${menuId}`;

    return this.http.get<Menu>(url).pipe(
      catchError((errorRes) => {
        return throwError(errorRes);
      })
    );
  }



  deleteMenuById(id: number) {
    const url = `${this.baseUrl}/${id}`;

    this.http.delete(url).pipe(
      mergeMap(() => this.getMenus()),
      catchError(error => {
        this.error.next(error.message);
        return throwError(error);
      })
    ).subscribe(updatedMenus => {
      this.menuChanged.next(updatedMenus);
    }, error => {
      this.error.next(error.message); // Gestisci l'errore dell'operazione DELETE
    });
  }




}
