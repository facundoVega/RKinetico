import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService } from '../../services/auth.service.';
import { HomePage }from '../home/home';
import { SplashPage }from '../splash/splash';
/**
 * 
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userActual:string="";
  passActual:string="";
  loginError;
  mensaje;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth:AuthService) {
    
 
   
    setTimeout(() => {
    
     
    }, 4000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  
  }
  setearUser(nombre, pass)
  {
    this.userActual = nombre;
    this.passActual = pass;
 
  }
  Login()
  {
    
    console.log(this.userActual);
    console.log(this.passActual);
    
    if(this.Validar())
    {
     
      (window.document.querySelector('#cab') as HTMLElement).classList.add("pulse");
      (window.document.querySelector('.cab') as HTMLElement).classList.add("pulse");
          let credentials = {
            email:this.userActual,
            password: this.passActual
          };
          this.auth.signInWithEmail(credentials)
            .then(//ACA TENGO QUE PONER LA PAGINA HOMEPAGE
              () => {this.navCtrl.setRoot(HomePage),
              (window.document.querySelector('#cab') as HTMLElement).classList.remove("pulse");
              (window.document.querySelector('.cab') as HTMLElement).classList.remove("pulse");
              //error => this.mensaje = "Usuario o contraseña no valido"
              })
              .catch(
                ()=>{
                  this.mensaje = "Usuario o contraseña no valido";
                  (window.document.querySelector('#cab') as HTMLElement).classList.remove("pulse");
                  (window.document.querySelector('.cab') as HTMLElement).classList.remove("pulse");
            (window.document.querySelector('.mensajeError3') as HTMLElement).style.display= "block";
            setTimeout(() => {
              (window.document.querySelector('.mensajeError3') as HTMLElement).style.display= "none";
            }, 3000);
                
        
           
          });
        
        }   
          
        
    
        
    
  
      

  

  }
  
    Validar()
    {
      let expresion = /\w+@\w+\.+[a-z]/;
    
      if(this.passActual==="" || this.userActual ==="")
      {
        
        this.mensaje = "Hay campos sin llenar";
        (window.document.querySelector('.mensajeError') as HTMLElement).style.display= "block";
        setTimeout(() => {
          (window.document.querySelector('.mensajeError') as HTMLElement).style.display= "none";
        }, 3000);
        return false;
      }
      else if(this.userActual.length>100)
      {
        this.mensaje ="El usuario es demasiado largo";
        (window.document.querySelector('.mensajeError') as HTMLElement).style.display= "block";
        setTimeout(() => {
          (window.document.querySelector('.mensajeError') as HTMLElement).style.display= "none";
        }, 3000);
        return false;
       

      }
      else if(!expresion.test(this.userActual))
      {
        this.mensaje ="El correo no es uno valido";
        (window.document.querySelector('.mensajeError2') as HTMLElement).style.display= "block";
        setTimeout(() => {
          (window.document.querySelector('.mensajeError2') as HTMLElement).style.display= "none";
        }, 3000);
        return false;
       
      }
      else if(this.passActual.length >20)
      {
        this.mensaje ="La clave es demasiado larga";
        (window.document.querySelector('.mensajeError3') as HTMLElement).style.display= "block";
        setTimeout(() => {
          (window.document.querySelector('.mensajeError3') as HTMLElement).style.display= "none";
        }, 3000);
        return false;
       
      }
    
     return true;
    }
  
}
