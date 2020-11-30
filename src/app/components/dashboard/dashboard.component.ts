import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  asientos = [];
  ventas = [];
  montoTotal = 0;
  montoPagar = 0;

  constructor(
    private ventaService: VentaService
  ) { }

  ngOnInit() {
    this.ventaService.obtenerVenta().valueChanges().subscribe(res =>{
      this.ventas = res;
      this.montoTotal = 0;

      for (let i = 0; i < this.ventas.length; i++) {
        const element = this.ventas[i];
        this.montoTotal += parseInt(element.precio);
      }
    })
  }

  register(event){

    const asiento = event.target.value.split('-');

    const ubicacionAsiento = asiento[0];
    const precioAsiento = asiento[1];


    const existeAsiento = this.asientos.find(asiento => {
      return asiento.ubicacion == ubicacionAsiento
    })
    
    if(!existeAsiento){
      this.asientos.push({ubicacion: ubicacionAsiento, precio: precioAsiento, fecha: Date.now()})
      this.montoPagar = this.montoPagar + parseInt(precioAsiento);
    }
    else{
      this.asientos = this.asientos.filter( asiento => {return asiento.ubicacion !== ubicacionAsiento});
      this.montoPagar = 0;

      for (let i = 0; i < this.asientos.length; i++) {
        const element = this.asientos[i];
        this.montoPagar =  this.montoPagar + parseInt(element.precio);
      }
    }

    console.log(this.asientos)
  }

  confirmarVenta(){
    this.ventaService.crearVenta(this.asientos)
    alert('venta realiza con exito');
    this.asientos = [];
    this.montoPagar = 0;
  }

}
