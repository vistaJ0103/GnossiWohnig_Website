import firebaseConfig from "./firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";

const {
  initializeAppCheck,
  ReCaptchaV3Provider,
} = require("firebase/app-check");

const firebaseApp = firebase.initializeApp(firebaseConfig);

initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider("6Lehj88nAAAAAD9YHIfJ-pN7Y-ywxCuFJmR4Yalh"),
  isTokenAutoRefreshEnabled: true,
});

export const firebaseAppAuth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
const functions = firebaseApp.functions();

export const getDocument = (collection, id) => {
  return firestore
    .collection(collection)
    .doc(id)
    .get()
    .then((snapshot) => {
      return snapshot.data();
    })
    .catch((err) => console.log(err));
};

export const getCollection = (collection) => {
  return firestore
    .collection(collection)
    .get()
    .then((snapshot) => {
      const rawData = snapshot.docs.map((doc) => {
        const docId = { doc: doc.id };
        const docData = doc.data();
        return { ...docId, ...docData };
      });
      return rawData;
    })
    .catch((err) => console.log(err));
};

export const callCloudFunctionWithAppCheck = (functionToCall, data) => {
  return functions.httpsCallable(functionToCall)(data);
};
