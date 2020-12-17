import firebase from 'firebase/app';
import { firestore } from 'firebase/app'
import { useState, useEffect, useContext } from 'react';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import { collectionData, docData } from 'rxfire/firestore';

const config = {
  apiKey: "AIzaSyCRtLtZmrRbdir__cKvYcHA8M36270si2w",
  authDomain: "hci-ui.firebaseapp.com",
  databaseURL: "https://hci-ui.firebaseio.com",
  projectId: "hci-ui",
  storageBucket: "hci-ui.appspot.com",
  messagingSenderId: "239926440570",
  appId: "1:239926440570:web:3a3f2ebbc547ca6fe081c3"
};
firebase.initializeApp(config);

export const useFirebase = () => {
  let [state, setState] = useState({
      firebase
  });
  useEffect(() => {
      let app;
      if (!firebase.apps.length) {
          app = firebase.initializeApp(config);
          console.log("here")
      }
      let firestore = firebase.firestore(app);
      setState({ app, firebase, firestore });
  }, []);
  return state;
};


export const useDoc = (path) => {
  let [data, setData] = useState({});
  let [loading, setLoading] = useState(true);
  let { firestore } = useFirebase();

  useEffect(
      () => {
          if (!firestore) {
              return;
          }
          let subscription = docData(firestore.doc(`${path}`), 'uid').subscribe((d) => {
              setData(d);
              setLoading(false);
          });

          return () => {
              subscription.unsubscribe();
          };
      },
      [firestore, path]
  );
  return { data, loading };
};

export const useCollection = (path) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { firestore } = useFirebase();

  useEffect(() => {
      if (!firestore) {
          return;
      }
      const subscription = collectionData(firestore.collection(`${path}`), 'id').subscribe(d => {
          setData(d);
          setLoading(false);
      });

      return () => {
          subscription.unsubscribe();
      }
  }, [firestore, path])
  
  return { data, loading };
}

export const createRecord = (path, data) => {
  return firebase.firestore().collection(`${path}`).add({
      createdAt: firestore.FieldValue.serverTimestamp(),
      ...data
  });
}

export const createDoc = (path, data) => {
  return firebase.firestore().doc(`${path}`).set({
      createdAt: firestore.FieldValue.serverTimestamp(),
      ...data
  });
}

export const updateDoc = (path, data) => {
  return firebase.firestore().doc(`${path}`).update(data)
}

export const saveDoc = (path, data) => {
  return firebase.firestore().collection(`${path}`).add({
      createdAt: firestore.FieldValue.serverTimestamp(),
      ...data
  });
}
