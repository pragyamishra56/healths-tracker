import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  // styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  searchTerm = '';
  filterType = '';
  workoutTypes = ['Running', 'Cycling', 'Swimming', 'Yoga'];
  displayedColumns: string[] = ['name', 'workouts', 'numberOfWorkouts', 'totalMinutes'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
    this.updateDataSource();
  }

  updateDataSource() {
    this.dataSource.data = this.workoutService.getUsers();
    this.dataSource.paginator = this.paginator;
  }

  get filteredUsers() {
    return this.dataSource.data.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.filterType ? user.workouts.some((w: { type: string; }) => w.type === this.filterType) : true)
    );
  }

  getWorkoutTypes(user: any): string {
    return user.workouts.map((w: any) => w.type).join(', ');
  }

  getTotalWorkoutMinutes(user: any): number {
    return user.workouts.reduce((sum: number, w: any) => sum + w.minutes, 0);
  }
}
