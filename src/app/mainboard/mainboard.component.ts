import {Component, OnInit} from '@angular/core';
import {JobListComponent} from "./job-list/job-list.component";
import {FriendComponent} from "./friend/friend.component";
import {ProfileComponent} from "./profile/profile.component";
import {InfoComponent} from "./info/info.component";
import {FriendService} from "../shared/services/friend.service";
import {CountService} from "../shared/services/count.service";
import {MyJobService} from "../shared/services/my-job.service";
import { AlertController } from 'ionic-angular';
declare var FCMPlugin: any;
@Component({
  selector: 'page-mainboard',
  templateUrl: 'mainboard.component.html'
})
export class MainboardComponent implements OnInit{
  friendsArr: any;
  friendsRequestsArr: any;
    myJobsList:any= [];
    i:any;
  tab1Root = JobListComponent;
  tab2Root = FriendComponent;
  tab3Root = ProfileComponent;
  tab4Root = InfoComponent;
   counter = 0;
  constructor(public service: FriendService,
              private myService: MyJobService,
              public count: CountService,
              public alertCtrl: AlertController
             ) {
  }

  ngOnInit(){
    this.getFriendsRequests();
    this.getFriends();
    this.getMyJobs();
   // this.getSubscribe();
  }
  getSubscribe(){
      //this.counter++;
    //  localStorage.counter;

    //  if (localStorage.counter == 0){
    //  }
    //  console.log(this.counter);
    //  console.log(localStorage.counter);
  }
  getFriends(){
    this.service.get()
      .subscribe(success => {
        this.friendsArr = success;
        this.count.getFriends(success)
      })
  }
  getFriendsRequests () {
    this.service.incoming()
      .subscribe(success => {
        this.friendsRequestsArr = success;
        console.log(this.friendsRequestsArr.length);
        this.count.getRequests(success)

      })
  }

    getMyJobs() {
        this.myService.get()
            .subscribe(success => {
                for (this.i in success){
                    if (success[this.i]['status_id']== '1'){
                        this.myJobsList = success;
                        console.log(this.myJobsList);
                    }
                }



            })
    }
}
