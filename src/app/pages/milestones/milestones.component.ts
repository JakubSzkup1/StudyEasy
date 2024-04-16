import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Milestone, MilestoneService } from 'src/app/services/milestone.service';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss'],
})
export class MilestoneComponent implements OnInit {
  milestones: Milestone[] = []; //Array to store milestones which are retrieved from firestore
  newMilestone: Milestone = { title: '', description: '', date: '', time: '' }; //Object for milestone data

  constructor(private milestoneService: MilestoneService) { }

  ngOnInit(): void {
    this.getMilestones(); //get milestones when component initializes
  }

  //Function to get milestones from firestore
  getMilestones() {
    this.milestoneService.getMilestones().subscribe(milestones => {
      this.milestones = milestones;
    });
  }

   //Function to add a new milestone to firestore
  addMilestone() {
    this.milestoneService.addMilestone(this.newMilestone).then(() => {
      this.newMilestone = { title: '', description: '', date: '', time: '' };
    });
  }

  //Function to delete a milestone from firestore
  deleteMilestone(milestoneId: string) {
    this.milestoneService.deleteMilestone(milestoneId);
  }
}
