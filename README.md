# Couple Diary App

A mobile application for couples to share, document, and cherish their memories together.

## Features

- Create and share diary entries with your partner
- Add photos and emotions to entries
- View shared memories in a timeline
- Private and secure diary sharing
- Reminders for special occasions
- Search through past memories

## Tech Stack

- **Framework**: React Native
- **State Management**: Redux or Context API
- **Database**: Firebase Realtime Database / Firestore
- **Authentication**: Firebase Authentication
- **Storage**: Firebase Cloud Storage (for photos)

## Project Structure

```
couple-diary-app/
├── src/
│   ├── screens/          # Screen components
│   ├── components/       # Reusable components
│   ├── navigation/       # Navigation setup
│   ├── redux/            # Redux store, actions, reducers
│   ├── services/         # API and Firebase services
│   ├── utils/            # Utility functions
│   └── assets/           # Images, fonts, etc.
├── __tests__/            # Test files
├── package.json
├── app.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- React Native CLI
- Xcode (for iOS) or Android Studio (for Android)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/achal-web/couple-diary-app.git
   cd couple-diary-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up Firebase project
   - Create a new Firebase project
   - Add your Firebase config to the app

4. Run the app
   ```bash
   npx react-native run-android
   # or
   npx react-native run-ios
   ```

## Contributing

Contributions are welcome! Please follow the existing code style and create feature branches.

## License

MIT License - feel free to use this project for personal or commercial purposes.
