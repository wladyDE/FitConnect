/* eslint-disable */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteUnActiveTrainings = functions.pubsub.schedule('every 1 minutes').onRun(async (context) => {
  const now = admin.firestore.Timestamp.now();
  const userMarkersCollection = admin.firestore().collection('userMarkers');

  const snapshots = await userMarkersCollection.get();

  snapshots.forEach(async doc => {
    const markers = doc.data().markers;
    let updates = false;

    const updatedMarkers = markers.map(marker => {
      if (marker.trainingTime.seconds < now.seconds) {
        updates = true;
        return { ...marker, status: 'finished' };
      }
      return marker;
    });

    if (updates) {
      await userMarkersCollection.doc(doc.id).update({ markers: updatedMarkers });
    }
  });
});
