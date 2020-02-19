import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEditAutorPage } from './modal-edit-autor.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEditAutorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEditAutorPageRoutingModule {}
