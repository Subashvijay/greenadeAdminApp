import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, observable, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged = (false);

  constructor(
    private route: Router
  ) { }

  login(username: string, password: string): Observable<boolean> {

    if (username === "Admin" && password === "123") {
      localStorage.setItem('logedIn', 'true');
      this.isLogged = true;
      return new Observable(s => { s.next(true) });
    } else {
      return new Observable(s => { s.next(false) });
    }
  }

  islogedIn(): boolean {

    if (localStorage.getItem('logedIn') === "true" && this.isLogged) {
      return true;
    }
    return false;
  }

  logOut() {
    localStorage.clear();
    this.isLogged = false;
    this.route.navigate(['login'])
  }
}
