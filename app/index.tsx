import React, { useEffect } from 'react';
import { View, Text, ScrollView, Animated ,Button, Image, Dimensions} from 'react-native';
import { logo1, logo2, logo3, logo4, logo5, logo6} from './logos';

  const logos = [logo1, logo2, logo3, logo4, logo5, logo6]; // Ajoutez vos logos ici
  const logoWidth = 100; // Largeur d'un logo
  const spacing = 20; // Espacement entre les logos

const HomePage = () => {
  // Animation pour la barre défilante
    const scrollX = new Animated.Value(Dimensions.get('window').width);



  // Fonctions pour naviguer vers d'autres pages
  const navigateToPage1 = () => {
    // Navigation vers la page 1
  }

  const navigateToPage2 = () => {
    // Navigation vers la page 2
  }

  const navigateToPage3 = () => {
    // Navigation vers la page 3
  }

  // Tableau de logos à afficher

    useEffect(() => {
        Animated.loop(
            Animated.timing(scrollX, {
                toValue: -logos.length * (logoWidth + spacing),
                duration: 5000 * logos.length,
                useNativeDriver: false,
            })
        ).start();
    }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Disclaimer en haut */}
      <View style={{ backgroundColor: 'yellow', padding: 10 }}>
        <Text>Disclaimer Text</Text>
      </View>

      {/* Barre de navigation avec des boutons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
        <Button title="Page 1" onPress={() => navigateToPage1()} />
        <Button title="Page 2" onPress={() => navigateToPage2()} />
        <Button title="Page 3" onPress={() => navigateToPage3()} />
        {/* Ajoutez d'autres boutons pour les autres pages */}
      </View>

      {/* Contenu central */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Texte au Centre</Text>
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
        
    </View>
  );
}


export default HomePage;
