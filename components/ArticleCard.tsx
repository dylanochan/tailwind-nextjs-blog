'use client'
import Image from './Image'
import Link from './Link'
import { Blog } from '.contentlayer/generated/types'
import { RoughNotation } from 'react-rough-notation'
import { useRef, useState } from 'react'
import Tag from '@/components/Tag'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'
const Card = ({ blog }: { blog: Blog }) => {
  const href: string = blog.images[0] || '/static/images/logo.png'
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (event: React.MouseEvent) => {
    setIsHovered(true)

    if (cardRef.current) {
      const parent = cardRef.current.parentElement
      if (parent) {
        const cardRect = cardRef.current.getBoundingClientRect()
        const parentRect = parent.getBoundingClientRect()
        const mouseX = event.clientX

        // 判断卡片是否完全在容器的可视范围内
        const isFullyVisible =
          cardRect.left >= parentRect.left &&
          cardRect.right <= parentRect.right &&
          (cardRef.current === parent.firstElementChild ||
            cardRef.current === parent.lastElementChild)

        if (isFullyVisible) return // ✅ 已经可见，无需滚动

        // 滚动卡片居中（或根据鼠标位置居中）
        const cardCenter = cardRect.left + cardRect.width / 2
        parent.scrollTo({
          left: parent.scrollLeft + (cardCenter - mouseX),
          behavior: 'smooth',
        })
      }
    }
  }

  return (
    <div
      className="w-2/3 flex-shrink-0 sm:w-2/3 md:w-1/2 lg:w-1/3"
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RoughNotation type="box" show={isHovered} color="#2285b8" strokeWidth={3} padding={0}>
        <div className="flex h-full flex-col overflow-hidden rounded-md bg-gray-200/20 p-4 shadow-md backdrop-blur-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl supports-[not(backdrop-filter)]:bg-gray-300/20 dark:bg-gray-800/40 dark:shadow-gray-900/50 dark:supports-[not(backdrop-filter)]:bg-gray-700/50">
          {href &&
            (href ? (
              <Link href={blog.title} aria-label={`Link to ${blog.title}`}>
                <Image
                  alt={blog.title}
                  src={href}
                  className="object-cover object-center sm:h-24 md:h-48 lg:h-64"
                  width={544}
                  height={306}
                />
              </Link>
            ) : (
              <Image
                alt={blog.title}
                src={href}
                className="object-cover object-center sm:h-24 md:h-48 lg:h-64"
                width={544}
                height={306}
              />
            ))}
          <div className="mt-2 flex flex-1 flex-col space-y-5">
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-2xl leading-8 font-bold tracking-tight">
                  <Link href={`/blog/${blog.slug}`} className="text-gray-900 dark:text-gray-100">
                    {blog.title}
                  </Link>
                </h2>
                <div className="flex flex-wrap">
                  {blog.tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
              <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                {blog.summary}
              </div>
            </div>
            <div className="flex justify-between text-base leading-6 font-medium">
              <dl>
                <dt className="sr-only">Published on</dt>
                <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                  <time dateTime={blog.date}>{formatDate(blog.date, siteMetadata.locale)}</time>
                </dd>
              </dl>
              <Link
                href={`/blog/${blog.slug}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read more: "${blog.title}"`}
              >
                Read more &rarr;
              </Link>
            </div>
          </div>
        </div>
      </RoughNotation>
    </div>
  )
}

export default Card
