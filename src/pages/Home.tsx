import React from 'react';
import HeroSection from '../components/home/HeroSection';
import Features from '../components/home/Features';
import FeaturedCourses from '../components/home/FeaturedCourses';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Features />
      <FeaturedCourses />
    </div>
  );
}