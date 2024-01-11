import { Item } from '@/components';
import { Article } from '@/types/article';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, ToastAndroid, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-virtualized-view';


interface ItemProps {
    item: Article;
    index: number;
}

const Favourite = () => {

    const navigation = useNavigation();

    const [likedArticles, setLikedArticles] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchLikedArticles = async () => {
        setIsLoading(true);
        try {
            const likedArticlesJson = await AsyncStorage.getItem('likedArticles') || '[]';
            const parsedLikedArticles = JSON.parse(likedArticlesJson);
            setLikedArticles(parsedLikedArticles);
        } catch (error) {
            console.log('Error getting liked articles', error);
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        } finally {
            setIsLoading(false);
        }
    };

    const handlNavigation = (item: any) => {
        // @ts-ignore
        navigation.navigate('article', item);
    };

    const handleRefresh = () => {
        fetchLikedArticles();
    };

    useEffect(() => {
        fetchLikedArticles();
    }, []);

    const renderItem = ({ item, index }: ItemProps) => {
        return (
            <Item
                item={item}
                isLoading={isLoading}
                onPress={() => handlNavigation(item)}
            />
        )
    };


    return (
        <SafeAreaView className='relative flex-1 bg-white'>
            <StatusBar animated style='dark' />
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}
                className='flex-1'
            >
                <View className='flex-col items-start justify-center flex-1 w-full p-4'>
                    <Text className='text-xl font-[SemiBold] text-gray-900 mt-2'>
                        Favourite Articles
                    </Text>

                    <View className='flex-col items-center justify-center flex-1 w-full pb-12 mt-4'>
                        {isLoading && (
                            <View className='absolute top-0 bottom-0 left-0 right-0 flex-col items-center justify-center'>
                                <ActivityIndicator color='#1f2937' size='large' />
                            </View>
                        )}
                        <View className='-ml-4'>
                            <FlatList
                                data={likedArticles}
                                decelerationRate='fast'
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => renderItem({ item, index })}
                            />
                        </View>
                        {!isLoading && likedArticles.length === 0 && (
                            <View className='flex-col items-center justify-center flex-1 h-full mt-4'>
                                <Text className='text-lg font-[SemiBold] text-gray-700 mt-2'>
                                    No articles found.
                                </Text>
                                <Text className='text-base text-center text-gray-600 font-[Regular] mt-2'>
                                    or you can try to refresh the page.
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Favourite