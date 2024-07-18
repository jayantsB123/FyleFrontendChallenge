import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartModule } from 'primeng/chart';

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
  selector: 'app-user',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: UserData | null = null;  // Initialize as null
  basicData: any;
  basicOptions: any;

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

  constructor(private router: Router) {}

  ngOnInit() {
    // Retrieve existing user data from localStorage
    let storedData: UserData[] = JSON.parse(localStorage.getItem('userData') || '[]');
    const defaultUserNames = this.defaultUserData.map(user => user.name);

    // Check if localStorage is empty or does not contain default data
    if (storedData.length === 0) {
      // If no user data, store default data
      localStorage.setItem('userData', JSON.stringify(this.defaultUserData));
      storedData = [...this.defaultUserData];
      console.log('Stored default user data in localStorage:', this.defaultUserData);
    } else {
      // If user data already exists, ensure default data is not duplicated
      storedData = storedData.filter(user => !defaultUserNames.includes(user.name));
      storedData = [...this.defaultUserData, ...storedData];
      localStorage.setItem('userData', JSON.stringify(storedData));
      console.log('Updated user data in localStorage:', storedData);
    }

    // Extract and decode username from URL
    const encodedUsername = this.router.url.split('/')[1];
    const username = decodeURIComponent(encodedUsername);
    console.log('Extracted username:', username);

    // Find user data from the list
    this.user = storedData.find((user: UserData) => user.name === username) || null;
    console.log('User data:', this.user);
    
    if (this.user) {
      // Set up chart data and options if user data is available
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
      this.basicData = {
        labels: this.user.workouts.map((workout) => workout.type),
        datasets: [
          {
            label: 'Minutes',
            backgroundColor: '#6b5b95', // Bar color
            borderColor: '#6b5b95',
            borderWidth: 1,
            barThickness: 20, // Adjust the width of the bars
            data: this.user.workouts.map((workout) => workout.minutes),
          },
        ],
      };

      this.basicOptions = {
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
        },
      };
    } else {
      console.error('No user data found for username:', username);
    }
  }
}
