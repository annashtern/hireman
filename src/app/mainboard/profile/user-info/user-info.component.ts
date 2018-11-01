import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../../shared/services/user.service";
import {ActionSheetController, NavController} from "ionic-angular";
import {CameraService} from "../../../shared/services/camera.service";
import {DomSanitizer} from "@angular/platform-browser";
import {SkillListComponent} from "../skill-list-modal/skill-list.component";
import { ToastController } from 'ionic-angular';
declare var FCMPlugin: any;

export declare interface User {
    first_name: string,
    last_name: string,
    city: string,
    email: string,
    phone: string,
    passport_id: boolean,
    photo_path: any,
    photo: any
}

@Component({
    selector: 'page-profile-info',
    templateUrl: './user-info.component.html'
})
export class UserInfoComponent implements OnInit {

    @Input() editMode: boolean;

    public isChanged: boolean;
    public entity: User = {
        first_name: '',
        last_name: '',
        city: '',
        email: '',
        phone: '',
        passport_id: false,
        photo_path: '',
        photo: ''
    };
    public  user = {
        device_id:''
    };

    @Output() onUserChange = new EventEmitter<User>();

    public defaultImg: string;
    public imageURI: string;

    constructor(private service: UserService,
                private cameraService: CameraService,
                private actionSheetCtrl: ActionSheetController,
                private sanitizer: DomSanitizer,
                private navCtrl: NavController,
             private toast:ToastController
             //   private fcm:FCMPlugin
    ) {
        this.defaultImg = 'assets/imgs/camera.png';
        this.isChanged = false;
    }

    ngOnInit() {
        this.getUserInfo();
        this.getDeviceToken();
         this.subscribe();
         this.refreshToken();
         this.subscribeNotification();
        // console.log(this.getDeviceToken());
    }


    getDeviceToken() {
        if (typeof FCMPlugin !== 'undefined') {
            FCMPlugin.getToken(
                function (token) {
                    console.log(token);
                    localStorage.device_id = token;
                  //  this.user.device_id = token;
                   // console.log(this.user);
                    console.log(localStorage.device_id);
                  //  return token;
                }, function (res) {
                    console.log(res);
                })
        }


    }



    subscribe(){
        this.user.device_id = localStorage.device_id;
        console.log(this.user);
        console.log(localStorage.device_id);
        this.service.subscribe(this.user)
            .subscribe(success =>{
                    console.log(success);
                console.log('send')
                },
                err =>{
                    console.log(err)
                }
            );
    }




    /**
     * Emit data to @ProfileComponent
     */
    onFormChange() {
        this.isChanged = true;
        this.onUserChange.emit(this.entity);
    }

    openPhotoActions() {
        if (!this.editMode) {
            return false;
        }
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Оберіть',
            buttons: [
                {
                    text: 'Камера',
                    handler: () => {
                        this.photoAddControl(1);
                    }
                }, {
                    text: 'Галерея',
                    handler: () => {
                        this.photoAddControl(2);
                    }
                }, {
                    text: 'Відмінити',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    photoAddControl(sourceType: number) {
        this.cameraService.getMedia(sourceType).then(res => {
            if (typeof res !== 'undefined') {
               // this.entity.photo_path = this.sanitizer.bypassSecurityTrustResourceUrl(res);
                this.entity.photo = this.sanitizer.bypassSecurityTrustResourceUrl(res);
                this.entity.photo = res;
                this.isChanged = true;
            }
        })
    }


    save() {
        if (this.service.credentialsCheckField(this.entity)) {
            this.service.getUser().then(res => {
                console.log(localStorage.first_name);
                if (localStorage.first_name) {
                    this.service.update(this.entity)
                        .subscribe(() => {
                                this.isChanged = false;
                            },
                            err => {
                                console.log(err);
                            });
                } else if (!localStorage.first_name) {
                    this.service.update(this.entity)
                        .subscribe(() => {
                                this.isChanged = false;
                            },
                            err => {
                                console.log(err);
                            });
                    this.navCtrl.setRoot(SkillListComponent)
                }
            });
        }
    }





    refreshToken() {
        if (typeof FCMPlugin !== 'undefined') {
            FCMPlugin.onTokenRefresh(function (token) {
                if (token) {
                   // callback(token);
                    localStorage.device_id = token;
                }
                this.user.device_id = localStorage.device_id;
                this.service.subscribe(this.user)
                    .subscribe(success =>{
                            console.log(success);
                            console.log('Refresh')
                        },
                        err =>{
                            console.log(err)
                        }
                    );
            });
        }
    }



    subscribeNotification() {
        if (typeof FCMPlugin !== 'undefined') {
            this.refreshToken(); //add listener for refresh
            FCMPlugin.onNotification(function (data) {
                    console.log(data);
                    if (data.wasTapped) {
                        //Notification was received on device tray and tapped by the user.
                        this.toast.success(data.body);
                    } else {
                        //Notification was received in foreground. Maybe the user needs to be notified.
                        this.toast.success(data.body,null,{
                            timeOut: 60000
                        });
                    }
                },
                function (msg) {
                    // toastr.success(msg);
                });
        }
    }

    getUserInfo() {
        this.service.get()
            .subscribe(success => {
                this.service.setUser(success["profile"]);
                // this.entity = success["profile"];
                this.entity.phone = success["phone"];
                this.entity.first_name = success['first_name'];
                this.entity.last_name = success['last_name'];
                this.entity.city = success['city'];
                this.entity.email = success['email'];
                success['last_name'] = localStorage.last_name;
                success['first_name'] = localStorage.first_name;
                this.entity.passport_id = success['passport_id'];
                this.entity.photo_path = success['photo_path'];
                this.entity.photo = success['photo'];
                this.onUserChange.emit(this.entity);
                console.log('success', success, );
                console.log( 'id', success['id'] );
            });

    }


}
