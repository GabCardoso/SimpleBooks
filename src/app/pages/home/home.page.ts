import { Component } from '@angular/core';
import { Autor } from '../../model/autor';
import { ModalController } from '@ionic/angular';
import { ModalEditAutorPage } from '../../modal/modal-edit-autor/modal-edit-autor.page';
import { AutorService } from '../../services/autor.service';
import { Observable } from 'rxjs';
import { OverLayService } from 'src/app/services/over-lay.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public autores: Observable<Autor[]>
  public autor: Autor

  constructor(private modalCtrl: ModalController,
    private autorService: AutorService,
    private overLayService: OverLayService
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
        autor: new Autor()
      }
    })
    return modal.present()
  }

  async deletarAutor(autor: Autor): Promise<void> {
    await this.overLayService.alert({
      message: `Você deseja remover o autor "${autor.nome}" ?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () =>  {
            await this.autorService.delete(autor)
            await this.overLayService.toast({
              message: `Autor "${autor.nome}" removido`
            })
          }

        },
        'Não'
      ]
    })
  }

  async editarAutor(autor: Autor) {
    const modal = await this.modalCtrl.create({
      component: ModalEditAutorPage,
      componentProps: {
        autor
      }
    })
    return modal.present()
  }
}