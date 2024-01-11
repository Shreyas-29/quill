import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import useAuth from '@/hooks/useAuth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Trending from '@/app/trending';
import Login from '@/app/(auth)/login';
import Home from '@/app/home';
import Welcome from '@/app/index';
import Register from '@/app/(auth)/register';
import Article from '@/app/article';

export {
    ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
    initialRouteName: 'index',
};

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="index" component={RootLayoutNav} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

function HomeStack() {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="article/[title]" component={Article} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function RootLayoutNav() {

    const { user } = useAuth();

    const Stack = createStackNavigator();

    const Tab = createBottomTabNavigator();

    const navigation = useNavigation();

    if (user) {
        return (
            <Stack.Navigator>
                <Tab.Navigator>
                    <Tab.Screen name="homestack" component={HomeStack} options={{ headerShown: false }} />
                    <Tab.Screen name="trending" component={Trending} options={{ headerShown: false }} />
                </Tab.Navigator>
            </Stack.Navigator>
        )
    } else {
        return (
            <Stack.Navigator>
                <Stack.Screen name="index" component={Welcome} options={{ headerShown: false }} />
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
                        headerTitle: "Register",
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
        );
    }
}