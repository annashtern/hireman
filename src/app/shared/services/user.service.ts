import {Injectable} from "@angular/core";
import {RequestService} from "./request.service";
import {ToastController} from "ionic-angular";
import {Storage} from "@ionic/storage";
import {EntityService} from "../base/entity.service";
import {Observable} from "rxjs/Observable";
//import {loginCredentials} from "../../auth/login/login.component";
import {codeCredentials} from "../../../components/code-password/code-password";
//import {pCredentials} from "../../../components/forgotpassword/forgotpassword";

@Injectable()

export class UserService extends EntityService {
    public user : codeCredentials = {
        code: '',
        password:'',
        //  api_token:''
    };
    showCode:boolean;
  constructor(public request: RequestService,
              public toast: ToastController,
              private storage: Storage) {
    super(request, toast);
    this.service_name = 'user';
  }

  setUser(data) {
    this.storage.set('user', data);
  }

  getUser() {
    return this.storage.get('user');
  }

  firstEnter() {
    return {
      setTrue: () => {
        this.storage.set('firstEnter', 'Unfinished');
      },
      setFalse: () => {
        this.storage.set('firstEnter', 'Finished');
      },
      get: () => {
        return this.storage.get('firstEnter').then((data) => {
          return data;
        });
      },
    }
  }

    subscribe(data:any){
        const url = this.url('subscribe');

        return this.request.post(url, data)
            .do(() => {
                console.log('subscribe')
                    // const msg = this.msg('create');
                    // this.notification('success', msg);
                },
                err => {
                    console.log('unsubscribe')
                    // const msg = this.msg('err');
                    // this.notification('error', msg)
                });
    }

    // update(data:any){
    //     const url = this.url('update');
    //
    //     return this.request.put(url+data.id, data)
    //         .do(() => {
    //                 const msg = this.msg('update');
    //                 this.notification('success', msg);
    //             },
    //             err => {
    //             console.log('error')
    //                 // const msg = this.msg('err');
    //                 // this.notification('error', msg)
    //             });
    // }
  create(data: any) {
    const url = this.url('create');

    return this.request.post(url, data)
      .do(() => {
          const msg = this.msg('create');
          this.notification('success', msg);
        },
        err => {
          const msg = this.msg('err');
          this.notification('error', msg)
        });
  }
    support(data: any) {
        const url = this.url('send');
        return this.request.post(url, data)
            .do(() => {
                    const msg = this.msg('send');
                    this.notification('success', msg);
                },
                err => {
                    const msg = this.msg('err');
                    this.notification('error', msg)
                });
    }
    smsCode(data:any): Observable<any>{
        const url = this.url('smsCode');
        return this.request.post(url, data)
            .do(() => {
                     // const msg = this.msg('passChange');
                     // this.notification('success', msg);
                },
                err => {
                    const msg = this.msg('password1');
                    this.notification('error', msg)
                });
    }

    validPhone(phone){
        let validator = /^[0-9]{9}/;
        return validator.test(phone);
    }

  credentialsCheck(data: any) {
      if (!data.phone && data.phone.length > 0) {
          const msg = this.msg('phone');
          this.notification('error', msg);
          return false;
      }
      // else  if (!data.password) {
      //     const msg = this.msg('pass');
      //     this.notification('error', msg);
      //     return false;
      // }
      else if (!this.validPhone(data.phone)){
          const msg = this.msg('validErr');
          this.notification('error', msg);
          return false;
      }
      else if (!data.password && data.password.length > 0) {
          const msg = this.msg('pass');
          this.notification('error', msg);
          return false;
      }

      else if (!data.phone && !data.password) {
          const msg = this.msg('empty');
          this.notification('error', msg);
          return false;
      }
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
  credentialsCheck1(data: any) {

        if (!data.phone) {
            const msg = this.msg('numb');
            this.notification('success', msg);
            return false;
        }
        if (data.phone.length != 9) {
            const msg = this.msg('number');
            this.notification('error', msg);
            return false;
        }
        return true;

  }
    password(data: any): Observable<any>{
        const url = this.url('password');
        return this.request.post(url, data)
            .do(() => {
                    const msg = this.msg('smsCod');
                    this.notification('success', msg);
                },
                () => {
                    const msg = this.msg('phone');
                    this.notification('error', msg)
                });
    }
    smscheck(data:any){
      // if (localStorage.remember_token){
      //    // this.showCode = false;
      //     const msg = this.msg('code');
      //     this.notification('success', msg)
      // }
      //   console.log(localStorage.remember_token)
      //   console.log(this.user.code)
      //   if (localStorage.remember_token.length != 4){
      //       const msg = this.msg('code');
      //       this.notification('error', msg)
      //   }
       if (localStorage.remember_token){
          const msg = this.msg('code');
          this.notification('error', msg)
      }
      else  if (!localStorage.remember_token){
           const msg = this.msg('codeerr');
           this.notification('error', msg)
       }
    }
    //
    // codecheck(data:any){
    //     if (data.api_token){
    //         const msg = this.msg('api');
    //         this.notification('error', msg)
    //     }
    //     else  if (!data.api_token){
    //         const msg = this.msg('notapi');
    //         this.notification('error', msg)
    //     }
    //     console.log(data.api_token)
    // }

  validateEmail(email) {
    let validator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validator.test(email);
  }


  validateField(field) {
    let validator =  /^[a-zA-Zа-яА-Я]+$/;
    return validator.test(field);
  }

  credentialsCheckField(data: any) {

    if (!data.email || !data.first_name || !data.last_name || !data.city) {
      const msg = this.msg('empty');
      this.notification('error', msg);
      return false;
    }
    if (!this.validateEmail(data.email)) {
      const msg = this.msg('emailerr');
      this.notification('error', msg);
      return false;
    }
    if (!this.validateField(data.first_name) || !this.validateField(data.last_name)) {
      const msg = this.msg('field');
      this.notification('error', msg);
      return false;
    }if (!this.validateField(data.city)) {
      const msg = this.msg('city');
      this.notification('error', msg);
      return false;
    }
    return true;
  }



}
