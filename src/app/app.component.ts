import {Component, OnInit, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {SliderComponent} from "./slider/slider.component";
import {LoginComponent} from "./auth/login/login.component";
import {MainboardComponent} from "./mainboard/mainboard.component";
import {ConnectionService} from "./shared/services/connection.service";
import {UserService} from "./shared/services/user.service";
import {ProfileComponent} from "./mainboard/profile/profile.component";
import { AlertController } from 'ionic-angular';
import {SplashScreen} from "@ionic-native/splash-screen";
import set = Reflect.set;
declare var FCMPlugin: any;


@Component({
  selector: 'root',
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage: any;
  message;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private screenOrientation: ScreenOrientation,
              private connection: ConnectionService,
              private user: UserService,
              public alertCtrl: AlertController
             // private storage: Storage,
              //private msgService:MessagingProvider
              ) {

      platform.ready().then(() => {
          if (platform.is('cordova')) {
              this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
          }
          statusBar.styleDefault();
          this.user.firstEnter().get().then((res) => {

              if (!res) {
                  let alert = this.alertCtrl.create({
                      title: 'Push-повідомлення',
                      message: 'Підписатися на рush-повідомлення?',
                      buttons: [
                          {
                              text: 'Відхилити',
                              role: 'cancel',
                              handler: () => {
                                  console.log('Cancel clicked');
                              }
                          },
                          {
                              text: 'Підписатися',
                              handler: () => {
                                  if (typeof FCMPlugin !== 'undefined') {
                                      FCMPlugin.subscribeToTopic('topicExample');

                                      //  console.log(this.counter);
                                      //localStorage.counter ++;
                                      //  console.log(localStorage.counter);
                                      console.log('Buy clicked');
                                  }
                              }
                          }
                      ]
                  });
                  alert.present();
                  this.navCtrl.setRoot(SliderComponent);
              }
              if (res === 'Unfinished') {
                  this.navCtrl.setRoot(LoginComponent);
              }
              if (res === 'Finished' && !localStorage.user_id) {
                  this.navCtrl.setRoot(LoginComponent)
              } else if (res === 'Finished' && localStorage.user_id) {
                  this.user.getUser().then((success:any) => {
                      console.log(success);
                      if (localStorage.last_name != 'undefined') {
                          console.log(localStorage.last_name);
                          this.navCtrl.setRoot(MainboardComponent);
                      } else {  this.navCtrl.setRoot(ProfileComponent)

                      }
                  })
              }
          });
          splashScreen.hide();
      });
  }
  ngOnInit() {
    this.connection.startMonitoringConnection();
  }
}