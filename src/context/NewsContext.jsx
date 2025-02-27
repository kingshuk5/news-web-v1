"use client"

import { createContext, useState, useContext } from "react"

const NewsContext = createContext()

export const useNewsContext = () => useContext(NewsContext)

export const NewsProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const API_KEY = "a885b175578c4d5386452982023dafd3"
  const API_BASE_URL = "https://newsapi.org/v2"

  // Categories for the website
  const categories = [
    { id: "business", name: "Business" },
    { id: "technology", name: "Technology" },
    { id: "entertainment", name: "Entertainment" },
    { id: "sports", name: "Sports" },
    { id: "health", name: "Health" },
  ]

  // Function to fetch top headlines
  const fetchTopHeadlines = async (country = "us", category = "", pageSize = 10) => {
    try {
      let url = `${API_BASE_URL}/top-headlines?country=${country}&apiKey=${API_KEY}`

      if (category) {
        url += `&category=${category}`
      }

      if (pageSize) {
        url += `&pageSize=${pageSize}`
      }

      const response = await fetch(url)
      const data = await response.json()

      if (data.status !== "ok") {
        throw new Error(data.message || "Failed to fetch news")
      }

      return data.articles
    } catch (error) {
      console.error("Error fetching top headlines:", error)
      throw error
    }
  }

  // Function to search for news
  const searchNews = async (query, pageSize = 20) => {
    try {
      const url = `${API_BASE_URL}/everything?q=${query}&apiKey=${API_KEY}&pageSize=${pageSize}`
      const response = await fetch(url)
      const data = await response.json()

      if (data.status !== "ok") {
        throw new Error(data.message || "Failed to search news")
      }

      return data.articles
    } catch (error) {
      console.error("Error searching news:", error)
      throw error
    }
  }

  // Generate a unique ID for each article (since newsapi doesn't provide one)
  const generateArticleId = (article) => {
    return btoa(article.url).replace(/[^a-zA-Z0-9]/g, "")
  }

  const value = {
    searchQuery,
    setSearchQuery,
    categories,
    fetchTopHeadlines,
    searchNews,
    generateArticleId,
  }

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>
}

