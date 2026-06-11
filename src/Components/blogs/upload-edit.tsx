'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import {
  Upload,
  Sparkles,
  X,
  Zap,
  Image as ImageIcon,
  Bold,
  Italic,
  List,
  Code,
  Quote,
  Image,
  ArrowLeft,
} from 'lucide-react'
import RichTextEditor from './editor'
import axios from 'axios'
import { generateJSON } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import { ToastNotification } from '../layoutss/toastNotification'
import { useToast } from '@/hooks/useToast'

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
  summary:string
  content:any
}

interface UploadEditSectionProps {
  editingBlog: Blog | null
  onBackToAllPosts: () => void
  onViewModeChange: (mode: 'all-posts' | 'upload-blog') => void
}


export function UploadEditSection({
  editingBlog,
  onViewModeChange,
  onBackToAllPosts,
}: UploadEditSectionProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: 'Coding Scholar',
    category: 'technology',
    readingTime: 5,
    summary: '',
    
  })

  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string>('')
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [aiStep, setAiStep] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [editorContent, setEditorContent] = useState<any>()
  const [draftaisuccess,setDraftAiSuccess]=useState(false)
  const { toasts, addToast, resolveToast, removeToast } = useToast()
  

  
  // Auto-calculate reading time
  // useEffect(() => {
  //   const words = formData.content
  // .join(" ")
  // .trim()
  // .split(/\s+/)
  // .length;
  //   const readTime = Math.ceil(words / 200)
  //   setFormData(prev => ({ ...prev, readingTime: Math.max(1, readTime) }))
  // }, [formData.content])

  // Load blog data if editing
  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title,
        author: editingBlog.author,
        category: editingBlog.category,
        readingTime: editingBlog.reading_time,
        summary: editingBlog.summary
        
      })
      setEditorContent(editingBlog.content)
      setCoverPreview(editingBlog.image)
    }
  }, [editingBlog])


// convert raw string → HTML
function parseToHTML(content: string|string[]): string {
  const lines = Array.isArray(content) ? content : content.split("\n");
  let html = "";
  let inUl = false;
  let inOl = false;

  for (const line of lines) {
    if (line.startsWith("# ")) {
      if (inUl) { html += "</ul>"; inUl = false; }
      if (inOl) { html += "</ol>"; inOl = false; }
      html += `<h2 class="text-base font-medium my-2">${line.slice(2)}</h2>`;
    } else if (line.startsWith("• ")) {
      if (inOl) { html += "</ol>"; inOl = false; }
      if (!inUl) { html += `<ul class="list-disc pl-5 my-1">`; inUl = true; }
      html += `<li>${line.slice(2)}</li>`;
    } else if (/^\d+\.\s/.test(line)) {
      if (inUl) { html += "</ul>"; inUl = false; }
      if (!inOl) { html += `<ol class="list-decimal pl-5 my-1">`; inOl = true; }
      html += `<li>${line.replace(/^\d+\.\s/, "")}</li>`;
    } else if (line.trim()) {
      if (inUl) { html += "</ul>"; inUl = false; }
      if (inOl) { html += "</ol>"; inOl = false; }
      html += `<p class="my-1">${line}</p>`;
    }
  }
  if (inUl) html += "</ul>";
  if (inOl) html += "</ol>";
  return html;
}

// convert HTML back → raw markdown string
// function parseToRaw(el: HTMLElement): string[] {
//   let text = "";
//   el.childNodes.forEach((node) => {
//     if (node.nodeType === Node.TEXT_NODE) {
//       text += node.textContent + "\n";
//     } else if (node.nodeName === "H2" || node.nodeName === "H1") {
//       text += "# " + (node as HTMLElement).innerText + "\n";
//     } else if (node.nodeName === "P") {
//       text += (node as HTMLElement).innerText + "\n";
//     } else if (node.nodeName === "UL") {
//       (node as HTMLElement).querySelectorAll("li").forEach((li) => {
//         text += "• " + li.innerText + "\n";
//       });
//     } else if (node.nodeName === "OL") {
//       let idx = 1;
//       (node as HTMLElement).querySelectorAll("li").forEach((li) => {
//         text += idx++ + ". " + li.innerText + "\n";
//       });
//     } else if (node.nodeName === "BR") {
//       text += "\n";
//     } else {
//       text += (node as HTMLElement).innerText + "\n";
//     }
//   });
//   return text.trim();
// }

