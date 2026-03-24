import React, { useState, useEffect } from 'react';
import { Search, Instagram, BarChart3, Loader2, Award, AlertCircle } from 'lucide-react';
import { scrapeInstagramProfile } from './utils/scraper';
import { Dashboard } from './components/Dashboard';
import { InfluencerData } from './types';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<InfluencerData | null>(null);

  useEffect(() => {
    if (!activeQuery) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const result = await scrapeInstagramProfile(activeQuery);
        setData(result);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveQuery(searchInput.trim());
    }
  };

  const resetSearch = () => {
    setData(null);
    setError(null);
    setSearchInput('');
    setActiveQuery('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900">
      {/* Navigation / Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={resetSearch}>
            <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-2 rounded-xl text-white">
              <BarChart3 size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">CreatorStats IN</span>
          </div>

          {(data || loading || error) && (
            <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search any creator (@username)..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-full focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-sm"
                />
              </div>
            </form>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)]">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
            <p className="text-gray-900 font-medium text-lg">Scraping live profile data...</p>
            <p className="text-sm text-gray-500 mt-2">This may take 10-20 seconds depending on Apify's queue.</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
            <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={24} />
              </div>
              <h2 className="text-lg font-bold text-red-900 mb-2">Failed to fetch profile</h2>
              <p className="text-red-700 text-sm mb-6">{error}</p>
              <button 
                onClick={resetSearch}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors"
              >
                Try Another Username
              </button>
            </div>
          </div>
        ) : !data ? (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-20">
            <div className="max-w-2xl w-full text-center space-y-8">
              <div className="inline-flex items-center justify-center p-4 bg-indigo-50 rounded-full mb-4">
                <Instagram className="w-12 h-12 text-indigo-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                Discover Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-600">Influencer Analytics</span>
              </h1>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                Instantly unlock live insights, engagement rates, and recent performance for any Instagram creator.
              </p>

              <form onSubmit={handleSearch} className="mt-8 max-w-xl mx-auto relative">
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-gray-400 font-medium text-lg">@</span>
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="virat.kohli, bhuvan.bam22..."
                    className="w-full pl-10 pr-32 py-4 bg-white border border-gray-200 rounded-full shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-lg"
                  />
                  <button
                    type="submit"
                    disabled={!searchInput.trim()}
                    className="absolute right-2 top-2 bottom-2 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-medium rounded-full transition-colors"
                  >
                    Analyze
                  </button>
                </div>
              </form>
              
              <div className="pt-8 flex items-center justify-center gap-6 text-sm text-gray-500 font-medium">
                <span className="flex items-center gap-2"><Award size={16} className="text-green-500"/> Live Apify Scraper Enabled</span>
              </div>
            </div>
          </div>
        ) : (
          <Dashboard data={data} />
        )}
      </main>
    </div>
  );
}

export default App;
