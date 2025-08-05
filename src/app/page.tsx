"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  const [activeDemo, setActiveDemo] = useState(0);

  const features = [
    {
      title: "AI Design Studio",
      description: "Transform ideas into stunning app designs with AI-powered concept generation",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      href: "/design"
    },
    {
      title: "Code Generator",
      description: "Generate production-ready code from natural language descriptions",
      icon: "⚡",
      color: "from-green-500 to-blue-500",
      href: "/code"
    },
    {
      title: "Music Generator",
      description: "Create professional songs with AI-powered lyrics and music composition",
      icon: "🎵",
      color: "from-pink-500 to-purple-500",
      href: "/music"
    },
    {
      title: "Live Preview",
      description: "See your creations come to life with real-time preview capabilities",
      icon: "👁️",
      color: "from-orange-500 to-red-500",
      href: "/preview"
    }
  ];

  const demoApps = [
    {
      name: "Task Manager Pro",
      description: "Modern productivity app with drag-and-drop, dark mode, and team collaboration",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ed967e0f-a425-41fc-89e0-206f5ed2a285.png",
      tags: ["React", "TypeScript", "Tailwind"]
    },
    {
      name: "Weather Dashboard",
      description: "Beautiful weather app with location-based forecasts and interactive maps",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/30389c0a-e1a7-4943-9e09-8c7872230669.png",
      tags: ["Next.js", "API Integration", "Charts"]
    },
    {
      name: "Music Player",
      description: "Sleek music streaming interface with playlist management and audio controls",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0a53209b-bcba-45a3-9c47-ed6622dcf8ad.png",
      tags: ["Audio API", "Animations", "PWA"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Design Studio
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/design">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Design Studio
                </Button>
              </Link>
              <Link href="/code">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Code Generator
                </Button>
              </Link>
              <Link href="/music">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Music Generator
                </Button>
              </Link>
              <Link href="/design">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Build Anything
              </span>
              <br />
              <span className="text-white">With Words</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Transform your ideas into stunning applications and games using the power of AI. 
              No coding experience required – just describe what you want to build.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/design">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4">
                  Start Designing
                </Button>
              </Link>
              <Link href="/code">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 text-lg px-8 py-4">
                  Generate Code
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful AI-Driven Tools
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to bring your digital ideas to life, powered by cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-4`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Apps Showcase */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Built with AI in Minutes
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See what's possible when you combine creativity with AI. These apps were generated from simple text descriptions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {demoApps.map((app, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 overflow-hidden hover:bg-gray-800/70 transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={app.image}
                    alt={app.description}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-white">{app.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {app.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {app.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="bg-gray-700 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">10K+</div>
              <div className="text-gray-400">Apps Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">50K+</div>
              <div className="text-gray-400">Lines of Code</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">99%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-400 mb-2">24/7</div>
              <div className="text-gray-400">AI Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of creators who are already building the future with AI-powered development tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/design">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4">
                  Start Creating Now
                </Button>
              </Link>
              <Link href="/code">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 text-lg px-8 py-4">
                  View Examples
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Design Studio
              </span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>© 2024 AI Design Studio. Built with AI, for creators.</p>
              <p className="text-sm mt-1">Powered by advanced language models and creative AI</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
