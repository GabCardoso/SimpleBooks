import { AngularFirestore, AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export abstract class Firestore<T extends { id: string }> {

    protected collection: AngularFirestoreCollection<T>

    constructor(protected db: AngularFirestore) { }

    // Método que define qual Collection será retornada do banco
    // Podendo passar também uma query com condições específicas se necessário
    protected setColletion(path: string, queryFn?: QueryFn) {
        this.collection = path ? this.db.collection(path, queryFn) : null
    }

    // Recupera uma Collection de acordo com os parametros passados no 'setCollection'
    public getAll(): Observable<T[]> {
        return this.collection.valueChanges()
    }

    private setItem(item: T, operation: 'set' | 'update'): Promise<T> {
        return this.collection.doc<T>(item.id)[operation](item).then(() => item)
    }

    public create(item: T): Promise<T> {
        item.id = this.db.createId()
        return this.setItem(item, 'set')
    }

    public update(item: T): Promise<T> {
        return this.setItem(item, 'update')
    }

    public delete(item: T): Promise<void> {
        return this.collection.doc<T>(item.id).delete()
    }

    public get(id: string): Observable<T> {
        return this.collection.doc<T>(id).valueChanges()
    }
}