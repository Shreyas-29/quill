import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';
import { Container, Header, Hero } from '../components';

const Home = () => {
    return (
        <SafeAreaView className='flex-1 h-full bg-white'>
            <StatusBar animated style='dark' translucent />
            <LinearGradient
                colors={['#bfdbfe', '#fff']}
                start={[0, 0]}
                end={[1, 1.2]}
                locations={[0, 0.3]}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    height: '100%',
                    opacity: 0.3,
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false} className='flex-1 h-full'>
                <Header />
                <Hero />
                <Container />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home
