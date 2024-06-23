import React, { useState } from 'react';
import { View, Button, Modal, TextInput } from 'react-native';
import { updateBalance } from './firebaseFunctions2'; // Assurez-vous d'importer correctement la fonction updateBalance

const TransactionComponent = ({ userId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleDeposit = () => {
    setSelectedAction('add');
    setModalVisible(true);
  };

  const handleTransfer = () => {
    setSelectedAction('transfer');
    setModalVisible(true);
  };

  const handleWithdraw = () => {
    setSelectedAction('withdraw');
    setModalVisible(true);
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
        </View>
      </Modal>
    </View>
  );
};

export default TransactionComponent;
