import {Component, OnInit} from "@angular/core";
import {JobService} from "../../shared/services/all-job.service";
import {MyJobService} from "../../shared/services/my-job.service";
import {AlertController, ModalController} from "ionic-angular";
import {ShareJobComponent} from "./share-job-modal/share-job.component";


export declare interface applyJob {
  job_id: any,
  user_id: any

}

export declare interface searchJob {
  search: any
}

export declare interface shareJob {
  job_id: Array<number>;
  recipient_id: Array<number>;
}

@Component({
  selector: 'page-job-list',
  templateUrl: './job-list.component.html',
})

export class JobListComponent implements OnInit {
  imageURI: any;
  imageURI2: any;
  imageURI3: any;
  imageURI4: any;
  jobsId: any;
  sendId: any;
    count:any;
  food: any;
    residence: any;
    transportation: any;
    status:string;
    status_id:any;
    // city:any;
  public category: string;
  public allJobsList: any;
   myJobsList:any= [];
  public orderJobsList: any;
  public showSearchbar: boolean;
  public showText: boolean;
    public showText1: boolean;
    public showText2: boolean;
  myJobs: boolean = false;
    live:any;
    i:any;
    img:any;
    img1:any;
    img2:any;
    img3:any;
    img4:any;
    img5:any;
    img6:any;
    img7:any;
    img8:any;
  public apply: applyJob = {
    job_id: '',
    user_id: ''

  };
  public searchVal: searchJob = {
    search: ''
  };
  public share: shareJob = {
    job_id: [],
    recipient_id: []
  };


  constructor(private service: JobService,
              private myService: MyJobService,
              private alertCtrl: AlertController,
              public modalCtrl: ModalController) {

    this.category = 'all';
    this.showSearchbar = false;
     this.showText = false;
      this.showText1 = false;
      this.showText2 = false;
    this.imageURI = 'assets/icon/calendar-check.svg';
    this.imageURI2= 'assets/icon/money-bill.svg';
    this.imageURI3= 'assets/icon/compass.svg';
    this.imageURI4= 'assets/icon/arrows.svg';

  }

  ngOnInit() {
    this.getAll();
    this.getMyJobs();
  }

