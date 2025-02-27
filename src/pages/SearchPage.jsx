// "use client"

// import { useState, useEffect } from "react"
// import { useLocation, Link } from "react-router-dom"
// import { useNewsContext } from "../context/NewsContext"
// import NewsCard from "../components/NewsCard"
// import "./SearchPage.css"
// import { useRouter } from "next/router"

// const SearchPage = () => {

//   const router =useRouter();
//   const queryParams = new URLSearchParams(router.search);
//   const query = queryParams.get("q") || ""

//   const { searchNews } = useNewsContext()
//   const [articles, setArticles] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     document.title = `Search: ${query} - NewsHub`

//     const getSearchResults = async () => {
//       if (!query.trim()) {
//         setLoading(false)
//         return
//       }

//       try {
//         setLoading(true)
//         const data = await searchNews(query, 30)
//         setArticles(data)
//         setLoading(false)
//       } catch (err) {
//         setError("Failed to load search results")
//         setLoading(false)
//       }
//     }

//     getSearchResults()
//   }, [query, searchNews])

//   if (loading) {
//     return (
//       <div className="search-page">
//         <div className="container">
//           <div className="search-header">
//             <h1 className="search-title">Searching for: {query}</h1>
//           </div>
//           <div className="loading">Loading search results...</div>
//         </div>
//       </div>
//     )
//   }

//   if (!query.trim()) {
//     return (
//       <div className="search-page">
//         <div className="container">
//           <div className="search-header">
//             <h1 className="search-title">Search News</h1>
//           </div>
//           <div className="search-empty">
//             <p>Please enter a search term to find news articles.</p>
//             <Link to="/" className="back-link">
//               Back to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="search-page">
//         <div className="container">
//           <div className="search-header">
//             <h1 className="search-title">Search Results for: {query}</h1>
//           </div>
//           <div className="error">{error}</div>
//           <Link to="/" className="back-link">
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="search-page">
//       <div className="container">
//         <div className="search-header">
//           <h1 className="search-title">Search Results for: {query}</h1>
//           <p className="search-count">
//             {articles.length} {articles.length === 1 ? "result" : "results"} found
//           </p>
//         </div>

//         {articles.length === 0 ? (
//           <div className="search-empty">
//             <p>No results found for "{query}". Please try a different search term.</p>
//             <Link to="/" className="back-link">
//               Back to Home
//             </Link>
//           </div>
//         ) : (
//           <div className="search-grid">
//             {articles.map((article, index) => (
//               <NewsCard key={index} article={article} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default SearchPage

