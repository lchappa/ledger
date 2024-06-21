import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Animated , Image, Dimensions, FlatList, TouchableOpacity, Button, StyleSheet, Platform } from 'react-native';
import { logo1, logo2, logo3, logo4, logo5, logo6} from './logos';
import { Link } from 'expo-router';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'react-native-permissions'; // Import react-native-permissions
import CommentairesSection from './CommentairesComponent';
import { useNavigation } from '@react-navigation/native';


const logos = [logo1, logo2, logo3, logo4, logo5, logo6];
const logoWidth = 100;
const spacing = 20;
const windowWidth = Dimensions.get('window').width;

const HomePage = () => {

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.request(Permissions.NOTIFICATIONS); // Request notification permission

    if (status !== 'granted') {
      alert('Permission to receive notifications was denied');
      return;
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // Get the token that identifies this device
    let token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  };











  // Animation pour la barre défilante
    const scrollX = new Animated.Value(Dimensions.get('window').width);

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: -windowWidth + (logos.length * (logoWidth + spacing) )* -1,
        duration: 3000 * logos.length,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const navigation = useNavigation();
  const [productDropdownVisible, setProductDropdownVisible] = useState(false);
  const [appServicesDropdownVisible, setAppServicesDropdownVisible] = useState(false);

  const toggleProductDropdown = () => {
    setProductDropdownVisible(!productDropdownVisible);
    setAppServicesDropdownVisible(false); // Close the other dropdown
  };

  const toggleAppServicesDropdown = () => {
    setAppServicesDropdownVisible(!appServicesDropdownVisible);
    setProductDropdownVisible(false); // Close the other dropdown
  };

  const navigateToProduct = (productName) => {
    // setDropdownVisible(false); // Assuming this was a typo and should be setProductDropdownVisible(false)
    setProductDropdownVisible(false);
    navigation.navigate(productName);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ backgroundColor: 'yellow', padding: 10 }}>
        <Text>Attention aux attaques par hameçonnage. Ledger ne vous demandera jamais les 24 mots de votre phrase de récupération. Ne les partagez jamais. :)</Text>
      </View>

      {/* Barre de navigation avec des boutons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10 }}>
        <TouchableOpacity onPress={() => navigateToProduct('index')} style={styles.navButton}>
          <Text style={styles.navButtonText}>[ LEDGER ]</Text>
        </TouchableOpacity>

        <Link href="/signin" style={styles.navButtonText} >Sign In</Link>



        <View style={{ position: 'relative' }}>
          <TouchableOpacity onPress={toggleProductDropdown} style={styles.navButton}>
            <Text style={styles.navButtonText}>Produits</Text>
            {/* Dropdown */}
            {productDropdownVisible && (
              <View style={styles.dropdownContainer}>
                <TouchableOpacity onPress={() => navigateToProduct('LedgerStax')} style={styles.dropdownItem}>
                  <Text style={styles.dropdownItemText}>Ledger Stax</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToProduct('LedgerNanoX')} style={styles.dropdownItem}>
                  <Text style={styles.dropdownItemText}>Ledger Nano X</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToProduct('LedgerNanoSPlus')} style={styles.dropdownItem}>
                  <Text style={styles.dropdownItemText}>Ledger Nano S Plus</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ position: 'relative' }}>
          <TouchableOpacity onPress={toggleAppServicesDropdown} style={styles.navButton}>
            <Text style={styles.navButtonText}>Applications & Services</Text>
            {/* Dropdown */}
            {appServicesDropdownVisible && (
              <View style={styles.dropdownContainer}>
                <TouchableOpacity onPress={() => navigateToProduct('LedgerLive')} style={styles.dropdownItem}>
                  <Text style={styles.dropdownItemText}>Ledger Live</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToProduct('CryptoPrices')} style={styles.dropdownItem}>
                  <Text style={styles.dropdownItemText}>Prix des Cryptos</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </View>


        <TouchableOpacity onPress={() => navigateToProduct('assistance')} style={styles.navButton}>
          <Text style={styles.navButtonText}>Assistance</Text>
        </TouchableOpacity>
      </View>

      {/* Contenu central */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: 40, color: 'white' }}></Text>
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

      {/* Section de commentaires */}
      <View style={{ flex: 1 }}>
              <Link href="/userPage" style={styles.navButtonText}>User</Link>
        <Link href="/signup" style={styles.navButtonText} >Sign Up</Link>

        <CommentairesSection />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navButton: {
    position: 'relative',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    width: 190,
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%', // Positionner en dessous du bouton
    left: 0,
    backgroundColor: 'black',
    zIndex: 1000,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  dropdownItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'black',
    width: '100%',
  },
  dropdownItemText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
  },
});

export default HomePage;
