import { Injectable } from '@angular/core';
import { Firestore } from '../core/classes/firestore.class';
import { Livro } from '../model/livro';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LivroService extends Firestore<Livro> {

  constructor(db: AngularFirestore) {
    super(db);
    this.init()
  }

  private init(): void {
    this.setColletion('/livros')
  }
}
