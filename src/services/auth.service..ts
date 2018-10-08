import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
	private user: firebase.User;
    cargas:any[] = [];
	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}
    get authenticated(): boolean {
        return this.user !== null;
      }
      getEmail() {
        return this.user && this.user.email;
      }
	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
	}
    SubirFoto(carga, lugar)
    {
        let mensaje = firebase.database().ref().child(lugar);
      mensaje.push({ valor:carga});

    }
    Modificar(imagen, lugar)
    {
        let mensaje = firebase.database().ref().child(lugar);
      mensaje.set({ valor:imagen});
      this.Votar(imagen);

    }
    getUserActual()
    {
      return  firebase.auth().currentUser.uid;
    }
    Votar(imagen)
    {
      let num =(this.getEmail()).indexOf('@');
      let user =(this.getEmail()).substring(0, num);

     // let usuario = firebase.auth().currentUser;
      let mensaje = firebase.database().ref().child("Votos/"+ user);
      mensaje.push({ valor:imagen.clave});
    }
    signOut(): Promise<void> {
        return this.afAuth.auth.signOut();
      }
    TraerFotos()
    {
        let mensaje = firebase.database().ref().child("admin");
        mensaje.on("value",(snap)=>{
    
          var data= snap.val();
         this.cargas =[];
          for(var key in data)
          {
            this.cargas.push(data[key]);
          }
         
    
        });
    }
}