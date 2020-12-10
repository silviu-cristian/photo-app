let firebase;
document.addEventListener("DOMContentLoaded", function () {
  // materialize code
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, {});

  try {
    var firebaseConfig = {
      apiKey: "AIzaSyAexJ0Ga2U9RXYqtTEW0IY2h9kL867B_Lw",
      authDomain: "photo-book-467cd.firebaseapp.com",
      databaseURL: "https://photo-book-467cd.firebaseio.com",
      projectId: "photo-book-467cd",
      storageBucket: "photo-book-467cd.appspot.com",
      messagingSenderId: "413002582502",
      appId: "1:413002582502:web:be309430de3c01e98d2e27",
      measurementId: "G-H38QHFK1F1",
    };
    // Initialize Firebase
    firebase = require("firebase").default;
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    firebaseLoginUi();
    loadEvents();
  } catch (e) {
    console.error(e);
    loadEl.textContent = "Error loading the Firebase SDK, check the console.";
  }
});

function firebaseLoginUi() {
  var firebaseui = require("firebaseui");

  let uiConfig = {
    signInSuccessUrl: "/",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: "https://www.google.com",
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
      window.location.assign("https://www.google.com");
    },
  };

  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  debugger
  ui.start(".firebaseui-auth-container", uiConfig);

  // on auth change:
  firebase.auth().onAuthStateChanged(loggedIn, function (error) {
    console.log(error);
  });
}

function loggedIn(user) {
  debugger;
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var uid = user.uid;
    var phoneNumber = user.phoneNumber;
    var providerData = user.providerData;

    if (email) {
      if (localStorage.getItem("verificationMail") === "sent") {
        // email was already sent, ask user about it
      } else {
        user.sendEmailVerification().then(() => {
          localStorage.setItem("verificationMail", "sent");
        });
      }
    }
    showHideElement(false, "firebaseui-auth-container");
    showHideElement(true, "sign-out-btn");
  } else {
    // User is signed out.
    showHideElement(false, "sign-out-btn");
  }
}

function showHideElement(show, elementId) {
  const signInContainer = document.getElementsByClassName(elementId);
  for (i = 0; i < signInContainer.length; i++) {
  
    let signInContainerElement = signInContainer[i];
    if (show) {
      signInContainerElement.classList.remove("hidden");
    } else {
      signInContainerElement.classList.add("hidden");
      console.log("ceva")
    }
  }
}

function forgotPassword(email) {
  firebase.auth().sendPasswordResetEmail();
}

function loadEvents() {
  debugger
  let signOutBtn = document.getElementsByClassName("sign-out-btn");
  for (i = 0; i < signOutBtn.length; i++) {
    let signOutBtnElement = signOutBtn[i];
    if (signOutBtn) {
      signOutBtnElement.addEventListener("click", () => {
        firebase
          .auth()
          .signOut()
          .then(showHideElement(true, "firebaseui-auth-container"))
          .catch(function (error) {
            console.log(error);
          });
      });
    }
  }
}
