import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Article } from '../types/article';
import Item from './Item';


interface ItemProps {
    item: Article;
    index: number;
}

const Container = () => {

    const navigation = useNavigation();

    const PAGE_SIZE = 20;
    const NEWSAPI_URL = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${process.env.EXPO_PUBLIC_NEWSAPI_SECRET_KEY}`;

    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1); // Initialize with the first page

    const fetchData = async (currentPage: number) => {
        setIsLoading(true);

        try {
            const response = await fetch(`${NEWSAPI_URL}&page=${currentPage}&pageSize=${PAGE_SIZE}`);
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

    useEffect(() => {
        fetchData(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlNavigation = (item: any) => {
        // @ts-ignore
        navigation.navigate('article', item);
    };

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
        <View className='flex-col items-center flex-1 h-full mt-3'>
            <View className='flex-row items-center justify-between w-full px-6 py-1'>
                <Text className='font-[SemiBold] text-gray-800 text-lg'>
                    Tredning News
                </Text>
                <TouchableOpacity>
                    <Text className='text-sm text-blue-500 font-[Medium]'>
                        See All
                    </Text>
                </TouchableOpacity>
            </View>

            <View className='flex-col flex-1 w-full px-2 ml-2 mr-4'>
                {isLoading && (
                    <View className='flex-row items-center justify-center flex-1 mt-4'>
                        <ActivityIndicator color='#1f2937' size='large' />
                    </View>
                )}
                <FlatList
                    data={articles}
                    decelerationRate="fast"
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => renderItem({ item, index })}
                    onEndReached={() => {
                        // Fetch the next page when reaching the end
                        fetchData(page + 1);
                        setPage((prevPage) => prevPage + 1);
                    }}
                    onEndReachedThreshold={0.5}
                />

                {!isLoading && articles.length === 0 ? (
                    <View className='flex-row items-center justify-center flex-1 mt-4'>
                        <Text className='text-base font-[SemiBold] text-center text-gray-900'>
                            No articles found
                        </Text>
                    </View>
                ) : null}
            </View>

        </View>
    )
}

export default Container