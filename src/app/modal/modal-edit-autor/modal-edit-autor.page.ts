import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Autor } from 'src/app/model/autor';
import { AutorService } from 'src/app/services/autor.service';

@Component({
  selector: 'app-modal-edit-autor',
  templateUrl: './modal-edit-autor.page.html',
  styleUrls: ['./modal-edit-autor.page.scss'],
})
export class ModalEditAutorPage implements OnInit {

  public editAutorForm: FormGroup

  constructor(public formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private autorService: AutorService
  ) { }

  ngOnInit() {
    this.criarFormAutor()
  }

  criarFormAutor() {
    this.editAutorForm = this.formBuilder.group({
      nome: ['', Validators.compose([
        Validators.required,
        // Validators.pattern(this.unamePattern)
      ])],
      dataNascimento: ['', Validators.compose([
        Validators.required
      ])],
      biografia: ['', Validators.compose([
        Validators.required
      ])]
    })
  }

  async salvarAutor(): Promise<void> {
    try {
      const autor = await this.autorService.create(this.editAutorForm.value)
      console.log('Autor salvo com sucesso')
      this.modalCtrl.dismiss()
    } catch (error) {
      console.log('Erro ao salvar Autor: ', error)
    }
  }

  fecharModal() {
    this.modalCtrl.dismiss()
  }
}