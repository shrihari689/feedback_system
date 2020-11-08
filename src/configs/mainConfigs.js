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

export const backend =
  process.env.NODE_ENV === "development" ? "localhost" : "40.76.248.142";

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
