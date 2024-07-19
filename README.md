# Workout Tracker Application

## Overview

This Angular 14+ single-page application (SPA) allows users to log their workouts by providing their username, workout type, and workout duration in minutes. The app displays a list of user workouts with functionalities to search by username, filter by workout type, and paginate through the results.

## Features

- **Add User Workout**: Input fields to add a username, workout type, and minutes with a button to submit.
- **Display Workouts**: Users' workouts are displayed in a table grid.
- **Search by Username**: Search functionality to filter workouts by username.
- **Filter by Workout Type**: Filter workouts based on the type of workout.
- **Pagination**: Paginate through the list of user workouts for better usability.

![image](https://github.com/user-attachments/assets/5f7a90b5-ab0a-42d2-ab2d-ea50b2eb1771)
![image](https://github.com/user-attachments/assets/964fefe9-8d2e-4587-aa9e-0b122ab33e93)
![image](https://github.com/user-attachments/assets/1dcbaf54-692c-4ef8-a831-6a19810ff8fb)
![image](https://github.com/user-attachments/assets/288747be-e587-4a01-90b4-9007f929b2b5)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Angular CLI (v14 or higher)

### Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/jayantsB123/FyleFrontendChallenge.git
    cd workout-tracker
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Run the Application**:
    ```bash
    ng serve
    ```
    Navigate to `http://localhost:4200/` in your web browser to see the application.

### Usage

1. **Adding a Workout**:
    - Enter the username in the "User name" field.
    - Select the workout type from the dropdown.
    - Enter the workout duration in minutes.
    - Click the "Add Workout" button to add the workout to the list.

2. **Viewing Workouts**:
    - The added workouts are displayed in a table grid.
    - Use the search bar to filter workouts by username.
    - Use the filter dropdown to filter workouts by workout type.
    - Navigate through the pages using the pagination controls at the bottom of the table.

## Assumptions

- Each user has a unique username.
- Workout types are predefined and selectable from a dropdown menu.
- Local storage is used to persist data between sessions.
- Basic validation is implemented to ensure input fields are not empty.

## Libraries Used

- **Angular 14+**: Framework for building the SPA.
- **Tailwind CSS**: For styling the application.
- **ngx-pagination**: For pagination functionality.

## Folder Structure

```
workout-tracker/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── add-workout/
│   │   │   ├── explore/
│   │   │   ├── Home/
│   │   │   ├── navbar/
│   │   │   ├── user/
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
|   |   ├── app.routes.ts
│   ├── index.html
│   ├── maint.ts
│   ├── styles.css
├── angular.json
├── package.json
├── README.md
```

## Edge Cases

- Handles empty input fields by disabling the "Add Workout" button until all fields are filled.
- Displays a message when no workouts match the search or filter criteria.
- Maintains the current state (search, filter, and pagination) when the page is refreshed.

## Known Issues and Limitations

- The application assumes a small to moderate number of workouts stored in local storage. For large datasets, performance optimizations and backend integration might be necessary.
- The current version does not support editing or deleting workouts.
