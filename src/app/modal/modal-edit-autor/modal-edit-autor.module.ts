import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEditAutorPageRoutingModule } from './modal-edit-autor-routing.module';

import { ModalEditAutorPage } from './modal-edit-autor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEditAutorPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalEditAutorPage]
})
export class ModalEditAutorPageModule {}
