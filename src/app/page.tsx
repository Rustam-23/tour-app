import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import TourBookingForm from './components/TourBookingForm';
import { getAllTours, type Tour } from './lib/tours';
import Header from "@/app/components/Header";


// Генерация метаданных
export const metadata: Metadata = {
    title: 'Экскурсии по городу - Лучшие туры и экскурсии',
    description: 'Откройте город с нашими увлекательными турами! Обзорные, ночные экскурсии и туры по Кремлю. Бронируйте сейчас!',
    keywords: 'экскурсии, туры, город, Кремль, ночные экскурсии, обзорные туры',
    openGraph: {
        title: 'Экскурсии по городу - Лучшие туры и экскурсии',
        description: 'Откройте город с нашими увлекательными турами! Обзорные, ночные экскурсии и туры по Кремлю.',
        type: 'website',
        locale: 'ru_RU',
        siteName: 'Экскурсии по городу',
        images: [
            {
                url: '/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Экскурсии по городу',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Экскурсии по городу - Лучшие туры и экскурсии',
        description: 'Откройте город с нашими увлекательными турами!',
        images: ['/images/og-image.jpg'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://your-domain.com',
    },
};

// Структурированные данные для SEO
function generateStructuredData(tours: Tour[]) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'TouristAttraction',
        name: 'Экскурсии по городу',
        description: 'Лучшие экскурсии и туры по городу',
        url: 'https://your-domain.com',
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Каталог экскурсий',
            itemListElement: tours.map((tour, index) => ({
                '@type': 'Offer',
                position: index + 1,
                name: tour.title,
                description: tour.description,
                price: tour.price,
                priceCurrency: 'RUB',
                availability: 'https://schema.org/InStock',
                category: tour.category,
                duration: tour.duration,
                image: `https://your-domain.com${tour.image}`,
                url: `https://your-domain.com/tours/${tour.slug}`,
            })),
        },
    };

    return JSON.stringify(structuredData);
}

// Server Component для карточки тура на главной странице
function TourCard({ tour }: { tour: Tour }) {
    return (
        <article
            className="border rounded-lg shadow-lg p-4 max-w-sm mx-auto hover:shadow-xl transition-shadow"
            itemScope
            itemType="https://schema.org/TouristAttraction"
        >
            <div className="relative w-full h-48">
                <Image
                    src={tour.image}
                    alt={`${tour.title} - ${tour.description}`}
                    fill
                    className="rounded-md object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={tour.id === 1}
                    loading={tour.id === 1 ? "eager" : "lazy"}
                    itemProp="image"
                />
            </div>

            <header>
                <h2 className="text-xl font-bold mt-4" itemProp="name">
                    {tour.title}
                </h2>
            </header>

            <p className="text-black mt-2" itemProp="description">
                {tour.description}
            </p>

            <div className="mt-2 text-black">
                <p><strong>Длительность:</strong> <time itemProp="duration">{tour.duration}</time></p>
                <p className="mt-1">
                    <strong>Цена:</strong>
                    <span itemProp="offers" itemScope itemType="https://schema.org/Offer">
                        <span itemProp="price">{tour.price}</span>
                        <span itemProp="priceCurrency" content="RUB"> ₽</span>
                    </span>
                </p>
                <p className="mt-1">
                    <strong>Категория:</strong>
                    <span itemProp="category">{tour.category}</span>
                </p>
            </div>

            {/* Кнопка "Подробнее" */}
            <div className="mt-4 mb-4">
                <Link
                    href={`/tours/${tour.slug}`}
                    className="inline-block w-full text-center bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-600 transition-colors"
                >
                    Подробнее
                </Link>
            </div>

            {/* Client Component для формы бронирования */}
            <TourBookingForm tour={tour} />
        </article>
    );
}

// Главная страница - статически генерируется
export default async function Home() {
    // Получаем данные на этапе сборки
    const tours = getAllTours();

    return (
        <>
            {/* Структурированные данные */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: generateStructuredData(tours) }}
            />

            <div className="bg-gray-100">
                <Header />

                <main className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <section aria-labelledby="tours-heading" className="scroll-mt-28">
                            <h2 id="tours-heading" className="text-3xl font-bold text-center mb-8 text-black">
                                Наши экскурсии
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {tours.map((tour) => (
                                    <TourCard key={tour.id} tour={tour} />
                                ))}
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}