import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user.component';
import { InsideComponent } from './inside/inside.component';


const routes: Routes = [
  {path:'user',component:UserComponent,
  children:[
    {path:'registration',component:RegisterComponent},
    {path:'login',component:LoginComponent}
  ]},
  {path:'inside',component:InsideComponent,
children:[
  {path:'home', component: HomeComponent},
  {path:'create/:id', component: CreateComponent},
]},
 
  {path:'', redirectTo:'/user/login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
