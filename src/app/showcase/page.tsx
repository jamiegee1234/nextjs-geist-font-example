"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ShowcasePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const projects = [
    {
      id: 1,
      title: "TaskFlow Pro",
      description: "A comprehensive project management platform with real-time collaboration, Kanban boards, and advanced analytics.",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2ab7341a-8a63-4316-9e28-170f270c7e28.png",
      category: "productivity",
      tags: ["React", "TypeScript", "Real-time", "Analytics"],
      features: ["Drag & Drop", "Team Chat", "Time Tracking", "Reports"],
      prompt: "Create a modern project management app with Kanban boards, team collaboration, time tracking, and analytics dashboard"
    },
    {
      id: 2,
      title: "WeatherScope",
      description: "Beautiful weather application with location-based forecasts, interactive maps, and severe weather alerts.",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2ec6df0a-0bdb-4764-bed0-297623048739.png",
      category: "utility",
      tags: ["API Integration", "Maps", "Notifications", "PWA"],
      features: ["Location Services", "Weather Maps", "Alerts", "Offline Mode"],
      prompt: "Build a weather app with interactive maps, location-based forecasts, and push notifications for severe weather"
    },
    {
      id: 3,
      title: "CodeSnap",
      description: "Developer tool for creating beautiful code screenshots with syntax highlighting and customizable themes.",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e4acf7d8-ace6-4eda-92a9-4878a133c9d2.png",
      category: "developer",
      tags: ["Code Editor", "Export", "Themes", "Syntax Highlighting"],
      features: ["Multiple Languages", "Custom Themes", "Export Options", "Live Preview"],
      prompt: "Create a code screenshot tool with syntax highlighting, multiple themes, and export options for developers"
    },
    {
      id: 4,
      title: "MindMap Studio",
      description: "Interactive mind mapping tool with collaborative editing, templates, and export capabilities.",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8eae6131-abe1-480b-8eb2-08a91c9e37e9.png",
      category: "creativity",
      tags: ["Canvas", "Collaboration", "Templates", "Export"],
      features: ["Real-time Collaboration", "Templates", "Multiple Formats", "Sharing"],
      prompt: "Design a mind mapping application with collaborative editing, templates, and various export formats"
    },
    {
      id: 5,
      title: "FitTracker Elite",
      description: "Comprehensive fitness tracking app with workout plans, nutrition logging, and progress analytics.",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cb6b2d7e-d5c5-4634-a224-bda24e531038.png",
      category: "health",
      tags: ["Health", "Analytics", "Social", "Gamification"],
      features: ["Workout Plans", "Nutrition Tracking", "Progress Charts", "Social Features"],
      prompt: "Build a fitness tracking app with workout plans, nutrition logging, progress analytics, and social features"
    },
    {
      id: 6,
      title: "CryptoPortfolio",
      description: "Cryptocurrency portfolio tracker with real-time prices, news integration, and advanced analytics.",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ca93670f-69eb-40d2-96f5-1a64d2901892.png",
      category: "finance",
      tags: ["Crypto", "Real-time", "Charts", "News"],
      features: ["Portfolio Tracking", "Price Alerts", "News Feed", "Analytics"],
      prompt: "Create a cryptocurrency portfolio tracker with real-time prices, news integration, and detailed analytics"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'productivity', name: 'Productivity', count: projects.filter(p => p.category === 'productivity').length },
    { id: 'utility', name: 'Utility', count: projects.filter(p => p.category === 'utility').length },
    { id: 'developer', name: 'Developer Tools', count: projects.filter(p => p.category === 'developer').length },
    { id: 'creativity', name: 'Creative', count: projects.filter(p => p.category === 'creativity').length },
    { id: 'health', name: 'Health & Fitness', count: projects.filter(p => p.category === 'health').length },
    { id: 'finance', name: 'Finance', count: projects.filter(p => p.category === 'finance').length }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Design Studio
              </span>
            </Link>
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
              <Link href="/design">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Create Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Project Showcase
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore amazing applications and tools built with our AI-powered design and code generation platform. 
            Each project was created from simple text descriptions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/design">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Start Building
              </Button>
            </Link>
            <Link href="/code">
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                Generate Code
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 mb-12">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="bg-gray-800/50 border-gray-700 overflow-hidden hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.description}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-white text-xl">{project.title}</CardTitle>
                    <Badge variant="secondary" className="bg-purple-900 text-purple-300 capitalize">
                      {project.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-400 text-base leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Features</h4>
                    <div className="grid grid-cols-2 gap-1 text-xs text-gray-400">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Original Prompt */}
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-green-300 mb-1">AI Prompt Used:</h4>
                    <p className="text-xs text-gray-400 italic">"{project.prompt}"</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Link href="/design" className="flex-1">
                      <Button size="sm" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-xs">
                        Recreate Design
                      </Button>
                    </Link>
                    <Link href="/code" className="flex-1">
                      <Button size="sm" variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 text-xs">
                        Generate Code
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Build Your Own?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              These projects show just a glimpse of what's possible. Start with a simple description 
              and watch AI transform your ideas into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/design">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4">
                  Start Creating
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
    </div>
  );
}
