# ⚡ DevPulse - GitHub Analytics Dashboard

DevPulse is a modern, secure, and dynamic dashboard designed for developers to visualize and track their GitHub activity. It provides deep insights into coding patterns, repository metrics, and programming language distribution.

## 🚀 Key Features

* **Personalized Dashboard:** Secure authentication ensures users only see their own private and public data.
* **Codebase Insights:** Interactive donut charts that visualize the distribution of programming languages used across your repositories.
* **Activity Heatmap:** Visual representation of your GitHub contribution history throughout the year.
* **Metrics Tracking:** Real-time stats for total repositories, stars, followers, and following count.
* **Secure Architecture:** Built with JWT-based authentication and protected API routes.

## 🛠 Tech Stack

### Frontend
* **React.js:** Component-based UI.
* **Tailwind CSS:** Modern, responsive styling.
* **Axios:** API communication.
* **Recharts:** Data visualization for codebase insights.
* **React-github-calendar:** Contribution activity visualization.

### Backend
* **Node.js & Express:** Scalable server-side logic.
* **MongoDB & Mongoose:** Data modeling and storage.
* **JWT (JSON Web Tokens):** Secure session management.
* **GitHub OAuth API:** Secure third-party authentication and data syncing.

## 🔄 How It Works

1. **Authentication:** Users register/login to DevPulse using JWT.
2. **GitHub Link:** Users authorize the app via GitHub OAuth.
3. **Data Sync:** The app retrieves a secure `access_token` from GitHub, which is linked to the user's account in our database.
4. **Authorized Fetching:** When accessing the dashboard, the frontend provides the user's JWT. The backend validates the user and fetches their specific data from GitHub using the stored `access_token`.



## 📦 Getting Started

### Prerequisites
* Node.js installed.
* A running MongoDB instance.
* A GitHub OAuth App registered in your [GitHub Developer Settings](https://github.com/settings/developers).

### Installation
1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/DevPulse.git](https://github.com/your-username/DevPulse.git)
2. **Backend Setup**
     cd server
npm install
# Create a .env file with:
# GITHUB_CLIENT_ID=your_id
# GITHUB_CLIENT_SECRET=your_secret
# SECRET=your_jwt_secret
# MONGODB_URI=your_mongodb_uri

3. **Frontend Setup**
 # cd ../frontend
 # npm install

 4. **GitHub OAuth Configuration**
 # Go to GitHub Developer Settings.

 # Create a New OAuth App.

 # Set the Authorization callback URL to: http://localhost:5000/api/auth/callback.

 # Copy the Client ID and Client Secret into your backend .env file.

 5. **Running the Application**

 # Start Backend
 # cd server && npm run dev

# Start Frontend (in a new terminal)
 # cd frontend && npm run dev

 ## 📸 Screenshots

| Dashboard Interface | GitHub Insights |
| :--- | :--- |
| ![Dashboard](<img width="1440" height="798" alt="Image" src="https://github.com/user-attachments/assets/cfd1eca7-a7bd-4947-8ef7-e10f9ea3123e" />) | ![Insights]() |
