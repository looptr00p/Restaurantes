import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions} from '@ionic-native/camera';
import { File, Entry } from '@ionic-native/file';

import { NgForm } from '@angular/forms';
import { RestauranteService } from '../../servicios/restaurante.service';

declare var cordova:any;

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
  imagenes: string[] = [];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private geolocation: Geolocation,
              public toastCtrl: ToastController,
              private camara: Camera,
              public restauranteSerivce:RestauranteService,
              public viewCtrl: ViewController,
              private file: File) {}

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
    this.camara.getPicture({
      correctOrientation: true
    })
    .then(imagenInfo =>{
      //this.imagenes.push(imagenInfo);
      ///file/storage/native/0/nombre.jpg
      let path = imagenInfo.substr(0, imagenInfo.lastIndexOf('/') + 1);
      let nombre = imagenInfo.substr(imagenInfo.lastIndexOf('/') + 1);
      let nuevoNombre = new Date().getMilliseconds() + '.jpg';
      this.file.moveFile(path, nombre, cordova.file.dataDirectory, nuevoNombre)
                    .then((info:Entry) =>{
                      this.imagenes.push(info.nativeURL);
                      this.camara.cleanup();
                    })
                    .catch(error => {
                      let toast = this.toastCtrl.create({
                        message: 'Ocurrio un error. File.moveFile',
                        duration: 3000
                      })
                      toast.present();
                      this.camara.cleanup();
                    })
    })
    .catch(error => {
    let toast = this.toastCtrl.create({
      message: 'Ocurrio un error. Camera.getPicture',
      duration: 3000
    })
    toast.present();
    this.camara.cleanup();
    })
  }

  agregarRestaurante(formulario: NgForm){
    this.restauranteSerivce.agregarRestaurante( formulario.value.nombre,
                                                this.imagenes,
                                                formulario.value.rating,
                                                this.ubicacion);
    formulario.reset();
    this.ubicacionLista = false;
    this.imagenes = [];
    this.viewCtrl.dismiss();
  }

}
