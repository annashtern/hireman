import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import {NavController} from 'ionic-angular';
//import {pCredentials} from "../forgotpassword/forgotpassword";
import {UserService} from "../../app/shared/services/user.service";
import {LoginComponent} from "../../app/auth/login/login.component";

export declare interface codeCredentials {
    code: string,
    password: string,
  //  api_token:string
}

@Component({
  selector: 'code-password',
  templateUrl: 'code-password.html'
})
export class CodePasswordComponent {
    public user : codeCredentials = {
        code: '',
        password:'',
      //  api_token:''
    };
    public isActive: boolean;
    showCode:boolean;
  constructor(public toastCtrl: ToastController, private userService: UserService, private navCtrl: NavController) {
      this.showCode = true;
      this.isActive = true;
  }
  ionViewDidLoad(){
      console.log(localStorage.remember_token)
      console.log(this.user.code)
  }
  login(position: string){
      console.log(this.user.code)
      //this.user.code = localStorage.remember_token;
      if (  this.user.code === localStorage.remember_token ) {

         // if (this.userService.smscheck(this.user.code)) {
              //  this.user.code = localStorage.remember_token;
              //   if (this.user.code == localStorage.remember_token) {
              this.showCode = false;
              console.log(localStorage.remember_token)
              console.log(this.user.code)
        //  }
          //this.showCode = false;
          // }

          // }

          //  if(this.userService.smscheck(this.user)) {

          //  }
          console.log(localStorage.remember_token)
          console.log(this.user.code)
      }
      else  if (  this.user.code != localStorage.remember_token ) {
          const toast = this.toastCtrl.create({
              message: 'Невірний код підтвердження',
              duration: 3000,
              position: position
          });
          toast.present();
          console.log('fail')
      }


  }
    showPass() {
        this.isActive = !this.isActive;
    }
    back(){
        this.navCtrl.push(LoginComponent);
    }
    // sendAgain(){
    //     this.userService.password(this.user)
    //         .subscribe(success => {
    //            console.log(success)
    //                 localStorage.token = success['user']['api_token'];
    //         },
    //             error => {
    //                 console.log(error);
    //
    //
    //             });
    // }
    reset(position: string) {
      console.log(this.user.password);
      if (this.user.password.length > 0){
          if (this.user.password.length >= 6 && this.user.password.length <= 15 && this.user.password.length > 0) {
              this.userService.smsCode(this.user)
                  .subscribe(success => {
                          console.log(success);
                          //  localStorage.token = success['user']['api_token'];
                          const toast = this.toastCtrl.create({
                              message: 'Пароль успішно змінено',
                              showCloseButton: true,
                              closeButtonText: 'Закрити'
                          });
                          toast.present();
                      },
                      error => {
                          console.log(error);
                      });

          }
          else{
              const toast = this.toastCtrl.create({
                  message: 'Пароль має бути 6-15 символів',
                  duration: 3000,
                  position: position
              });
              toast.present();
          }
      }
      else {
          const toast = this.toastCtrl.create({
              message: 'Введіть пароль',
              duration: 3000,
              position: position
          });
          toast.present();
      }

    }
}
