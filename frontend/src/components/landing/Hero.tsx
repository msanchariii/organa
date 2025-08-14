"use client"
import React, { useState, useEffect } from 'react';
import { Heart, Users, ArrowRight, Sparkles } from 'lucide-react';

export default function OrganDonationHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { number: "107,000+", label: "People waiting for organs" },
    { number: "8", label: "Lives saved by one donor" },
    { number: "17", label: "People die daily waiting" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-red-50 to-red-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 sm:top-60 right-10 sm:right-20 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-red-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 sm:bottom-40 left-1/4 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 bg-red-300 rounded-full opacity-25 animate-ping"></div>
        
        {/* Floating Hearts */}
        {[...Array(5)].map((_, i) => (
          <Heart 
            key={i}
            className={`absolute text-red-200 opacity-10 animate-pulse hidden sm:block`}
            size={20}
            style={{
              top: `${20 + i * 15}%`,
              right: `${10 + i * 8}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-12 sm:py-16 lg:py-20">
          
          {/* Content Section */}
          <div className={`space-y-6 sm:space-y-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } text-center lg:text-left`}>
            
            {/* Main Heading */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-red-600 font-medium text-base sm:text-lg">
                <Sparkles className="animate-spin" size={18} />
                <span className="animate-pulse">Be Someone's Hero</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="bg-linear-to-r from-red-600 via-red-700 to-red-900 bg-clip-text text-transparent animate-pulse">
                  Give the
                </span>
                <br />
                <span className="bg-linear-to-r from-red-800 via-red-600 to-red-900 bg-clip-text text-transparent">
                  Gift of Life
                </span>
              </h1>
            </div>

            {/* Subtext */}
            <p className={`text-lg sm:text-xl text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0 transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              Your decision to become an organ donor can save up to 8 lives and heal countless others. 
              Join thousands of heroes making a difference beyond their lifetime.
            </p>

            {/* Animated Stats */}
            <div className={`bg-white/80 backdrop-blur-xs rounded-2xl p-4 sm:p-6 border border-red-100 shadow-xl transform transition-all duration-1000 delay-500 max-w-sm mx-auto lg:mx-0 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-red-600 animate-pulse">
                  {stats[currentStat].number}
                </div>
                <div className="text-gray-600 font-medium mt-1 text-sm sm:text-base">
                  {stats[currentStat].label}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start transform transition-all duration-1000 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              <button className="group relative bg-linear-to-r from-red-600 to-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-2xl hover:shadow-red-500/40 transform hover:-translate-y-2 hover:scale-110 transition-all duration-300 overflow-hidden">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                {/* Background Pulse */}
                <div className="absolute inset-0 bg-linear-to-r from-red-700 to-red-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                
                {/* Glow Ring */}
                <div className="absolute -inset-1 bg-linear-to-r from-red-400 to-red-600 rounded-full blur-sm opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                
                <span className="relative flex items-center justify-center gap-2">
                  <Heart className="group-hover:scale-125 group-hover:animate-pulse transition-transform duration-300" size={18} fill="currentColor" />
                  <span className="whitespace-nowrap">Become a Donor</span>
                  <ArrowRight className="group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" size={16} />
                </span>
                
                {/* Ripple Effect */}
                <div className="absolute inset-0 rounded-full border-2 border-white/30 scale-0 group-hover:scale-150 opacity-100 group-hover:opacity-0 transition-all duration-500"></div>
              </button>

              <button className="group relative bg-white text-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg border-2 border-red-600 hover:bg-red-600 hover:text-white transform hover:-translate-y-2 hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-red-500/30 overflow-hidden">
                {/* Background Fill Animation */}
                <div className="absolute inset-0 bg-red-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom rounded-full"></div>
                
                {/* Pulse Border */}
                <div className="absolute -inset-0.5 bg-linear-to-r from-red-400 to-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xs"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-red-100/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <span className="relative flex items-center justify-center gap-2 z-10">
                  <Users className="group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" size={18} />
                  <span className="whitespace-nowrap">View Recipients</span>
                  <ArrowRight className="group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" size={16} />
                </span>
                
                {/* Expanding Circle */}
                <div className="absolute top-1/2 left-1/2 w-0 h-0 bg-red-200/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 group-hover:w-full group-hover:h-full group-hover:scale-150 transition-all duration-500"></div>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600 transform transition-all duration-1000 delay-900 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Safe & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Visual Section */}
          <div className={`flex justify-center items-center order-first lg:order-last transform transition-all duration-1000 delay-200 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="relative">
              
              {/* Main Heart Animation */}
              <div className="relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 relative animate-pulse">
                  <Heart 
                    className="w-full h-full text-red-600 animate-bounce"
                    fill="url(#heartGradient)"
                    style={{ animationDuration: '2s' }}
                  />
                  
                  {/* Pulse Rings */}
                  <div className="absolute inset-0 border-2 sm:border-4 border-red-300 rounded-full animate-ping opacity-20"></div>
                  <div className="absolute inset-2 sm:inset-4 border border-red-400 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute inset-4 sm:inset-8 border border-red-500 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 bg-white rounded-full p-2 sm:p-4 shadow-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>
                  <Users className="text-red-600" size={20} />
                </div>
                
                <div className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 bg-white rounded-full p-2 sm:p-4 shadow-2xl animate-bounce" style={{ animationDelay: '1s' }}>
                  <Sparkles className="text-red-600" size={20} />
                </div>

                {/* Connection Lines */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {[...Array(8)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-8 sm:w-12 md:w-16 h-0.5 bg-linear-to-r from-red-400 to-transparent animate-pulse"
                      style={{
                        transform: `rotate(${i * 45}deg)`,
                        transformOrigin: '0 0',
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SVG Definitions */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#DC2626', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#EF4444', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#B91C1C', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}