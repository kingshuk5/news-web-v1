"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useNewsContext } from "../context/NewsContext"
import "./ArticlePage.css"

const ArticlePage = () => {
  const { articleId } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { searchNews } = useNewsContext()

  useEffect(() => {
    const getArticle = async () => {
      try {
        setLoading(true)

        // Since NewsAPI doesn't provide a way to get a specific article by ID,
        // we need to decode the ID to get the URL and then search for it
        const url = atob(articleId.replace(/[^a-zA-Z0-9]/g, ""))

        // Search for the article using its URL
        const articles = await searchNews(`url:"${url}"`)

        if (articles && articles.length > 0) {
          setArticle(articles[0])
          document.title = articles[0].title || "Article - NewsHub"
        } else {
          setError("Article not found")
        }

        setLoading(false)
      } catch (err) {
        setError("Failed to load article")
        setLoading(false)
      }
    }

    getArticle()
  }, [articleId, searchNews])

  if (loading) {
    return (
      <div className="article-page">
        <div className="container">
          <div className="loading">Loading article...</div>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="article-page">
        <div className="container">
          <div className="error">{error || "Article not found"}</div>
          <Link to="/" className="back-link">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="article-page">
      <div className="container">
        <article className="article-content">
          <Link to="/" className="back-link">
            Back to Home
          </Link>

          <header className="article-header">
            <h1 className="article-title">{article.title}</h1>

            <div className="article-meta">
              {article.source?.name && (
                <span className="article-source">
                  <strong>Source:</strong> {article.source.name}
                </span>
              )}
              <span className="article-date">
                <strong>Published:</strong> {formattedDate}
              </span>
              {article.author && (
                <span className="article-author">
                  <strong>Author:</strong> {article.author}
                </span>
              )}
            </div>
          </header>

          {article.urlToImage && (
            <div className="article-image-container">
              <img
                src={article.urlToImage || "/placeholder.svg"}
                alt={article.title}
                className="article-image"
                onError={(e) => {
                  e.target.src = "/placeholder-news.jpg"
                }}
              />
            </div>
          )}

          <div className="article-body">
            {article.description && <p className="article-description">{article.description}</p>}

            {article.content && <div className="article-content-text">{article.content.split("[+")[0]}</div>}

            <div className="article-read-more">
              <p>This is a preview of the article. To read the full article, please visit the original source:</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more-link">
                Read Full Article
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default ArticlePage

