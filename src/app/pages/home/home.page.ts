import { Component } from '@angular/core';
import { Autor } from '../../model/autor';
import { ModalController } from '@ionic/angular';
import { ModalEditAutorPage } from '../../modal/modal-edit-autor/modal-edit-autor.page';
import { AutorService } from '../../services/autor.service';
import { Observable } from 'rxjs';
import { OverLayService } from 'src/app/services/over-lay.service';
import { ModalEditLivroPage } from 'src/app/modal/modal-edit-livro/modal-edit-livro.page';
import { Livro } from 'src/app/model/livro';
import { LivroService } from 'src/app/services/livro.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public autores: Observable<Autor[]>
  public autor = new Autor()
  public livros: Observable<Livro[]>
  public livro = new Livro()

  public exibirAutores: boolean
  public exibirDetalheAutor: boolean
  public exibirDetalheLivro: boolean

  constructor(private modalCtrl: ModalController,
    private autorService: AutorService,
    private livroService: LivroService,
    private overLayService: OverLayService
  ) { }

  ngOnInit() {
    this.carregarAutores()

    this.exibirAutores = true
    this.exibirDetalheAutor = false
    this.exibirDetalheLivro = false
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
          handler: async () => {
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

  carregarDetalhesAutor(autor: Autor) {
    this.exibirAutores = false
    this.exibirDetalheAutor = true
    this.autor = autor
    this.autor.dataFormatada = moment(this.autor.dataNascimento).format("DD/MM/YYYY");
    this.obterLivros(this.autor)
  }

  obterLivros(autor: Autor) {
    this.livroService.init(autor.id)
    this.livros = this.livroService.getAll()
  }

  async adicionarLivro(autor: Autor) {
    const modal = await this.modalCtrl.create({
      component: ModalEditLivroPage,
      componentProps: {
        idAutor: autor.id,
        livro: new Livro()
      }
    })
    return modal.present()
  }

  async deletarLivro(livro: Livro): Promise<void> {
    await this.overLayService.alert({
      message: `Você deseja remover o livro "${livro.titulo}" ?`,
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.livroService.delete(livro)
            await this.overLayService.toast({
              message: `Livro "${livro.titulo}" removido`
            })
          }
        },
        'Não'
      ]
    })
  }

  async editarLivro(livro: Livro) {
    const modal = await this.modalCtrl.create({
      component: ModalEditLivroPage,
      componentProps: {
        livro
      }
    })
    return modal.present()
  }

  carregarDetalhesLivro(livro: Livro) {
    this.exibirDetalheAutor = false
    this.exibirDetalheLivro = true
    this.livro = livro
  }

  voltarDetalhesAutor() {
    this.exibirDetalheAutor = true
    this.exibirDetalheLivro = false
  }

  voltarListaAutores() {
    this.exibirAutores = true
    this.exibirDetalheAutor = false
  }
}