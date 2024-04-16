import { Component, OnInit } from '@angular/core';
import { Notice, NoticeService } from 'src/app/services/notice.service';





@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.scss']

})
 // Notice board component is repsonisbly for dipslaying and adding notices which get stored in firebase
export class NoticeBoardComponent implements OnInit {
  //Properties of the class
  notices: Notice[] = []; //Object for the new notices
  newNotice: Notice = { title: '', message: '', tags: [] }; // Empty notice 
  predefinedTags: string[] = ['Important', 'Urgent', 'General', 'Announcement']; // Predifned tags
  selectedTag: string = ''; //String to store selected tags
  selectedFilterTag: string = ''; //String store selected filter tag
  filteredNotices: Notice[]=[]; //Array to store filtered notices

  

  //Constructor for the NoticeService dependency
  constructor(private noticeService: NoticeService) {}

  //Component initialization happens here
  ngOnInit(): void {
    this.noticeService.getNotices().subscribe(notices => { //Retrieves notices from the NoticeService
      this.notices = notices; // and assigns to the array
      this.filteredNotices = this.notices; // Initially display all notices
    });
  }

  //Function to add new notice to the notice board
  addNotice() {
    if (this.newNotice.title && this.newNotice.message) { //Check if new notice has both title and message
      if (!this.newNotice.tags) {
        this.newNotice.tags = [];
      }
      if (this.selectedTag) {
        this.newNotice.tags.push(this.selectedTag);
      }
      this.noticeService.addNotice(this.newNotice).then(() => { //Calls method 'AddNotice' to save new noticee
        // Clear the form after notice is added
        this.newNotice = { title: '', message: '', tags: [] };
        this.selectedTag = '';
      });
    }
  }

  //Apply filter method
  applyFilter() {
    if (this.selectedFilterTag) {
      this.filteredNotices = this.notices.filter(notice => notice.tags && notice.tags.includes(this.selectedFilterTag));
    } else {
      this.filteredNotices = this.notices; // If no tag is selected, show all notices
    }
  }

  resetFilter() {
    this.selectedFilterTag = ''; // Reset selected tag
    this.filteredNotices = this.notices; // Display all notices
  }

  //Function to delete a notice
  deleteNotice(noticeId:string) {
    this.noticeService.deleteNotice(noticeId).then(()=>{
      console.log('Notice deleted successfully');
    }).catch(error => {
        console.error('Error deleting notice:', error)
    });
  }

}