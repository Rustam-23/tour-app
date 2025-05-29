import Image from 'next/image';
import { Metadata } from 'next';
import TourBookingForm from './components/TourBookingForm';

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

interface Tour {
    id: number;
    title: string;
    description: string;
    image: string;
    duration: string;
    price: number;
    slug: string;
    category: string;
}

const tours: Tour[] = [
    {
        id: 1,
        title: 'Обзорная экскурсия',
        description: 'Откройте для себя древние достопримечательности и скрытые жемчужины города в нашей увлекательной обзорной экскурсии.',
        image: '/images/1.jpeg',
        duration: '2 часа',
        price: 3000,
        slug: 'obzornaya-ekskursiya',
        category: 'Обзорные',
    },
    {
        id: 2,
        title: 'Ночная экскурсия',
        description: 'Насладитесь живописной ночной прогулкой по городу и откройте его красоту в вечернем освещении.',
        image: '/images/3.jpeg',
        duration: '1.5 часа',
        price: 4500,
        slug: 'nochnaya-ekskursiya',
        category: 'Ночные',
    },
    {
        id: 3,
        title: 'Экскурсия по Кремлю',
        description: 'Погрузитесь в историю России, исследуя величественный Кремль с опытным гидом.',
        image: '/images/2.jpeg',
        duration: '3 часа',
        price: 5000,
        slug: 'ekskursiya-po-kremlyu',
        category: 'Исторические',
    },
];

// Структурированные данные для SEO
const generateStructuredData = () => {
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
};

// Server Component для карточки тура
function TourCard({ tour }: { tour: Tour }) {
    return (
        <article
            className="border rounded-lg shadow-lg p-4 max-w-sm mx-auto"
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

            <p className="text-gray-600 mt-2" itemProp="description">
                {tour.description}
            </p>

            <div className="mt-2">
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

            {/* Client Component для формы */}
            <TourBookingForm tour={tour} />
        </article>
    );
}

export default function Home() {
    return (
        <>
            {/* Структурированные данные */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: generateStructuredData() }}
            />

            <div className="min-h-screen bg-gray-100">
                <header className="bg-blue-600 text-white py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-center">
                            Экскурсии по городу
                        </h1>
                        <p className="text-center mt-2 text-lg">
                            Откройте город с нашими увлекательными турами!
                        </p>
                    </div>
                </header>

                <main className="py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <section aria-labelledby="tours-heading">
                            <h2 id="tours-heading" className="sr-only">
                                Доступные экскурсии
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {tours.map((tour) => (
                                    <TourCard key={tour.id} tour={tour} />
                                ))}
                            </div>
                        </section>
                    </div>
                </main>

                <footer className="bg-gray-800 text-white py-4 text-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p>© 2025 Экскурсии по городу. Все права защищены.</p>
                        <nav className="mt-2" aria-label="Footer navigation">
                            <ul className="flex justify-center space-x-4 text-sm">
                                <li><a href="/privacy" className="hover:underline">Политика конфиденциальности</a></li>
                                <li><a href="/terms" className="hover:underline">Условия использования</a></li>
                                <li><a href="/contact" className="hover:underline">Контакты</a></li>
                            </ul>
                        </nav>
                    </div>
                </footer>
            </div>
        </>
    );
}