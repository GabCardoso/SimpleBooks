import { Component } from '@angular/core';
import { Autor } from '../model/autor';
import { ModalController } from '@ionic/angular';
import { ModalEditAutorPage } from '../modal/modal-edit-autor/modal-edit-autor.page';
import { AutorService } from '../services/autor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public autores: Observable<Autor[]>
  public autor: Autor

  constructor(private modalCtrl: ModalController,
    private autorService: AutorService
  ) { }

  ngOnInit() {
    this.carregarAutores()
  }

  carregarAutores() {
    this.autores = this.autorService.getAll()
  }

  async adicionarAutor() {
    const modal = await this.modalCtrl.create({
      component: ModalEditAutorPage,
      componentProps: {

      }
    })
    return modal.present()
  }

  deletarAutor(id: string) {
    console.log(id)
  }

  editarAutor() {

  }
}