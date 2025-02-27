"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useNewsContext } from "../context/NewsContext"
import "./Header.css"

const Header = () => {
  const { categories, searchQuery, setSearchQuery } = useNewsContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          NewsHub
        </Link>

        <div className={`nav-container ${isMenuOpen ? "active" : ""}`}>
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id} className="nav-item">
                  <Link to={`/category/${category.id}`} className="nav-link">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </form>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          <span className={`menu-icon ${isMenuOpen ? "active" : ""}`}></span>
        </button>
      </div>
    </header>
  )
}

export default Header

