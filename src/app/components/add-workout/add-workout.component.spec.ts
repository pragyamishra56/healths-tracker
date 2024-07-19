import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddWorkoutComponent } from './add-workout.component';
import { WorkoutService } from '../../services/workout.service';

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;
  let workoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
  const spy = jasmine.createSpyObj('WorkoutService', ['addWorkout']);


    await TestBed.configureTestingModule({
      declarations: [AddWorkoutComponent],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: WorkoutService, useValue: spy}
      ]
    }).compileComponents();
    workoutService = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addWorkout on WorkoutService when addWorkout is invoked', () => {
    component.userName = 'Test User';
    component.workoutType = 'Running';
    component.workoutMinutes = 30;

    component.addWorkout();

    expect(workoutService.addWorkout).toHaveBeenCalledWith('Test User', 'Running', 30);
  });

  it('should reset input fields after adding a workout', () => {
    component.userName = 'Test User';
    component.workoutType = 'Running';
    component.workoutMinutes = 30;

    component.addWorkout();

    expect(component.userName).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.workoutMinutes).toBeNull();
  });

});

