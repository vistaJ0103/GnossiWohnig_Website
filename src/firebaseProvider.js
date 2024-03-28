import firebaseConfig from "./firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";
import { useAuthErrStore, usePasswordResetSuccessStore } from "./stateManager";
import { useEffect, useState } from "react";

const {
  initializeAppCheck,
  ReCaptchaV3Provider,
} = require("firebase/app-check");

export const app = firebase.initializeApp(firebaseConfig);

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Lehj88nAAAAAD9YHIfJ-pN7Y-ywxCuFJmR4Yalh"),
  isTokenAutoRefreshEnabled: true,
});

const firebaseAppAuth = app.auth();
export const firestore = app.firestore();
const functions = app.functions();
const provider = new firebase.auth.GoogleAuthProvider();

export const callCloudFunctionWithAppCheck = (functionToCall, data) => {
  return functions.httpsCallable(functionToCall)(data);
};

export const useAuth = () => {
  const [authState, setAuthState] = useState({
    isSignedIn: false,
    pending: true,
    user: null,
  });

  useEffect(() => {
    const unregisterAuthObserver = firebaseAppAuth.onAuthStateChanged((user) =>
      setAuthState({ user, pending: false, isSignedIn: !!user })
    );
    return () => unregisterAuthObserver();
  }, []);

  return { firebaseAppAuth, ...authState };
};

export const createUserWithEmailAndPassword = async (email, password) => {
  try {
    useAuthErrStore.setState({ err: null });
    const res = await firebaseAppAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    res.user.sendEmailVerification();
    createDbUser(res.user.uid);
  } catch (err) {
    useAuthErrStore.setState({ err: err.code });
  }
};

export const signInWithEmailAndPassword = async (email, password) => {
  try {
    useAuthErrStore.setState({ err: null });
    const res = await firebaseAppAuth.signInWithEmailAndPassword(
      email,
      password
    );
    if (!res.user.emailVerified) {
      res.user.sendEmailVerification();
    }
  } catch (err) {
    useAuthErrStore.setState({ err: err.code });
  }
};

export const signInWithGoogle = async () => {
  try {
    useAuthErrStore.setState({ err: null });
    const res = await firebaseAppAuth.signInWithPopup(provider);
    const dbUser = await getDocument("users", res.user.uid);
    console.log("db User", dbUser);
    if (!dbUser) {
      createDbUser(res.user.uid);
    }
  } catch (err) {
    useAuthErrStore.setState({ err: err.code });
  }
};

export const resetPassword = async (email) => {
  try {
    usePasswordResetSuccessStore.setState({ res: null });
    useAuthErrStore.setState({ err: null });
    await firebaseAppAuth.sendPasswordResetEmail(email);
    usePasswordResetSuccessStore.setState({ res: true });
  } catch (err) {
    useAuthErrStore.setState({ err: err.code });
  }
};

export const signOut = () => {
  console.log("sign out");
  firebaseAppAuth.signOut().catch((err) => {
    console.log("err", err);
  });
};

const createDbUser = async (uid) => {
  try {
    const data = await getCollection("cooperativesData");
    const names = data[0].data.map((coop) => coop.name);
    const userAtt = {
      language: "de",
      onlyZHObjects: false,
      proUser: false,
      providers: names,
      uid: uid,
    };
    await setDocument("users", uid, userAtt);
  } catch (err) {
    console.log("error creating user", err);
    useAuthErrStore.setState({ err: err.code });
  }
};

export const checkIfProUser = async (uid) => {
  try {
    const user = await getDocument("users", uid);
    return user.proUser;
  } catch (err) {
    return null;
  }
};

export const checkIfUserSubscription = async (uid) => {
  try {
    const user = await getDocument("users", uid);
    return user?.subscription;
  } catch (err) {
    return null;
  }
};

export const setProUserStatus = async (uid, proStatus) => {
  try {
    await updateDocument("users", uid, { proUser: proStatus });
  } catch (err) {
    console.log("error updating pro user status", err);
  }
};

export const setSubscription = async (uid, proStatus,subscription) => {
  try {
    await updateDocument("users", uid, { proUser: proStatus,subscription:subscription });
  } catch (err) {
    console.log("error updating pro user status", err);
  }
};

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

export const updateDocument = (collection, id, data) => {
  return firestore.collection(collection).doc(id).update(data);
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

export const setDocument = (collection, id, data) => {
  return firestore.collection(collection).doc(id).set(data);
};

export const streamCollection = (
  collection,
  onAddSnapshots,
  onModSnapshots,
  onDelSnapshots
) => {
  const unsuscribe = firestore.collection(collection).onSnapshot((snapshot) => {
    var addData = [];
    var modData = [];
    var delData = [];

    snapshot.docChanges().forEach((data) => {
      const obj = data.doc.data();
      obj["id"] = data.doc.id;
      if (data.type === "added") {
        addData.push(obj);
      } else if (data.type === "modified") {
        modData.push(obj);
      } else if (data.type === "removed") {
        delData.push(obj);
      }
    });

    if (addData.length !== 0) onAddSnapshots(addData);
    if (modData.length !== 0) onModSnapshots(modData);
    if (delData.length !== 0) onDelSnapshots(delData);
  });

  return () => {
    unsuscribe();
  };
};
