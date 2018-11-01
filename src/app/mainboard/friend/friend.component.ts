import {Component, OnInit} from "@angular/core";
import {FriendService} from "../../shared/services/friend.service";
import {CountService} from "../../shared/services/count.service";
import {AlertController, NavController} from "ionic-angular";
import {PhoneContactsComponent} from "./phone-contacts.component/phone-contacts.component";
import {FavoritesFriendsComponent} from "../../../components/favorites-friends/favorites-friends";

export declare interface RemoveId {
  user_id: Array<string>;
}

@Component({
  selector: 'page-friend',
  templateUrl: './friend.component.html',
})

export class FriendComponent implements OnInit {
  friendsRequestsArr: any;
  friendsArr: any;
  i:any;
  public showFavorites:boolean;
  public elementArr: RemoveId = {
    user_id: []
  };


  constructor(public service: FriendService,
              public count: CountService,
              public alertCtrl: AlertController,
              public navCtrl: NavController) {
    this.showFavorites = false;
  }

  ngOnInit() {
    this.getFriends();
    this.getRequests();
  }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        this.service.incoming().subscribe(success=>{
                this.friendsRequestsArr = success;
                this.count.getRequests(success);
                console.log(this.friendsRequestsArr);
            console.log('work',success)
        },
             err =>{
            console.log(err);
             });
        console.log('Async operation has ended');
        setTimeout(() => {
           // location.reload();
            refresher.complete();
        }, 2000);
    }

  getFriends() {
    this.friendsArr = this.count.friendsArr;
    console.log(this.friendsArr);
  }
  favorites(user){
    console.log(user);
    this.service.addfavorite(user) .subscribe(success => {  })
  }
  getRequests() {
    this.friendsRequestsArr = this.count.friendsRequestsArr;
    console.log(this.friendsRequestsArr, this.count.friendsRequestsArr)
  }


  toContacts(user) {
    this.navCtrl.push(PhoneContactsComponent);
  }
    toFavorites(user){
        this.navCtrl.push(FavoritesFriendsComponent);
    }

  declineFriend(user) {
    this.service.decline(user.id)
      .subscribe(() => {
        this.friendsRequestsArr.splice(this.friendsRequestsArr.indexOf(user), 1)
      })
  }
    favoritesdelete(user){
        console.log(user);
        this.service.deletefavorite(user) .subscribe(
            success => {
                console.log(user);
                location.reload();
                console.log(this.friendsArr);
            })

    }

  acceptFriend(user) {
    this.service.accept(user.id)
      .subscribe(() => {
        this.friendsRequestsArr.splice(this.friendsRequestsArr.indexOf(user), 1);
        this.friendsArr.push(user);
      })
  }

  deleteFriend(user) {
    let alert = this.alertCtrl.create({
      title: 'Підтвердіть дію',
      message: 'Ви дійсно бажаєте видалити контакт?',
      buttons: [
        {
          text: 'Ні',
          role: 'cancel',
          handler: () => {
            this.elementArr.user_id = []
          }
        },
        {
          text: 'Так',
          handler: () => {
            this.elementArr.user_id.push(user.id);
            this.service.remove(this.elementArr)
              .subscribe(() => {
                this.friendsArr.splice(this.friendsArr.indexOf(user), 1)
              });
          }
        }
      ]
    });
    alert.present();
  }

}
