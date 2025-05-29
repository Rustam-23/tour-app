'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useCallback, useMemo, startTransition } from "react";

interface Tour {
    id: number;
    title: string;
    description: string;
    image: string;
    duration: string;
    price: number;
}

interface FormInputs {
    name: string;
    phone: string;
}

const tours: Tour[] = [
    {
        id: 1,
        title: 'Обзорная экскурсия',
        description: 'Explore the ancient landmarks and hidden gems of the city.',
        image: '/images/1.jpeg',
        duration: '2 часа',
        price: 3000,
    },
    {
        id: 2,
        title: 'Ночная экскурсия',
        description: 'Enjoy a scenic boat tour along the citys river at dusk.',
        image: '/images/3.jpeg',
        duration: '1.5 часа',
        price: 4500,
    },
    {
        id: 3,
        title: 'Экскурсия по Кремлю',
        description: 'Taste local delicacies while learning about the citys culture.',
        image: '/images/2.jpeg',
        duration: '3 часа',
        price: 5000,
    },
];

const TourCard: React.FC<{ tour: Tour }> = React.memo(({ tour }) => {
    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<FormInputs>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            phone: ''
        }
    });

    const formData = watch();

    const onSubmit: SubmitHandler<FormInputs> = useCallback((data) => {
        startTransition(() => {
            console.log('Form submitted:', data);
        });
    }, []);

    const { telegramMessage, whatsappMessage } = useMemo(() => {
        const message = `Заявка на экскурсию: ${tour.title}\nИмя: ${formData.name || ''}\nТелефон: ${formData.phone || ''}`;
        return {
            telegramMessage: encodeURIComponent(message),
            whatsappMessage: encodeURIComponent(message)
        };
    }, [tour.title, formData.name, formData.phone]);

    const isFormValid = isValid && formData.name && formData.phone;

    const handleLinkClick = useCallback((e: React.MouseEvent) => {
        if (!isFormValid) {
            e.preventDefault();
            return false;
        }
    }, [isFormValid]);

    return (
        <article className="border rounded-lg shadow-lg p-4 max-w-sm mx-auto gpu-accelerated">
            <div className="relative w-full h-48">
                <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="rounded-md object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={tour.id === 1}
                    loading={tour.id === 1 ? "eager" : "lazy"}
                />
            </div>
            <h2 className="text-xl font-bold mt-4">{tour.title}</h2>
            <p className="text-gray-600 mt-2">{tour.description}</p>
            <p className="mt-2"><strong>Длительность:</strong> {tour.duration}</p>
            <p className="mt-1"><strong>Цена:</strong> ${tour.price}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4" noValidate>
                <div className="mb-2">
                    <input
                        type="text"
                        placeholder="Ваше имя"
                        autoComplete="name"
                        {...register('name', {
                            required: 'Имя обязательно',
                            minLength: { value: 2, message: 'Имя должно быть не короче 2 символов' }
                        })}
                        className="form-input"
                        aria-invalid={errors.name ? 'true' : 'false'}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1" role="alert">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <input
                        type="tel"
                        placeholder="Ваш телефон"
                        autoComplete="tel"
                        {...register('phone', {
                            required: 'Телефон обязателен',
                            pattern: { value: /^\+?\d{10,15}$/, message: 'Неверный формат номера' }
                        })}
                        className="form-input"
                        aria-invalid={errors.phone ? 'true' : 'false'}
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1" role="alert">
                            {errors.phone.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="form-button form-button-primary mb-2"
                    disabled={!isFormValid}
                    aria-label={`Подтвердить заявку на ${tour.title}`}
                >
                    Подтвердить
                </button>

                <div className="flex space-x-2">
                    <Link
                        href={isFormValid ? `https://t.me/share/url?url=${telegramMessage}` : '#'}
                        className={`social-button ${isFormValid ? 'social-button-telegram' : 'social-button-disabled'}`}
                        target={isFormValid ? "_blank" : undefined}
                        rel={isFormValid ? "noopener noreferrer" : undefined}
                        onClick={handleLinkClick}
                        aria-label={`Отправить заявку через Telegram для ${tour.title}`}
                        tabIndex={isFormValid ? 0 : -1}
                    >
                        Telegram
                    </Link>
                    <Link
                        href={isFormValid ? `https://wa.me/?text=${whatsappMessage}` : '#'}
                        className={`social-button ${isFormValid ? 'social-button-whatsapp' : 'social-button-disabled'}`}
                        target={isFormValid ? "_blank" : undefined}
                        rel={isFormValid ? "noopener noreferrer" : undefined}
                        onClick={handleLinkClick}
                        aria-label={`Отправить заявку через WhatsApp для ${tour.title}`}
                        tabIndex={isFormValid ? 0 : -1}
                    >
                        WhatsApp
                    </Link>
                </div>
            </form>
        </article>
    );
});

TourCard.displayName = 'TourCard';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white py-6">
                <h1 className="text-3xl font-bold text-center">Экскурсии по городу</h1>
                <p className="text-center mt-2">Откройте город с нашими увлекательными турами!</p>
            </header>

            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="tour-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tours.map((tour) => (
                            <TourCard key={tour.id} tour={tour} />
                        ))}
                    </div>
                </div>
            </main>

            <footer className="bg-gray-800 text-white py-4 text-center">

            <p>© 2025 Экскурсии по городу. Все права защищены.</p>
            </footer>
        </div>
    );
}
