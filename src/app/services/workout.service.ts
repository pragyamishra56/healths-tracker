import { Injectable } from '@angular/core';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private users: User[] = JSON.parse(localStorage.getItem('userData') || '[]');

  getUsers() {
    return this.users;
  }

  addWorkout(userName: string, workoutType: string, workoutMinutes: number) {
    let user = this.users.find(u => u.name === userName);
    if (!user) {
      user = { id: Date.now(), name: userName, workouts: [] };
      this.users.push(user);
    }
    user.workouts.push({ type: workoutType, minutes: workoutMinutes });
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('userData', JSON.stringify(this.users));
  }
}
