FRONTEND STRUCTURE/
├── public/
│   └── index.html
│
├── src/
│   ├── assets/                # Logos, images, icons
│   ├── components/            # Reusable components (buttons, cards, etc.)
│   │   ├── Navbar.jsx
│   │   ├── UserCard.jsx
│   │   ├── ClothingCard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Footer.jsx
│   │   ├── Background.jsx
│   │   └── QuizStep.jsx       # Optional, if using multi-step quiz
│   │
│   ├── pages/                 # Full page views
│   │   ├── Home.jsx
│   │   ├── Quiz.jsx
│   │   ├── QuizResults.jsx
│   │   ├── Profile.jsx
│   │   ├── EditProfile.jsx
│   │   ├── Community.jsx
│   │   ├── BrowseUsers.jsx
│   │   ├── BrowseClothing.jsx
│   │   ├── Clothing.jsx
│   │   ├── AddClothing.jsx
│   │   └── UserProfile.jsx
│   │
│   ├── services/              # API helper functions
│   │   ├── api.js             # Axios setup
│   │   ├── auth.js            # login, signup, token logic
│   │   ├── users.js           # get/update user
│   │   ├── clothing.js        # get/create clothing items
│   │   └── comments.js
│   │
│   ├── contexts/              # Global state (like auth context)
│   │   └── AuthContext.jsx
│   │
│   ├── styles/                # Global CSS, variables, themes
│   │   ├── index.css
│   │   └── variables.css
│   │
│   ├── App.jsx                # Main app routes
│   ├── main.jsx               # ReactDOM render entry point
│   └── .env                   # Vite environment variables
│
├── .gitignore
├── package.json
└── vite.config.js
