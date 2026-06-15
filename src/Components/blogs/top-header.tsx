'use client'

import { Search, Plus, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface TopHeaderProps {
  viewMode: 'all-posts' | 'upload-blog'
  onViewModeChange: (mode: 'all-posts' | 'upload-blog') => void
  searchQuery: string
  onSearchChange: (query: string) => void
  filterCategory: string
  onFilterChange: (category: string) => void
  blogCount: number
  hasUnsavedChanges: boolean
  onSaveChanges: () => void
  onNewBlog: () => void
}

export function TopHeader({
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
  filterCategory,
  onFilterChange,
  blogCount,
  hasUnsavedChanges,
  onSaveChanges,
  onNewBlog,
}: TopHeaderProps) {
  return (
    <div className="border-b border-border bg-[#F8F8FF]">
      {/* Main Header Row */}
      <div className="!px-6 !py-4 flex items-center justify-between">
        {/* Left: Title */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">
            Blog Management
          </h1>
        </div>

        {/* Right: Save Changes Button */}
        <Button
          onClick={onSaveChanges}
          disabled={!hasUnsavedChanges}
          className={`!p-3 gap-2 ${
            hasUnsavedChanges
              ? '!bg-[var(--primarysec)] hover:!bg-[var(--primarysec)]/90 text-primary-foreground'
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          }`}
        >
          <Save className="w-4 h-4" />
          Save Changes
          {hasUnsavedChanges && (
            <Badge variant="secondary" className="!ml-2 !p-1 bg-[var(--accentsec)] text-[var(--foreground)]">
              Unsaved
            </Badge>
          )}
        </Button>
      </div>

      {/* Second Row: Search, Filter, Count */}
      <div className="!px-6 !py-4 flex items-center justify-between gap-4 border-t border-border">
        {/* Left: Search and Filter */}
        <div className="flex items-center gap-4 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-xs flex ">
            <Search className="absolute !left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className="!pl-10 !bg-[var(--muted)] border-transparent rounded-lg"
            />
          </div>

          {/* Filter Dropdown */}
          <Select value={filterCategory} onValueChange={onFilterChange}>
            <SelectTrigger className="w-40 !bg-[var(--muted)]  !border-transparent rounded-lg text-muted-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Center: Blog Count */}
        <div className="text-sm text-muted-foreground font-medium">
          Total: <span className="text-foreground font-semibold">{blogCount}</span> blogs
        </div>

        {/* Right: Toggle Buttons */}
        <div className="flex items-center gap-3">
          <div className="flex gap-2 !bg-[var(--muted)] !p-1 rounded-lg">
            <Button
              onClick={() => onViewModeChange('all-posts')}
              variant={viewMode === 'all-posts' ? 'default' : 'ghost'}
              size="sm"
              className={`!p-3 rounded-md ${
                viewMode === 'all-posts'
                  ? '!bg-[var(--primarysec)] text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All Posts
            </Button>
            <Button
              onClick={() => onViewModeChange('upload-blog')}
              variant={viewMode === 'upload-blog' ? 'default' : 'ghost'}
              size="sm"
              className={`rounded-md font-semibold  !p-1 ${
                viewMode === 'upload-blog'
                  ? '!bg-[var(--primarysec)] text-[var(--primary-foreground)]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Upload Blog
            </Button>
          </div>

          {/* New Blog Button (only show on All Posts view) */}
          {viewMode === 'all-posts' && (
            <Button
              onClick={onNewBlog}
              className="gap-2 !p-3 !bg-[var(--primarysec)] hover:!bg-[var(--primarysec)]/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4" />
              New Blog
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
