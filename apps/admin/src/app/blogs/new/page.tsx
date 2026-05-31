export default function AddBlogPage() {
  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Write New Blog Post</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">Publish an article to the company blog to share insights and updates.</p>
        </div>

        <form className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm space-y-6">
                
                {/* Title */}
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Post Title</label>
                  <input 
                    type="text" 
                    id="title" 
                    className="w-full px-4 py-3 text-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-shadow" 
                    placeholder="The Future of Cloud Computing..."
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <label htmlFor="slug" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">URL Slug</label>
                  <div className="flex rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 focus-within:ring-2 focus-within:ring-indigo-500 dark:focus-within:ring-indigo-400 transition-shadow">
                    <span className="px-4 py-3 bg-zinc-100 dark:bg-zinc-900 text-zinc-500 border-r border-zinc-200 dark:border-zinc-800">unity11.com/blog/</span>
                    <input 
                      type="text" 
                      id="slug" 
                      className="flex-1 px-4 py-3 bg-zinc-50 dark:bg-zinc-900 focus:outline-none" 
                      placeholder="future-of-cloud"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <label htmlFor="excerpt" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Short Excerpt</label>
                  <textarea 
                    id="excerpt" 
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-shadow resize-none" 
                    placeholder="A brief summary of the article..."
                  ></textarea>
                </div>

                {/* Content Editor Mockup */}
                <div className="space-y-2">
                  <label htmlFor="content" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Article Content</label>
                  <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-50 dark:bg-zinc-900">
                    {/* Toolbar */}
                    <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex gap-2">
                      {['B', 'I', 'U'].map(btn => (
                        <button key={btn} type="button" className="w-8 h-8 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 font-semibold text-zinc-700 dark:text-zinc-300">{btn}</button>
                      ))}
                    </div>
                    {/* Editor */}
                    <textarea 
                      id="content" 
                      rows={12}
                      className="w-full p-4 bg-transparent focus:outline-none resize-none" 
                      placeholder="Write your article here. Separate paragraphs with newlines..."
                    ></textarea>
                  </div>
                </div>

              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              
              {/* Meta Info */}
              <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-6">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Publish Details</h3>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Category</label>
                  <input type="text" id="category" className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Engineering" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="date" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Date</label>
                    <input type="text" id="date" className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Oct 2025" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="readTime" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Read Time</label>
                    <input type="text" id="readTime" className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="5 min" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="image" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Cover Image URL</label>
                  <input type="text" id="image" className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="/images/blog/img1.png" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="bgColor" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Background Gradient</label>
                  <input type="text" id="bgColor" className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="from-[#0E18E4] to-white" />
                </div>
              </div>

              {/* Author Details */}
              <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-6">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Author Details</h3>
                
                <div className="space-y-2">
                  <label htmlFor="authorName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</label>
                  <input type="text" id="authorName" className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Alex Rivera" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="authorRole" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Role</label>
                  <input type="text" id="authorRole" className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Principal Engineer" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="authorAvatar" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Avatar URL</label>
                  <input type="text" id="authorAvatar" className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="/images/testimonials/avatar.png" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button type="button" className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all">
                  Publish Post
                </button>
                <button type="button" className="w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                  Save as Draft
                </button>
              </div>

            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
