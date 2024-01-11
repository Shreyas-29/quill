import AsyncStorage from "@react-native-async-storage/async-storage";

const getLikedArticles = async () => {
    try {
        const likedArticlesJson = await AsyncStorage.getItem('likedArticles') || '[]';
        const parsedLikedArticles = JSON.parse(likedArticlesJson);
        return parsedLikedArticles;
    } catch (error) {
        console.log("Error getting liked articles", error);
        return [];
    }
};

export default getLikedArticles;
