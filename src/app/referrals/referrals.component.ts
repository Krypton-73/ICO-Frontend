import { Component, OnInit } from '@angular/core';
import { Txn } from '../_models/txn';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authenticationService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent implements OnInit {

  txns: Txn[] = [];
  data:any;
  yolo: any;
  refId: any;
  refLink:any;

  constructor(
  private userService: UserService,
  private authenticationService: AuthenticationService,
  private toastr: ToastrService 
  ) { 
   this.yolo = JSON.parse(sessionStorage.getItem('currentUser'));
   this.refId = this.yolo.msg.user_id;  
  }

  ngOnInit() {
    this.userService.getTxns().pipe().subscribe(
      data => {
        this.data = data;
        if (this.data.code===401) {
          return this.authenticationService.logout();
        }
        let i: any;
        for (i = 0; i < this.data.msg.length; i++) {
          if (this.data.msg[i].type===3){
            this.txns.push(this.data.msg[i]);
          }
        }
      }
    );
  }

  ref() {
    this.refLink = `http://ico.acex.trade/#/auth/${this.refId}`;
    this.toastr.success('Copied to Clipboard');
  }
}
