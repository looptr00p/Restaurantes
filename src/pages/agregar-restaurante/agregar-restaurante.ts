import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-agregar-restaurante',
  templateUrl: 'agregar-restaurante.html',
})
export class AgregarRestaurantePage {

  ubicacion = {
    lat:0,
    lng:0
  }

  ubicacionLista = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private geolocation: Geolocation,
              public toastCtrl: ToastController,
              private camara: Camera) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarRestaurantePage');
  }

  localizar(){
    this.geolocation.getCurrentPosition({timeout: 6000})
                    .then( info => {
                      this.ubicacion.lat = info.coords.latitude;
                      this.ubicacion.lng = info.coords.longitude;
                      this.ubicacionLista = true;
                    })
                    .catch(error => {
                      let toast = this.toastCtrl.create({
                        message: 'No se pudo encontrar la ubicación',
                        duration: 2000
                      });
                      toast.present();
                    })

  }

  tomarFoto(){
    this.camara.getPicture()
               .then(imagenInfo =>{

               })
               .catch(error => {
                 
               })
  }

}
