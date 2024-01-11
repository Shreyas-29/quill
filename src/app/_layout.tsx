import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, useNavigation } from 'expo-router';
import { ReactNode, useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '.';
import Home from './home';
import Login from './(auth)/login';
import Register from './(auth)/register';
import { Ionicons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import useAuth from '@/hooks/useAuth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Trending from './trending';
import { NavigationContainer } from '@react-navigation/native';
import Favourite from './favourite';
import Profile from './profile';
import { BlurView } from 'expo-blur';
import Article from './article';


const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default function RootLayout() {

    const navigation = useNavigation();

    const { user } = useAuth();

    const [loaded, error] = useFonts({
        "Light": require('../assets/fonts/DMSans-Light.ttf'),
        "Regular": require('../assets/fonts/DMSans-Regular.ttf'),
        "Medium": require('../assets/fonts/DMSans-Medium.ttf'),
        "SemiBold": require('../assets/fonts/DMSans-SemiBold.ttf'),
        "Bold": require('../assets/fonts/DMSans-Bold.ttf'),
        "ExtraBold": require('../assets/fonts/DMSans-ExtraBold.ttf'),
        "Logo": require("../assets/fonts/GrandHotel-Regular.ttf"),
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    if (user) {
        return (
            <Stack.Navigator>
                <Stack.Screen name="index" component={Welcome} options={{ headerShown: false }} />
                <Stack.Screen name="home" component={HomeStack} options={{ headerShown: false }} />
                <Stack.Screen name="article" component={Article} options={{
                    presentation: "modal",
                    headerStyle: {
                        backgroundColor: "#fff",
                    },
                    headerTitle: "",
                    header: () => null,
                }} />
            </Stack.Navigator>
        )
    } else {
        return (
            <Stack.Navigator>
                <Stack.Screen name="index" component={Welcome} options={{ headerShown: false }} />
                <Stack.Screen name="article" component={Article} options={{ headerShown: false }} />
                <Stack.Screen
                    name="(auth)/login"
                    component={Login}
                    options={{
                        headerStyle: {
                            backgroundColor: "#fff",
                        },
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: {
                            fontFamily: "SemiBold",
                            fontSize: 20,
                            color: "#374151"
                        },
                        presentation: "modal",
                        headerLeft: () => (
                            <TouchableOpacity className='flex-row items-center justify-center w-10 h-10 mt-1 ml-2 rounded-full bg-gray-10' onPress={() => navigation.goBack()}>
                                <Ionicons name="ios-close" size={24} color="#374151" />
                            </TouchableOpacity>
                        ),
                    }}
                />
                <Stack.Screen
                    name="(auth)/register"
                    component={Register}
                    options={{
                        headerStyle: {
                            backgroundColor: "#fff",
                        },
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerTitleStyle: {
                            fontFamily: "SemiBold",
                            fontSize: 20,
                            color: "#374151"
                        },
                        presentation: "modal",
                        headerLeft: () => (
                            <TouchableOpacity className='flex-row items-center justify-center w-10 h-10 mt-1 ml-2 rounded-full bg-gray-10' onPress={() => navigation.goBack()}>
                                <Ionicons name="ios-close" size={24} color="#374151" />
                            </TouchableOpacity>
                        ),
                    }}
                />
            </Stack.Navigator>
        )
    }
}

function HomeStack() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: true,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    height: 65,
                    position: 'absolute',
                    shadowColor: '#fff',
                    blurRadius: 50,
                },
                tabBarBackground: () => (
                    <BlurView tint="light" intensity={80} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.1)', }} />
                ),
                tabBarLabel: () => null,
                tabBarIcon: ({ focused }) => {
                    let pathname;

                    switch (route.name) {
                        case "Home":
                            pathname = focused ? require('../../public/icons/home-active.png') : require('../../public/icons/home.png');
                            break;
                        case "Trending":
                            pathname = focused ? require('../../public/icons/flash-active.png') : require('../../public/icons/flash.png');
                            break;
                        case "Favourite":
                            pathname = focused ? require('../../public/icons/heart-active.png') : require('../../public/icons/heart.png');
                            break;
                        case "Profile":
                            pathname = focused ? require('../../public/icons/user-active.png') : require('../../public/icons/user.png');
                            break;
                        default:
                            pathname = focused ? require('../../public/icons/home-active.png') : require('../../public/icons/home.png');
                            break;
                    }

                    return (
                        <>
                            <Image
                                source={(pathname)}
                                style={{ width: 24, height: 24, marginTop: 4 }}
                            />
                            <View style={{ height: 4, width: 4, borderRadius: 10, backgroundColor: focused ? "#3b82f6" : "", marginTop: 5 }} />
                        </>
                    );
                }
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Trending" component={Trending} options={{ headerShown: false }} />
            <Tab.Screen name="Favourite" component={Favourite} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}
