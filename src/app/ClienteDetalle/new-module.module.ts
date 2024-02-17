import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteDetalleComponent } from './ClienteDetalle.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import{ MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';




@NgModule({
  declarations: [ClienteDetalleComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    FilterPipeModule,
    OrderModule,
    NgxPaginationModule,FormsModule,MatInputModule,MatFormFieldModule,ReactiveFormsModule,MatSelectModule, MatStepperModule, MatDatepickerModule,MatNativeDateModule,MatCardModule
  ]
})
export class ClienteDetalleModule { }
