import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Toast } from 'ionic-angular';
import {AuthService } from '../../services/auth.service.';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { last } from 'rxjs/operators';
import { AboutPage } from '../about/about';
//import { subscribeOn } from 'rxjs/operator/subscribeOn';
//import { Subscription } from 'rxjs/Subscription';
import { HomePage } from '../home/home';
import { Slides } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  fotos:any[] = [];
  fotosSubir:any[] = [];
  foto;
  x;
  y;
  z;
  fotosObs:any;
  claves:any[] =[];
  dondeEstoy;
  lugar;
  id:any;
  @ViewChild('content') content:any;
  @ViewChild('Slides') slides:Slides;
  flag=0;
  misVotos:any=[];
  public ocultarSpinner = false;
  botonHabilitar=true;
//misFotos: Subscription;
  options:ImagePickerOptions;
yo;

  constructor(public navCtrl: NavController, private navP:NavParams,  private auth:AuthService,private camera: Camera, private imagePicker:ImagePicker, private deviceMotion: DeviceMotion ) {
    this.dondeEstoy =  this.navP.get("lugar");
  this.yo = this.auth.getUserActual();
    this.ocultarSpinner =false;
    this.TraerFotos();
    this.TraerVotos();

    console.log(this.misVotos);
    if(this.dondeEstoy == "cosasLindas")
    {
      this.lugar = "Cosas Lindas";
    }
    else
    {
      this.lugar = "Cosas Feas";
    }
   
    this.Verificar();
    /*ME FIJO LOS VOTOS QUE VOTO ESTE USUARIO Y DESHABILITO LOS YA VOTADOS*/
 try
 {

 this.id = this.deviceMotion.watchAcceleration({frequency:500})
  .subscribe(this.modificar);

 

}


catch(err)
{
  console.log(err);
}
}

modificar(aceleracion:DeviceMotionAccelerationData)
  {

     if(aceleracion.x >3)
     {
       this.slides.slideNext();
      
     }
     if(aceleracion.x <3)
     {
       this.slides.slidePrev();

     }
     if(aceleracion.y <-2 || (aceleracion.y<7 && aceleracion.y>5))
     {
      this.slides.slideTo(0);

     }
    }
  Verificar()
  {

    console.log("en Verificar");
    console.log(this.fotos);
    console.log(this.misVotos);
    for(let i=0; i<this.fotos.length;i++)
    {
      for(let j=0; j<this.misVotos.length;j++)
      {
        if(this.fotos[i].valor.clave == this.misVotos[j].valor)
        {
          console.log(this.misVotos[j].valor);
          this.fotos[i].valor.habilitado =true;
        }
  
      }

    }
  }
scrollTop()
{
  let contentTop =  (window.document.querySelector('#top') as HTMLElement).offsetTop;
  this.content.scrollTo(0, contentTop);
}
  SubirFoto()
  {
 
   try{
    this.options ={
      outputType:1,
      width: 500,
      height: 500,
      quality: 50
      };
      
        this.imagePicker.getPictures(this.options).then( results =>{
         
          for(let i=0; i < results.length;i++){
            let fecha2 = new Date();
            let hora = fecha2.getTime();
            let year = fecha2.getFullYear();
            let day = fecha2.getDate();
            let month = fecha2.getMonth() +1;
            let fechaOk = day +"/" +month+"/"+year;
            this.foto = "data:image/jpeg;base64," +results[i];
            let imagen ={
          
              foto: this.foto,
              usuario:this.auth.getEmail(),
              votos:0,
              fecha:fechaOk,
              habilitado:false,
            };
            
           
            this.auth.SubirFoto(imagen, this.dondeEstoy);
            this.scrollTop();
          };
        });
   }
   catch(err)
   {

   }
  
  }
  Logout()
  {
    (window.document.querySelector('.alertContact') as HTMLElement).style.display= 'flex';
 
  }
  SetearCerrar(valor)
  {
    console.log(valor);
    if(valor == "aceptar")
    {
      this.auth.signOut();
      this.navCtrl.setRoot(HomePage);
    }
    else
    {
      (window.document.querySelector('.alertContact') as HTMLElement).style.display= "none";
    }
  }
  IrAPagina()
  {

    this.navCtrl.push(AboutPage,{lugar:this.dondeEstoy});

  }
  IrAtrasPag()
  {
    this.navCtrl.pop();
  }
/*  ionViewDidLoad()
  {
 
  }*/
  takeAPicture()
  {
    //
 
 try{

      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000,
        encodingType:this.camera.EncodingType.JPEG,
        mediaType:this.camera.MediaType.PICTURE
    }).then((imageData) => {

      let fecha2 = new Date();
      let hora = fecha2.getTime();
      let year = fecha2.getFullYear();
      let day = fecha2.getDate();
      let month = fecha2.getMonth() +1;
      let fechaOk = day +"/" +month+"/"+year;
      this.foto = "data:image/jpeg;base64," + imageData;

       let imagen ={
      
        foto: this.foto,
        usuario:this.auth.getEmail(),
        votos:0,
        fecha:fechaOk,
        clave:0,
        habilitado:false
      };

   this.auth.SubirFoto(imagen, this.dondeEstoy);
   this.scrollTop();
      
    }, (err) => {
        console.log(err);
    });


    }
    catch(err)
    {

    }
   
     




  
  }
 
 TraerFotos()
  {
      let mensaje = firebase.database().ref().child(this.dondeEstoy);
 mensaje.on("value",(snap)=>{
 
var data =snap.val();
       this.fotos =[];
        for(var key in data)
        {
          this.fotos.push(data[key]);
          this.fotos[this.fotos.length-1].valor.clave =key;
        
        }
 
        
    this.ocultarSpinner =true;
        this.Verificar();
        this.fotos.reverse();

      });
  }
  TraerVotos()
  {
    let num =(this.auth.getEmail()).indexOf('@');
      let user =(this.auth.getEmail()).substring(0, num);
  
        
      let mensaje = firebase.database().ref().child("Votos/"+user);
 mensaje.on("value",(snap)=>{
 
var data =snap.val();
       this.misVotos =[];
        for(var key in data)
        {
          this.misVotos.push(data[key]);
        
        
        }
 
        this.Verificar();
        
        

      });
  }
  Votar(clave1, voto1, foto1, usuario1 , fecha1)
  {

    

 
    voto1 = voto1 +1;
    let imagen = {
        
      foto: foto1,
      usuario:usuario1,
      votos:voto1,
      fecha:fecha1,
      clave:clave1
   
    };
    let lugar = this.dondeEstoy + "/" + clave1;
    this.auth.Modificar(imagen, lugar);
    this.Verificar();
  }
}