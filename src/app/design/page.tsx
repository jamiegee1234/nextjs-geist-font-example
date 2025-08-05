"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DesignResult {
  design: string;
  prompt: string;
  designType: string;
  complexity: string;
  timestamp: string;
}

export default function DesignStudio() {
  const [prompt, setPrompt] = useState('');
  const [designType, setDesignType] = useState('app');
  const [complexity, setComplexity] = useState('medium');
  const [result, setResult] = useState<DesignResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<DesignResult[]>([]);

  const examplePrompts = [
    "A modern task management app with dark theme and drag-and-drop functionality",
    "An interactive puzzle game with colorful animations and progressive difficulty",
    "A social media dashboard with real-time analytics and clean data visualization",
    "A meditation app with calming colors, nature sounds, and progress tracking",
    "An e-commerce platform with modern product galleries and smooth checkout flow",
    "A fitness tracking app with workout plans and achievement system"
  ];

  const generateDesign = async () => {
    if (!prompt.trim()) {
      setError('Please enter a design prompt');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/generate-design', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          designType,
          complexity
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
      setHistory(prev => [data, ...prev.slice(0, 4)]); // Keep last 5 results
    } catch (err) {
      console.error('Error generating design:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate design. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadExample = (example: string) => {
    setPrompt(example);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            AI Design Studio
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your ideas into stunning app and game designs with the power of AI. 
            Describe your vision and watch it come to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Create Your Design
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Describe your app or game idea in detail. The more specific you are, the better the AI can help you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Design Type</label>
                    <Select value={designType} onValueChange={setDesignType}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="app">Web Application</SelectItem>
                        <SelectItem value="mobile">Mobile App</SelectItem>
                        <SelectItem value="game">Interactive Game</SelectItem>
                        <SelectItem value="dashboard">Dashboard</SelectItem>
                        <SelectItem value="website">Website</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Complexity</label>
                    <Select value={complexity} onValueChange={setComplexity}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="simple">Simple</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="complex">Complex</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Design Prompt</label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your app or game idea... (e.g., 'A modern fitness tracking app with dark theme, workout plans, progress charts, and social features')"
                    className="min-h-32 bg-gray-700 border-gray-600 text-white placeholder-gray-400 resize-none"
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="bg-red-900/50 border border-red-600 rounded-lg p-4">
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

                <Button
                  onClick={generateDesign}
                  disabled={loading || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 text-lg"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Generating Design...
                    </div>
                  ) : (
                    'Generate Design Concept'
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Example Prompts */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Example Prompts</CardTitle>
                <CardDescription className="text-gray-400">
                  Click any example to get started quickly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {examplePrompts.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => loadExample(example)}
                      className="text-left p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 transition-all text-sm text-gray-300 hover:text-white"
                      disabled={loading}
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {result && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Design Concept</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-purple-900 text-purple-300">
                        {result.designType}
                      </Badge>
                      <Badge variant="secondary" className="bg-blue-900 text-blue-300">
                        {result.complexity}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription className="text-gray-400">
                    Generated on {new Date(result.timestamp).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h4 className="text-purple-300 font-semibold mb-2">Original Prompt:</h4>
                      <p className="text-gray-300 text-sm italic">"{result.prompt}"</p>
                    </div>
                    
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h4 className="text-blue-300 font-semibold mb-3">AI Design Concept:</h4>
                      <div className="prose prose-invert prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap text-gray-300 text-sm leading-relaxed font-sans">
                          {result.design}
                        </pre>
                      </div>
                    </div>

                    {/* Visual Preview Placeholder */}
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h4 className="text-green-300 font-semibold mb-3">Visual Preview:</h4>
                      <img 
                        src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/befd0443-cce5-45d2-96e2-4218302038dc.png"
                        alt="Modern app design concept with sleek interface and intuitive user experience"
                        className="w-full rounded-lg border border-gray-600"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* History */}
            {history.length > 0 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Recent Designs</CardTitle>
                  <CardDescription className="text-gray-400">
                    Your design history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {history.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setResult(item)}
                        className="w-full text-left p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600 hover:border-gray-500 transition-all"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="outline" className="text-xs">
                            {item.designType}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 truncate">
                          {item.prompt}
                        </p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Features */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Studio Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-300">AI-powered design concepts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">Multiple design types</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">Complexity customization</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-300">Design history tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span className="text-gray-300">Example prompts library</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
