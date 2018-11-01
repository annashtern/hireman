import {Injectable} from "@angular/core";
import {RequestService} from "./request.service";
import {loginCredentials} from "../../auth/login/login.component";
import {ToastController} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {ConstantHelperService} from "../base/constant-helper.service";
//import {pCredentials} from "../../../components/forgotpassword/forgotpassword";


@Injectable()

export class AuthService extends ConstantHelperService {

    service_name: string;

    constructor(private request: RequestService,
                public toastCtrl: ToastController) {
        super(toastCtrl);
        this.service_name = 'auth';
    }

    /**
     * @param {loginCredentials} credentials
     * @returns {Observable<any>}
     */

    validPhone(phone){
        let validator = /^[0-9]{9}/;
        return validator.test(phone);
    }

    credentialsCheck(data: any) {
        if (!data.phone) {
            const msg = this.msg('phone');
            this.notification('error', msg);
            return false;
        }
        else  if (data.phone && !data.password) {
            const msg = this.msg('pass');
            this.notification('error', msg);
            return false;
        }
        else if (!this.validPhone(data.phone)){
            const msg = this.msg('phone');
            this.notification('error', msg);
            return false;
        }
        // else if (!data.phone && !data.password) {
        //     const msg = this.msg('login');
        //     this.notification('error', msg);
        //     return false;
        // }
        else if (data.phone.length != 9) {
            const msg = this.msg('number');
            this.notification('error', msg);
            return false;
        }
        else if (data.password.length < 6 || data.password.length > 15) {
            const msg = this.msg('password');
            this.notification('error', msg);
            return false;
        }
        return true;
    }
    login(credentials: loginCredentials): Observable<any> {
        const url = this.url('login');
        return this.request.post(url, credentials)
            .do(() => {
                },
                () => {
                // if (!credentials.password){
                //     const msg = this.msg('pass');
                //     this.notification('error', msg)
                // }
                // else {
                    const msg = this.msg('login');
                    this.notification('error', msg)
                // }

                });

    }

    logout(data:any) {
        const url = this.url('logout');
        return this.request.post(url, data);
    }



}
