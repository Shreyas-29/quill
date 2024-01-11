import { Item } from '@/components';
import { Article } from '@/types/article';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


interface ItemProps {
    item: Article;
    index: number;
}

const Trending = () => {

    const navigation = useNavigation();

    const NEWSAPI_URL = `https://newsapi.org/v2/top-headlines?sources=abc-news&apiKey=${process.env.EXPO_PUBLIC_NEWSAPI_SECRET_KEY}`;
    // associated-press, abc-news

    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(NEWSAPI_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setArticles((prevArticles) => [...prevArticles, ...data.articles]);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlNavigation = (item: any) => {
        // @ts-ignore
        navigation.navigate('article', item);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <View className='flex-col items-start justify-center flex-1 w-full p-4'>
                <Text className='text-xl font-[SemiBold] text-gray-900 mt-2'>
                    Trending News
                </Text>

                <View className='flex-col items-center justify-center flex-1 w-full h-full pb-12 mt-4'>
                    {isLoading && (
                        <View className='absolute top-0 bottom-0 left-0 right-0 flex-col items-center justify-center'>
                            <ActivityIndicator color='#1f2937' size='large' />
                        </View>
                    )}
                    <View className='-ml-4'>
                        <FlatList
                            data={articles}
                            decelerationRate='fast'
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => renderItem({ item, index })}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                    {!isLoading && articles.length === 0 && (
                        <View className='flex-row items-center justify-center flex-1 mt-4'>
                            <Text className='text-lg font-[SemiBold] text-gray-900 mt-2'>
                                No articles found.
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Trending