    doRefresh1(refresher) {
        console.log('Begin async operation', refresher);

        setTimeout(() => {
            this.service.get()
                .subscribe(success => {
                    if (success) {
                        this.allJobsList = success;

                        for (this.i in this.allJobsList){
                            console.log(this.allJobsList[this.i]);
                        }}
                });
            this.service.order()
                .subscribe(success => {
                    if (success) {
                        this.orderJobsList = success;
                        for (let i in this.orderJobsList)
                            console.log(this.orderJobsList[i]);
                        }
                });
            this.myService.get()
                .subscribe(success => {
                    if (success) {
                        this.myJobsList = success;
                        for (this.i in this.myJobsList){
                            console.log(this.myJobsList);


                        }


                    }
                });
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    }

  tapEvent(id) {
          if (this.showText== false){
               this.showText = true;
          }
          else  if (this.showText== true){
              this.showText = false;
              this.myService.count(id).subscribe(() =>{
                  console.log('count');
              })
          }
  }
    tapEvent1(id) {
        console.log("taped");
        if (this.showText1== false){
            this.showText1 = true;
        }
        else  if (this.showText1== true){
            this.showText1 = false;
            this.myService.count(id).subscribe(() =>{
                console.log('count');
            })
        }
    }

    tapEvent2(id) {
        console.log("taped");
        if (this.showText2 == false){
            this.showText2 = true;
        }
        else  if (this.showText2== true){
            this.showText2 = false;
            this.myService.count(id).subscribe(() =>{
                console.log('count');
            })
        }
    }
  getAll() {
    this.service.get()
      .subscribe(success => {
        if (success) {
          this.allJobsList = success;

          for (this.i in this.allJobsList){
            console.log(this.allJobsList[this.i]);
          }





        }
      });
    this.service.order()
      .subscribe(success => {
        if (success) {
          this.orderJobsList = success;
          for (let i in this.orderJobsList)
            console.log(this.orderJobsList[i]);


        }
      })
  }

  getMyJobs() {
     this.myService.get()
       .subscribe(success => {
         if (success) {
           this.myJobsList = success;
           for (this.i in this.myJobsList){
               console.log(this.myJobsList);


           }


         }
       })
  }

  setMyJob() {
    this.myJobs = true;
    this.showSearchbar = false;
  }

  setAllJob() {
    this.myJobs = false;
  }

  showSearchBar() {
    this.showSearchbar = !this.showSearchbar;
    if (!this.showSearchbar && this.searchVal.search) {
      this.getAll()
    }
    this.searchVal.search = '';
  }

  /**
   * Emit data to @JobListComponent
   */
  onSearchChange(data: any) {
    this.searchVal.search = data.target.value;
    this.myService.search(this.searchVal)
      .subscribe(success => {
          this.allJobsList = success
        },
        err => {
          this.getAll();
          this.searchVal.search = '';
        }
      )
  }

  moreInfo(jobsId, sendId) {
    this.jobsId = jobsId;
    this.sendId = sendId;
  }

  deleteMyJobs(id) {
    let alert = this.alertCtrl.create({
      title: 'Підтвердіть дію',
      message: 'Ви дійсно бажаєте видалити заявку?',
      buttons: [
        {
          text: 'Ні',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Так',
          handler: () => {
            this.myService.remove(id)
              .subscribe(() => {
                this.getMyJobs();
                this.getAll();
              })
          }
        }
      ]
    });
    alert.present();
  }

  declineOrder(id) {
    let alert = this.alertCtrl.create({
      title: 'Підтвердіть дію',
      message: 'Ви дійсно бажаєте відхилити запропоновану пропозицію?',
      buttons: [
        {
          text: 'Ні',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Так',
          handler: () => {
            this.service.remove(id)
              .subscribe(() => {
                this.getAll();
              })
          }
        }
      ]
    });
    alert.present();
  }

  applyJob(id) {
    this.apply.job_id = id + '';
    this.apply.user_id = +localStorage.user_id;
    let alert = this.alertCtrl.create({
      title: 'Підтвердіть дію',
      message: 'Ви дійсно бажаєте подати заявку на данну пропозицію?',
      buttons: [
        {
          text: 'Ні',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Так',
          handler: () => {
            this.service.apply(this.apply)
              .subscribe(() => {
                this.getAll();
                this.getMyJobs();
              })
          }
        }
      ]
    });
    alert.present();
  }

  applyOrder(job_id, order_id){
    this.apply.job_id = job_id + '';
    this.apply.user_id = +localStorage.user_id;
    let alert = this.alertCtrl.create({
      title: 'Підтвердіть дію',
      message: 'Ви дійсно бажаєте подати заявку на данну пропозицію?',
      buttons: [
        {
          text: 'Ні',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Так',
          handler: () => {
            this.service.apply(this.apply)
              .subscribe(() => {
                this.getMyJobs();

              });
            this.service.applyOrder(order_id)
              .subscribe(() => {
                this.getAll();
                console.log("udalil")
              })
          }
        }
      ]
    });
    alert.present();
  }

  shareJob(id) {
    this.share.job_id.push(id);
    let recipientModal = this.modalCtrl.create(ShareJobComponent);
    recipientModal.onDidDismiss(data => {
      if(data){
        this.share.recipient_id = data;
        this.sendOrderJob();
      }
    });
    recipientModal.present();
  }

  sendOrderJob(){
    let alert = this.alertCtrl.create({
      title: 'Підтвердіть дію',
      message: 'Ви бажаєте відправити цим контактам заявку на данну пропозицію?',
      buttons: [
        {
          text: 'Ні',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Так',
          handler: () => {
            this.service.share(this.share)
              .subscribe(() => {
                this.share.job_id = [];
              });
          }
        }
      ]
    });
    alert.present();
  }

}
