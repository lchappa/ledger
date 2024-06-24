import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Assistance = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Besoin d'aide?</Text>
      <TextInput
        style={styles.input}
        placeholder="Écrivez votre problème ici meme si on ne peut pas vous aidez"
        multiline={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 100,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
});

export default Assistance;
