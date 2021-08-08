import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss']
})
export class ItemViewComponent implements OnInit {

  constructor(
    private loginSevice: AuthService,
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.loginSevice.logOut();
  }
}
