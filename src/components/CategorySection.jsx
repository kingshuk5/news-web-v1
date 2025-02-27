"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useNewsContext } from "../context/NewsContext"
import NewsCard from "./NewsCard"
import "./CategorySection.css"

const CategorySection = ({ category, title, limit = 4 }) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { fetchTopHeadlines } = useNewsContext()

  useEffect(() => {
    const getArticles = async () => {
      try {
        setLoading(true)
        const data = await fetchTopHeadlines("us", category, limit)
        setArticles(data)
        setLoading(false)
      } catch (err) {
        setError(`Failed to load ${title} news`)
        setLoading(false)
      }
    }

    getArticles()
  }, [category, fetchTopHeadlines, limit, title])

  if (loading) {
    return (
      <div className="category-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{title}</h2>
          </div>
          <div className="loading">Loading {title} news...</div>
        </div>
      </div>
    )
  }

  if (error || !articles || articles.length === 0) {
    return (
      <div className="category-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{title}</h2>
          </div>
          <div className="error">{error || `No ${title} news available`}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="category-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <Link to={`/category/${category}`} className="view-all-link">
            View All
          </Link>
        </div>
        <div className="news-grid">
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategorySection

