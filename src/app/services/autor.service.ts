import { Injectable } from '@angular/core';
import { Firestore } from '../core/classes/firestore.class';
import { Autor } from '../model/autor';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AutorService extends Firestore<Autor> {

  constructor(db: AngularFirestore) {
    super(db);
    this.init()
  }

  private init(): void {
    this.setColletion('/autores')
  }
}