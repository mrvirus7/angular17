import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent } from './index/index.component';


const routes: Routes = [

  { path: 'students', component: IndexComponent},
  { path: 'edit/:id', component: RegisterComponent },
  { path: '', redirectTo: '/students', pathMatch: 'full' }  // Default route

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
