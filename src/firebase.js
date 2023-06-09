import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, deleteDoc, getDocs, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAOcNNqNcK-uxMPG-w-Gt2rrhRoZEPDstI",
    authDomain: "financewebte.firebaseapp.com",
    projectId: "financewebte",
    storageBucket: "financewebte.appspot.com",
    messagingSenderId: "15611317164",
    appId: "1:15611317164:web:c1d9c8d623f6e909810809",
    measurementId: "G-52E98245E5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const addInvenstmentToFirebase = async (data) => {
    try {
        const docRef = await addDoc(collection(db, "myInvenstments"), data);
        console.log("Invenstment added successfuly docId:", docRef.id);
    } catch (error) {
        console.error('An error occured during adding invenstment:', error);
    }
};

const removeInvenstmentFromFirebase = async (itemId) => {
    try {
        const itemRef = doc(db, 'myInvenstments', itemId);
        await deleteDoc(itemRef);
        console.log('Invenstment removed successfully.');
    } catch (error) {
        console.error('An error occured during removing invenstment:', error);
    }
};

const getAllInvenstmentsFromFirebase = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'myInvenstments'));
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        console.log('Invenstment recieved successfully.');
        return data;
    } catch (error) {
        console.error('An error occured during receiving invenstments:', error);
        return [];
    }
};


export { app, analytics, db, addInvenstmentToFirebase, removeInvenstmentFromFirebase, getAllInvenstmentsFromFirebase };