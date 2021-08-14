import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Gaurd/auth.guard';
import { ItemViewComponent } from './item-view/item-view.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: 'items', component: ItemViewComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'items' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
