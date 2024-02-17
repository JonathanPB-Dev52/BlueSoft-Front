import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteDetalleComponent } from './ClienteDetalle/ClienteDetalle.component';

const routes: Routes = [
  { path: '**', component: ClienteDetalleComponent },
  { path: 'Index', component: ClienteDetalleComponent },
  { path: '',   redirectTo: '/Index', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
