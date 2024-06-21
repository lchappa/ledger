import React, { useState } from 'react';
import { View, Button, Modal, TextInput, Text } from 'react-native';
import { updateBalance } from './firebaseFunctions'; // Assurez-vous d'importer correctement la fonction updateBalance

const TransactionComponent = ({ userId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [selectedAction, setSelectedAction] = useState('');

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
      await updateBalance(userId, action, parseInt(amount));
      setModalVisible(false);
      setAmount('');
      setCurrency('');
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

    {selectedAction === 'add' && <Button title="Valider" onPress={() => handleSubmit('add')} />}
    {selectedAction === 'transfer' && <Button title="Valider" onPress={() => handleSubmit('transfer')} />}
    {selectedAction === 'withdraw' && <Button title="Valider" onPress={() => handleSubmit('withdraw')} />}
  </View>
</Modal>
    </View>
  );
};

export default TransactionComponent;
