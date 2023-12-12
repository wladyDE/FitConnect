/* eslint-disable */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteUnActiveTrainings = functions.pubsub.schedule('every 1 minutes').onRun(async (context) => {
  const now = admin.firestore.Timestamp.now();
  const userMarkersCollection = admin.firestore().collection('userMarkers');
  const usersCollection = admin.firestore().collection('userFeedback');

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
      if (marker.trainingTime.seconds < now.seconds && marker.status === 'active') {
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
      id: `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
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

exports.updateRanking = functions.firestore
  .document('userFeedback/{docId}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const oldData = change.before.data();

    if (JSON.stringify(newData.rating) === JSON.stringify(oldData.rating)) {
      return null;
    }

    const newRating = newData.rating[newData.rating.length - 1].rating;

    const rankingRef = admin.firestore().doc(`userFeedback/${context.params.docId}`);

    const rankings = newData.ranking;
    const currentCount = rankings[newRating];
    rankings[newRating] = currentCount + 1;

    const totalRatings = newData.rating.length;
    const sumRatings = newData.rating.reduce((sum, { rating }) => sum + rating, 0);
    const averageRating = (sumRatings / totalRatings).toFixed(1); 

    await rankingRef.update({
      [`ranking.${newRating}`]: admin.firestore.FieldValue.increment(1),
      stars: averageRating,
    });
  });



