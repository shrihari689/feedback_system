import firebase from "firebase/app";

export const supportEmail = "shrihari.ct19@bitsathy.ac.in";

export const firebaseConfig = {
  apiKey: "AIzaSyB86IL168LpKedM1R-vDXRp4YbhOari6D0",
  authDomain: "bit-feedback.firebaseapp.com",
  databaseURL: "https://bit-feedback.firebaseio.com",
  projectId: "bit-feedback",
  storageBucket: "bit-feedback.appspot.com",
  messagingSenderId: "1082863154592",
  appId: "1:1082863154592:web:1f7b7f6059384c838f20c5",
  measurementId: "G-LTYF1LQMRB",
};
export const data = [
  {
    feedId: "3543544",
    status: "unsolved",
    hasImage: "https://via.placeholder.com/320x200",
    title: "Our Bus seems to be overspeed",
    description:
      "Our Bus seems to be overspeed Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nemo, ab quidem sequi facere provident beatae a facilis quae obcaecati?",
    tags: ["Transport"],
  },
  {
    feedId: "3543543",
    status: "partial",
    hasImage: "https://via.placeholder.com/320x200",
    title: "Applied Scholarship not recieved yet",
    description:
      "Applied Scholarship not recieved yet Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt doloremque blanditiis omnis laborum, dolores consequuntur.",
    tags: ["Administration"],
  },
  {
    feedId: "3543541",
    status: "opened",
    title: "My CAMPS is not working! I logged in but not working!",
    tags: ["SDC"],
    description:
      "My CAMPS is not working! I logged in but not working! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt doloremque blanditiis omnis laborum, dolores consequuntur.",
  },
  {
    feedId: "3543542",
    status: "rejected",
    title: "I paid the fees, but transaction failed.",
    tags: ["SDC", "Administration"],
    description:
      "I paid the fees, but transaction failed. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt doloremque blanditiis omnis laborum, dolores consequuntur.",
  },
  {
    feedId: "3543540",
    status: "solved",
    hasImage: "https://via.placeholder.com/320x200",
    title: "Please change online class schedule.",
    tags: ["Management"],
    description:
      "Please change online class schedule. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt doloremque blanditiis omnis laborum, dolores consequuntur.",
  },
];

export const checkUserSignIn = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  firebase.auth().onAuthStateChanged((user) => {
    if (user == null && !window.location.href.includes("/login")) {
      window.location = "/login";
    }
  });
};
export const getFormatedDateString = (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let dateString = "";
  dateString += date.getDate() + " ";
  dateString += months[date.getMonth()] + " ";
  dateString += date.getFullYear() + " | ";
  if (date.getHours() === 0) {
    dateString += "12:";
  } else {
    dateString += date.getHours() < 10 ? "0" : "";
    dateString +=
      (date.getHours() > 12
        ? date.getHours() - 12 < 10
          ? "0" + (date.getHours() - 12)
          : date.getHours() - 12
        : date.getHours()) + ":";
  }
  dateString +=
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    " ";
  dateString += date.getHours() > 11 ? "PM" : "AM";
  return dateString;
};

export const anonymousImage =
  "https://firebasestorage.googleapis.com/v0/b/bit-feedback.appspot.com/o/Assets%2FanonymousImage.png?alt=media&token=59de702e-5ed3-4051-9303-a015befe637e";
