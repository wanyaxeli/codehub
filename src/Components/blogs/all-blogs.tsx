'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Edit,
  Trash2,
  Star,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react'

interface Blog {
  id: string
  title: string
  author: string
  category: string
  reading_time: number
  image: string
  status: 'published' | 'draft'
  featured: boolean
  lastUpdated: string
}

interface AllBlogsSectionProps {
  blogs: Blog[]
  searchQuery: string
  filterCategory: string
  pendingChanges: Map<string, { featured?: boolean; status: 'published' | 'draft' }>
  onEdit: (blog: any) => void
  onFeatureToggle: (blogId: string) => void
  onPostToggle: (blogId: string) => void
  onDelete: (blogId: string) => void
  isLoading:boolean
}

const POSTS_PER_PAGE = 8

export function AllBlogsSection({
  blogs,
  searchQuery,
  filterCategory,
  pendingChanges,
  onEdit,
  onFeatureToggle,
  onPostToggle,
  onDelete,
  isLoading,
}: AllBlogsSectionProps) {
  const [currentPage, setCurrentPage] = useState(1)

  // Filter blogs
  const filteredBlogs = blogs?.filter(blog => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      filterCategory === 'all' || blog.category === filterCategory
    return matchesSearch && matchesCategory
  })
  // Paginate
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE)
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedBlogs = filteredBlogs.slice(
    startIdx,
    startIdx + POSTS_PER_PAGE
  )

  const getDisplayStatus = (blog: Blog) => {
    const pendingChange = pendingChanges.get(blog.id)
    return pendingChange ? pendingChange.status : blog.status
  }

  const getDisplayFeatured = (blog: Blog) => {
    const pendingChange = pendingChanges.get(blog.id)
    return pendingChange !== undefined ? pendingChange.featured : blog.featured
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      technology: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      design: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      marketing: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  if (!blogs) return <p>Loading Blogs...</p>

  return (
    <div className="!space-y-6">
      {/* Blog Grid */}
      <div className="!space-y-3">
        {paginatedBlogs.length > 0 ? (
          paginatedBlogs.map(blog => {
            const displayStatus = getDisplayStatus(blog)
            const displayFeatured = getDisplayFeatured(blog)
            const isPending = pendingChanges.has(blog.id)

            return (
              <Card
                key={blog.id}
                className={`border-transparent overflow-hidden transition-all duration-200 ${
                  displayFeatured
                    ? 'ring-2 !ring-[var(--primarysec)] !border-[var(--primarysec)] !bg-gradient-to-r !from-[var(--primarysec)]/5 !to-[var(--accentsec)]/5'
                    : ''
                } ${isPending ? 'ring-1 ring-[var(--primarysec)]/50' : ''}`}
              >
                <div className="!p-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                    {displayFeatured && (
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end justify-center !pb-1">
                        <Star className="w-4 h-4 text-white fill-white" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-foreground line-clamp-2">
                        {blog.title}
                      </h3>
                      <div className="flex items-center gap-3 !mt-2 text-sm text-muted-foreground">
                        <span>{blog.author}</span>
                        <span>•</span>
                        <Badge
                          variant="secondary"
                          className={`text-xs !p-1 ${getCategoryColor(blog.category)}`}
                        >
                          {blog.category}
                        </Badge>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {blog.reading_time} min
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(blog.lastUpdated??new Date()).toLocaleDateString()}
                        <span>•</span>
                        <Badge
                          variant={
                            displayStatus === 'published'
                              ? 'default'
                              : 'secondary'
                          }
                          className={
                            displayStatus === 'published'
                              ? '!p-1 bg-green-100 !p-1 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : '!p-1'
                          }
                        >
                          {displayStatus}
                        </Badge>
                        {isPending && (
                          <span className="text-primary font-medium text-xs">
                            (pending)
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => onEdit(blog)}
                          variant="outline"
                          size="sm"
                          className="gap-1 !p-1"
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </Button>

                        <Button
                          onClick={() => onPostToggle(blog.id)}
                          variant="outline"
                          size="sm"
                          className={
                            displayStatus === 'published'
                              ? '!p-2 text-red-600 hover:text-red-700'
                              : '!p-2 text-green-600 hover:text-green-700'
                          }
                        >
                          {displayStatus === 'published' ? 'Remove' : 'Post'}
                        </Button>

                        <Button
                          onClick={() => onFeatureToggle(blog.id)}
                          variant="outline"
                          size="sm"
                          className={
                            displayFeatured
                              ? ' !p-1 !bg-[var(--primarysec)] text-primary-foreground hover:bg-[var(--primarysec)]/90'
                              : '!p-1 text-muted-foreground hover:text-foreground'
                          }
                        >
                          <Star className={`w-3 h-3 ${displayFeatured ? 'fill-current' : ''}`} />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={()=>onDelete(blog.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 cursor-pointer"

                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })
        ) : isLoading ? (
    <Card className="!p-12 text-center">
      <Loader2 className="animate-spin !mx-auto !mb-2 text-muted-foreground" />
      <p className="text-muted-foreground">Loading blogs...</p>
    </Card>
  ):
        (
          <Card className="!p-12 text-center">
            <p className="text-muted-foreground">No blogs found</p>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between !p-4 bg-card rounded-lg border border-border">
          <div className="text-sm text-muted-foreground">
            Showing {startIdx + 1}-{Math.min(startIdx + POSTS_PER_PAGE, filteredBlogs.length)} of{' '}
            {filteredBlogs.length} posts
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>

            <Button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
              className="gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      
    </div>
  )
}
