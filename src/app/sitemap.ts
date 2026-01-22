import { MetadataRoute } from 'next'

export const dynamic = 'force-static';
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://klio-travel.ru',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://klio-travel.ru/tours/obzornaya-ekskursiya',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://klio-travel.ru/tours/nochnaya-ekskursiya',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://klio-travel.ru/tours/ekskursiya-po-kremlyu',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]
}