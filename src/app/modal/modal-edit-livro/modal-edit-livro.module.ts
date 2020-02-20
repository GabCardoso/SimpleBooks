import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEditLivroPageRoutingModule } from './modal-edit-livro-routing.module';

import { ModalEditLivroPage } from './modal-edit-livro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEditLivroPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalEditLivroPage]
})
export class ModalEditLivroPageModule {}
