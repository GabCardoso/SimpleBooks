import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEditLivroPage } from './modal-edit-livro.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEditLivroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEditLivroPageRoutingModule {}
