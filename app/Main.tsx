'use client'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import ArticleCard from '@/components/ArticleCard'
import { Blog } from 'contentlayer/generated'
import { RoughNotation } from 'react-rough-notation'
import { useEffect, useRef, useState } from 'react'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(posts.length > 1)

  useEffect(() => {
    const container = scrollRef.current
    const updateScrollState = () => {
      if (container) {
        // @ts-ignore
        setCanScrollLeft(container.scrollLeft > 0)
        // @ts-ignore
        setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1)
      }
    }
    // @ts-ignore
    container.addEventListener('scroll', updateScrollState)
    updateScrollState()
    return () => {
      // @ts-ignore
      container.removeEventListener('scroll', updateScrollState)
    }
  }, [posts.length])

  const scrollLeft = () => {
    // @ts-ignore
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
  }

  const scrollRight = () => {
    // @ts-ignore
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
  }

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-2 pb-4">
          {/*<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">*/}
          {/*  Latest*/}
          {/*</h1>*/}

          <p className="bold text-lg leading-7 text-gray-600 dark:text-white">
            <RoughNotation type="highlight" show color="#f06449" strokeWidth={0} padding={16}>
              {siteMetadata.description}
            </RoughNotation>
          </p>
        </div>
        <div className="relative container w-full py-4">
          {/* Left Button */}
          <button
            className={`absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-green-200/80 p-2 shadow-md transition-colors hover:bg-green-300/80 dark:bg-gray-700/80 dark:hover:bg-gray-600/80 ${
              !canScrollLeft && 'invisible'
            }`}
            onClick={scrollLeft}
          >
            <svg
              className="h-6 w-6 text-gray-800 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {/* Right Button */}
          <button
            className={`absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-green-200/80 p-2 shadow-md transition-colors hover:bg-green-300/80 dark:bg-gray-700/80 dark:hover:bg-gray-600/80 ${
              !canScrollRight && 'invisible'
            }`}
            onClick={scrollRight}
          >
            <svg
              className="h-6 w-6 text-gray-800 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div
            ref={scrollRef}
            className="no-scrollbar relative flex flex-nowrap gap-x-8 overflow-x-auto p-4 pb-12"
          >
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              return <ArticleCard blog={post} key={post.slug} />
            })}
          </div>
        </div>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
