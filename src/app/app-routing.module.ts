import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  {
    path: 'modal-edit-autor',
    loadChildren: () => import('./modal/modal-edit-autor/modal-edit-autor.module').then( m => m.ModalEditAutorPageModule)
  },  {
    path: 'modal-edit-livro',
    loadChildren: () => import('./modal/modal-edit-livro/modal-edit-livro.module').then( m => m.ModalEditLivroPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
