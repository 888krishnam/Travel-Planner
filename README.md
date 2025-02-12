# TRAVEL PLANNER

A React application for planning trips and tracking visited countries.

## Technologies Used

-   **Frontend:** React, TypeScript, SWC, Vite, Tailwind CSS, Material UI (MUI)
-   **APIs:** Google Places API, Gemini API
-   **Authentication:** OAuth 2.0 (Google)
-   **Backend & Infrastructure:** Firebase (Database, Hosting, Deployment)

## Features

-   **Trip Creation:** Plan detailed trips by providing destination, dates, and other relevant information. Leverages the Gemini API to generate hotel recommendations and itineraries based on user input.
-   **Trip Management:** View and manage previously created trips.
-   **Trip Details:** Access detailed information about a selected trip.
-   **Visited Countries Tracking:** Keep track of countries you've visited.
-   **Place Information:** Utilizes the Google Places API to fetch photos and provide autocomplete functionality for location input.
-   **User Authentication:** Securely sign in with Google using OAuth 2.0.

## Local Development Setup

1.  **Google Cloud Project Setup:**
    -   Create a project in the Google Cloud Console.
    -   Enable the Gemini API and Google Places API for your project.

2.  **OAuth 2.0 Configuration:**
    -   Set up OAuth 2.0 authorization credentials for your project. Configure the authorized redirect URIs appropriately for local development and production.

3.  **Firebase Project Setup:**
    -   Create a Firebase project and link it to your Google Cloud project.
    -   Create two collections in your Firestore database: `trips` and `visited`.

4.  **Environment Variables:**
    -   Create a `.env` file in the root directory of your project.
    -   Store all API keys and sensitive information in this file. **Important:** Restrict API key usage to authorized websites within the Google Cloud Console to enhance security, as API Keys are accessed from frontend. Example `.env` file structure:

    ```
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_PLACE_API_KEY=your_places_api_key
    VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
    VITE_GEMINI_API_KEY=your_gemini_api_key
    ```

5.  **Firebase Configuration:**
    -   Create a file named `Firebase.ts` in the `services` directory.
    -   Copy the Firebase configuration object from your Firebase project settings and paste it into this file. This will typically look something like:

    ```typescript
    import firebase from "firebase/app";
    import "firebase/firestore"; // Import necessary Firebase modules
    import "firebase/auth"; // Import necessary Firebase modules

    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
    };

    const db = firebase.firestore(); // Export Firestore instance
    const auth = firebase.auth(); // Export Auth instance

    export { db, auth };
    ```

6.  **Install Dependencies:**
    -   Open your terminal in the project directory and run: `npm install`

7.  **Run the Development Server:**
    -   Run: `npm run dev`

This will start the development server, and the application should be accessible at `localhost`.