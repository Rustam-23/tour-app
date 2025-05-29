'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import React, { useCallback, useMemo } from "react";

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

interface FormInputs {
    name: string;
    phone: string;
}

const TourBookingForm: React.FC<{ tour: Tour }> = React.memo(({ tour }) => {
    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm<FormInputs>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            phone: ''
        }
    });

    const formData = watch();

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
        <section className="mt-4" aria-labelledby={`booking-form-${tour.id}`}>
            <h3 id={`booking-form-${tour.id}`} className="sr-only">
                Форма бронирования для {tour.title}
            </h3>

            <div className="space-y-2">
                <div className="mb-2">
                    <label htmlFor={`name-${tour.id}`} className="sr-only">
                        Ваше имя
                    </label>
                    <input
                        id={`name-${tour.id}`}
                        type="text"
                        placeholder="Ваше имя"
                        autoComplete="name"
                        {...register('name', {
                            required: 'Имя обязательно',
                            minLength: { value: 2, message: 'Имя должно быть не короче 2 символов' }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? `name-error-${tour.id}` : undefined}
                    />
                    {errors.name && (
                        <p id={`name-error-${tour.id}`} className="text-red-500 text-sm mt-1" role="alert">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor={`phone-${tour.id}`} className="sr-only">
                        Ваш телефон
                    </label>
                    <input
                        id={`phone-${tour.id}`}
                        type="tel"
                        placeholder="Ваш телефон"
                        autoComplete="tel"
                        {...register('phone', {
                            required: 'Телефон обязателен',
                            pattern: { value: /^\+?\d{10,15}$/, message: 'Неверный формат номера' }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        aria-invalid={errors.phone ? 'true' : 'false'}
                        aria-describedby={errors.phone ? `phone-error-${tour.id}` : undefined}
                    />
                    {errors.phone && (
                        <p id={`phone-error-${tour.id}`} className="text-red-500 text-sm mt-1" role="alert">
                            {errors.phone.message}
                        </p>
                    )}
                </div>

                <div className="flex space-x-2">
                    <Link
                        href={isFormValid ? `https://t.me/share/url?url=${telegramMessage}` : '#'}
                        className={`flex-1 text-center py-2 px-4 rounded-md transition-colors ${
                            isFormValid
                                ? 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
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
                        className={`flex-1 text-center py-2 px-4 rounded-md transition-colors ${
                            isFormValid
                                ? 'bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        target={isFormValid ? "_blank" : undefined}
                        rel={isFormValid ? "noopener noreferrer" : undefined}
                        onClick={handleLinkClick}
                        aria-label={`Отправить заявку через WhatsApp для ${tour.title}`}
                        tabIndex={isFormValid ? 0 : -1}
                    >
                        WhatsApp
                    </Link>
                </div>
            </div>
        </section>
    );
});

TourBookingForm.displayName = 'TourBookingForm';

export default TourBookingForm;