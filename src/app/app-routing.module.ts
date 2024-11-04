import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmpleadosComponent } from './Components/list-empleados/list-empleados.component';
import { CreateEmpleadoComponent } from './Components/create-empleado/create-empleado.component';

const routes: Routes = [
  { path: '', redirectTo: 'list-empleados', pathMatch: 'full' },
  { path: 'list-empleados', component: ListEmpleadosComponent },
  { path: 'create-empleado', component: CreateEmpleadoComponent },
  { path: 'update-empleado/:id', component: CreateEmpleadoComponent },
  { path: '**', redirectTo: 'list-empleados', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