function parseToRaw(el: HTMLElement): string[] {
  const lines: string[] = [];

  el.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) lines.push(text);
    } else if (node.nodeName === "H2" || node.nodeName === "H1") {
      const text = (node as HTMLElement).innerText.trim();
      if (text) lines.push(`# ${text}`);
    } else if (node.nodeName === "P") {
      const text = (node as HTMLElement).innerText.trim();
      if (text) lines.push(text);
    } else if (node.nodeName === "UL") {
      (node as HTMLElement).querySelectorAll("li").forEach((li) => {
        const text = li.innerText.trim();
        if (text) lines.push(`• ${text}`);
      });
    } else if (node.nodeName === "OL") {
      let idx = 1;
      (node as HTMLElement).querySelectorAll("li").forEach((li) => {
        const text = li.innerText.trim();
        if (text) lines.push(`${idx++}. ${text}`);
      });
    }
  });

  return lines;
}

    // inside your component
const editorRef = useRef<HTMLDivElement>(null);




  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }))
  }

  const handleCoverImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverImage(file)
      const reader = new FileReader()
      reader.onload = e => {
        setCoverPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress > 100) {
          progress = 100
          clearInterval(interval)
        }
        setUploadProgress(Math.floor(progress))
      }, 300)
    }
  }

  const simulateAiGeneration = async () => {
    try{

    
    setIsAiLoading(true)
    const form_data=new FormData()
    if(uploadedFile) form_data.append('file',uploadedFile)
   
    const res=await axios.post('http://127.0.0.1:8000/blog_contents/',form_data,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })

    const aiResponse=await res.data

    console.log('airesponse...',aiResponse)
    if(aiResponse.content){
      const tiptapJson = generateJSON(aiResponse.content, [StarterKit])
      console.log('tiptapJson...',tiptapJson)

      setFormData(prev => ({
        ...prev,
        title: aiResponse.title,
        summary: aiResponse.summary,
      }))
      setEditorContent(tiptapJson)
      setAiStep(null)
    
    setDraftAiSuccess(true)

    }
    }catch(e){
      console.log('error..',e)
    }finally{
      setIsAiLoading(false)
      
    }
  
    
  }

    const handlesaveBlog= async (status:string) => {
    try{

    // setIsAiLoading(true)
    console.log('saving...')
    const toastId = addToast('Saving Blog', 'Applying New Blog')
    const form_data=new FormData()
    if(coverImage) form_data.append('file',coverImage)
    form_data.append('title',formData.title)
    form_data.append('author',formData.author)
    form_data.append('summary',formData.summary)
    form_data.append('category',formData.category)
    form_data.append('status',status)
    form_data.append('reading_time',String(formData.readingTime))
    form_data.append('content',JSON.stringify(editorContent))

   
    const res=await axios.post(`http://127.0.0.1:8000/create_blogs/`,form_data,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })

    const savingres=await res.data

    console.log('saving response...',savingres)
    if(savingres.success){
      
      status=='draft'?resolveToast(toastId, `${formData.title} saved`, 'Go to all blogs to publish it'):resolveToast(toastId, 'Blog saved', `${formData.title} saved and published`)
      onViewModeChange('all-posts')
      onBackToAllPosts()
    // setDraftAiSuccess(true)

    }else{
      alert('Saving failed , Please try again..')
    }

    }catch(e){
      console.log('error..',e)
      alert('Saving failed , Please  Ensure All Fields are provided then try again..')
    }finally{
      setIsAiLoading(false)
      
    }
  
    
  }

  const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
  const AiGeneratingLoader = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '2.5rem 1rem' }}>
    
    {/* Spinning rings */}
    <div style={{ position: 'relative', width: 64, height: 64 }}>
      {[
        { inset: 0, border: '1.5px solid', borderColor: '#111', duration: '1.1s', direction: 'normal' },
        { inset: 10, border: '1.5px solid', borderColor: '#888', duration: '0.8s', direction: 'reverse' },
        { inset: 20, border: '1.5px solid', borderColor: '#ccc', duration: '1.4s', direction: 'normal' },
      ].map((ring, i) => (
        <div key={i} style={{
          position: 'absolute', inset: ring.inset, borderRadius: '50%',
          border: ring.border, borderTopColor: ring.borderColor,
          animation: `spin ${ring.duration} linear infinite`,
          animationDirection: ring.direction,
        }} />
      ))}
    </div>

    {/* Label */}
    <p style={{ fontSize: 14, color: '#888' }}>Generating your blog...</p>

    {/* Step pills */}
    <div style={{ display: 'flex', gap: 8 }}>
      {['Reading document', 'Writing content', 'Formatting'].map((s, i) => (
        <span key={i} style={{
          fontSize: 12, padding: '4px 10px',
          border: '0.5px solid #ddd', borderRadius: 8, color: '#aaa'
        }}>{s}</span>
      ))}
    </div>
  </div>
)

