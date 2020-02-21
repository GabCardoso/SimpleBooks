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
  }

  // Método que define de qual autor irá recuperar a Collection de livros  
  public init(idAutor: string): void {
    if (idAutor) {
      this.setColletion(`/autores/${idAutor}/livros`)
    }
  }
}
