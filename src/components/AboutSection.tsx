'use client'
import { useEffect } from 'react'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import { useState } from 'react'
import clsx from 'clsx'
import { getShowDetails } from '@/lib/episodes'


export function AboutSection(props: React.ComponentPropsWithoutRef<'section'>) {
  let [isExpanded, setIsExpanded] = useState(false);

  // Fetches show description directly from RSS feed
  const [showDetails, setShowDetails] = useState({ title: '', description: '' });
  useEffect(() => {
    async function getDetails() {
      const showDetails = await getShowDetails()
      setShowDetails(showDetails);
    }
    getDetails()
  }, [])

  return (
    <section {...props}>
      <p></p>
      <h2 className="flex items-center text-xl font-extrabold leading-7 text-slate-900">About</h2>
      <p
        className={clsx(
          'mt-2 text-base leading-7 text-slate-700',
          !isExpanded && 'lg:line-clamp-4',
        )}
      >
        {showDetails.description}
      </p>
      {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900 lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </button>
      )}
    </section>
  )
}
