import useArticle from '@/hooks/useArticle';
import { Article as ArticleProps } from '@/types/article';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Share, ToastAndroid } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

const Article = () => {

    const navigation = useNavigation();

    const params = useLocalSearchParams();

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleShare = async () => {
        try {
            await Share.share({
                title: 'Quill',
                message: 'Check out this article from quill: ' + params?.title + ' ' + params?.url,
            });
        } catch (error) {
            console.log(error);
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        }
    };

    const handleLike = async () => {
        try {
            const likeState = await AsyncStorage.getItem(`likeState-${params?.url}`) || 'false';
            const newLikeState = likeState === 'true' ? 'false' : 'true';
            await AsyncStorage.setItem(`likeState-${params?.url}`, newLikeState);
            setIsLiked(newLikeState === 'true');

            // Get liked articles
            const likedArticles = await AsyncStorage.getItem('likedArticles') || '[]';

            // Parse the stored articles
            const parsedLikedArticles = JSON.parse(likedArticles);

            // Check if the article is already liked
            const existingIndex = parsedLikedArticles.findIndex((a: any) => a.url === params?.url);

            if (existingIndex !== -1) {
                // Remove article if already liked
                parsedLikedArticles.splice(existingIndex, 1);
            } else {
                // Add article if not liked
                parsedLikedArticles.push(params ?? {});
            }

            // Save updated liked articles
            await AsyncStorage.setItem('likedArticles', JSON.stringify(parsedLikedArticles));

            // Update like state
            setIsLiked(existingIndex === -1);
        } catch (error) {
            console.log(error);
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        }
    };


    useEffect(() => {
        const getLikeState = async () => {
            try {
                // Get like state
                const likeState = await AsyncStorage.getItem(`likeState-${params?.url}`) || 'false';
                setIsLiked(likeState === 'true');
            } catch (error) {
                console.log(error);
                ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
            }
        };

        getLikeState();
    }, [params?.url]);

    if (!params?.url) {
        return (
            <View className='items-center justify-center flex-1 bg-white'>
                <Text className='text-xl font-[SemiBold] text-gray-700'>
                    No article found
                </Text>
                <TouchableOpacity className='flex-row items-center justify-center px-6 py-3 mt-4 bg-blue-500 rounded-lg' onPress={() => navigation.goBack()}>
                    <Text className='text-blue-50 text-base font-[SemiBold]'>
                        Go home
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView className='relative flex-1 h-full bg-white'>
            {/* Header */}
            <View className='flex-row items-center justify-between w-full py-2'>
                <View className='flex-row items-center'>
                    <TouchableOpacity className='flex-row items-center justify-center w-10 h-10 mt-1 ml-2 rounded-full' onPress={() => navigation.goBack()}>
                        <Ionicons name="close-outline" size={28} color="#374151" />
                    </TouchableOpacity>
                </View>
                <View className='flex-row items-center mr-4'>
                    <TouchableOpacity className='flex-row items-center justify-center w-10 h-10 ml-2 rounded-full' onPress={handleShare}>
                        <Ionicons name="share-social-outline" size={24} color="#374151" />
                    </TouchableOpacity>
                    <TouchableOpacity className='flex-row items-center justify-center w-10 h-10 ml-2 rounded-full' onPress={handleLike}>
                        <Ionicons
                            name={isLiked ? "heart" : "heart-outline"}
                            size={24}
                            color={isLiked ? "#f43f5e" : "#374151"}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Webview */}
            {isLoading && (
                <ActivityIndicator size="large" color="#374151" className='absolute top-0 bottom-0 left-0 right-0 z-50 bg-white/50' />
            )}
            <WebView
                source={{ uri: params?.url as string ?? "https://abcnews.go.com/International/wireStory/china-intelligence-agency-detained-individual-accused-collecting-secrets-106186997" }}
                style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#fff' }}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                cacheMode='LOAD_CACHE_ELSE_NETWORK'
                javaScriptEnabled={false}
            />
        </SafeAreaView>
    )
}

export default Article