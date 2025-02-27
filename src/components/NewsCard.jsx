import { Link } from "react-router-dom"
import { useNewsContext } from "../context/NewsContext"
import "./NewsCard.css"

const NewsCard = ({ article }) => {
  const { generateArticleId } = useNewsContext()

  if (!article) return null

  const articleId = generateArticleId(article)

  // Format the date
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  // Use a placeholder image if urlToImage is null
  const imageUrl = article.urlToImage || "/placeholder-news.jpg"

  return (
    <Link to={`/article/${articleId}`} className="news-card">
      <div className="news-card-image-container">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={article.title}
          className="news-card-image"
          onError={(e) => {
            e.target.src = "/placeholder-news.jpg"
          }}
        />
      </div>
      <div className="news-card-content">
        <h3 className="news-card-title">{article.title}</h3>
        <div className="news-card-meta">
          {article.source?.name && <span className="news-card-source">{article.source.name}</span>}
          <span className="news-card-date">{formattedDate}</span>
        </div>
        <p className="news-card-description">{article.description}</p>
      </div>
    </Link>
  )
}

export default NewsCard

