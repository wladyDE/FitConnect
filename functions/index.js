/* eslint-disable */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

/*

exports.deleteUnActiveTrainings = functions.pubsub.schedule('every 1 minutes').onRun(async (context) => {
  const snapshots = await admin.firestore().collection('userMarkers').get();

  for (const doc of snapshots.docs) {
    await updateMarkers(doc);
  }
});

const updateMarkers = async (doc) => {
  const markers = doc.data().markers;
  let updates = false;

  const updatedMarkers = markers.map(marker => {
    if (marker.trainingTime.seconds < admin.firestore.Timestamp.now().seconds) {
      updates = true;
      return { ...marker, status: 'finished' };
    }
    return marker;
  });

  if (updates) {
    await admin.firestore().collection('userMarkers').doc(doc.id).update({ markers: updatedMarkers });
  }
};  */


exports.deleteUnActiveTrainings = functions.pubsub.schedule('every 1 minutes').onRun(async (context) => {
  const now = admin.firestore.Timestamp.now();
  const userMarkersCollection = admin.firestore().collection('userMarkers');
  const usersCollection = admin.firestore().collection('users');

  const snapshots = await userMarkersCollection.get();
  const feedbacks = await processMarkers(snapshots, now, userMarkersCollection);

  await processFeedbacks(feedbacks, usersCollection);
});

async function processMarkers(snapshots, now, userMarkersCollection) {
  const feedbacks = [];
  for (const doc of snapshots.docs) {
    const markers = doc.data().markers;
    let updates = false;

    const updatedMarkers = markers.map(marker => {
      if (marker.trainingTime.seconds < now.seconds) {
        updates = true;
        feedbacks.push({ ...marker, status: 'finished' });
        return { ...marker, status: 'finished' };
      }
      return marker;
    });

    if (updates) {
      await userMarkersCollection.doc(doc.id).update({ markers: updatedMarkers });
    }
  }
  return feedbacks;
}

async function processFeedbacks(feedbacks, usersCollection) {
  for (const feedback of feedbacks) {
    const info = {
      creator: feedback.owner.id,
      training: feedback.activityType,
      status: 'active',
      date: admin.firestore.Timestamp.now()
    };
    const users = feedback.people.slice(1).map(p => p.uid);

    for (const userId of users) {
      await usersCollection.doc(userId).update({
        myFeedBack: admin.firestore.FieldValue.arrayUnion(info)
      });
    }
  }
}



