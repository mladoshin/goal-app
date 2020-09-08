import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'
import * as firebaseall from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAz06BJIu4CQZ68m2GFAsJbsUrWRVcTNhQ",
  authDomain: "sprint-goals-bc1d3.firebaseapp.com",
  databaseURL: "https://sprint-goals-bc1d3.firebaseio.com",
  projectId: "sprint-goals-bc1d3",
  storageBucket: "sprint-goals-bc1d3.appspot.com",
  messagingSenderId: "282852871556",
  appId: "1:282852871556:web:aacde10c0ffbae3bf4a1d1",
  measurementId: "G-S9QR48HEJX"
};


class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth()
    this.storage = app.storage()
    this.db = app.database()
    firebaseall.analytics()
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }
  logout() {
    return this.auth.signOut()
  }
  async register(name, surname, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password)
      .then(function () {
        const user = app.auth().currentUser;
        user.sendEmailVerification();
      })
    return this.auth.currentUser.updateProfile({
      displayName: name + " " + surname,
      userEmail: email
    })
  }

  updateUserProfileUrl(url) {
    return this.auth.currentUser.updateProfile({
      photoURL: url
    })
  }

  getCurrentUserName() {
    return this.auth.currentUser && this.auth.currentUser.displayName
  }
  getCurrentUserId() {
    return this.auth.currentUser && this.auth.currentUser.uid
  }
  isInit() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve)
    })
  }
  resetUserPassword(e, email) {
    e.preventDefault();
    this.auth.sendPasswordResetEmail(email).then(() => this.redirect(email)).catch(function (error) {
      alert(error.message)
      // An error happened.
    });
  }

  redirect(email) {
    this.logout()
    sessionStorage.setItem("Auth", false)
    window.location.reload()
    if (email.indexOf("@mail.ru") + 1) {
      window.open("https://e.mail.ru/inbox")
    } else if (email.indexOf("@gmail.com") + 1) {
      window.open("https://mail.google.com/mail")
    } else if (email.indexOf("@yandex.ru") + 1) {
      window.open("https://mail.yandex.ru/")
    }
    console.log("email sent")
  }

  loadUserGoals(loadGoalItems, loadCategories) {
    var starCountRef = this.db.ref(this.getCurrentUserId() + "/goals/").orderByKey();
    starCountRef.on('value', function (snapshot) {
      var goalItems = [] //local temp variable
      var goalCategories = {}
      var identificators = snapshot.val() ? Object.keys(snapshot.val()) : null
      var i = 0

      snapshot.forEach(function (snapItem) {
        const item = snapItem.val();
        item.id = identificators[i]
        goalItems.push(item)

        if (goalCategories[item.category] === undefined) {
          goalCategories[item.category] = { count: 0, completedCount: 0 }
        }
        if (item.isCompleted) {
          goalCategories[item.category].completedCount++
        }
        goalCategories[item.category].count++

        i++
      });

      //goalCategories = Array.from(new Set(goalCategories))
      //load json of all photos from database into redux state
      loadGoalItems(goalItems)
      loadCategories(goalCategories)
    });
  }

  addNewGoal(props) {
    console.log(props)
    try {
      this.db.ref(this.getCurrentUserId() + "/goals").push({
        name: props.name,
        category: props.category,
        type: props.type,
        units: props.units,
        targetValue: props.targetValue,
        startValue: props.startValue,
        currentValue: props.startValue,
        deadline: props.deadline,
        description: props.description,
        dateCreated: Date.now(),
        isCompleted: false,
        isArchieved: false
      });
    } catch (err) {
      alert(err.message)
    }

  }

  completeGoal(id) {
    try {
      this.db.ref(this.getCurrentUserId() + "/goals/" + id).update({
        isCompleted: true
      });
    } catch (err) {
      alert(err.message)
    }
  }

  quickResultUpdate(result, id){
    try {
      this.db.ref(this.getCurrentUserId() + "/goals/" + id).update({
        currentValue: result
      });
    } catch (err) {
      alert(err.message)
    }
  }
  
  updateGoal(goal) {
    console.log(goal)
    try {
      this.db.ref(this.getCurrentUserId() + "/goals/" + goal.id).update({
        name: goal.name,
        category: goal.category,
        type: goal.type,
        units: goal.units,
        targetValue: goal.targetValue,
        currentValue: goal.startValue,
        deadline: goal.deadline,
        description: goal.description
      });
    } catch (err) {
      alert(err.message)
    }
  }


}

export default new Firebase()