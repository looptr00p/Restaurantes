import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { RestauranteService } from '../../servicios/restaurante.service';
import { Restaurante } from '../../clases/restaurante';

import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-restaurante',
  templateUrl: 'restaurante.html',
})
export class RestaurantePage {

  restaurante: Restaurante;
  rid:number;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private socialSharing: SocialSharing,
              public restauranteService: RestauranteService) {
    this.restaurante = navParams.get('restaurante');
    this.rid = navParams.get('rid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantePage');
  }

  cerrar(){
    this.viewCtrl.dismiss();
  }

  borrar(){
    this.restauranteService.borrarRestaurante(this.rid);
    this.cerrar();

  }

  compartirConWhatsapp(){
    let mensaje = this.restaurante.nombre;
    let url = "http://www.google.com/maps/@" 
              + this.restaurante.ubicacion.lat + ","
              + this.restaurante.ubicacion.lng + ",16z?hl=es";

    this.socialSharing.shareViaWhatsApp(mensaje, this.restaurante.imagenes[0], url);
  }

}
