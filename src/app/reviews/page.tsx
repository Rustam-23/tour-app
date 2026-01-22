// app/reviews/page.tsx
export default function Reviews() {
  return (
    <>
      <header className="bg-gray-100 text-black py-6">
        <h1 className="text-3xl font-3xl font-bold text-center">Отзывы</h1>
      </header>

      <main className="py-8 flex-1">
        <div className="max-w-7xl text-black mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="border rounded-lg p-4 shadow-lg bg-white">
              <p className="text-black">
                Отличная экскурсия! Гид был очень знающим и дружелюбным.
              </p>
              <p className="mt-2 font-bold">— Иван, 2025</p>
            </div>
            <div className="border rounded-lg p-4 shadow-lg bg-white">
              <p className="text-black">
                Круиз по реке незабываем! Рекомендую всем.
              </p>
              <p className="mt-2 font-bold">— Анна, 2025</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}