import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';
import { File } from '@ionic-native/file';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import {AgregarRestaurantePage } from '../pages/agregar-restaurante/agregar-restaurante';
import {RestaurantePage} from '../pages/restaurante/restaurante';

import { RestauranteService } from './../servicios/restaurante.service';

import { AgmCoreModule } from '@agm/core';
import { Ionic2RatingModule } from 'ionic2-rating'; 
import { IonicStorageModule } from '@ionic/storage';




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AgregarRestaurantePage,
    RestaurantePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDd4oQgyOTn2gfE_jELK_QhrFASaTO-c3w'
    }),
    Ionic2RatingModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AgregarRestaurantePage,
    RestaurantePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Camera,
    RestauranteService,
    SocialSharing,
    File
  ]
})
export class AppModule {}
