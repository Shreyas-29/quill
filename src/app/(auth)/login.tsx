import { auth } from '@/lib/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Link, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Login = () => {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const handlSubmit = async () => {
        setIsLoading(true);
        if (email && password) {
            try {
                const credentials = await signInWithEmailAndPassword(auth, email, password);

                // Store the token in local storage
                await AsyncStorage.setItem("quill_user_token", credentials.user?.refreshToken);

                ToastAndroid.show("You are Logged In! 🎉", ToastAndroid.SHORT);
                router.push("/home");
                setEmail("");
                setPassword("");
            } catch (error) {
                console.log("Login Error: ", error);
                ToastAndroid.show("Could not login, Please check your credentials.", ToastAndroid.SHORT);
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
                            Sign In
                        </Text>
                        <Text className='text-base mt-1 font-[Regular] text-gray-600 text-center'>
                            Access to your account
                        </Text>
                    </View>

                    <View className='flex items-center justify-center w-full gap-6 mt-8'>
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
                                className='w-full py-3 px-4 mt-2 bg-gray-100 text-base to-blue-500 rounded-lg text-gray-700 font-[Regular] normal-case'
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
                                        Login
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                        <View className='flex items-center'>
                            <Text className='text-center text-base text-gray-700 font-[Regular]'>
                                Already have an account? {" "}
                                <Link href={"/(auth)/register"}>
                                    <Text className='font-[SemiBold] text-blue-500'>
                                        Register
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

export default Login
