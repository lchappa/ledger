import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import {useLocalSearchParams} from "expo-router";

export default function Myledger() {
    const { uid } = useLocalSearchParams();
    return (
        <View>
            <Text>Welcome user (myledger) {uid}</Text>
        </View>
    );
}
