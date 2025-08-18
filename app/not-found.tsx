export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-brown mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-300 mb-8">The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="bg-primary-brown hover:bg-primary-dark-brown text-white px-6 py-3 rounded-lg transition-colors duration-300 inline-block"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
