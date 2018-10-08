import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthService } from '../../services/auth.service.';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { dateDataSortValue } from 'ionic-angular/util/datetime-util';
import { ContactPage } from "../contact/contact";
import { SplashPage } from "../splash/splash";
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 fotos:any[] = [];
  miFoto;
  user;
  valores;
  cerrarSesion =false;
  mostrar:boolean;
  constructor(public nav: NavController, private camera: Camera, private auth:AuthService,private deviceMotion: DeviceMotion ) {
    this.mostrar=false;
    this.user = this.auth.getEmail();
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
      (error: any) => console.log(error)
    );
  }

  irAPag(padre){
    
 
  this.nav.push(ContactPage, {lugar:padre});
 
  }

  mostrarFotos()
  {
    this.mostrar=true;
  }
  Logout()
  {
    (window.document.querySelector('.alert') as HTMLElement).style.display= "flex";
  /* if(this.cerrarSesion == true)
    {
      this.auth.signOut();
      this.nav.setRoot(HomePage);
    }
    else
    {
      (window.document.querySelector('.alert') as HTMLElement).style.display= "none";
    }*/
  
      
  
  }
  SetearCerrar(valor)
  {
    console.log(valor);
    if(valor == "aceptar")
    {

      this.auth.signOut().catch(()=> {});
      this.nav.setRoot(HomePage);
    }
    else
    {
      (window.document.querySelector('.alert') as HTMLElement).style.display= "none";
    }
  }
}


