/** @type {import('next').NextConfig} */
const nextConfig = {
    // Включаем экспорт статических файлов
    output: 'export', // Для полностью статического сайта
    // Или используйте 'standalone' для hybrid подхода

    images: {
        unoptimized: true, // Только если используете output: 'export'
        // domains: ['your-domain.com'], // Для внешних изображений
    },

    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },

    compress: true,

    reactStrictMode: true,
};

module.exports = nextConfig;