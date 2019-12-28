import * as firebase from "firebase/app";
import "firebase/auth";
import config from "./config";

const firebaseAuth = firebase.initializeApp(config);

const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.setCustomParameters({
  display: "popup"
});

export { firebaseAuth, facebookProvider };
