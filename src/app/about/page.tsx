export default function About() {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white py-6">
                <h1 className="text-3xl font-bold text-center">Обо мне</h1>
                <p className="text-center mt-2">Узнайте больше о вашем гиде</p>
            </header>
            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose">
                        <h2>Привет, я ваш гид!</h2>
                        <p>
                            Меня зовут Алексей, и я провожу экскурсии по городу уже более 10 лет.
                            Моя страсть — делиться историями и секретами города с путешественниками.
                            Я стремлюсь сделать каждую экскурсию незабываемой!
                        </p>
                        <p>
                            Свяжитесь со мной, чтобы узнать больше или забронировать тур.
                        </p>
                    </div>
                </div>
            </main>
            <footer className="bg-gray-800 text-white py-4 text-center">
                <p>© 2025 Экскурсии по городу. Все права защищены.</p>
            </footer>
        </div>
    );
}