"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CodeResult {
  code: string;
  prompt: string;
  codeType: string;
  framework: string;
  timestamp: string;
}

export default function CodeGenerator() {
  const [prompt, setPrompt] = useState('');
  const [codeType, setCodeType] = useState('react');
  const [framework, setFramework] = useState('nextjs');
  const [result, setResult] = useState<CodeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<CodeResult[]>([]);

  const codeExamples = [
    "A modern todo app with drag and drop, dark mode toggle, and local storage",
    "An interactive memory card game with animations and score tracking",
    "A weather dashboard with API integration and location-based forecasts",
    "A chat interface with message bubbles, typing indicators, and emoji support",
    "A data visualization dashboard with charts, filters, and export functionality",
    "A music player interface with playlist management and audio controls"
  ];

  const generateCode = async () => {
    if (!prompt.trim()) {
      setError('Please enter a code generation prompt');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          codeType,
          framework
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
      setHistory(prev => [data, ...prev.slice(0, 4)]);
    } catch (err) {
      console.error('Error generating code:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
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
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            AI Code Generator
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your ideas into production-ready code instantly. 
            Describe what you want to build and get complete, working applications.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Generate Your Code
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Describe the application or component you want to build. Be specific about features and functionality.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Code Type</label>
                    <Select value={codeType} onValueChange={setCodeType}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="react">React Component</SelectItem>
                        <SelectItem value="nextjs">Next.js Page</SelectItem>
                        <SelectItem value="game">HTML5 Game</SelectItem>
                        <SelectItem value="api">API Route</SelectItem>
                        <SelectItem value="fullstack">Full Application</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Framework</label>
                    <Select value={framework} onValueChange={setFramework}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="nextjs">Next.js</SelectItem>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="vanilla">Vanilla JS</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Code Prompt</label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to build... (e.g., 'A todo app with drag and drop, dark mode, categories, and local storage persistence')"
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
                  onClick={generateCode}
                  disabled={loading || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-3 text-lg"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Generating Code...
                    </div>
                  ) : (
                    'Generate Production Code'
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Example Prompts */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Code Examples</CardTitle>
                <CardDescription className="text-gray-400">
                  Click any example to generate code instantly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {codeExamples.map((example, index) => (
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

            {/* Generated Code Display */}
            {result && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Generated Code</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-green-900 text-green-300">
                        {result.codeType}
                      </Badge>
                      <Badge variant="secondary" className="bg-blue-900 text-blue-300">
                        {result.framework}
                      </Badge>
                      <Button
                        onClick={() => copyToClipboard(result.code)}
                        size="sm"
                        variant="outline"
                        className="text-xs"
                      >
                        Copy Code
                      </Button>
                    </div>
                  </div>
                  <CardDescription className="text-gray-400">
                    Generated on {new Date(result.timestamp).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h4 className="text-green-300 font-semibold mb-2">Original Prompt:</h4>
                      <p className="text-gray-300 text-sm italic">"{result.prompt}"</p>
                    </div>
                    
                    <div className="bg-gray-900/80 rounded-lg p-4 overflow-hidden">
                      <h4 className="text-blue-300 font-semibold mb-3">Production-Ready Code:</h4>
                      <div className="relative">
                        <pre className="overflow-x-auto text-sm bg-black/50 rounded p-4 border border-gray-600">
                          <code className="text-gray-300 whitespace-pre-wrap font-mono">
                            {result.code}
                          </code>
                        </pre>
                      </div>
                    </div>

                    {/* Implementation Preview */}
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <h4 className="text-purple-300 font-semibold mb-3">Implementation Preview:</h4>
                      <img 
                        src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/aa3b0dc8-5a16-45bc-8983-b70eadc02166.png"
                        alt="Live code preview showing working application with modern interface"
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* History */}
            {history.length > 0 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Code History</CardTitle>
                  <CardDescription className="text-gray-400">
                    Your recent generations
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
                            {item.codeType}
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
                <CardTitle className="text-white text-lg">Code Generator Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">Production-ready code</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">TypeScript support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-300">Modern frameworks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-300">Responsive design</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span className="text-gray-300">Copy-paste ready</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span className="text-gray-300">Error handling included</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Code Quality */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Code Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Type Safety</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-green-500 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Performance</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Accessibility</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Maintainability</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      ))}
                    </div>
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
