import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {CodePasswordComponent} from "../code-password/code-password"
import {UserService} from "../../app/shared/services/user.service";
import {AuthService} from '../../app/shared/services/auth.service';
import {LoginComponent} from "../../app/auth/login/login.component";
//import {ProfileComponent} from "../../app/mainboard/profile/profile.component";
//import {MainboardComponent} from "../../app/mainboard/mainboard.component";
export declare interface pCredentials {
    phone: string,
    code: string,
    api_token:string,
    password:any

}

@Component({
  selector: 'forgotpassword',
  templateUrl: 'forgotpassword.html'
})
export class ForgotpasswordComponent {

    public user: pCredentials = {
        phone: '',
        code: '',
        api_token:'',
        password:''
    };

  constructor( private auth: AuthService, private navCtrl: NavController, private userService: UserService) {}

  login(){
      if(this.userService.credentialsCheck1(this.user)){
         // this.navCtrl.push(CodePasswordComponent);
          this.userService.password(this.user)
              .subscribe(success => {
                    //  localStorage.token = success['user']['api_token'];
                      localStorage.token = success['api_token'];
                  console.log(success['api_token']);
                  console.log(localStorage.token);
                  console.log(success['remember_token']);
                      localStorage.remember_token = success['remember_token'];
                      console.log(localStorage.remember_token)
                      //console.log(success['user']['api_token'])
                       this.navCtrl.push(CodePasswordComponent);

                  },
                  error => {

                      console.log(error);


                  });
      }

  }
  back(){
        this.navCtrl.push(LoginComponent);
  }
}
