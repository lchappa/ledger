import React, { useEffect } from 'react';
import { View, Text, ScrollView, Animated ,Button, Image, Dimensions, FlatList} from 'react-native';
import { logo1, logo2, logo3, logo4, logo5, logo6} from './logos';
import { Link } from 'expo-router';
import CommentairesSection from './CommentairesComponent';

  const logos = [logo1, logo2, logo3, logo4, logo5, logo6]; // Ajoutez vos logos ici
  const logoWidth = 100; // Largeur d'un logo
  const spacing = 20; // Espacement entre les logos
  const windowsWidth = Dimensions.get('window').width;

const HomePage = () => {
  // Animation pour la barre défilante
    const scrollX = new Animated.Value(Dimensions.get('window').width);

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
     <View style={{ flex: 1 }}>
           <CommentairesSection />
         </View>
    </View>
  );
}


export default HomePage;
