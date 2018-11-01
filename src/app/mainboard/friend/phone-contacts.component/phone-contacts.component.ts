import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
//import {Contacts, Contact, ContactField, ContactName} from '@ionic-native/contacts';
import {Contacts, Contact, ContactField, ContactName} from '@ionic-native/contacts';
import {FriendService} from "../../../shared/services/friend.service";
//import {FriendComponent} from "../friend.component";
//import {FavoritesFriendsComponent} from "../../../../components/favorites-friends/favorites-friends";

@Component({
  selector: 'page-phone-contacts',
  templateUrl: './phone-contacts.component.html',
})

export class PhoneContactsComponent implements OnInit{
  private contactlist: any;
  displayContactlist;
  showSearchbar: boolean = false;
  number: boolean = false;
  i:any;
    public user = {
        phone:''
    }


  // justArray = [
  //   {
  //     displayName: 'Ozzy Osbourne',
  //     phoneNumbers: [
  //       {value: ['(032) 165 49 87']},
  //       {value: ['(111) 111 11 11']}
  //     ]
  //   },
  //   {
  //     displayName: 'Son of Satan',
  //     phoneNumbers: [
  //       {value:['(032) 165 49 87'] },
  //       {value: ['(111) 111 11 11']},
  //       {value: ['(555) 555 55 55']}
  //     ]
  //   },
  // ];


  constructor(public navCtrl: NavController,
              private contacts: Contacts, private friend:FriendService) {
  }

  ngOnInit() {
    this.getContacts();
  }
    swipeEvent(e) {
        this.navCtrl.pop();
    }
  seeNumber(user){
      this.user.phone = user[0]['value'].replace("+380", "").replace(/ /g, "");
          this.friend.add(this.user).subscribe(
              success => {
                  console.log(this.user);
                  //  this.contactlist.splice(this.contactlist.indexOf(this.user), 1);
                  this.number = !this.number;
              },
              error2 => {
                  console.log(this.user);
              }
          );
  }

  restoreContacts() {
    this.displayContactlist = this.contactlist;
  }

  getContacts() {
    this.contacts.find(["displayName", "phoneNumbers"], {
      multiple: true,
      hasPhoneNumber: true
    }).then((contacts) => {
      this.contactlist = contacts;
      console.log(contacts);
      for (this.i in this.contactlist){
          console.log(this.contactlist[this.i])
      }


      this.restoreContacts();
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  hideSBar() {
    this.restoreContacts();
    this.showSearchbar = false;
  }

  showSBar() {
    this.showSearchbar = true;
  }

  filterItems(ev: any) {
    this.restoreContacts();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.displayContactlist = this.displayContactlist.filter(function (item) {
        return item.displayName.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

}
