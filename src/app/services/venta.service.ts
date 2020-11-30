import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(
    private angularFireStore : AngularFirestore
  ) { }

  crearVenta(asientos){

    const ventaId = Date.now()+"";
    console.log(asientos.length )
    if(asientos.length >= 1){
      for (let i = 0; i < asientos.length; i++) {
        const ventaId = Date.now()+ Math.floor(Math.random() * 100) + "";
        const element = asientos[i];
        this.angularFireStore.collection('ventas').doc(ventaId).set(element,{merge: true});
      }
    }
    else{
      this.angularFireStore.collection('ventas').doc(ventaId).set(asientos,{merge: true});
    }

    return;
  }

  obtenerVenta(){
    return this.angularFireStore.collection('ventas');
  }

}
