import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Autor } from 'src/app/model/autor';
import { AutorService } from 'src/app/services/autor.service';
import { OverLayService } from 'src/app/services/over-lay.service';

@Component({
  selector: 'app-modal-edit-autor',
  templateUrl: './modal-edit-autor.page.html',
  styleUrls: ['./modal-edit-autor.page.scss'],
})
export class ModalEditAutorPage implements OnInit {

  public editAutorForm: FormGroup
  public autor: Autor

  constructor(public formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private autorService: AutorService,
    private overLayService: OverLayService,
    public navParams: NavParams
  ) {
    this.autor = this.navParams.get('autor')
  }

  ngOnInit() {
    this.criarFormAutor()
  }

  criarFormAutor() {
    this.editAutorForm = this.formBuilder.group({
      nome: [this.autor.nome, Validators.compose([
        Validators.required
      ])],
      dataNascimento: [this.autor.dataNascimento, Validators.compose([
        Validators.required
      ])],
      biografia: [this.autor.biografia, Validators.compose([
        Validators.required
      ])]
    })
  }

  async salvarAutor(): Promise<void> {
    const loading = await this.overLayService.loading()
    try {
      if (this.autor.id) {
        await this.autorService.update({
          id: this.autor.id,
          ...this.editAutorForm.value
        })
      } else {
        await this.autorService.create(this.editAutorForm.value)
      }
      await this.overLayService.toast({
        message: 'Autor salvo'
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