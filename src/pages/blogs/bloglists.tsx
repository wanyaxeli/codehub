import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
// import { BaseCrudService } from '@/integrations';
import { Search, ChevronRight, Clock, Tag, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import HeaderSection from '@/Components/layoutss/code-headers';
import NewFooter from '@/Components/layoutss/newFooter';
import axios from 'axios';
import useStore from '@/lib/storage';
import { Card } from '@/components/ui/card';

interface Blog {
  id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  title?: string;
  shortDescription?: string;
  content?: string;
  featuredImage?: string;
  category?: string;
  readTimeMinutes?: number;
  isFeatured?: boolean;
  author?: string;
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

const CATEGORIES = [
  'All',
  'Coding for Kids',
  'Math Tips',
  'Beginner Guides',
  'Parenting & Learning'
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Coding for Kids': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'technology': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  'Beginner Guides': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'Parenting & Learning': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center !pt-18 !pb-16 overflow-hidden !bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full !bg-[var(--primarysec)]/5 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full !bg-[var(--accentsec)]/5 blur-3xl" />
      </div>

      <div className="container !mx-auto !px-6 md:!px-12 max-w-[120rem] relative z-10">
        <div className="max-w-3xl">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 !px-4 !py-2 rounded-full !bg-[var(--primarysec)]/10 !text-[var(--primarysec)] !font-heading text-sm font-semibold !mb-6">
              <Tag className="w-4 h-4" />
              <span>Learning Resources</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tight !mb-6 text-balance">
              Insights for <span className="!text-[var(--primarysec)]">Parents</span> & Young <span className="text-[var(--accentsec)]">Coders</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-lg md:text-xl text-foreground/70 font-paragraph !mb-8 text-balance max-w-2xl">
              Helpful guides, tips, and resources to support your child's learning journey in coding and math.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} className="w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input
                type="text"
                placeholder="Search articles…"
                className="w-full !pl-12 !pr-4 !py-3 rounded-xl border border-slate-200 focus:outline-none focus:!border-[var(--primarysec)] focus:ring-2 focus:ring-[var(--primarysec)]/20 font-paragraph transition-all"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const FilterSection = ({ selectedCategory, onCategoryChange }: { selectedCategory: string, onCategoryChange: (cat: string) => void }) => {
  return (
    <section className="!py-8 bg-white border-b border-slate-100 sticky !top-20 z-40">
     
      <div className="container !mx-auto !px-6 md:!px-12 max-w-[120rem]">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-sm font-heading font-semibold text-foreground/60">Filter by:</span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`!px-4 !py-2 rounded-full font-paragraph font-medium text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-[var(--primarysec)] text-white shadow-lg shadow-[var(--primarysec)]/30'
                    : 'bg-slate-100 text-foreground hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedBlogCard = ({ blog }: { blog: any }) => {
  const navigate = useNavigate();

  return (
    <section className="!py-16 bg-white">
    
      <div className="container !mx-auto !px-6 md:!px-12 max-w-[120rem]">
        <FadeIn>
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[var(--primarysec)]/10 to-[var(--accentsec)]/10 border-2 border-[var(--primarysec)]/20 shadow-2xl shadow-[var(--primarysec)]/10">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog?.title }
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--primarysec)]/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="!p-8 md:!p-12 lg:!p-16 flex flex-col justify-center">
                <div className="!mb-6">
                  <div className="inline-flex items-center gap-2 !mb-4">
                    <span className="inline-block !px-3 !py-1 rounded-full bg-[var(--accentsec)] text-white text-xs font-heading font-bold">
                      Featured
                    </span>
                  </div>
                  <div className={`inline-flex items-center gap-2 !px-3 !py-1 rounded-full text-xs font-heading font-semibold ${CATEGORY_COLORS[blog.category || '']?.bg || 'bg-slate-100'} ${CATEGORY_COLORS[blog.category || '']?.text || 'text-slate-700'}`}>
                    <Tag className="w-3 h-3" />
                    {blog?.category?.toLocaleUpperCase()}
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground !mb-4 leading-tight">
                  {blog.title}
                </h2>

                <p className="text-foreground/70 font-paragraph text-lg !mb-8 line-clamp-3">
                  {blog.summary}
                </p>

                <div className="flex items-center gap-6 !mb-8 text-sm text-foreground/60 font-paragraph">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{blog.reading_time || 5} min read</span>
                  </div>
                  {blog.author && (
                    <div>
                      <span>By {blog.author}</span>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={() => navigate(`/course-blog/${blog.id}`)}
                  className="bg-[var(--accentsec)] hover:bg-[var(--accentsec)]/90 text-white font-heading rounded-xl h-12 !px-6 w-fit shadow-lg shadow-[var(--accentsec)]/30 transition-all hover:scale-105"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const BlogCard = ({ blog, index }: { blog: any, index: number }) => {
  const navigate = useNavigate();
  console.log('blog',blog)

  return (
    <FadeIn delay={index * 0.05}>
      <motion.div
        whileHover={{ y: -8 }}
        onClick={() => navigate(`/course-blog/${blog.id}`)}
        className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-100/50 hover:shadow-2xl hover:shadow-[var(--primarysec)]/20 transition-all duration-300 h-full flex flex-col cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <img
            src={blog.image}
            alt={blog.title }
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content */}
        <div className="!p-6 flex flex-col flex-grow">
          {/* Category Tag */}
          <div className="!mb-4">
            <span className={`inline-flex items-center gap-1 !px-3 !py-1 rounded-full text-xs font-heading font-semibold ${CATEGORY_COLORS[blog.category || '']?.bg || 'bg-slate-100'} ${CATEGORY_COLORS[blog.category || '']?.text || 'text-slate-700'} border ${CATEGORY_COLORS[blog.category || '']?.border || 'border-slate-200'}`}>
              <Tag className="w-3 h-3" />
              {blog.category.toLocaleUpperCase()}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-heading font-bold text-foreground !mb-3 line-clamp-2 group-hover:text-[var(--primarysec)] transition-colors">
            {blog.title}
          </h3>

          {/* Description */}
          <p className="text-foreground/70 font-paragraph text-sm !mb-6 line-clamp-2 flex-grow">
            {blog.summary}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-foreground/60 font-paragraph !mb-6 !pb-6 border-b border-slate-100">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{blog.reading_time || 5} min</span>
            </div>
            
              <div>
                <span>{blog.author??'Coding Scholar'}</span>
              </div>
            
          </div>

          {/* Read More Button */}
          <Button variant="ghost" className="p-0 hover:bg-transparent text-[var(--accentsec)] font-heading font-bold group/btn self-start">
            Read More
            <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </motion.div>
    </FadeIn>
  );
};

const BlogGridSection = ({ blogs, isLoading, selectedCategory, searchQuery }: { blogs: any[], isLoading: boolean, selectedCategory: string, searchQuery: string }) => {
  
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) 
    return matchesCategory && matchesSearch;
  });

  console.log('filtered blogs...',filteredBlogs)

  return (
    <section className="!py-16 bg-white">
      <div className="container !mx-auto !px-6 md:!px-12 max-w-[120rem]">
        
        {isLoading?(<Card className="!p-12 text-center">
              <Loader2 className="animate-spin !mx-auto !mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Loading blogs...</p>
            </Card>)
        :filteredBlogs.length === 0 ? (
          <div className="text-center !py-16">
            <p className="text-lg text-foreground/60 font-paragraph">No articles found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="!py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--accentsec)]" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

      <div className="container !mx-auto !px-6 md:!px-12 max-w-[120rem] relative z-10 text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white !mb-6 text-balance max-w-3xl !mx-auto">
            Help Your Child Start Learning Coding Today
          </h2>
          <p className="text-lg text-white/90 font-paragraph !mb-10 max-w-2xl !mx-auto">
            Explore our courses and discover how your child can develop essential skills in coding and math through interactive, engaging classes.
          </p>
          <Button size="lg" className="bg-white text-[var(--accentsec)] hover:bg-slate-100 font-heading text-lg h-14 !px-8 rounded-xl shadow-2xl transition-transform hover:scale-105">
            Book Free Trial Class
          </Button>
        </FadeIn>
      </div>
    </section>
  );
};

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredBlog,setFeaturedBlog]=useState([])
  const [otherBlogs,setOtherBlogs]=useState([])
  const {allblogs,fetchblogs}=useStore()

  const apiurl = process.env.NEXT_PUBLIC_API_URL || "https://api.codingscholar.com";

   const handlegetBlogs= async() => {
        try{
        // setIsAiLoading(true)
         setIsLoading(true);
        console.log('getblogs...')
  
        const res=await axios.get(`${apiurl}/fetch_blogs/`)
        const blogsres=await res.data
        console.log('saving response...',blogsres)
        if(blogsres.length>0){
           const publishedblogs=blogsres.filter((blog:any)=>blog.status==='published')
          //  console.log()
           setBlogs(publishedblogs)
           const featured = publishedblogs?.find((blog:any) => blog.featured);
           const others = publishedblogs?.filter((blog:any) => !blog.featured);

           setFeaturedBlog(featured)
           setOtherBlogs(others);
        // setDraftAiSuccess(true)
    
        }
        }catch(e){
          console.log('error..',e)
        }finally{
       setIsLoading(false);
        }  
      }
  
      useEffect(()=>{
        handlegetBlogs()
        fetchblogs()
      },[])

      console.log('allblogs..',allblogs)

  // useEffect(() => {
  //   loadBlogs();
  // }, []);

  // const loadBlogs = async () => {
  //   setIsLoading(true);
  //   try {
  //     // const result = await BaseCrudService.getAll<Blog>('blogs', [], { limit: 50 });
  //     setBlogs(codescholarblogs);
  //   } catch (error) {
  //     console.error('Error loading blogs:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  console.log('otherblogs...',otherBlogs)

  return (
    <div className="min-h-screen bg-background font-paragraph text-foreground overflow-clip selection:bg-[var(--primarysec)]/20 selection:text-[var(--primarysec)]">
      <HeaderSection />
      <main>
        <HeroSection />
        <FilterSection selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        {featuredBlog?.length>0 && <FeaturedBlogCard blog={featuredBlog} />}
        <BlogGridSection blogs={otherBlogs} isLoading={isLoading} selectedCategory={selectedCategory} searchQuery={searchQuery} />
        <CTASection />
      </main>
      <NewFooter />
    </div>
  );
}
