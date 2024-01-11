import { useNavigation } from '@react-navigation/native';
import { Skeleton } from 'moti/skeleton';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { lists } from '../constants';
import { Article } from '../types/article';

const Hero = () => {

    const navigation = useNavigation();

    const { width } = Dimensions.get('window');

    const NEWSAPI_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.EXPO_PUBLIC_NEWSAPI_SECRET_KEY}`;

    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const CARD_WIDTH = width - 60;
    const CARD_HEIGHT = 200;
    const CARD_WIDTH_SPACING = CARD_WIDTH + 16;

    console.log(articles[0]);

    useEffect(() => {
        setIsLoading(true);

        const fetchData = async () => {
            try {
                const response = await fetch(NEWSAPI_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setArticles(data.articles);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
        };

        fetchData();
    }, []);

    const handlNavigation = (item: any) => {
        // @ts-ignore
        navigation.navigate('article', item);
    };

    const renderItem = ({ item, index }: { item: Article; index: number }) => {

        const publishedDate = new Date(item.publishedAt);
        const formattedDate = `${publishedDate.getDate()}-${publishedDate.getMonth() + 1}-${publishedDate.getFullYear()}`;

        return (
            <TouchableOpacity
                style={{
                    marginLeft: 16,
                    marginRight: index === lists.length - 1 ? 16 : 0,
                }}
                onPress={() => handlNavigation(item)}
            >
                <Skeleton show={isLoading} height={CARD_HEIGHT} width={CARD_WIDTH} radius={8} colorMode='light' backgroundColor='#d1d5db'>
                    <View style={{ width: CARD_WIDTH, height: CARD_HEIGHT, marginBottom: 10 }}>
                        <View style={{ width: CARD_WIDTH, height: CARD_HEIGHT, borderRadius: 8, overflow: 'hidden' }}>
                            <Image
                                source={{ uri: item.urlToImage === null ? `https://picsum.photos/1440/2842?random=${index}` : item.urlToImage }}
                                alt={`https://picsum.photos/1440/2842?random=${index}`}
                                style={{ width: CARD_WIDTH, height: CARD_HEIGHT, resizeMode: 'cover' }}
                            />
                        </View>
                        <View className='absolute w-auto left-4 bottom-4 right-4'>
                            <Text className='text-sm text-gray-300 font-[Regular]'>
                                {formattedDate}
                            </Text>
                            <Text numberOfLines={2} className='text-base text-white font-[Medium] line-clamp-1 truncate'>
                                {item.title}
                            </Text>
                        </View>
                    </View>
                </Skeleton>
            </TouchableOpacity>
        );
    };

    return (
        <View className='flex flex-col items-start justify-center flex-1 w-full h-full'>
            <Text className='text-[20px] font-[SemiBold] px-6 text-start flex-1 text-gray-900'>
                Breaking News
            </Text>
            <View className='flex-col items-center justify-center flex-1 w-full h-full'>
                <View className='relative flex-row items-center justify-center flex-1 mt-4'>
                    <FlatList
                        data={articles}
                        horizontal
                        snapToInterval={CARD_WIDTH_SPACING}
                        decelerationRate="fast"
                        showsHorizontalScrollIndicator={true}
                        keyExtractor={(item, index) => item.title + index.toString()}
                        renderItem={({ item, index }) => {
                            return renderItem({ item, index });
                        }}
                    />
                </View>
                {!isLoading && articles.length === 0 && (
                    <View className='items-center my-8'>
                        <Text className='text-base font-[Regular] text-center text-gray-700'>
                            No results found
                        </Text>
                    </View>
                )}
            </View>
        </View>
    )
}

export default Hero