import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import {useLocalSearchParams} from "expo-router";

export default function Staking() {
    const { uid } = useLocalSearchParams();
    return (
        <View>
            <Text>Welcome user (staking) {uid}</Text>
        </View>
    );
}
