export default function AddProjectPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Add New Project</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">Create a new project portfolio entry to display on the public website.</p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
          <form className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Title */}
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Project Title</label>
                <input 
                  type="text" 
                  id="title" 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-shadow" 
                  placeholder="e.g. Modern E-Commerce Platform"
                />
              </div>

              {/* Tag 1 */}
              <div className="space-y-2">
                <label htmlFor="tag1" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Primary Tag</label>
                <input 
                  type="text" 
                  id="tag1" 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-shadow" 
                  placeholder="e.g. Web Development"
                />
              </div>

              {/* Tag 2 */}
              <div className="space-y-2">
                <label htmlFor="tag2" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Secondary Tag</label>
                <input 
                  type="text" 
                  id="tag2" 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-shadow" 
                  placeholder="e.g. Next.js"
                />
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <label htmlFor="image" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Feature Image URL</label>
                <input 
                  type="text" 
                  id="image" 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-shadow" 
                  placeholder="/images/projects/project1.png"
                />
              </div>

              {/* Background Color */}
              <div className="space-y-2">
                <label htmlFor="bg" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Background Color Class</label>
                <input 
                  type="text" 
                  id="bg" 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-shadow" 
                  placeholder="e.g. bg-blue-500"
                />
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label htmlFor="date" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Completion Date</label>
                <input 
                  type="date" 
                  id="date" 
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-shadow" 
                />
              </div>

              {/* Description */}
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Description</label>
                <textarea 
                  id="description" 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-shadow resize-none" 
                  placeholder="Describe the project goals and achievements..."
                ></textarea>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button 
                type="button" 
                className="px-6 py-2.5 rounded-xl text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all"
              >
                Publish Project
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
