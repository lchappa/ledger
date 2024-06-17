import React from 'react';
import { View, Text, FlatList } from 'react-native';

const CommentairesSection = () => {
  const commentaires = [
    { id: 1, auteur: 'Utilisateur 1', contenu: 'Super application !' },
    { id: 2, auteur: 'Utilisateur 2', contenu: 'J\'adore cette fonctionnalité !' },
    { id: 3, auteur: 'Utilisateur 3', contenu: 'Très utile, merci !' },
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        horizontal
        data={commentaires}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, margin: 5, backgroundColor: '#f0f0f0', borderRadius: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.auteur}</Text>
            <Text>{item.contenu}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CommentairesSection;
