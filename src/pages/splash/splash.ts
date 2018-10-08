import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';


/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,  public splashScreen: SplashScreen, public viewCtrl: ViewController, private nativeAudio: NativeAudio ) {
    this.nativeAudio.preloadSimple('inicio', 'assets/audio/intro.mp3').catch(()=>{});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }
  ionViewDidEnter() {
 
    this.splashScreen.hide();
 
    setTimeout(() => {
      this.nativeAudio.play('inicio').catch(()=>{});
      this.viewCtrl.dismiss();
     
    }, 4000);
 
  }
}
