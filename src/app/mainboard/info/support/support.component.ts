import {Component} from "@angular/core";
import { NavController} from "ionic-angular";
import {UserService} from "../../../shared/services/user.service";
//import { loginCredentials} from "../../../auth/login/login.component";
//import {AuthenticationInterceptor} from "../../../shared/interceptors/authentication.interceptor";


@Component({
  selector: 'page-support',
  templateUrl: './support.component.html',
})

export class SupportComponent  {
  message: string = '';
    public user = {
        description:'',
        created_by: '',
        updated_by: '',
        updated_at:'',
        created_at:'',
        id:''
    };

  constructor(public navCtrl: NavController,   private userService: UserService) {

  }

  sendMessage() {

      this.userService.support(this.user).subscribe(
          success =>{ console.log("send");}
      );
  }

  disableSendButton() {
    if (!this.user.description && !this.user.description.length && this.user.description.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

}
