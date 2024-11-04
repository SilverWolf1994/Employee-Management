import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private firestore: AngularFirestore) { }

  createEmpleado(empleado: any): Promise<any> {
    return this.firestore.collection('empleados').add(empleado);
  }

  getEmpleado(id: string): Observable<any> {
    return this.firestore.collection('empleados').doc(id).snapshotChanges();
  }

  updateEmpleado(id: string, data: any): Promise<any> {
    return this.firestore.collection('empleados').doc(id).update(data);
  }

  deleteEmpleado(id: string): Promise<any> {
    return this.firestore.collection('empleados').doc(id).delete();
  }

  getEmpleados(): Observable<any> {
    return this.firestore.collection('empleados', ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges();
  }
}
