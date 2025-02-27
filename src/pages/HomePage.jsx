"use client"

import { useEffect } from "react"
import HeroSection from "../components/HeroSection"
import CategorySection from "../components/CategorySection"
import { useNewsContext } from "../context/NewsContext"
import "./HomePage.css"

const HomePage = () => {
  const { categories } = useNewsContext()

  useEffect(() => {
    document.title = "NewsHub - Latest News from Around the World"
  }, [])

  return (
    <div className="home-page">
      <HeroSection />

      <section className="featured-categories">
        {categories.map((category) => (
          <CategorySection key={category.id} category={category.id} title={category.name} limit={4} />
        ))}
      </section>
    </div>
  )
}

export default HomePage

