import useAuth from '@/hooks/useAuth';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Welcome = () => {

    const { user } = useAuth();

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <StatusBar animated hideTransitionAnimation='slide' style='dark' />

            <View className='relative flex-col items-center justify-center'>
                <View className='flex-col items-center justify-center pt-60'>
                    <Image source={require("@/public/icon.png")} className='object-cover w-20 h-20' />
                    <Text className='text-gray-900 font-[Logo] my-1 text-[48px]'>
                        qui
                        <Text className='text-blue-500 font-[Logo] text-[48px]'>
                            ll
                        </Text>
                    </Text>
                </View>

                <View className='flex-col items-center justify-center w-full px-5 mt-14'>
                    <Text className='text-3xl text-center font-[SemiBold]'>
                        News from around the world for you
                    </Text>
                    <Text className='text-lg text-center font-[Regular] mt-4 text-gray-600'>
                        Stay connected with the world through daily updates and trending stories.
                    </Text>
                    <Link href={user ? "/home" : "/(auth)/login"} asChild className='w-full mt-4'>
                        <TouchableOpacity className='w-full py-2.5 mx-auto bg-blue-500 rounded-full shadow-xl shadow-blue-400'>
                            <Text className='text-white font-[Medium] text-lg text-center'>
                                {user ? "Start Reading" : "Get Started"}
                            </Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Welcome
