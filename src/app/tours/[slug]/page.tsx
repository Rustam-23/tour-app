import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTourSlugs, getTourBySlug } from '../../lib/tours';
import TourBookingForm from '../../components/TourBookingForm';

// Генерируем статические параметры для всех туров
export function generateStaticParams() {
    const slugs = getAllTourSlugs();
    console.log('generateStaticParams:', slugs);
    return slugs.map((slug) => ({
        slug: slug,
    }));
}

// Генерируем метаданные для каждого тура
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> } // ← Promise!
): Promise<Metadata> {
    const { slug } = await params; // ← await!
    const tour = getTourBySlug(slug);

    if (!tour) {
        return { title: 'Тур не найден' };
    }

    return {
        title: `${tour.title} - Экскурсии по городу`,
        description: tour.description,
        keywords: `${tour.title}, ${tour.category}, экскурсии, туры`,
        openGraph: {
            title: `${tour.title} - Экскурсии по городу`,
            description: tour.description,
            type: 'website',
            locale: 'ru_RU',
            images: [
                {
                    url: tour.image,
                    width: 1200,
                    height: 630,
                    alt: tour.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${tour.title} - Экскурсии по городу`,
            description: tour.description,
            images: [tour.image],
        },
        alternates: {
            canonical: `https://your-domain.com/tours/${tour.slug}`,
        },
    };
}

export default async function TourPage({
                                           params
                                       }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const tour = getTourBySlug(slug);

    if (!tour) {
        notFound();
    }

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'TouristAttraction',
        name: tour.title,
        description: tour.description,
        image: `https://your-domain.com${tour.image}`,
        url: `https://your-domain.com/tours/${tour.slug}`,
        offers: {
            '@type': 'Offer',
            price: tour.price,
            priceCurrency: 'RUB',
            availability: 'https://schema.org/InStock',
        },
        duration: tour.duration,
        category: tour.category,
    };

    return (
      <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />

          <div className="min-h-screen bg-gray-100">
              <header className="bg-gray-100 text-black py-6 scroll-mt-28">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <nav className="mb-4">
                          <Link href="/" className="text-black hover:text-gray-900">
                              ← Назад к экскурсиям
                          </Link>
                      </nav>
                      <h1 className="text-3xl font-bold">{tour.title}</h1>
                  </div>
              </header>

              <main className="py-8">
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                          {/* Изображение — фиксированная высота */}
                          <div className="relative h-64 sm:h-80 w-full">
                              <Image
                                src={tour.image}
                                alt={tour.title}
                                fill
                                className="object-cover"
                                priority
                              />
                          </div>

                          <div className="p-6">
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                  {/* Левая колонка: описание и блоки */}
                                  <div className="lg:col-span-2 space-y-8">
                                      {/* Описание — всегда есть */}
                                      <section>
                                          <h2 className="text-2xl font-bold mb-3">Описание</h2>
                                          <p className="text-black min-h-16">
                                              {tour.description || 'Описание отсутствует.'}
                                          </p>
                                          {tour.fullDescription && (
                                            <p className="text-black mt-3">{tour.fullDescription}</p>
                                          )}
                                      </section>

                                      {/* Особенности тура — всегда рендерим блок */}
                                      <section className="min-h-24">
                                          <h3 className="text-xl font-semibold mb-3">Особенности тура</h3>
                                          {tour.highlights && tour.highlights.length > 0 ? (
                                            <ul className="list-disc list-inside text-black space-y-1">
                                                {tour.highlights.map((highlight, index) => (
                                                  <li key={index}>{highlight}</li>
                                                ))}
                                            </ul>
                                          ) : (
                                            <p className="text-black italic">Особенности не указаны.</p>
                                          )}
                                      </section>

                                      {/* Включено в стоимость — всегда рендерим */}
                                      <section className="min-h-24">
                                          <h3 className="text-xl font-semibold mb-3">Включено в стоимость</h3>
                                          {tour.included && tour.included.length > 0 ? (
                                            <ul className="list-disc list-inside text-black space-y-1">
                                                {tour.included.map((item, index) => (
                                                  <li key={index}>{item}</li>
                                                ))}
                                            </ul>
                                          ) : (
                                            <p className="text-black italic">Информация отсутствует.</p>
                                          )}
                                      </section>
                                  </div>

                                  {/* Правая колонка: детали и форма */}
                                  <div className="bg-gray-50 p-6 rounded-lg h-fit sticky top-6">
                                      <h3 className="text-xl font-semibold mb-4">Детали тура</h3>
                                      <div className="space-y-3 text-gray-700">
                                          <p><strong>Длительность:</strong> {tour.duration}</p>
                                          <p><strong>Цена:</strong> {tour.price} ₽</p>
                                          <p><strong>Категория:</strong> {tour.category}</p>
                                          <p>
                                              <strong>Макс. группа:</strong>{' '}
                                              {tour.maxGroupSize ? `${tour.maxGroupSize} чел.` : '—'}
                                          </p>
                                          <p>
                                              <strong>Место встречи:</strong>{' '}
                                              {tour.meetingPoint || 'Не указано'}
                                          </p>
                                      </div>

                                      <div className="mt-6">
                                          <TourBookingForm tour={tour} />
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </main>
          </div>
      </>
    );
}