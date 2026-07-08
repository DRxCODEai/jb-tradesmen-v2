import { useEffect, useState, type TouchEvent } from 'react'
import { reviews } from '../data/reviews'

export default function ReviewCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const visibleReviews = reviews

  useEffect(() => {
    if (isPaused) {
      return undefined
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % visibleReviews.length)
    }, 7000)

    return () => window.clearInterval(interval)
  }, [isPaused, visibleReviews.length])

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + visibleReviews.length) % visibleReviews.length)
  }

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % visibleReviews.length)
  }

  const activeReview = visibleReviews[activeIndex]

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0].clientX)
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) {
      return
    }

    const delta = event.changedTouches[0].clientX - touchStartX
    if (delta > 50) {
      goToPrevious()
    } else if (delta < -50) {
      goToNext()
    }

    setTouchStartX(null)
  }

  return (
    <section
      className="content-section alt-section review-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="section-heading review-heading">
        <p className="section-label">Google Reviews</p>
        <h2>Real Google Reviews</h2>
        <p className="review-copy">
          See what real customers have to say about working with JBTRADESMENLLC.
        </p>
      </div>

      <div
        className="review-carousel"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="review-card" key={activeReview.name}>
          <div className="review-card-top">
            <div className="review-stars" aria-label={`Rated ${activeReview.rating} out of 5 stars`}>
              {Array.from({ length: activeReview.rating }).map((_, index) => (
                <span key={`${activeReview.name}-${index}`}>★</span>
              ))}
            </div>
            <span className="review-badge">Google Verified</span>
          </div>
          <div className="review-quote">“</div>
          <p className="review-text">{activeReview.review}</p>
          <div className="review-author">
            <h3>{activeReview.name}</h3>
            <p>{activeReview.title}</p>
          </div>
        </div>

        <div className="review-controls">
          <button type="button" className="review-arrow" onClick={goToPrevious} aria-label="Previous review">
            ←
          </button>
          <div className="review-dots" aria-label="Review pagination">
            {visibleReviews.map((review, index) => (
              <button
                key={review.name}
                type="button"
                className={`review-dot${index === activeIndex ? ' active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
          <button type="button" className="review-arrow" onClick={goToNext} aria-label="Next review">
            →
          </button>
        </div>
      </div>
    </section>
  )
}
