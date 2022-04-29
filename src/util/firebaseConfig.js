import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDcJ3-miwBaQzIAbSYzC7tRDxYTW7lnrKY',
  authDomain: 'pokedex-f888b.firebaseapp.com',
  projectId: 'pokedex-f888b',
  storageBucket: 'pokedex-f888b.appspot.com',
  messagingSenderId: '415482909125',
  appId: '1:415482909125:web:10106a3d89ae8a54babbac',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
