"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface LyricsResponse {
  lyrics: string;
  genre: string;
  mood: string;
  wordCount: number;
  estimatedDuration: string;
}

interface MusicResponse {
  success: boolean;
  audioUrl: string;
  trackInfo: {
    title: string;
    genre: string;
    mood: string;
    duration: string;
    description: string;
    bpm: string;
    key: string;
    instruments: string[];
  };
  quality: string;
  processingTime: string;
}

export default function MusicGeneratorPage() {
  const [lyricsPrompt, setLyricsPrompt] = useState('');
  const [musicPrompt, setMusicPrompt] = useState('');
  const [genre, setGenre] = useState('pop');
  const [mood, setMood] = useState('upbeat');
  const [tempo, setTempo] = useState('medium');
  const [includeVocals, setIncludeVocals] = useState(false);
  const [duration, setDuration] = useState('3:30');
  
  const [generatedLyrics, setGeneratedLyrics] = useState<LyricsResponse | null>(null);
  const [generatedMusic, setGeneratedMusic] = useState<MusicResponse | null>(null);
  
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const [musicLoading, setMusicLoading] = useState(false);
  
  const [lyricsError, setLyricsError] = useState('');
  const [musicError, setMusicError] = useState('');

  const genres = [
    'pop', 'rock', 'electronic', 'jazz', 'classical', 'hiphop', 'country', 'reggae',
    'blues', 'folk', 'r&b', 'indie', 'metal', 'punk', 'funk', 'soul'
  ];

  const moods = [
    'upbeat', 'mellow', 'dramatic', 'romantic', 'mysterious', 'powerful',
    'nostalgic', 'energetic', 'peaceful', 'intense', 'playful', 'melancholic'
  ];

  const generateLyrics = async () => {
    if (!lyricsPrompt.trim()) {
      setLyricsError('Please enter a song theme or prompt');
      return;
    }

    setLyricsLoading(true);
    setLyricsError('');

    try {
      const response = await fetch('/api/generate-lyrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: lyricsPrompt,
          genre,
          mood,
          language: 'english'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate lyrics');
      }

      setGeneratedLyrics(data);
    } catch (err) {
      console.error('Error generating lyrics:', err);
      setLyricsError(err instanceof Error ? err.message : 'Failed to generate lyrics. Please try again.');
    } finally {
      setLyricsLoading(false);
    }
  };

  const generateMusic = async () => {
    if (!musicPrompt.trim()) {
      setMusicError('Please enter a song theme or prompt');
      return;
    }

    setMusicLoading(true);
    setMusicError('');

    try {
      const response = await fetch('/api/generate-music', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: musicPrompt,
          genre,
          mood,
          duration,
          includeVocals,
          tempo
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate music');
      }

      setGeneratedMusic(data);
    } catch (err) {
      console.error('Error generating music:', err);
      setMusicError(err instanceof Error ? err.message : 'Failed to generate music. Please try again.');
    } finally {
      setMusicLoading(false);
    }
  };

  const copyLyrics = async () => {
    if (generatedLyrics?.lyrics) {
      try {
        await navigator.clipboard.writeText(generatedLyrics.lyrics);
      } catch (err) {
        console.error('Failed to copy lyrics:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header Banner */}
      <div className="relative overflow-hidden">
        <img 
          src="https://placehold.co/1920x500?text=Elegant+modern+interface+for+ai+music+generator+with+structured+layout+and+smooth+typography" 
          alt="Elegant modern interface for ai music generator with structured layout and smooth typography" 
          onError={(e) => { e.currentTarget.style.display = 'none'; }} 
          className="w-full h-64 object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                AI Music Studio
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Create professional-quality songs with AI-powered lyric writing and music generation
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Global Controls */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Song Configuration</CardTitle>
            <CardDescription className="text-gray-400">
              Set the overall style and mood for your AI-generated song
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="genre" className="text-white mb-2 block">Genre</Label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {genres.map((g) => (
                      <SelectItem key={g} value={g} className="text-white hover:bg-gray-600">
                        {g.charAt(0).toUpperCase() + g.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="mood" className="text-white mb-2 block">Mood</Label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    {moods.map((m) => (
                      <SelectItem key={m} value={m} className="text-white hover:bg-gray-600">
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tempo" className="text-white mb-2 block">Tempo</Label>
                <Select value={tempo} onValueChange={setTempo}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="slow" className="text-white hover:bg-gray-600">Slow (70-90 BPM)</SelectItem>
                    <SelectItem value="medium" className="text-white hover:bg-gray-600">Medium (90-120 BPM)</SelectItem>
                    <SelectItem value="fast" className="text-white hover:bg-gray-600">Fast (120-140 BPM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Lyrics Generation Section */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-2">
                <span className="text-2xl">🎤</span>
                Lyric Generator
              </CardTitle>
              <CardDescription className="text-gray-400">
                Generate professional song lyrics with AI-powered creativity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="lyrics-prompt" className="text-white mb-2 block">Song Theme or Story</Label>
                <Textarea
                  id="lyrics-prompt"
                  placeholder="Describe your song theme, story, or message... (e.g., 'A love song about finding someone special in a crowded city')"
                  value={lyricsPrompt}
                  onChange={(e) => setLyricsPrompt(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
                />
              </div>

              <Button
                onClick={generateLyrics}
                disabled={lyricsLoading || !lyricsPrompt.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {lyricsLoading ? 'Generating Lyrics...' : 'Generate Lyrics'}
              </Button>

              {lyricsError && (
                <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg">
                  {lyricsError}
                </div>
              )}

              {generatedLyrics && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Generated Lyrics</h3>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                        {generatedLyrics.wordCount} words
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                        ~{generatedLyrics.estimatedDuration}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={copyLyrics}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                    <pre className="text-gray-200 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                      {generatedLyrics.lyrics}
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Music Generation Section */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center gap-2">
                <span className="text-2xl">🎵</span>
                Music Generator
              </CardTitle>
              <CardDescription className="text-gray-400">
                Create instrumental tracks and vocal arrangements with AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="music-prompt" className="text-white mb-2 block">Musical Style & Arrangement</Label>
                <Textarea
                  id="music-prompt"
                  placeholder="Describe the musical style, instruments, and arrangement... (e.g., 'Upbeat pop song with piano, strings, and modern production')"
                  value={musicPrompt}
                  onChange={(e) => setMusicPrompt(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration" className="text-white mb-2 block">Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="2:30" className="text-white hover:bg-gray-600">2:30</SelectItem>
                      <SelectItem value="3:00" className="text-white hover:bg-gray-600">3:00</SelectItem>
                      <SelectItem value="3:30" className="text-white hover:bg-gray-600">3:30</SelectItem>
                      <SelectItem value="4:00" className="text-white hover:bg-gray-600">4:00</SelectItem>
                      <SelectItem value="4:30" className="text-white hover:bg-gray-600">4:30</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    id="vocals"
                    checked={includeVocals}
                    onCheckedChange={setIncludeVocals}
                  />
                  <Label htmlFor="vocals" className="text-white">Include AI Vocals</Label>
                </div>
              </div>

              <Button
                onClick={generateMusic}
                disabled={musicLoading || !musicPrompt.trim()}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                {musicLoading ? 'Generating Music...' : 'Generate Music'}
              </Button>

              {musicError && (
                <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg">
                  {musicError}
                </div>
              )}

              {generatedMusic && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Generated Track</h3>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                        {generatedMusic.trackInfo.bpm} BPM
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                        {generatedMusic.trackInfo.key}
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                        {generatedMusic.quality}
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                    <h4 className="text-white font-semibold mb-2">{generatedMusic.trackInfo.title}</h4>
                    <p className="text-gray-300 text-sm mb-4">{generatedMusic.trackInfo.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white ml-2">{generatedMusic.trackInfo.duration}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Processing:</span>
                        <span className="text-white ml-2">{generatedMusic.processingTime}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-gray-400 text-sm">Instruments:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {generatedMusic.trackInfo.instruments.map((instrument, index) => (
                          <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {instrument}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Audio Player Placeholder */}
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                      <div className="flex items-center justify-center text-gray-400 text-sm">
                        <span className="text-2xl mr-2">🎵</span>
                        Audio player would be integrated here with the generated track
                        <br />
                        <span className="text-xs mt-1">In production: {generatedMusic.audioUrl}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="bg-gray-800/50 border-gray-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white text-xl">Pro Tips for Better Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h4 className="text-white font-semibold mb-2">For Better Lyrics:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Be specific about emotions and themes</li>
                  <li>• Include story elements or personal experiences</li>
                  <li>• Mention target audience or message</li>
                  <li>• Specify rhyme scheme preferences</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-2">For Better Music:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Describe specific instruments you want</li>
                  <li>• Mention production style (modern, vintage, etc.)</li>
                  <li>• Include energy level and dynamics</li>
                  <li>• Reference similar artists or songs</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
