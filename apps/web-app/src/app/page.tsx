'use client';

import React from 'react';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to NGEAR Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dynamic Multi-Tenant Loyalty, Engagement & Martech Platform - 
            Zero-Code Configurable Solution for Enterprise Clients
          </p>
        </header>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m-7 0h2m-2 0H6m2 0h-2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Tenant Architecture</h3>
            <p className="text-gray-600">Scalable multi-tenant architecture supporting 1000+ clients with white-label branding.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Zero-Code Configuration</h3>
            <p className="text-gray-600">No-code configuration capabilities for non-technical users with visual rule builders.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-Time Processing</h3>
            <p className="text-gray-600">Real-time processing of millions of events per day with sub-second response times.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Wallet System</h3>
            <p className="text-gray-600">Multi-currency wallet system with fraud detection and compliance features.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
            <p className="text-gray-600">Real-time dashboards, predictive analytics, and custom report builder.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">API Integration Engine</h3>
            <p className="text-gray-600">No-code API configuration with real-time data mapping and transformation.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-600 mb-6">
            Experience the power of NGEAR Platform with our comprehensive loyalty and engagement solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 transition-colors">
              View Documentation
            </button>
          </div>
        </div>

        {/* Status Section */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            All systems operational
          </div>
        </div>
      </div>
    </div>
  );
}