import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Animated , Image, Dimensions, FlatList, TouchableOpacity, Button, StyleSheet} from 'react-native';
import { logo1, logo2, logo3, logo4, logo5, logo6} from './logos';
import { Link } from 'expo-router';
import CommentairesSection from './CommentairesComponent';
import { useNavigation } from '@react-navigation/native';


const logos = [logo1, logo2, logo3, logo4, logo5, logo6];
const logoWidth = 100;
const spacing = 20;
const windowWidth = Dimensions.get('window').width;

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
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);


  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const navigateToProduct = (productName) => {
    setDropdownVisible(false);
    navigation.navigate(productName);
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: -windowWidth + logos.length * (logoWidth + spacing),
        duration: 3000 * logos.length,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: 'yellow', padding: 10 }}>
        <Text>Attention aux attaques par hameçonnage. Ledger ne vous demandera jamais les 24 mots de votre phrase de récupération. Ne les partagez jamais. :)</Text>
      </View>

      {/* Barre de navigation avec des boutons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10 }}>

        <Link href="/signin">Sign In</Link>

        <TouchableOpacity onPress={toggleDropdown} style={styles.navButton}>
          <Text style={styles.navButtonText}>Products</Text>
                {/* Dropdown */}
                {dropdownVisible && (
                  <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 1 }}>
                    <TouchableOpacity onPress={() => navigateToProduct('products')} style={styles.dropdownItem}>
                      <Text style={styles.dropdownItemText}>Product 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToProduct('product2')} style={styles.dropdownItem}>
                      <Text style={styles.dropdownItemText}>Product 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToProduct('product3')} style={styles.dropdownItem}>
                      <Text style={styles.dropdownItemText}>Product 3</Text>
                    </TouchableOpacity>
                  </View>
                )}
        </TouchableOpacity>

        <Button title="Page 1" onPress={() => { /* Navigation vers la page 1 */ }} />
        <Button title="Page 2" onPress={() => { /* Navigation vers la page 2 */ }} />
        <Button title="assistance" onPress={() => { navigateToProduct('assistance') }} />

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
};

const styles = StyleSheet.create({
  navButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    width: 120,
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
dropdown: {
  position: 'absolute',
  top: '11%', // Ajustement pour centrer verticalement
  left: '13.7%', // Ajustement pour déplacer vers la droite
  transform: 'translateX(-50%)', // Pour centrer horizontalement
  backgroundColor: 'white',
  zIndex: 1000,
  margin: 5,
  width: '100px',
  alignItems: 'center',
},
  dropdownItem: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: '#007BFF',
    width: '100%',
  },
  dropdownItemText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomePage;
