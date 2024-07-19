import { Component } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
})
export class AddWorkoutComponent {
  userName = '';
  workoutType = '';
  workoutMinutes: number | null = null;
  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  constructor(private workoutService: WorkoutService) { }

  addWorkout() {
    if (this.userName && this.workoutType && this.workoutMinutes) {
      this.workoutService.addWorkout(this.userName, this.workoutType, this.workoutMinutes);
      this.userName = '';
      this.workoutType = '';
      this.workoutMinutes = null;
    }
  }
}