// Usage


  return (
    <div className="!space-y-6">
      {/* Back Button */}
      {/* <Button
        onClick={onBackToAllPosts}
        variant="outline"
        className="gap-2 !mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to All Posts
      </Button> */}

      {/* Header */}
      <div className="!mb-6">
        <h1 className="text-3xl font-bold text-foreground !mb-2">
          {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
        <p className="text-lg text-muted-foreground">
          {editingBlog
            ? 'Update your blog post content'
            : 'Write manually or generate content using AI'}
        </p>
      </div>

       {/* Section 1: AI PDF Analyzer */}
      <Card className="!p-6 border-2 border-primary bg-gradient-to-br from-[var(--primarysec)]/5 to-[var(--accentsec)]/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 !bg-[var(--primarysec)]/10 rounded-full blur-3xl !-mr-16 !-mt-16"></div>
        <div className="relative">
          <div className="flex items-center gap-2 !mb-4">
            <Sparkles className="w-5 h-5 text-[var(--primarysec)]" />
            <h2 className="text-xl font-bold text-foreground">AI Generation</h2>
            {/* <Badge variant="secondary" className="!ml-auto">
              Premium
            </Badge> */}
          </div>
          <p className="text-muted-foreground !mb-6">
            Upload a PDF, DOCX, or TXT file and let AI extract and generate your blog content
          </p>

          {isAiLoading && <AiGeneratingLoader />}


          {!isAiLoading &&  (
            <>
            {
              !uploadedFile?(
            <div>
              <label className="block border-2 border-[var(--primarysec)]/30 border-dashed rounded-lg !p-8 text-center cursor-pointer hover:!bg-[var(--primarysec)]/5 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Upload className="w-12 h-12 text-primary !mx-auto !mb-2" />
                <p className="text-foreground font-semibold">
                  Drop your document here
                </p>
                <p className="text-muted-foreground text-sm !mt-1">
                  PDF, DOCX, or TXT files accepted
                </p>
              </label>
            </div>

            )
        : uploadProgress < 100 ? (
  <div className="!space-y-4">
    <div>
      <p className="text-sm font-semibold text-foreground !mb-2">
        {uploadedFile?.name}
      </p>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="!bg-[var(--primarysec)]  h-2 rounded-full transition-all duration-300"
          style={{ width: `${uploadProgress}%` }}
        ></div>
      </div>
    </div>
  </div>
  
        ) : (
       <div className="!space-y-4">
         <div className="flex items-center gap-3 !p-3 border border-slate-200 rounded-lg bg-slate-50">
           <div className="!p-2 bg-blue-100 rounded-md text-blue-600 text-lg">📄</div>
           <div className="text-sm">
            <p className="font-medium text-slate-800">{uploadedFile?.name??'No file'}</p>
           <p className="text-slate-500">{formatSize(uploadedFile?.size??0)}</p>
         </div>
       </div>
         {draftaisuccess && <p className="text-sm text-green-600 font-semibold flex items-center gap-2">
           <Sparkles className="w-4 h-4" />
           AI draft generated successfully
         </p>}
       </div>
        )  
            }
            </>
          )}

          {uploadedFile && uploadProgress === 100 && !isAiLoading && (
            <Button
              onClick={simulateAiGeneration}
              className="w-full !mt-6 !bg-[var(--primarysec)]  hover:!bg-[var(--primarysec)]/90 text-primary-foreground gap-2 rounded-lg"
            >
              <Zap className="w-4 h-4" />
              Generate with AI
            </Button>
          )}
        </div>
      </Card>


      {/* Section 2: Basic Information */}
      <Card className="!p-6 border border-border">
        <h2 className="text-xl font-bold text-foreground !mb-6">
          Basic Information
        </h2>

        <div className="!space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="font-semibold">
              Blog Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter your blog post title..."
              value={formData.title}
              onChange={handleInputChange}
              className="!mt-2 !p-2"
            />
          </div>

          {/* Author */}
          <div>
            <Label htmlFor="author" className="font-semibold">
              Author
            </Label>
            <Input
              id="author"
              name="author"
              placeholder="Author name"
              value={formData.author}
              onChange={handleInputChange}
              className="!mt-2 !p-2"
            />
          </div>

          {/* Category and Reading Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category" className="font-semibold">
                Category
              </Label>
              <Select value={formData.category} onValueChange={handleSelectChange}>
                <SelectTrigger className="!mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="readingTime" className="font-semibold">
                Reading Time
              </Label>
              <div className="relative !mt-2">
                <Input
                  id="readingTime"
                  name="readingTime"
                  type="number"
                  value={formData.readingTime}
                  onChange={handleInputChange}
                  className="!pr-16 !p-2"
                  min="1"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                  mins read
                </span>
              </div>
            </div>
          </div>

          {/* Cover Image Upload */}
          <div>
            <Label className="font-semibold">Featured Image</Label>
            <div className="!mt-2">
              {!coverPreview ? (
                <label className="block border-2 border-dashed border-border rounded-lg !p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageUpload}
                    className="hidden"
                  />
                  <ImageIcon className="w-12 h-12 text-muted-foreground !mx-auto !mb-2" />
                  <p className="text-foreground font-semibold">
                    Drag and drop your image
                  </p>
                  <p className="text-muted-foreground text-sm !mt-1">
                    or click to browse
                  </p>
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setCoverPreview('')
                      setCoverImage(null)
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white !p-2 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

     

      {/* Section 3: Summary */}
      <Card className="!p-6 border border-border">
        <h2 className="text-xl font-bold text-foreground !mb-6">Summary</h2>

        <div className="!space-y-4">
          <div>
            <div className="flex items-center justify-between !mb-2">
              <Label htmlFor="summary" className="font-semibold">
                Summary
              </Label>
              <span className="text-xs text-muted-foreground">
                {formData.summary.length}/500
              </span>
            </div>
            <Textarea
              id="summary"
              name="summary"
              placeholder="Write a brief summary of your blog post..."
              value={formData.summary}
              onChange={handleInputChange}
              className="h-24 resize-none !p-2"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground !mt-2">
              This excerpt appears in blog listings and search results
            </p>
          </div>
        </div>
      </Card>

      {/* Section 4: Blog Content Editor */}
      <RichTextEditor 
      content={editorContent}
      onChange={setEditorContent}/>
      {/* <Card className="!p-6 border border-border">
        <h2 className="text-xl font-bold text-foreground !mb-6">Blog Content</h2>

        <div className="!space-y-4">
       
          <div className="flex items-center gap-1 !p-3 bg-muted rounded-lg border border-border">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => execFormat("bold")}>
              <Bold className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Italic className="w-4 h-4"  onClick={() => execFormat("italic")} />
            </Button>
            <Separator orientation="vertical" className="h-4 mx-1" />
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0"
            onClick={() => execFormat("insertUnorderedList")}>
              <List className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Code className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Quote className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Image className="w-4 h-4" />
            </Button>
            <div className="!ml-auto text-xs text-muted-foreground">
             
            </div>
          </div>

          
          <div
  ref={editorRef}
  contentEditable
  suppressContentEditableWarning
  
  className="h-96 overflow-y-auto rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-ring"
/>
          <p className="text-xs text-muted-foreground">
            Supports Markdown. Press "/" for commands.
          </p>
        </div>
      </Card> */}

      {/* Publish Actions */}
      <div className="flex gap-3 !pb-8">
        <Button variant="outline" className="flex-1 !bg-transparent text-foreground hover:!bg-[var(--accentsec)] hover:!text-white" 
        onClick={()=>handlesaveBlog('draft')}>
          Save as Draft
        </Button>
        {/* <Button variant="outline" className="flex-1 !bg-transparent text-foreground hover:!bg-[var(--accentsec)] hover:!text-white ">
          Preview
        </Button> */}
        <Button className="flex-1 !bg-[var(--primarysec)]  hover:!bg-[var(--primarysec)]/90 text-primary-foreground"
        onClick={async()=>{
          console.log("clicked");
          await handlesaveBlog('published')}}>
          {editingBlog ? 'Update Blog' : 'Publish Blog'}
        </Button>
      </div>

      <ToastNotification toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
