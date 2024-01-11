import useAuth from '@/hooks/useAuth';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import NotificationModal from './NotificationModal';

const Header = () => {

    const { user } = useAuth();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <View className='relative'>
            <View className='flex-col'>
                <View className='flex-row items-center justify-between w-full px-5 mt-4 mb-6'>
                    <View className='flex-1'>
                        <TouchableOpacity className='flex-row items-center gap-3'>
                            <Image source={require("@/public/boy2.png")} className='w-10 h-10 rounded-full' alt='s' />
                            <View className='flex-col items-start'>
                                <Text className='font-[Regular] text-gray-600 text-sm'>
                                    Welcome,
                                </Text>
                                <Text className='font-[SemiBold] text-gray-900 text-base -mt-0.5'>
                                    {user && (user.displayName ?? user?.email)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className='flex-row'>
                        <TouchableOpacity className='flex-row items-center justify-center w-12 h-12 bg-white border rounded-full border-slate-200/50' onPress={() => setIsOpen(true)}>
                            <Ionicons name='ios-notifications-outline' size={24} color="#1f2937" className='to-gray-800' />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='flex-row items-center justify-center w-full px-8 mb-6'>
                    <View className='relative flex-row items-center py-3 pl-4 pr-4 bg-white border rounded-xl border-slate-200 shadow-3xl shadow-blue-200'>
                        <Ionicons name='ios-search-outline' size={24} color="#374151" className='to-slate-800' />
                        <TextInput
                            placeholder='Search for news'
                            className='w-full text-base pl-2 pr-4 text-gray-800 font-[Regular]'
                        />
                    </View>
                </View>
            </View>
            <NotificationModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </View>
    )
}

export default Header