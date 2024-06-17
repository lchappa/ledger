import React, { useEffect } from 'react';
import { View, Text, ScrollView, Animated ,Button, Image, Dimensions, FlatList} from 'react-native';
import { logo1, logo2, logo3, logo4, logo5, logo6} from './logos';
import { Link } from 'expo-router';

  const logos = [logo1, logo2, logo3, logo4, logo5, logo6]; // Ajoutez vos logos ici
  const logoWidth = 100; // Largeur d'un logo
  const spacing = 20; // Espacement entre les logos
  const windowsWidth = Dimensions.get('window').width;

const HomePage = () => {
  // Animation pour la barre défilante
    const scrollX = new Animated.Value(Dimensions.get('window').width);

    const commentaires = [
      { id: 1, auteur: 'Utilisateur 1', contenu: 'Super application !' },
      { id: 2, auteur: 'Utilisateur 2', contenu: 'J\'adore cette fonctionnalité !' },
      { id: 3, auteur: 'Utilisateur 3', contenu: 'Très utile, merci !' },
    ];

    useEffect(() => {
        Animated.loop(
            Animated.timing(scrollX, {
                toValue: -Dimensions.get('window').width + (logos.length),
                duration: 3000 * logos.length,
                useNativeDriver: false,
            })
        ).start();
    }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Disclaimer en haut */}
      <View style={{ backgroundColor: 'yellow', padding: 10 }}>
        <Text>Attention aux attaques par hameçonnage. Ledger ne vous demandera jamais les 24 mots de votre phrase de récupération. Ne les partagez jamais.</Text>
      </View>

      {/* Barre de navigation avec des boutons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
        <Link href="/signin">Sign In</Link>
        <Button title="Page 1" onPress={() => navigateToPage1()} />
        <Button title="Page 2" onPress={() => navigateToPage2()} />
        <Button title="Page 3" onPress={() => navigateToPage3()} />
        {/* Ajoutez d'autres boutons pour les autres pages */}
      </View>

      {/* Contenu central */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: 40 }}>Ledger</Text>
      </View>


      {/* Barre défilante de logos */}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            {logos.map((logo, index) => (
                <Animated.View
                    key={index}
                    style={{
                        transform: [{ translateX: scrollX }],
                        position: 'absolute',
                        right: index * (logoWidth + spacing),
                    }}
                >
                    <Image
                        source={logo}
                        style={{ width: logoWidth, height: 100 }}
                    />
                </Animated.View>
            ))}
        </View>
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
    </View>
  );
}


export default HomePage;
