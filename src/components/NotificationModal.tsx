import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NotificationModal = ({ isOpen, setIsOpen }: Props) => {
    return (
        <Modal
            visible={isOpen}
            animationType='slide'
            onRequestClose={() => setIsOpen(false)}
        >
            <View className='flex-col items-start justify-between w-full px-4 mt-4'>
                <View className='flex-col'>
                    <TouchableOpacity className='flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full' onPress={() => setIsOpen(false)}>
                        <Ionicons name='ios-close' size={24} color="#374151" />
                    </TouchableOpacity>
                </View>
                <View className='flex-col items-start mt-4 ml-2'>
                    <Text className='font-[SemiBold] text-lg text-gray-900'>
                        Notifications
                    </Text>
                    <Text className='font-[Regular] text-base text-gray-600 mt-2'>
                        You have no new notifications
                    </Text>
                </View>
            </View>
        </Modal>
    )
}

export default NotificationModal