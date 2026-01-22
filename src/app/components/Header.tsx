'use client';

export default function Header() {
  return (
    <header className="relative">
      <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/city-panorama.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold">Откройте Город с Нами</h1>
          <p className="mt-4 text-lg md:text-2xl">Ваши незабываемые приключения начинаются здесь</p>
        </div>
      </div>
    </header>
  );
}