'use client'

import { AllBlogsSection } from '@/Components/blogs/all-blogs'
import { TopHeader } from '@/Components/blogs/top-header'
import { UploadEditSection } from '@/Components/blogs/upload-edit'
import { ConfirmationModal } from '@/Components/layoutss/confirmationmodal'
import { ToastNotification } from '@/Components/layoutss/toastNotification'
import { useToast } from '@/hooks/useToast'
import useStore from '@/lib/storage'
import axios from 'axios'
import { useEffect, useState } from 'react'
// import { Sidebar } from '@/components/sidebar'

type ViewMode = 'all-posts' | 'upload-blog'

interface Blog {
  id: string
  title: string
  author: string
  category: string
  readingTime: number
  thumbnail: string
  status: 'published' | 'draft'
  featured: boolean
  lastUpdated: string
}

export default function BlogAdminPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('all-posts')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [editingBlog, setEditingBlog] = useState<any>()
  const [pendingChanges, setPendingChanges] = useState<
    Map<string, {status: 'published' | 'draft' }>
  >(new Map())
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isloading, setIsLoading] = useState(true)

  const { toasts, addToast, resolveToast, removeToast } = useToast()

  // Sample blog data
  const [blogs, setBlogs] = useState<any>([])
  const {allblogs,fetchblogs}=useStore()
   const apiurl = process.env.NEXT_PUBLIC_API_URL || "https://api.codingscholar.com";
    console.log('api url',apiurl)

      const handlegetBlogs= async() => {
      try{
      // setIsAiLoading(true)
      console.log('getblogs...')

      const res=await axios.get(`${apiurl}/fetch_blogs/`)
      const blogsres=await res.data
      console.log('saving response...',blogsres)
      if(blogsres.length>0){
        setIsLoading(false)
         setBlogs(blogsres)
      
      // setDraftAiSuccess(true)
  
      }
      }catch(e){
        console.log('error..',e)
      }finally{
        setIsLoading(false)
    
      }  
    }
     useEffect(()=>{
      const timer = setTimeout(() => setIsLoading(false), 20000)
      handlegetBlogs()
      return () => clearTimeout(timer)
    },[])

   

  const handleFeatureToggle = async(blogId: string) => {
     const currentBlog = blogs.find((b:any) => b.id === blogId)
     console.log('id',blogId)
    let feature
    if (currentBlog?.featured) {
      // Unfeature
      feature=false
      
    } else {
      // Feature - remove feature from other blog
      feature=true
    }

    const toastId = addToast(
    feature ? `Setting featured post… ${feature}` : 'Removing featured post…',
    `"${currentBlog?.title}"`
  )

    console.log('feature....',feature)
    const res=await axios.post(`${apiurl}/feature_blog/`,{blogId,feature})
    
    const savingres=await res.data
    
    console.log('saving response...',savingres)
    if (savingres.success){
      resolveToast(toastId, feature ? 'Featured!' : 'Unfeatured', `"${currentBlog?.title}"`)
      alert(`blog set to ${feature ? 'Featured!' : 'Unfeatured'}`)
      handlegetBlogs()
      setPendingChanges(new Map())
    }

  }

  const handleDeleteClick = (id: string) => {
  setDeletingId(id)
  setDeleteModalOpen(true)
}

 const handleDeleteConfirm = async () => {
  if (!deletingId) return
  setIsDeleting(true)
  await handleDelete(deletingId)
  setIsDeleting(false)
  setDeleteModalOpen(false)
  setDeletingId(null) 
}

  const handleDeleteCancel = () => {
  setDeleteModalOpen(false)
  setDeletingId(null)
}

  const handleDelete = async(blogId: string) => {
     if (!deletingId) return
     const currentBlog = blogs.find((b:any) => b.id === blogId)
     console.log('id',blogId)
     if(!currentBlog) return
     setIsDeleting(true)
    

    const toastId = addToast(
     'Deleting Blog....',
    `"${currentBlog?.title}"`
  )

    const res=await axios.post(`${apiurl}/blog_delete/`,{blogId})
    
    const savingres=await res.data
    
    console.log('saving response...',savingres)
    if (savingres.success){
      resolveToast(toastId, 'Blog Deleted', `"${currentBlog?.title}"`)
      alert(`Blog Deleted Successfully`)
      handlegetBlogs()
      setPendingChanges(new Map())
      setIsDeleting(false)
      setDeleteModalOpen(false)
      setDeletingId(null)
    }
    setIsDeleting(false)
    setDeleteModalOpen(false)
  setDeletingId(null)

  }

  const handlePostToggle = (blogId: string) => {
    // const newChanges = new Map(pendingChanges)
    const currentBlog = blogs.find((b:any) => b.id === blogId)
    console.log('currentblog status..',currentBlog)
    const newStatus:'published' |'draft' = currentBlog?.status === 'published' ? 'draft' : 'published'
    console.log('new blog status...',newStatus ,'id', blogId)

    // newChanges.set(blogId, {
    //   ...newChanges.get(blogId),
    //   status: newStatus,
    // })
     setPendingChanges(prev => {
    const next = new Map(prev)
    next.set(blogId, { status:newStatus })
    return next
  })
    // setPendingChanges(newChanges)
    setHasUnsavedChanges(true)

  }



  const handleSaveChanges = async() => {
    const toastId = addToast('Saving changes…', 'Applying pending updates')

    const payload = Array.from(pendingChanges.entries()).map(([id, { status }]) => ({
    id,
    status
  }))
 

  const res = await axios.post(`${apiurl}/bulkupdate/`, payload, {
    headers: { 'Content-Type': 'application/json' }
  })

  if (res.data.success) {
    resolveToast(toastId, 'Changes saved', 'All updates applied')
    setPendingChanges(new Map()) // clear after save
  }

    handlegetBlogs()
    // setPendingChanges(new Map())
    setHasUnsavedChanges(false)
  }

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog(blog)
    setViewMode('upload-blog')
  }

  const handleNewBlog = () => {
    setEditingBlog(null)
    setViewMode('upload-blog')
  }

  const handleBackToAllPosts = async() => {
    setViewMode('all-posts')
    await handlegetBlogs()

  }

  return (
    <div className="flex h-screen bg-[#F8F8FF]">
      {/* Sidebar */}
     

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <TopHeader
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterCategory={filterCategory}
          onFilterChange={setFilterCategory}
          blogCount={blogs.length}
          hasUnsavedChanges={hasUnsavedChanges}
          onSaveChanges={handleSaveChanges}
          onNewBlog={handleNewBlog}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto !px-6 !py-8">
            {viewMode === 'all-posts' ? (
              <AllBlogsSection
                blogs={blogs}
                searchQuery={searchQuery}
                filterCategory={filterCategory}
                pendingChanges={pendingChanges}
                onEdit={handleEditBlog}
                onFeatureToggle={handleFeatureToggle}
                onPostToggle={handlePostToggle}
                onDelete={handleDeleteClick}
                isLoading={isloading}
              />
            ) : (
              <UploadEditSection
                editingBlog={editingBlog}
                onViewModeChange={setViewMode}
                onBackToAllPosts={handleBackToAllPosts}
              />
            )}
          </div>
        </div>
      </div>
      <ToastNotification toasts={toasts} onRemove={removeToast} />
      <ConfirmationModal
  isOpen={deleteModalOpen}
  title="Delete Blog"
  description="Are you sure you want to delete this blog? This action cannot be undone."
  confirmLabel="Delete"
  cancelLabel="Cancel"
  variant="destructive"
  isLoading={isDeleting}
  onConfirm={handleDeleteConfirm}
  onCancel={handleDeleteCancel}
/>
    </div>
  )
}
