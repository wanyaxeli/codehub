import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
// import { BaseCrudService } from '@/integrations';
import { Search, ChevronRight, Clock, Tag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import HeaderSection from '@/Components/layoutss/code-headers';
import NewFooter from '@/Components/layoutss/newFooter';

interface Blog {
  _id: string;
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
const codescholarblogs = [
  {
    _id:'1',
    featuredImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    title: "Understanding Variables Through Real-World Analogies",
    category: "Beginner Guides",
    shortDescription: "Learn how variables work in programming using simple real-world comparisons and visual thinking techniques inspired by modern coding tutorials.",
    readMinutes: 5,
    author: "Kevin Pettit",
    isFeatured: true,
    content: [
      "# Understanding Variables Through Real-World Analogies",
      "Variables are one of the most fundamental concepts in programming. At their core, they act as containers that store information which can later be used or modified. A helpful way to understand them is by imagining labeled boxes where each box holds a value such as a number or text.",
      "Think of variables like labeled drawers in real life. Each drawer has a name, and inside it you store something specific. This analogy helps beginners quickly grasp how programs remember and manipulate information.",
      "## Why Variables Matter",
      "- Store user input like names or scores\n- Track application state\n- Perform calculations and logic"
    ]
  },
  {
    _id:'2',
    featuredImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    title: "Building a 3D Renderer from Scratch (Math + Code)",
    category: "Math Tips",
    shortDescription: "Explore how mathematics powers 3D graphics by building a simple renderer using geometry, transformations, and linear algebra.",
    readMinutes: 12,
    author: "Astro Driss",
    isFeatured: false,
    content: [
      "# Building a 3D Renderer from Scratch",
      "3D rendering combines programming with mathematics to create visual scenes. Concepts like vectors and matrices allow objects to exist and move in virtual space.",
      "By applying transformations such as rotation, scaling, and translation, developers can manipulate objects and project them onto a 2D screen.",
      "## Key Mathematical Concepts",
      "- Vectors represent position and direction\n- Matrices handle transformations\n- Projection converts 3D to 2D"
    ]
  },
  {
    _id:'3',
    featuredImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    title: "Beginner’s Guide to Web Hosting and Deployment",
    category: "Beginner Guides",
    shortDescription: "A practical introduction to hosting websites, understanding servers, and deploying your first coding project online.",
    readMinutes: 6,
    author: "Douiri Blog",
    isFeatured: false,
    content: [
      "# Beginner’s Guide to Web Hosting and Deployment",
      "After building your application, the next step is making it accessible online. Hosting stores your app on a server, while deployment ensures it runs correctly for users.",
      "Modern platforms simplify deployment, but understanding the basics helps you manage performance, scalability, and reliability.",
      "## Key Concepts",
      "- Servers host your application\n- Domains provide access via URLs\n- Deployment automates updates"
    ]
  },
  {
    _id:'4',
    featuredImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904",
    title: "Teaching Kids How to Code Using Visual Thinking",
    category: "Coding for Kids",
    shortDescription: "Discover engaging ways to introduce children to coding concepts using diagrams, storytelling, and interactive examples.",
    readMinutes: 7,
    author: "Happy Coding",
    isFeatured: false,
    content: [
      "# Teaching Kids How to Code Using Visual Thinking",
      "Teaching coding to kids becomes easier when using visual tools. Instead of abstract syntax, children can learn using diagrams, blocks, and storytelling.",
      "Visual thinking allows kids to connect logic with creativity, making coding both fun and educational.",
      "## Effective Strategies",
      "- Use block-based tools\n- Incorporate storytelling\n- Encourage experimentation"
    ]
  },
  {
    _id:'5',
    featuredImage: "https://images.unsplash.com/photo-1537432376769-00a4c8d5c8b7",
    title: "Big O Notation Made Simple",
    category: "Math Tips",
    shortDescription: "Break down algorithm complexity using simple math explanations and intuitive visualizations to improve problem-solving skills.",
    readMinutes: 8,
    author: "CoderSite",
    isFeatured: false,
    contentSections: [
      "# Big O Notation Made Simple",
      "Big O notation describes how efficient an algorithm is as input size grows. It helps developers predict performance and scalability.",
      "Instead of exact timing, Big O focuses on trends, making it easier to compare algorithms.",
      "## Common Complexities",
      "- O(1): Constant time\n- O(n): Linear time\n- O(n²): Quadratic time"
    ]
  },
  {
    _id:'6',
    featuredImage: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
    title: "CSS Layouts Explained with Practical Examples",
    category: "Beginner Guides",
    shortDescription: "Learn modern CSS layout techniques like Flexbox and Grid through real-world UI examples and hands-on practice.",
    readMinutes: 6,
    author: "CodeHal",
    isFeatured: false,
    content: [
      "# CSS Layouts Explained with Practical Examples",
      "CSS layouts are essential for building responsive web designs. Flexbox and Grid provide powerful tools to structure content effectively.",
      "Flexbox works well for one-dimensional layouts, while Grid is ideal for more complex two-dimensional designs.",
      "## Choosing the Right Layout",
      "- Use Flexbox for simple alignment\n- Use Grid for complex layouts\n- Combine both when needed"
    ]
  },
  {
    _id:'7',
    featuredImage: "https://images.unsplash.com/photo-1526378722484-cc5c6b5f6d4c",
    title: "How AI is Changing the Way We Write Code",
    category: "Parenting & Learning",
    shortDescription: "An educational look at how AI tools are transforming coding workflows and how learners can adapt effectively.",
    readMinutes: 9,
    author: "Vibe Coding",
    isFeatured: false,
    content: [
      "# How AI is Changing the Way We Write Code",
      "AI tools are transforming development by automating repetitive tasks and assisting in writing code faster and more efficiently.",
      "Developers can now focus more on problem-solving while AI handles suggestions, debugging, and optimization.",
      "## Impact on Learning",
      "- Faster development cycles\n- Better debugging support\n- New learning opportunities"
    ]
  },
  {
    _id:'8',
    featuredImage: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d",
    title: "Fun Math Tricks for Young Programmers",
    category: "Coding for Kids",
    shortDescription: "Introduce kids to essential math concepts like patterns, logic, and sequences through fun coding exercises.",
    readMinutes: 4,
    author: "STEM Learning Hub",
    isFeatured: false,
    content: [
      "# Fun Math Tricks for Young Programmers",
      "Mathematics is a key part of programming, and making it fun helps young learners stay engaged. Simple tricks can build confidence and curiosity.",
      "By combining math with coding exercises, kids develop logical thinking and problem-solving skills.",
      "## Easy Tricks to Start With",
      "- Recognizing patterns\n- Using simple formulas\n- Solving logic puzzles"
    ]
  }
];

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
  'Math Tips': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
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

const FeaturedBlogCard = ({ blog }: { blog: Blog }) => {
  const navigate = useNavigate();

  return (
    <section className="!py-16 bg-white">
      <div className="container !mx-auto !px-6 md:!px-12 max-w-[120rem]">
        <FadeIn>
          <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[var(--primarysec)]/10 to-[var(--accentsec)]/10 border-2 border-[var(--primarysec)]/20 shadow-2xl shadow-[var(--primarysec)]/10">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                <Image
                  src={blog.featuredImage || 'https://static.wixstatic.com/media/fc528a_a689b8157de34f989603582131ca0ac5~mv2.png?originWidth=768&originHeight=448'}
                  alt={blog.title || 'Featured blog'}
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
                    {blog.category}
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground !mb-4 leading-tight">
                  {blog.title}
                </h2>

                <p className="text-foreground/70 font-paragraph text-lg !mb-8 line-clamp-3">
                  {blog.shortDescription}
                </p>

                <div className="flex items-center gap-6 !mb-8 text-sm text-foreground/60 font-paragraph">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTimeMinutes || 5} min read</span>
                  </div>
                  {blog.author && (
                    <div>
                      <span>By {blog.author}</span>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={() => navigate(`/course-blog/${blog._id}`)}
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

const BlogCard = ({ blog, index }: { blog: Blog, index: number }) => {
  const navigate = useNavigate();

  return (
    <FadeIn delay={index * 0.05}>
      <motion.div
        whileHover={{ y: -8 }}
        onClick={() => navigate(`/course-blog/${blog._id}`)}
        className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-100/50 hover:shadow-2xl hover:shadow-[var(--primarysec)]/20 transition-all duration-300 h-full flex flex-col cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <Image
            src={blog.featuredImage || 'https://static.wixstatic.com/media/fc528a_dad737f9cff747d8a41c398381bea3f1~mv2.png?originWidth=320&originHeight=192'}
            alt={blog.title || 'Blog post'}
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
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-heading font-bold text-foreground !mb-3 line-clamp-2 group-hover:text-[var(--primarysec)] transition-colors">
            {blog.title}
          </h3>

          {/* Description */}
          <p className="text-foreground/70 font-paragraph text-sm !mb-6 line-clamp-2 flex-grow">
            {blog.shortDescription}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-foreground/60 font-paragraph !mb-6 !pb-6 border-b border-slate-100">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{blog.readTimeMinutes || 5} min</span>
            </div>
            {blog.author && (
              <div>
                <span>{blog.author}</span>
              </div>
            )}
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

const BlogGridSection = ({ blogs, isLoading, selectedCategory, searchQuery }: { blogs: Blog[], isLoading: boolean, selectedCategory: string, searchQuery: string }) => {
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="!py-16 bg-white">
      <div className="container !mx-auto !px-6 md:!px-12 max-w-[120rem]">
        {filteredBlogs.length === 0 ? (
          <div className="text-center !py-16">
            <p className="text-lg text-foreground/60 font-paragraph">No articles found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            {filteredBlogs.map((blog, index) => (
              <BlogCard key={blog._id} blog={blog} index={index} />
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
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setIsLoading(true);
    try {
      // const result = await BaseCrudService.getAll<Blog>('blogs', [], { limit: 50 });
      setBlogs(codescholarblogs);
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const featuredBlog = blogs.find(blog => blog.isFeatured);
  const otherBlogs = blogs.filter(blog => !blog.isFeatured);

  return (
    <div className="min-h-screen bg-background font-paragraph text-foreground overflow-clip selection:bg-[var(--primarysec)]/20 selection:text-[var(--primarysec)]">
      <HeaderSection />
      <main>
        <HeroSection />
        <FilterSection selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        {featuredBlog && <FeaturedBlogCard blog={featuredBlog} />}
        <BlogGridSection blogs={otherBlogs} isLoading={isLoading} selectedCategory={selectedCategory} searchQuery={searchQuery} />
        <CTASection />
      </main>
      <NewFooter />
    </div>
  );
}
