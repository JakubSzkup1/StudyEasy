import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Milestone {
  id?: string; //id field used for firestore document id
  title: string; //title of the milestone
  description: string; //description of milestone
  date: string; //Date of milestone
  time: string; //Time of the milestone
}

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {
  constructor(private firestore: AngularFirestore) {}

 
//Function to add a new milestone to firestore
  addMilestone(milestone: Milestone) {
    return this.firestore.collection('milestones').add(milestone);
  }

   //Function to get milestones from firestore
  getMilestones(): Observable<Milestone[]> {
    return this.firestore.collection<Milestone>('milestones').valueChanges({ idField: 'id' });
  }

  //Function to delete a milestone from firestore
  deleteMilestone(milestoneId: string) {
    return this.firestore.collection('milestones').doc(milestoneId).delete();
  }
}

