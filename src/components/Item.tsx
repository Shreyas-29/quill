import { cn } from '@/lib/utils';
import { Article } from '@/types/article';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    item: Article | any;
    isLoading: boolean;
    onPress: () => void;
}

const Item = ({ item, isLoading, onPress }: Props) => {
    return (
        <View className='ml-4'>
            <TouchableOpacity
                className={cn(
                    'flex-col items-start w-4/5 mr-auto last:mb-5',
                )}
                onPress={onPress}
            >
                {!isLoading && (
                    <View className={cn('flex-row items-center justify-start mt-2 full', !isLoading && 'items-end')}>
                        <Image
                            source={{
                                uri: item.urlToImage === null ?
                                    `https://picsum.photos/1440/2842?random=${item?.title?.length}` : item.urlToImage
                            }}
                            className='w-20 h-20 rounded-lg'
                        />
                        <View className='flex-col items-start px-2 mb-1 ml-2 overflow-hidden max-w-'>
                            <Text numberOfLines={2} className='max-w- font-[SemiBold] text-gray-800'>
                                {item.title}
                            </Text>
                            <Text numberOfLines={1} className='text-xs font-[Regular] truncate text-gray-600 mt-0.5'>
                                {item.description}{"..."}
                            </Text>
                            <Text numberOfLines={1} className='text-sm font-[Medium] truncate text-blue-600 mt-0.5'>
                                {item?.author}
                            </Text>
                        </View>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default Item