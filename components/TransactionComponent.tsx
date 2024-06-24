import React, { useState } from 'react';
import { View, Button, Modal, TextInput } from 'react-native';
import { updateBalance } from './firebaseFunctions2'; // Assurez-vous d'importer correctement la fonction updateBalance

const TransactionComponent = ({ userId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false); // Nouveau state pour gérer la visibilité du bouton de fermeture
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleDeposit = () => {
    setSelectedAction('add');
    setModalVisible(true);
    setShowCloseButton(true); // Afficher le bouton de fermeture

  };

  const handleTransfer = () => {
    setSelectedAction('transfer');
    setModalVisible(true);
        setShowCloseButton(true); // Afficher le bouton de fermeture

  };

  const handleWithdraw = () => {
    setSelectedAction('withdraw');
    setModalVisible(true);
        setShowCloseButton(true); // Afficher le bouton de fermeture

  };

  const handleSubmit = async (action) => {
    if (amount !== '') {
      if (action === 'transfer' && recipient === '') {
        alert('Veuillez entrer le nom du destinataire');
        return;
      }
      await updateBalance(userId, action, parseInt(amount), recipient);
      setModalVisible(false);
      setAmount('');
      setCurrency('');
      setRecipient('');
    }
    };
 const handleCloseModal = () => {
    setModalVisible(false);
    setShowCloseButton(false); // Cacher le bouton de fermeture
    setAmount('');
    setCurrency('');
    setRecipient('');
  };


  return (
    <View>
      <Button title="Déposer" onPress={handleDeposit} />
      <Button title="Transférer" onPress={handleTransfer} />
      <Button title="Retirer" onPress={handleWithdraw} />

      <Modal visible={modalVisible} animationType="slide">
        <View>
          <TextInput
            placeholder="Montant"
            value={amount}
            onChangeText={text => setAmount(text)}
          />
          <TextInput
            placeholder="Devise"
            value={currency}
            onChangeText={text => setCurrency(text)}
          />

          {selectedAction === 'transfer' && (
            <TextInput
              placeholder="ID du destinataire"
              value={recipient}
              onChangeText={text => setRecipient(text)}
            />
          )}

          <Button
            title="Valider"
            onPress={() => handleSubmit(selectedAction)}
          />
          {showCloseButton && ( // Afficher le bouton de fermeture conditionnellement
                      <Button title="Fermer" onPress={handleCloseModal} />
                    )}
        </View>
      </Modal>
    </View>
  );
};

export default TransactionComponent;
