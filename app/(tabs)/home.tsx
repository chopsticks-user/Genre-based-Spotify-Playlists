import { SafeAreaView, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import ScrollablePinCollection from '@/components/ScrollablePinCollection';

export default function Home() {
    return (
        <SafeAreaView>
            <ScrollablePinCollection />
        </SafeAreaView>
    );
}
