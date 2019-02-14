import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Initialize Firebase
const config = {
	apiKey: "AIzaSyCF_xIK2O7RH2HXG4HKI9tSY7jBy9KPMVI",
	authDomain: "bookinesia-com.firebaseapp.com",
	databaseURL: "https://bookinesia-com.firebaseio.com",
	projectId: "bookinesia-com",
	storageBucket: "bookinesia-com.appspot.com",
	messagingSenderId: "38560434326"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
firebase.storage();

export default firebase;
