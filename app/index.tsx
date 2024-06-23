import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Animated , Image, Dimensions, FlatList, TouchableOpacity, Button, StyleSheet, Platform } from 'react-native';
import { Link } from 'expo-router';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'react-native-permissions'; // Import react-native-permissions
import CommentairesSection from './CommentairesComponent';
import { useNavigation } from '@react-navigation/native';
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

  const navigation = useNavigation();
  const [productDropdownVisible, setProductDropdownVisible] = useState(false);



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
          <TouchableOpacity onPress={() => navigateToProduct('signin')} style={styles.navButton}>
            <Text style={styles.navButtonText}>SignIn</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToProduct('userPage')} style={styles.navButton}>
            <Text style={styles.navButtonText}>UserPage</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToProduct('signup2')} style={styles.navButton}>
            <Text style={styles.navButtonText}>SignUp</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigateToProduct('assistance')} style={styles.navButton}>
            <Text style={styles.navButtonText}>Assistance</Text>
          </TouchableOpacity>
        </View>

        {/* Contenu central */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: 40, color: 'white' }}></Text>
        </View>



        {/* Section de commentaires */}
        <View style={{ flex: 1 }}>


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