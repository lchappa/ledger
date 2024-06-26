import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'Accueil',
                        title: ""
                    }}
                />
                <Drawer.Screen
                    name="signin"
                    options={{
                        drawerLabel: 'Connexion',
                        title: ""
                    }}
                />
                <Drawer.Screen
                    name="signup"
                    options={{
                        drawerLabel: 'Inscription',
                        title: ""
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
