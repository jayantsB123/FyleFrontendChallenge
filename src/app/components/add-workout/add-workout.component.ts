import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Workout {
  type: string;
  minutes: number;
}

interface UserData {
  id: number;
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css'],
})
export class AddWorkoutComponent {
  workoutForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    type: new FormControl('Gym', [Validators.required]),
  });

  userData: UserData[] | null = null;
  selectedImage: string = 'default_image_path.jpg'; // Default image

  constructor(private router: Router) {}

  ngOnInit() {
    const storedData: UserData[] = JSON.parse(
      localStorage.getItem('userData') || '[]'
    );
    this.userData = storedData.length ? storedData : null;

    this.workoutForm.controls['type'].valueChanges.subscribe((value) => {
      if (value) {
        this.updateImage(value);
      }
    });
  }

  updateImage(type: string) {
    const imageMap: { [key: string]: string } = {
      Gym: 'path_to_gym_image.jpg',
      Cycling: 'path_to_cycling_image.jpg',
      Swimming: 'path_to_swimming_image.jpg',
      Running: 'path_to_running_image.jpg',
      Meditation: 'path_to_meditation_image.jpg',
      Yoga: 'path_to_yoga_image.jpg',
    };

    this.selectedImage = imageMap[type] || 'default_image_path.jpg';
  }

  onSubmit() {
    // check if the form is valid
    if (!this.workoutForm.valid) {
      return;
    }

    const formValue = this.workoutForm.value;

    // Retrieve existing userData from localStorage
    const storedData = localStorage.getItem('userData');
    let userData = storedData ? JSON.parse(storedData) : [];

    let user = userData.find((u: any) => u.name === formValue.name);
    if (!user) {
      user = {
        id: userData.length + 1,
        name: formValue.name,
        workouts: [],
      };
      userData.push(user);
    }

    const existingWorkout = user.workouts.find(( u:any)  => u.type === formValue.type);
    if (existingWorkout) {
      existingWorkout.minutes += parseInt(formValue.duration!, 10);
    } else {
      user.workouts.push({
        type: formValue.type,
        minutes: parseInt(formValue.duration!, 10),
      });
    }

    localStorage.setItem('userData', JSON.stringify(userData));

    // Redirect to explore page
    this.router.navigate(['/explore']);
  }
}
