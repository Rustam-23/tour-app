export interface Tour {
    id: number;
    title: string;
    description: string;
    image: string;
    duration: string;
    price: number;
    slug: string;
    category: string;
    fullDescription?: string;
    highlights?: string[];
    included?: string[];
    meetingPoint?: string;
    maxGroupSize?: number;
}

// Моковые данные туров (в реальном проекте это может быть API или CMS)
const tours: Tour[] = [
    {
        id: 1,
        title: 'Обзорная экскурсия',
        description: 'Откройте для себя древние достопримечательности и скрытые жемчужины города в нашей увлекательной обзорной экскурсии.',
        fullDescription: 'Наша обзорная экскурсия - это идеальный способ познакомиться с городом за короткое время. Мы покажем вам самые важные достопримечательности, расскажем увлекательные истории и поделимся местными секретами.',
        image: '/images/1.jpg',
        duration: '2 часа',
        price: 3000,
        slug: 'obzornaya-ekskursiya',
        category: 'Обзорные',
        highlights: [
            'Посещение главных достопримечательностей',
            'Профессиональный гид-экскурсовод',
            'Интересные исторические факты',
            'Фотосессия в красивых местах'
        ],
        included: ['Услуги гида', 'Входные билеты в музеи', 'Карта города'],
        meetingPoint: 'Центральная площадь, у фонтана',
        maxGroupSize: 15
    },
    {
        id: 2,
        title: 'Ночная экскурсия',
        description: 'Насладитесь живописной ночной прогулкой по городу и откройте его красоту в вечернем освещении.',
        fullDescription: 'Город совершенно преображается с наступлением темноты. Ночная экскурсия покажет вам волшебную атмосферу вечернего города с его подсветкой и особым очарованием.',
        image: '/images/3.jpg',
        duration: '1.5 часа',
        price: 4500,
        slug: 'nochnaya-ekskursiya',
        category: 'Ночные',
        highlights: [
            'Романтическая атмосфера вечернего города',
            'Красивая подсветка зданий',
            'Посещение лучших смотровых площадок',
            'Дегустация местных напитков'
        ],
        included: ['Услуги гида', 'Напитки', 'Фонарик'],
        meetingPoint: 'Набережная, причал №3',
        maxGroupSize: 12
    },
    {
        id: 3,
        title: 'Экскурсия по Кремлю',
        description: 'Погрузитесь в историю России, исследуя величественный Кремль с опытным гидом.',
        fullDescription: 'Кремль - сердце России и символ государственной власти. Во время экскурсии вы узнаете о многовековой истории этого уникального архитектурного комплекса.',
        image: '/images/2.jpg',
        duration: '3 часа',
        price: 5000,
        slug: 'ekskursiya-po-kremlyu',
        category: 'Исторические',
        highlights: [
            'Посещение Соборной площади',
            'Осмотр древних храмов',
            'Рассказы о царской истории',
            'Уникальные архитектурные памятники'
        ],
        included: ['Услуги гида', 'Входные билеты', 'Аудиогарнитура', 'Буклет'],
        meetingPoint: 'У главного входа в Кремль',
        maxGroupSize: 20
    },
];

// Функция для получения всех туров (имитация API)
export function getAllTours(): Tour[] {
    return tours;
}

// Функция для получения тура по slug
export function getTourBySlug(slug: string): Tour | null {
    return tours.find(tour => tour.slug === slug) || null;
}

// Функция для получения всех slug'ов туров (для generateStaticParams)
export function getAllTourSlugs(): string[] {
    const tours = getAllTours();
    return tours.map(tour => tour.slug);
}