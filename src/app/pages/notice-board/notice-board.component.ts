import { Component, OnInit } from '@angular/core';
import { Notice, NoticeService } from 'src/app/services/notice.service';


@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.scss']

})
 // Notice board component is repsonisbly for dipslaying and adding notices which get stored in firebase
export class NoticeBoardComponent implements OnInit {
  notices: Notice[] = []; //Object for the new notices
  newNotice: Notice = { title: '', message: '' }; // Empty notice 

  //Constructor for the NoticeService dependency
  constructor(private noticeService: NoticeService) {}

  //Component initialization happens here
  ngOnInit(): void {
    this.noticeService.getNotices().subscribe(notices => { //Retrieves notices from the NoticeService
      this.notices = notices; // and assigns to the array
    });
  }

  //Function to add new notice to the notice board
  addNotice() {
    if (this.newNotice.title && this.newNotice.message) { //Check if new notice has both title and message
      this.noticeService.addNotice(this.newNotice).then(() => { //Calls method 'AddNotice' to save new noticee
        // Clear the form after notice is added
        this.newNotice = { title: '', message: '' };
      });
    }
  }
}
