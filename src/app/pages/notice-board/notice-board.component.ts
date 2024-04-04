import { Component, OnInit } from '@angular/core';
import { Notice, NoticeService } from 'src/app/services/notice.service';


@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
})
export class NoticeBoardComponent implements OnInit {
  notices: Notice[] = [];
  newNotice: Notice = { title: '', message: '' };

  constructor(private noticeService: NoticeService) {}

  ngOnInit(): void {
    this.noticeService.getNotices().subscribe(notices => {
      this.notices = notices;
    });
  }

  addNotice() {
    if (this.newNotice.title && this.newNotice.message) {
      this.noticeService.addNotice(this.newNotice).then(() => {
        // Clear the form
        this.newNotice = { title: '', message: '' };
      });
    }
  }
}
