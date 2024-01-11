import { Article } from "@/types/article";
import { useEffect, useState } from "react";

export default function useArticle(title: string) {
    const getArticle = async (): Promise<Article | null> => {
        try {
            const response = await fetch(`/api/articles?title=${encodeURIComponent(title)}`);
            const data = await response.json();
            console.log("Data: ", data);
            return data.article;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            const article = await getArticle();
            setArticle(article);
            setArticle(article);
        };

        fetchArticle();
    }, [title]);

    return { article };
};
