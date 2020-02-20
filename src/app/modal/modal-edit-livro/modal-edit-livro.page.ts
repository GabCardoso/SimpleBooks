import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LivroService } from 'src/app/services/livro.service';
import { OverLayService } from 'src/app/services/over-lay.service';
import { Livro } from 'src/app/model/livro';

@Component({
  selector: 'app-modal-edit-livro',
  templateUrl: './modal-edit-livro.page.html',
  styleUrls: ['./modal-edit-livro.page.scss'],
})
export class ModalEditLivroPage implements OnInit {

  public editLivroForm: FormGroup
  public livro: Livro
  public idAutor: string

  constructor(public formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private livroService: LivroService,
    private overLayService: OverLayService,
    public navParams: NavParams
  ) {
    this.livro = this.navParams.get('livro')
    this.idAutor = this.navParams.get('idAutor')
  }

  ngOnInit() {
    this.criarFormLivro()
  }

  criarFormLivro() {
    this.editLivroForm = this.formBuilder.group({
      titulo: [this.livro.titulo, Validators.compose([
        Validators.required
      ])],
      ano: [this.livro.ano, Validators.compose([
        Validators.required
      ])],
      paginas: [this.livro.paginas, Validators.compose([
        Validators.required
      ])],
      resumo: [this.livro.resumo, Validators.compose([
        Validators.required
      ])],
      capa: [this.livro.capa],
      nota: [this.livro.nota, Validators.compose([
        Validators.required
      ])]
    })
  }

  async salvarLivro(): Promise<void> {
    const loading = await this.overLayService.loading()
    try {
      if (this.livro.id) {
        await this.livroService.update({
          id: this.livro.id,
          idAutor: this.livro.idAutor,
          ...this.editLivroForm.value
        })
      } else {
        await this.livroService.create({
          idAutor: this.idAutor,
          ...this.editLivroForm.value
        })
      }
      await this.overLayService.toast({
        message: 'Livro salvo'
      })
      this.modalCtrl.dismiss()
    } catch (error) {
      await this.overLayService.toast({
        message: error.message
      })
      console.log('Erro ao salvar Autor: ', error)
    } finally {
      loading.dismiss()
    }
  }

  fecharModal() {
    this.modalCtrl.dismiss()
  }
}