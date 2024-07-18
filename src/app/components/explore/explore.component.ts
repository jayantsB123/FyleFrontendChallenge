import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  selector: 'app-explore',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
})
export class ExploreComponent implements OnInit {
  filterForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl('All'),
  });

  userData: UserData[] = [];

  defaultUserData: UserData[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 },
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 },
      ],
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 },
      ],
    },
  ];

  ngOnInit() {
    const storedData = JSON.parse(localStorage.getItem('userData') || '[]');
  
  // Combine and filter duplicates based on user ID
  const combinedData = [...this.defaultUserData, ...storedData];
  const uniqueData = combinedData.filter(
    (user, index, self) =>
      index === self.findIndex((t) => t.id === user.id)
  );
  
  this.userData = uniqueData;
  }

  getWorkoutTypes(workouts: Workout[]): string {
    return workouts.map((workout) => workout.type).join(', ');
  }

  getTotalMinutes(workouts: Workout[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  filteredUserData(): UserData[] {
    const formValue = this.filterForm.value;
    return this.userData.filter((user: UserData) => {
      if (
        formValue.name &&
        !user.name.toLowerCase().includes(formValue.name.toLowerCase())
      ) {
        return false;
      }
      if (formValue.type === 'All') {
        return true;
      }
      if (formValue.type) {
        const workouts = user.workouts.filter(
          (workout) => workout.type === formValue.type
        );
        if (workouts.length === 0) {
          return false;
        }
      }
      return true;
    });
  }

  currentPage = 1;
  itemsPerPage = 2;
  pageChange(page: number) {
    this.currentPage = page;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages() {
    return Math.ceil(this.filteredUserData().length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  changeItemsPerPage(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = parseInt(target.value, 10);
    this.currentPage = 1; // Reset to the first page when items per page changes
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUserData().slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }
}
