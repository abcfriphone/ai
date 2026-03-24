import React from 'react';
import { InfluencerData } from '../types';
import { formatNumber, formatPercentage } from '../utils/formatters';
import { StatCard } from './StatCard';
import { Users, Heart, MessageCircle, TrendingUp, Image as ImageIcon, Award, CheckCircle2 } from 'lucide-react';

interface DashboardProps {
  data: InfluencerData;
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-500">
      
      {/* Data Source Indicator */}
      <div className="flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-medium border bg-emerald-50 text-emerald-700 border-emerald-200">
        <CheckCircle2 size={18} />
        <span>Successfully scraped live data directly from Instagram for @{data.username}.</span>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="relative">
          <img src={data.avatarUrl} alt={data.fullName} className="w-32 h-32 rounded-full object-cover border-4 border-indigo-50" />
          {data.isVerified && (
            <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full border-2 border-white">
              <Award size={16} />
            </div>
          )}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{data.fullName}</h1>
            <span className="text-lg text-indigo-600 font-medium">@{data.username}</span>
          </div>
          <p className="text-sm font-medium text-gray-500 mb-4 inline-flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
            {data.category}
          </p>
          <p className="text-gray-600 max-w-2xl leading-relaxed whitespace-pre-wrap">{data.bio}</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm shadow-indigo-200">
            Generate Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Followers" 
          value={formatNumber(data.stats.followers)} 
          icon={Users} 
        />
        <StatCard 
          title="Engagement Rate" 
          value={formatPercentage(data.stats.engagementRate)} 
          icon={TrendingUp} 
          subtitle="Based on recent posts"
        />
        <StatCard 
          title="Average Likes" 
          value={formatNumber(data.stats.avgLikes)} 
          icon={Heart} 
        />
        <StatCard 
          title="Average Comments" 
          value={formatNumber(data.stats.avgComments)} 
          icon={MessageCircle} 
        />
      </div>

      {/* Recent Posts */}
      {data.recentPosts.length > 0 && (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ImageIcon size={20} className="text-gray-400" /> Recent Content Performance
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {data.recentPosts.map((post) => (
              <div key={post.id} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img src={post.imageUrl} alt="Recent post" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-2">
                  <div className="flex items-center gap-1 font-medium"><Heart size={16} fill="currentColor" /> {formatNumber(post.likes)}</div>
                  <div className="flex items-center gap-1 font-medium"><MessageCircle size={16} fill="currentColor" /> {formatNumber(post.comments)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
