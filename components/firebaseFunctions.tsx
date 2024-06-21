import firestore from '@react-native-firebase/firestore';

const updateBalance = async (userId, action, amount) => {
  const userRef = firestore().collection('users').doc(auth().currentUser?.uid);

  let userDoc = await userRef.get();
  let currentBalance = userDoc.data().total_amount;

  if (action === 'add') {
    currentBalance += amount;
  } else if (action === 'withdraw') {
    currentBalance -= amount;
  } else if (action === 'transfer') {
    // Mettre en place la logique de transfert vers un autre compte si nécessaire
  }

  await userRef.update({ total_amount: currentBalance });
};

export { updateBalance };
