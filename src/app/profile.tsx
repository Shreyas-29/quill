import useAuth from '@/hooks/useAuth'
import { auth } from '@/lib/firebase'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import { signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { Image, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {

    const { user } = useAuth();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleLogout = async () => {
        try {

            // Perform logout actions
            await signOut(auth);

            // Remove the token from local storage
            await AsyncStorage.removeItem("quill_user_token");

            ToastAndroid.show("You are Logged Out!", ToastAndroid.SHORT);
        } catch (error) {
            console.log('Error signing out', error);
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        }
    };

    const handleToggle = () => {
        setIsOpen(true);
    };

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <StatusBar style='dark' backgroundColor={isOpen ? 'rgba(0,0,0,0.5)' : '#fff'} />
            <View className='flex-col items-center justify-center flex-1 w-full px-4 pt-4'>
                <View className='flex-row items-start w-full'>
                    <Text className='text-xl font-[SemiBold] text-gray-900 mt-2'>
                        Profile
                    </Text>
                </View>

                <View className='flex-col items-center justify-start w-full mt-8'>
                    <View className='flex-col items-center justify-start w-full mx-auto'>
                        {user?.photoURL ? (
                            <Image source={{ uri: user?.photoURL! }} className='rounded-full w-28 h-28' />
                        ) : (
                            <Image source={require("@/public/boy2.png")} className='object-cover rounded-full w-28 h-28' />
                        )}
                        <Text className='text-xl mt-3 font-[SemiBold] text-gray-900 text-center'>
                            {user?.displayName}
                        </Text>
                        <Text className='text-base mt- font-[Regular] text-gray-900 text-center'>
                            {user?.email}
                        </Text>
                    </View>
                </View>

                <View className='flex-col items-center justify-start flex-1 w-full gap-3 pt-16'>
                    <TouchableOpacity className='flex-row items-center justify-start w-full px-4 py-3 rounded-lg'>
                        <Ionicons name="ios-person-outline" size={24} color="#374151" />
                        <Text className='text-base ml-4 font-[Regular] text-gray-900'>
                            Edit profile
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-row items-center justify-start w-full px-4 py-3 rounded-lg'>
                        <Ionicons name="ios-language-outline" size={24} color="#374151" />
                        <Text className='text-base ml-4 font-[Regular] text-gray-900'>
                            Language options
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-row items-center justify-start w-full px-4 py-3 rounded-lg'>
                        <Ionicons name="ios-sunny-outline" size={24} color="#374151" />
                        <Text className='text-base ml-4 font-[Regular] text-gray-900'>
                            Theme
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-row items-center justify-start w-full px-4 py-3 rounded-lg'>
                        <Ionicons name="ios-lock-open-outline" size={24} color="#374151" />
                        <Text className='text-base ml-4 font-[Regular] text-gray-900'>
                            Privacy policy
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-row items-center justify-start w-full px-4 py-3 rounded-lg' onPress={handleToggle}>
                        <Ionicons name="ios-log-out-outline" size={24} color="#374151" />
                        <Text className='text-base ml-4 font-[Regular] text-gray-900'>
                            Sign out
                        </Text>
                    </TouchableOpacity>
                </View>

                <AwesomeAlert
                    show={isOpen}
                    showProgress={false}
                    title='Logout'
                    message='Are you sure you want to logout?'
                    closeOnTouchOutside={true}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText='Cancel'
                    confirmText='Logout'
                    confirmButtonColor='#DD6B55'
                    onCancelPressed={() => setIsOpen(false)}
                    onConfirmPressed={handleLogout}
                    cancelButtonStyle={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, backgroundColor: '#e5e7eb' }}
                    cancelButtonTextStyle={{ fontFamily: 'Medium', color: '#374151' }}
                    confirmButtonStyle={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, backgroundColor: '#ef4444' }}
                    confirmButtonTextStyle={{ fontFamily: 'Medium', color: '#fff' }}
                    // alertContainerStyle={{ borderRadius: 16, paddingHorizontal: 16, paddingVertical: 10 }}
                    contentContainerStyle={{ borderRadius: 12, paddingHorizontal: 24, paddingVertical: 16 }}
                    actionContainerStyle={{ marginTop: 16, marginLeft: 'auto' }}
                    titleStyle={{ fontFamily: 'Medium', color: '#374151', marginLeft: -16, marginRight: 'auto' }}
                    messageStyle={{ fontFamily: 'Regular', color: '#4b5563', marginTop: 0 }}
                    contentStyle={{ padding: 4 }}
                    overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                />
            </View>
        </SafeAreaView>
    )
}

export default Profile