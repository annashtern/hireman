import {Injectable} from "@angular/core";
import {EntityService} from "../base/entity.service";
import {RequestService} from "./request.service";
import {ToastController} from "ionic-angular";

@Injectable()

export class FriendService extends EntityService {

  constructor(public request: RequestService,
              public toast: ToastController) {
    super(request, toast);
    this.service_name = 'friend';
  }

    /**
     *
     * @param data
     * @returns {Observable<Object>}
     */
    incoming(data: Object = null) {
        const url = this.url('incoming');
        if (url) {
            return this.request.get(url, data);
        }
    }

    addfavorite(data: any){
        const url = this.url('addfavorite');
        return this.request.post(url +data, data )
            .do(() => {
                    const msg = this.msg('addf');
                    this.notification('success', msg);
                },
                err => {
                    const msg = this.msg('err');
                    this.notification('error', msg)
                });
    }

    deletefavorite(data:any){

        const url = this.url('deletefavorite');
        return this.request.post(url +data , data )
            .do(() => {
                    const msg = this.msg('delf');
                    this.notification('success', msg);
                },
                err => {
                    const msg = this.msg('err');
                    this.notification('error', msg)
                });

    }

    accept(data: Object = null) {
        const url = this.url('acc');
        if (url) {
            return this.request.get(url + data + '/accept');
        }

    }

    decline(data: Object = null) {
        const url = this.url('dec');
        if (url) {
            return this.request.get(url + data + '/deny');
        }
    }

    add(data: any){
        const url = this.url('add');
        return this.request.post(url, data)
            .do(() => {
                    const msg = this.msg('add');
                    this.notification('success', msg);
                },
                err => {
                    const msg = this.msg('err');
                    this.notification('error', msg)
                });
    }

    favorite(){
        const url = this.url('favorite');
        if (url) {
            return this.request.get(url);
        }
    }

}
