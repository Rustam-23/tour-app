export default function Reviews() {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white py-6">
                <h1 className="text-3xl font-bold text-center">Отзывы</h1>
                <p className="text-center mt-2">Что говорят наши клиенты</p>
            </header>
            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        <div className="border rounded-lg p-4 shadow-lg">
                            <p className="text-gray-600">{"Отличная экскурсия! Гид был очень знающим и дружелюбным."}</p>
                            <p className="mt-2 font-bold">— Иван, 2025</p>
                        </div>
                        <div className="border rounded-lg p-4 shadow-lg">
                            <p className="text-gray-600">{"Круиз по реке незабываем! Рекомендую всем."}</p>
                            <p className="mt-2 font-bold">— Анна, 2025</p>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="bg-gray-800 text-white py-4 text-center">
                <p>© 2025 Экскурсии по городу. Все права защищены.</p>
            </footer>
        </div>
    );
}