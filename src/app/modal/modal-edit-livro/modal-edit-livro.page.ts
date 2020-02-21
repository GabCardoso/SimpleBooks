import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { LivroService } from 'src/app/services/livro.service';
import { OverLayService } from 'src/app/services/over-lay.service';
import { Livro } from 'src/app/model/livro';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-modal-edit-livro',
  templateUrl: './modal-edit-livro.page.html',
  styleUrls: ['./modal-edit-livro.page.scss'],
})
export class ModalEditLivroPage implements OnInit {

  public editLivroForm: FormGroup
  public livro: Livro
  public srcImg: string

  constructor(public formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private livroService: LivroService,
    private overLayService: OverLayService,
    private navParams: NavParams,
    private camera: Camera
  ) {
    this.livro = this.navParams.get('livro')
  }

  ngOnInit() {
    this.criarFormLivro()
    if (this.livro && this.livro.capa) {
      this.srcImg = this.livro.capa
    }
  }

  // Cria um formulário de acordo com os atributos de Livro, com validações
  criarFormLivro() {
    this.editLivroForm = this.formBuilder.group({
      titulo: [this.livro.titulo, Validators.compose([
        Validators.required
      ])],
      ano: [this.livro.ano, Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{4}')
      ])],
      paginas: [this.livro.paginas, Validators.compose([
        Validators.required
      ])],
      resumo: [this.livro.resumo, Validators.compose([
        Validators.required
      ])],
      nota: [this.livro.nota, Validators.compose([
        Validators.required
      ])]
    })
  }

  // Altera ou adicionar um livro no banco
  async salvarLivro(): Promise<void> {
    if (!this.srcImg){
      await this.overLayService.toast({
        message: 'É necessário o upload da capa do livro'
      })
      return
    }
    const loading = await this.overLayService.loading()
    try {
      if (this.livro.id) {
        await this.livroService.update({
          id: this.livro.id,
          capa: this.srcImg,
          ...this.editLivroForm.value
        })
      } else {
        await this.livroService.create({
          capa: this.srcImg,
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

  async upload() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then(imageData => {
      this.srcImg = 'data:image/jpg;base64,' + imageData
    })
  }

  fecharModal() {
    this.modalCtrl.dismiss()
  }
}