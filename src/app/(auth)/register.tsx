import { auth } from '@/lib/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Register = () => {

    const { currentUser } = getAuth();

    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            router.push("/home");
        }
    }, [currentUser]);

    const handlSubmit = async () => {
        setIsLoading(true);
        if (email && password && name) {
            try {
                const credentials = await createUserWithEmailAndPassword(auth, email, password);

                // Update user profile with name
                await updateProfile(credentials.user, { displayName: name });

                // Store the token in local storage
                await AsyncStorage.setItem("quill_user_token", credentials.user?.refreshToken);

                ToastAndroid.show("You are Registered! 🎉", ToastAndroid.SHORT);
                router.push("/home");
                setName("");
                setEmail("");
                setPassword("");
            } catch (error: any) {
                if (error.code === "auth/weak-password") {
                    // Handle weak password error
                    ToastAndroid.show("Password should be at least 6 characters", ToastAndroid.SHORT);
                } else if (error.code === "auth/invalid-email") {
                    // Handle invalid email error
                    ToastAndroid.show("Invalid email address", ToastAndroid.SHORT);
                } else {
                    // Handle other errors
                    ToastAndroid.show("Could not register, Please try again.", ToastAndroid.SHORT);
                }
            } finally {
                setIsLoading(false);
            }
        } else {
            ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <StatusBar animated hideTransitionAnimation='fade' style='dark' />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} className='flex-1 w-full h-full'>
                <View className='flex-col items-center justify-center'>
                    <View className='flex-col items-center justify-center'>
                        <Image source={require("@/public/icon.png")} className='object-cover w-16 h-16' />
                        <Text className='text-2xl font-[Bold] text-gray-900 text-center mt-4'>
                            Register
                        </Text>
                        <Text className='text-base mt-1 font-[Regular] text-gray-600 text-center'>
                            Create an account to get started
                        </Text>
                    </View>

                    <View className='flex items-center justify-center w-full gap-6 mt-8'>
                        <View className='flex-col items-start w-full px-5'>
                            <Text className='text-sm font-[Medium] text-gray-600 ml-1 text-start'>
                                Name
                            </Text>
                            <TextInput
                                value={name}
                                keyboardType='name-phone-pad'
                                placeholder='Enter your name'
                                placeholderTextColor='#6b7280'
                                onChangeText={(value) => setName(value)}
                                className='w-full py-3 px-4 mt-2 bg-gray-100 text-base rounded-lg text-gray-700 font-[Regular]'
                            />
                        </View>
                        <View className='flex-col items-start w-full px-5'>
                            <Text className='text-sm font-[Medium] text-gray-600 ml-1 text-start'>
                                Email
                            </Text>
                            <TextInput
                                value={email}
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                placeholder='Enter your email'
                                placeholderTextColor='#6b7280'
                                onChangeText={(value) => setEmail(value)}
                                className='w-full py-3 px-4 mt-2 bg-gray-100 text-base to-blue-500 rounded-lg text-gray-700 font-[Regular]'
                            />
                        </View>
                        <View className='flex-col items-start w-full px-5'>
                            <Text className='text-sm font-[Medium] text-gray-600 ml-1 text-start'>
                                Password
                            </Text>
                            <TextInput
                                value={password}
                                secureTextEntry
                                placeholder='Enter your password'
                                placeholderTextColor='#6b7280'
                                onChangeText={(value) => setPassword(value)}
                                className='w-full py-3 px-4 mt-2 bg-gray-100 to-gray-600 text-base rounded-lg text-gray-700 font-[Regular]'
                            />
                        </View>
                        <View className='flex items-center w-full px-4 pt-2'>
                            <TouchableOpacity className='flex items-center justify-center w-full py-3 bg-blue-500 rounded-lg' onPress={handlSubmit}>
                                {isLoading ? (
                                    <ActivityIndicator size={20} color="#fff" className='my-[2px]' />
                                ) : (
                                    <Text className='text-white font-[SemiBold] text-base mx-auto'>
                                        Register
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                        <View className='flex items-center'>
                            <Text className='text-center text-base text-gray-700 font-[Regular]'>
                                Already have an account? {" "}
                                <Link href={"/(auth)/login"}>
                                    <Text className='font-[SemiBold] text-blue-500'>
                                        Login
                                    </Text>
                                </Link>
                            </Text>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Register