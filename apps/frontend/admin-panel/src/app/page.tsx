export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              NGEAR Platform
            </h1>
            <p className="text-xl text-gray-600">
              Multi-tenant loyalty, engagement & martech platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                🚀 Platform Features
              </h2>
              <ul className="space-y-2 text-gray-600">
                <li>• Multi-tenant architecture</li>
                <li>• Role-based access control</li>
                <li>• API integration engine</li>
                <li>• Advanced rewards system</li>
                <li>• Intelligent wallet management</li>
                <li>• Real-time analytics</li>
                <li>• No-code app builder</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                🛠️ Technology Stack
              </h2>
              <ul className="space-y-2 text-gray-600">
                <li>• Node.js + TypeScript + NestJS</li>
                <li>• React + Next.js + Tailwind CSS</li>
                <li>• PostgreSQL + MongoDB + Redis</li>
                <li>• Docker + Kubernetes</li>
                <li>• Apache Kafka</li>
                <li>• Elasticsearch</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              📊 System Status
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">API Gateway</p>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Database</p>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Cache</p>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Analytics</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="space-x-4">
              <a
                href="/api/docs"
                target="_blank"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                API Documentation
              </a>
              <a
                href="/admin"
                className="inline-block bg-secondary-600 text-white px-6 py-3 rounded-lg hover:bg-secondary-700 transition-colors"
              >
                Admin Panel
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}