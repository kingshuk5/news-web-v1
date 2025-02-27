import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import CategoryPage from "./pages/CategoryPage"
import ArticlePage from "./pages/ArticlePage"
import { NewsProvider } from "./context/NewsContext"

function App() {
  return (
    <NewsProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/article/:articleId" element={<ArticlePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </NewsProvider>
  )
}

export default App

