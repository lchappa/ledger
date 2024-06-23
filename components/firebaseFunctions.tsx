import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const updateBalance = async (userId, action, amount) => {
  if (typeof amount !== 'number' || amount <= 0) {
    console.error('Invalid amount:', amount);
    return;
  }

  const currentUser = auth().currentUser;
  if (!currentUser) {
    console.error('No authenticated user found');
    return;
  }

  const userRef = firestore().collection('users').doc(currentUser.uid);

  try {
    await firestore().runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists) {
        throw new Error('User document does not exist');
      }

      let currentBalance = userDoc.data().total_amount;

      if (action === 'add') {
        currentBalance += amount;
      } else if (action === 'withdraw') {
        currentBalance -= amount;
      } else if (action === 'transfer') {
        // Implement transfer logic to another account if needed
        // Example: transfer to another user's account
         const targetUserRef = firestore().collection('users').doc(targetUserId);
         const targetUserDoc = await transaction.get(targetUserRef);
         if (!targetUserDoc.exists) {
           throw new Error('Target user document does not exist');
         }
         let targetUserBalance = targetUserDoc.data().total_amount;
         currentBalance -= amount;
         targetUserBalance += amount;
         transaction.update(targetUserRef, { total_amount: targetUserBalance });
      } else {
        throw new Error('Invalid action');
      }

      transaction.update(userRef, { total_amount: currentBalance });
    });
  } catch (error) {
    console.error('Error updating balance:', error);
  }
};

export { updateBalance };