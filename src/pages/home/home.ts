import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {AgregarRestaurantePage } from '../agregar-restaurante/agregar-restaurante';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  agregarRestaurantePage = AgregarRestaurantePage;

  constructor(public navCtrl: NavController) {

  }

}
