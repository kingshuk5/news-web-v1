"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useNewsContext } from "../context/NewsContext"
import "./HeroSection.css"

const HeroSection = () => {
  const [featuredNews, setFeaturedNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { fetchTopHeadlines, generateArticleId } = useNewsContext()

  useEffect(() => {
    const getTopNews = async () => {
      try {
        setLoading(true)
        const articles = await fetchTopHeadlines("us", "", 1)
        if (articles && articles.length > 0) {
          setFeaturedNews(articles[0])
        }
        setLoading(false)
      } catch (err) {
        setError("Failed to load featured news")
        setLoading(false)
      }
    }

    getTopNews()
  }, [fetchTopHeadlines])

  if (loading) {
    return (
      <div className="hero-section loading-hero">
        <div className="container">
          <div className="hero-loading">Loading featured news...</div>
        </div>
      </div>
    )
  }

  if (error || !featuredNews) {
    return (
      <div className="hero-section error-hero">
        <div className="container">
          <div className="hero-error">{error || "No featured news available"}</div>
        </div>
      </div>
    )
  }

  const articleId = generateArticleId(featuredNews)
  const formattedDate = new Date(featuredNews.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: featuredNews.urlToImage
          ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${featuredNews.urlToImage})`
          : "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
      }}
    >
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-meta">
            <span className="hero-tag">Breaking News</span>
            <span className="hero-date">{formattedDate}</span>
          </div>
          <h1 className="hero-title">{featuredNews.title}</h1>
          <p className="hero-description">{featuredNews.description}</p>
          <div className="hero-source">
            {featuredNews.source?.name && <span>Source: {featuredNews.source.name}</span>}
          </div>
          <Link to={`/article/${articleId}`} className="hero-btn">
            Read Full Story
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroSection

