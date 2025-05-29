export default function Contacts() {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white py-6">
                <h1 className="text-3xl font-bold text-center">Контакты</h1>
                <p className="text-center mt-2">Свяжитесь с нами для бронирования</p>
            </header>
            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose">
                        <h2>Как с нами связаться</h2>
                        <p><strong>Email:</strong> tours@example.com</p>
                        <p><strong>Телефон:</strong> +7 (123) 456-78-90</p>
                        <p><strong>Telegram:</strong> <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer">@YourUsername</a></p>
                        <p><strong>WhatsApp:</strong> <a href="https://wa.me/71234567890" target="_blank" rel="noopener noreferrer">+7 (123) 456-78-90</a></p>
                        <p>Мы ответим вам в течение 24 часов!</p>
                    </div>
                </div>
            </main>
            <footer className="bg-gray-800 text-white py-4 text-center">
                <p>© 2025 Экскурсии по городу. Все права защищены.</p>
            </footer>
        </div>
    );
}