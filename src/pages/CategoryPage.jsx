"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNewsContext } from "../context/NewsContext"
import NewsCard from "../components/NewsCard"
import "./CategoryPage.css"

const CategoryPage = () => {
  const { categoryName } = useParams()
  const { categories, fetchTopHeadlines } = useNewsContext()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Find the category title
  const category = categories.find((cat) => cat.id === categoryName)
  const categoryTitle = category ? category.name : categoryName.charAt(0).toUpperCase() + categoryName.slice(1)

  useEffect(() => {
    document.title = `${categoryTitle} News - NewsHub`

    const getArticles = async () => {
      try {
        setLoading(true)
        const data = await fetchTopHeadlines("us", categoryName, 20)
        setArticles(data)
        setLoading(false)
      } catch (err) {
        setError(`Failed to load ${categoryTitle} news`)
        setLoading(false)
      }
    }

    getArticles()
  }, [categoryName, categoryTitle, fetchTopHeadlines])

  if (loading) {
    return (
      <div className="category-page">
        <div className="container">
          <div className="category-header">
            <h1 className="category-title">{categoryTitle} News</h1>
          </div>
          <div className="loading">Loading {categoryTitle} news...</div>
        </div>
      </div>
    )
  }

  if (error || !articles || articles.length === 0) {
    return (
      <div className="category-page">
        <div className="container">
          <div className="category-header">
            <h1 className="category-title">{categoryTitle} News</h1>
          </div>
          <div className="error">{error || `No ${categoryTitle} news available`}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="category-page">
      <div className="container">
        <div className="category-header">
          <h1 className="category-title">{categoryTitle} News</h1>
          <p className="category-description">
            Latest {categoryTitle.toLowerCase()} news and updates from around the world.
          </p>
        </div>

        <div className="category-grid">
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage

