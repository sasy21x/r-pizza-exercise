import { Injectable } from "@angular/core";
import { Pizza } from "./pizza.model";
import { Observable, Subject, catchError, map, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Menu } from "../menu/menu.model";

@Injectable({providedIn: 'root'})
export class PizzaService{
  baseUrl: string = "http://localhost:3000/pizza";
  error = new Subject<string>


constructor(private http: HttpClient){}




addPizza(pizza: Pizza){
  const pizzaData: Pizza = pizza;

  this.http
    .post<{name: string}>(
      this.baseUrl,
      pizzaData
    )
    .subscribe(responseData => {
      console.log(responseData);
    }, error => { this.error.next(error.message); }
    );
}




   getPizzas(){

    return this.http.get<{[key: string]: Pizza}>(this.baseUrl).pipe(
      map((responseData ) => {
      const postsArray: Pizza[] = [];
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


  getPizzaById(pizzaId: number): Observable<Pizza> {
    const url = `${this.baseUrl}/${pizzaId}`;

    return this.http.get<Pizza>(url).pipe(
      catchError((errorRes) => {
        return throwError(errorRes);
      })
    );
  }

  getPizzasFromMenu(menu: Menu): Pizza[]{
    const pizzasArray: Pizza[] = [];
   for(const pizza of menu.pizze){
     this.getPizzaById(pizza.pizzaid).subscribe(pizza => {
       pizzasArray.push(pizza)
     });
   }
    return pizzasArray;
 }


 getPizzaByIdNoHttp(id: number, pizzas: Pizza[]): Pizza{
  for(let i=0;i<pizzas.length;i++){
    if(pizzas[i].id === id){
      return pizzas[i];
    }
  }

}

}
