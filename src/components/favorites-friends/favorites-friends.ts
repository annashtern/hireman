import { Component } from '@angular/core';
import {FriendService} from "../../app/shared/services/friend.service";
import {CountService} from "../../app/shared/services/count.service";
import {AlertController, NavController} from "ionic-angular";
//import {PhoneContactsComponent} from "../../app/mainboard/friend/phone-contacts.component/phone-contacts.component";
import {FriendComponent} from "../../app/mainboard/friend/friend.component";

export declare interface RemoveId {
    user_id: Array<string>;
}

@Component({
  selector: 'favorites-friends',
  templateUrl: 'favorites-friends.html'
})
export class FavoritesFriendsComponent  {

    friendsRequestsArr: any;
    friendsArr: any;
    i:any;
    pivot;
    public elementArr: RemoveId = {
        user_id: []
    };

  constructor(public service: FriendService,
              public count: CountService,
              public alertCtrl: AlertController,
              public navCtrl: NavController) {

  }
    ionViewDidLoad() {
        this.service.favorite()
            .subscribe(
                success => {
                    this.friendsArr = success;
                    this.count.friendsArr = success;
                }
            )


    }
    swipeEvent(e) {
        this.navCtrl.push(FriendComponent);
    }
    favorites(user){
      console.log(user);

      this.service.deletefavorite(user) .subscribe(
          success => {
              console.log(user);
              console.log(this.friendsArr);
          })

    }
}
