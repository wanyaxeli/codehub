import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
// import { BaseCrudService } from '@/integrations';
import { Clock, Tag, Calendar, User, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import HeaderSection from '@/Components/layoutss/code-headers';
import NewFooter from '@/Components/layoutss/newFooter';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import useStore from '@/lib/storage';

interface Blog {
  id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  title?: string;
  summary?: string;
  content: any;
  featuredImage?: string;
  category?: string;
  reading_time?: number;
  isFeatured?: boolean;
  author?: string;
  image?:string
  publishDate?: Date | string;
}



const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Coding for Kids': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'technology': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  'Beginner Guides': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'Parenting & Learning': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
};

const BlogHeader = ({ blog }: { blog: Blog }) => {
  const publishDate = blog.publishDate ? new Date(blog.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <section className="relative !pt-12 !pb-12 bg-white">
      <div className="container !mx-auto !px-6 md:!px-12 max-w-[100rem]">
        {/* Breadcrumb */}
        <FadeIn delay={0.1}>
          <div className="flex items-center gap-2 text-sm text-foreground/60 font-paragraph !mb-8">
            <a href="/course-blogs" className="hover:!text-[var(--primarysec)] !text-slate-700  transition-colors">Blogs</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{blog.category?.toLocaleUpperCase()}</span>
          </div>
        </FadeIn>

        {/* Title */}
        <FadeIn delay={0.2}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tight !mb-6 text-balance">
            {blog.title}
          </h1>
        </FadeIn>

        {/* Metadata */}
        <FadeIn delay={0.3}>
          <div className="flex flex-wrap items-center gap-6 !mb-8 text-foreground/70 font-paragraph">
            {/* Category */}
            <div className={`inline-flex items-center gap-2 !px-4 !py-2 rounded-full text-sm font-semibold ${CATEGORY_COLORS[blog.category || '']?.bg || 'bg-slate-100'} ${CATEGORY_COLORS[blog.category || '']?.text || 'text-slate-700'}`}>
              <Tag className="w-4 h-4" />
              {blog.category}
            </div>

            {/* Read Time */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-bg-[var(--primarysec)] " />
              <span>{blog.reading_time || 5} min read</span>
            </div>

            {/* Date */}
            {publishDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-bg-[var(--primarysec)] " />
                <span>{publishDate}</span>
              </div>
            )}

            {/* Author */}
            {blog.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-bg-[var(--primarysec)] " />
                <span>By {blog.author}</span>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Featured Image */}
        <FadeIn delay={0.4}>
          <div className="relative rounded-2xl overflow-hidden h-[300px] md:h-[400px] lg:h-[500px] shadow-2xl shadow-slate-200/50">
            <img
              src={blog.image || 'https://static.wixstatic.com/media/fc528a_f371dd29bdb0473faafe630e7f89f392~mv2.png?originWidth=896&originHeight=448'}
              alt={blog.title || 'Blog featured image'}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const BlogContent = ({ blog, relatedBlogs }: { blog: Blog, relatedBlogs: Blog[] }) => {
  // const contentSections = blog.content|| [];

  console.log(blog.content)
  let html;
  html = useMemo(() => generateHTML(blog.content, [StarterKit]), [blog.content])

    
  ;
  // const editor = useEditor({
  //   extensions: [StarterKit],
  //   content: blog.content,   // ✅ TipTap JSON from backend
  //   editable: false,       // ✅ read-only mode
  //   editorProps: {
  //   attributes: {
  //     class: 'prose prose-lg max-w-none focus:outline-none',
  //   },}
  // })
  // if (!editor) return null

  return (
    <section className="!py-16 bg-white">
      <div className="container !mx-auto !px-6 md:!px-12 max-w-[100rem]">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Blog Summary */}
            <div className="relative !mb-10 !p-6 rounded-2xl bg-[var(--primarysec)]/5 border-l-4 border-[var(--accentsec)] shadow-sm">
              <span className="inline-block text-xs font-heading font-bold uppercase tracking-widest text-[var(--primarysec)] !mb-3">
                Synopsis
              </span>
              <p className="text-md font-paragraph text-foreground/80 leading-relaxed " style={{ fontStyle: 'italic' }}>
                {blog.summary}
              </p>
            </div>

            <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />

            {/* Mid-Content CTA */}
            <FadeIn delay={0.2} className="!mt-16 !mb-16">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--primarysec)]/5 to-[var(--accentsec)]/5 border-2 border-[var(--primarysec)]/20 !p-8 md:!p-12 shadow-lg shadow-[var(--primarysec)]/10">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-bg-[var(--primarysec)]  via-transparent to-transparent" />
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground !mb-4">
                    Want your child to start learning coding the right way?
                  </h3>
                  <p className="text-lg text-foreground/70 font-paragraph !mb-8">
                    Join Coding Scholar and give your child the foundation they need to succeed in the digital world. Our expert instructors make learning fun, engaging, and effective.
                  </p>
                  <Button className="!bg-[var(--accentsec)] hover:!bg-[var(--accentsec)]/90 text-white font-heading rounded-xl h-12 !px-8 shadow-lg shadow-!bg-[var(--accentsec)]/30 transition-all hover:scale-105">
                    Book Free Trial Class
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </FadeIn>

            {/* Related Articles */}
            {relatedBlogs.length > 0 && (
              <FadeIn delay={0.3} className="!mt-20">
                <h2 className="text-3xl font-heading font-bold text-foreground !mb-10">
                  Related Articles
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {relatedBlogs.slice(0, 4).map((relatedBlog, index) => (
                    <motion.div
                      key={relatedBlog.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-100/50 hover:shadow-2xl hover:shadow-[var(--primarysec)]/20 transition-all duration-300 flex flex-col h-full"
                    >
                      {/* Image */}
                      <div className="relative h-40 overflow-hidden bg-slate-100">
                        <img
                          src={relatedBlog.image}
                          alt={relatedBlog.title || 'Related blog'}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="!p-6 flex flex-col flex-grow">
                        <div className={`inline-flex items-center gap-2 !px-3 !py-1 rounded-full text-xs font-heading font-semibold !mb-4 w-fit ${CATEGORY_COLORS[relatedBlog.category || '']?.bg || 'bg-slate-100'} ${CATEGORY_COLORS[relatedBlog.category || '']?.text || 'text-slate-700'}`}>
                          <Tag className="w-3 h-3" />
                          {relatedBlog.category}
                        </div>

                        <h3 className="text-lg font-heading font-bold text-foreground !mb-3 line-clamp-2 group-hover:text-[var(--primarysec)]  transition-colors">
                          {relatedBlog.title}
                        </h3>

                        <p className="text-foreground/70 font-paragraph text-sm !mb-4 line-clamp-2 flex-grow">
                          {relatedBlog.summary}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-foreground/60 font-paragraph !mb-4">
                          <Clock className="w-3 h-3" />
                          <span>{relatedBlog.reading_time || 5} min read</span>
                        </div>

                        <a href={`/course-blog/${relatedBlog.id}`} className="!text-[var(--accentsec)] font-heading font-bold hover:text-[var(--accentsec)]/80 transition-colors inline-flex items-center gap-1 group/link">
                          Read More
                          <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </FadeIn>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky !top-24 !space-y-8">
              {/* CTA Card */}
              <FadeIn delay={0.2}>
                <div className="rounded-2xl bg-gradient-to-br from-[var(--primarysec)]  to-[var(--primarysec)]/80 !p-8 text-white shadow-lg shadow-[var(--primarysec)]/30">
                  <h3 className="text-2xl font-heading font-bold !mb-4">
                    Ready to Start?
                  </h3>
                  <p className="text-white/90 font-paragraph text-sm !mb-6">
                    Book a free trial class and see how Coding Scholar can help your child thrive.
                  </p>
                  <Button className="w-full bg-white text-[var(--primarysec)]  hover:bg-slate-100 font-heading rounded-xl h-11 shadow-lg transition-all hover:scale-105">
                    Book Free Trial
                  </Button>
                </div>
              </FadeIn>

              {/* Category Info */}
              {/* <FadeIn delay={0.3}>
                <div className="rounded-2xl !bg-slate-50 !p-6 border border-slate-200">
                  <h4 className="text-sm font-heading font-bold text-foreground/60 uppercase tracking-wide !mb-4">
                    Category
                  </h4>
                  <a href={`/blog?category=${blog.category}`} className={`inline-flex items-center gap-2 !px-4 !py-2 rounded-lg text-sm font-heading font-semibold transition-all hover:scale-105 text-${CATEGORY_COLORS[blog.category || 'blue-200']?.bg || 'bg-slate-100'} ${CATEGORY_COLORS[blog.category || '']?.text || '!text-slate-700'}`}>
                    <Tag className="w-4 h-4" />
                    {blog.category}
                  </a>
                </div>
              </FadeIn> */}

              {/* Share Info */}
              {/* <FadeIn delay={0.4}>
                <div className="rounded-2xl bg-slate-50 !p-6 border border-slate-200">
                  <h4 className="text-sm font-heading font-bold text-foreground/60 uppercase tracking-wide !mb-4">
                    Article Info
                  </h4>
                  <div className="space-y-3 text-sm font-paragraph text-foreground/70">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[var(--primarysec)] " />
                      <span>{blog.readTimeMinutes || 5} min read</span>
                    </div>
                    {blog.author && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[var(--primarysec)] " />
                        <span>{blog.author}</span>
                      </div>
                    )}
                  </div>
                </div>
              </FadeIn> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="!py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--accentsec)]" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

      <div className="container !mx-auto !px-6 md:!px-12 max-w-[100rem] relative z-10 !text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white !mb-6 text-balance max-w-3xl !mx-auto">
            Start Your Child's Coding Journey Today
          </h2>
          <p className="text-lg text-white/90 font-paragraph !mb-10 max-w-2xl !mx-auto">
            Give your child the gift of coding skills. Our expert instructors create a supportive, engaging learning environment where every child can thrive.
          </p>
          <Button size="lg" className="bg-white text-[var(--accentsec)] hover:bg-slate-100 font-heading text-lg h-14 !px-8 rounded-xl shadow-2xl transition-transform hover:scale-105">
            Book Free Trial Class
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </FadeIn>
      </div>
    </section>
  );
};

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const {allblogs,fetchblogs}=useStore()

  useEffect(() => {
    fetchblogs()
  }, [id]);

  console.log("id:----", id, typeof id);

allblogs.forEach(blog => {
  console.log(blog.id, typeof blog.id);
});

  useEffect(() => {
  if (allblogs.length === 0) return;
  setIsLoading(true)
  const blogData = allblogs.find((cs: any) => cs.id === Number(id));
  if (blogData) {
    setBlog(blogData);
    const related = allblogs.filter(
      (b: any) => b.category === blogData.category && b.id !== Number(id)
    );
    setRelatedBlogs(related);
    setIsLoading(false)
  } else {
      setIsLoading(false)
    setNotFound(true);
  }
}, [allblogs, id]);

  // const loadBlog = async () => {
  //   if (!id) return;
  //   setIsLoading(true);
  //   try {
  //     const blogData = codescholarblogs.find(cs=>cs.id===id);
  //     console.log('id...',id,'conteent..',blogData)
  //     setBlog(blogData);
  //     if (blogData) {
  //       setBlog(blogData);
  //       // Load related blogs from same category
  //       const allBlogs = codescholarblogs
  //       const related = codescholarblogs.filter(
  //         b => b.category === blogData.category && b.id !== id
  //       );
  //       setRelatedBlogs(related);
  //     } else {
  //       setNotFound(true);
  //     }
  //   } catch (error) {
  //     console.error('Error loading blog:', error);
  //     setNotFound(true);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background font-paragraph text-foreground flex items-center justify-center">
        {/* <HeaderSection /> */}
        <LoadingSpinner />
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-screen bg-background font-paragraph text-foreground">
        <HeaderSection />
        <div className="container !mx-auto !px-6 md:!px-12 max-w-[100rem] !py-24 text-center">
          <h1 className="text-4xl font-heading font-bold text-foreground !mb-4">
            Article Not Found
          </h1>
          <p className="text-lg text-foreground/70 font-paragraph !mb-8">
            Sorry, the blog post you're looking for doesn't exist or has been removed.
          </p>
          <a href="/course-blogs" className="inline-block">
            <Button className="bg-[var(--primarysec)] hover:bg-[var(--primarysec)]/90 text-white font-heading rounded-xl h-12 !px-8">
              Back to Blog
            </Button>
          </a>
        </div>
        <NewFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-paragraph text-foreground overflow-clip selection:bg-bg-[var(--primarysec)] /20 selection:text-bg-[var(--primarysec)] ">
      <HeaderSection />
      <main>
        <BlogHeader blog={blog} />
        <BlogContent blog={blog} relatedBlogs={relatedBlogs} />
        <FinalCTA />
      </main>
      <NewFooter />
    </div>
  );
}
