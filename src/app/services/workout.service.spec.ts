import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a workout', () => {
    service.addWorkout('Test User','Running', 30 );
    const users = service.getUsers();
    expect(users.length).toBe(1);
    expect(users[0].workouts.length).toBe(1);
    expect(users[0].workouts[0].type).toBe('Running');
  });

  it('should save the data to localStorage', () => {
    spyOn(localStorage, 'setItem');
    service.addWorkout('Test User', 'Running', 30);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should retrieve data from localStorage', () => {
    localStorage.setItem('userData', JSON.stringify([{ id: 1, name: 'Test User', workouts: [{ type: 'Running', minutes: 30 }] }]));
    service = new WorkoutService();
    const users = service.getUsers();
    expect(users.length).toBe(1);
    expect(users[0].name).toBe('Test User');
  });
});
