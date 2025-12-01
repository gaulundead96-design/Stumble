import { db } from '../firebase';
import {
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    serverTimestamp
} from 'firebase/firestore';

export const saveVisit = async (userId, siteUrl, topic) => {
    try {
        await addDoc(collection(db, 'users', userId, 'history'), {
            url: siteUrl,
            topic: topic || 'random',
            timestamp: serverTimestamp()
        });
    } catch (error) {
        console.error("Error saving visit: ", error);
    }
};

export const subscribeToHistory = (userId, callback) => {
    const q = query(
        collection(db, 'users', userId, 'history'),
        orderBy('timestamp', 'desc'),
        limit(20)
    );

    return onSnapshot(q, (snapshot) => {
        const history = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(history);
    });
};
