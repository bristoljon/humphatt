import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyCgGzQ6RYXPhi2nq6uhouSGbXssBynsFwQ',
  authDomain: 'humphatt.firebaseapp.com',
  databaseURL: 'https://humphatt.firebaseio.com',
  storageBucket: 'humphatt.appspot.com',
});

export const auth = firebase.auth();
export const database = firebase.database();
