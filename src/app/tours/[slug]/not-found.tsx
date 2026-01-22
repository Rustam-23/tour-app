import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Тур не найден</h1>
                <p className="text-gray-600 mb-8">Извините, запрашиваемый тур не существует.</p>
                <Link
                    href="/"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Вернуться к экскурсиям
                </Link>
            </div>
        </div>
    );
}