import { Tabs } from 'expo-router';
import {TabBarIcon} from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
    return (
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "#6E308F",
                    headerShown: false,
            }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Wallet",
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={"wallet"} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="staking"
                    options={{
                        title: "Staking",
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={"trending-up"} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="myledger"
                    options={{
                        title: "My Ledger",
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={"key"} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: "Settings",
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={"settings"} color={color} />
                        ),
                    }}
                />
            </Tabs>
    );
}
