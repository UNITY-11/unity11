"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useEditor, EditorContent, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import Placeholder from '@tiptap/extension-placeholder';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textTransform: {
      setTextTransform: (textTransform: string) => ReturnType;
      unsetTextTransform: () => ReturnType;
    };
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

// Custom Image Extension to support resizing classes
const CustomImage = ImageExtension.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: 'w-full max-w-full h-auto object-cover rounded-2xl mx-auto my-8',
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => {
          return {
            class: attributes.class,
          }
        },
      },
    }
  },
});

// Custom Table Cell for Vertical Alignment
const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      valign: {
        default: 'top',
        parseHTML: element => element.getAttribute('valign') || 'top',
        renderHTML: attributes => {
          return {
            valign: attributes.valign,
            class: `px-3 py-2 !align-${attributes.valign} relative min-w-[50px] break-words focus:outline-none focus:ring-1 focus:ring-[#007ee1]/50`
          }
        }
      }
    }
  },
});

// Custom Text Transform Extension
const TextTransformExtension = Extension.create({
  name: 'textTransform',
  addOptions() {
    return {
      types: ['textStyle'],
    }
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textTransform: {
            default: null,
            parseHTML: (element: any) => element.style.textTransform || null,
            renderHTML: (attributes: any) => {
              if (!attributes.textTransform) return {};
              return { style: `text-transform: ${attributes.textTransform}` };
            },
          },
        },
      },
    ]
  },
  addCommands() {
    return {
      setTextTransform: (textTransform: string) => ({ chain }: any) => {
        return chain().setMark('textStyle', { textTransform }).run()
      },
      unsetTextTransform: () => ({ chain }: any) => {
        return chain().setMark('textStyle', { textTransform: null }).removeEmptyTextStyle().run()
      },
    }
  },
});

// Custom Font Size Extension
const FontSizeExtension = Extension.create({
  name: 'fontSize',
  addOptions() {
    return {
      types: ['textStyle'],
    }
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element: any) => element.style.fontSize || null,
            renderHTML: (attributes: any) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ]
  },
  addCommands() {
    return {
      setFontSize: (fontSize: string) => ({ chain }: any) => {
        return chain().setMark('textStyle', { fontSize }).run()
      },
      unsetFontSize: () => ({ chain }: any) => {
        return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run()
      },
    }
  },
});

export default function AddBlogPage() {
  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [tags, setTags] = useState<string[]>(["Tech", "Design"]);
  const [tagInput, setTagInput] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [schedule, setSchedule] = useState("Immediate");
  const [coverMedia, setCoverMedia] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Custom Dropdown States
  const [category, setCategory] = useState("");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);

  const categories = ["Engineering", "Design", "Business", "Culture"];
  const colors = ["#ffffff", "#888888", "#007ee1", "#00b4d8", "#ff4444", "#00c853", "#ffc107"];

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverMedia(e.target.files[0]);
    }
  };

  // TipTap Editor Setup
  const extensions = useMemo(() => [
    StarterKit.configure({
      bulletList: { keepMarks: true, keepAttributes: false },
      orderedList: { keepMarks: true, keepAttributes: false },
    }),
    Placeholder.configure({
      placeholder: 'Start writing...',
    }),
    Underline,
    LinkExtension.configure({ openOnClick: false }),
    CustomImage,
    TextAlign.configure({ types: ['heading', 'paragraph', 'tableCell', 'tableHeader'] }),
    TextStyle,
    Color,
    Highlight.configure({ multicolor: true }),
    FontSizeExtension,
    Table.configure({
      resizable: true,
      HTMLAttributes: {
        class: 'max-w-full my-8 table-auto border-collapse',
      },
    }),
    TableRow.configure({
      HTMLAttributes: { class: 'group/row relative' }
    }),
    TableHeader.configure({
      HTMLAttributes: { class: 'bg-transparent text-left font-semibold px-3 py-2 relative min-w-[50px] align-top' }
    }),
    CustomTableCell,
    TextTransformExtension,
  ], []);

  const editorProps = useMemo(() => ({
    attributes: {
      class: 'w-full h-full min-h-[500px] bg-transparent text-[#e0e0e0] placeholder:text-[#555555] focus:outline-none resize-none text-lg leading-relaxed prose prose-invert max-w-none prose-img:cursor-pointer prose-table:table-auto prose-table:w-auto prose-td:border prose-td:border-dashed prose-td:border-[#333333]/50 prose-th:border prose-th:border-dashed prose-th:border-[#333333]/50 [&_.tableWrapper]:overflow-x-auto [&_.tableWrapper]:max-w-full',
    },
  }), []);

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [, setEditorUpdateKey] = useState(0);

  const editor = useEditor({
    extensions,
    content: '',
    editorProps,
    onUpdate({ editor }) {
      setCanUndo(editor.can().undo());
      setCanRedo(editor.can().redo());
      setEditorUpdateKey(prev => prev + 1);
    },
    onSelectionUpdate() {
      setEditorUpdateKey(prev => prev + 1);
    },
    onTransaction({ editor }) {
      setCanUndo(editor.can().undo());
      setCanRedo(editor.can().redo());
      setEditorUpdateKey(prev => prev + 1);
    }
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const handleSave = (type: "Publish" | "Draft") => {
    setIsSaving(true);
    const formData = {
      title,
      slug,
      content: editor?.getHTML(),
      coverMedia: coverMedia?.name || null,
      category,
      tags,
      metaTitle,
      metaDescription,
      keywords,
      visibility,
      schedule,
      status: type
    };

    console.log("=== Saving Blog Post ===");
    console.log(formData);
    
    setTimeout(() => {
      setIsSaving(false);
      alert(`Post successfully saved as ${type}! Check console for payload.`);
    }, 1000);
  };

  return (
    <div className="-m-4 md:-m-6 lg:-m-8 min-h-[calc(100vh-73px)] flex flex-col bg-[#000000] text-white relative">
      
      {/* Sticky Top Action Bar */}
      <div className="sticky -top-4 md:-top-6 lg:-top-8 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#222222] px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/blogs" className="text-[#888888] hover:text-white transition-colors p-2 rounded-full hover:bg-[#1a1a1a]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </Link>
          <div>
            <h1 className="text-lg font-semibold leading-none">{title ? title : "Draft in Progress"}</h1>
            <p className="text-xs text-[#555555] mt-1">{isSaving ? "Saving..." : "Last saved just now"}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={() => setIsPreviewOpen(true)}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[#888888] hover:text-white hover:bg-[#1a1a1a] transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            Preview
          </button>
          <button 
            type="button" 
            onClick={() => handleSave("Draft")}
            disabled={isSaving}
            className="px-4 py-2 rounded-full text-sm font-medium border border-[#333333] bg-[#111111] hover:bg-[#222222] transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>
          <button 
            type="button" 
            onClick={() => handleSave("Publish")}
            disabled={isSaving}
            className="px-6 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#007ee1] to-[#00b4d8] text-white shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSaving ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-8">
        
        {/* Top Settings Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-[#111111] border border-[#222222] rounded-[24px] overflow-hidden shadow-lg">
            <div className="p-5 border-b border-[#222222]">
              <h3 className="font-semibold text-white">Cover Media</h3>
            </div>
            <div className="p-5 space-y-4">
              <div 
                className="w-full aspect-[21/9] rounded-xl border-2 border-dashed border-[#333333] hover:border-[#007ee1] bg-[#0a0a0a] flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors relative overflow-hidden group"
                onClick={() => fileInputRef.current?.click()}
              >
                {coverMedia ? (
                  <img src={URL.createObjectURL(coverMedia)} alt="Cover" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center group-hover:bg-[#007ee1]/10 group-hover:text-[#007ee1] transition-colors">
                      <svg className="w-5 h-5 text-[#888888] group-hover:text-[#007ee1]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <p className="text-sm text-[#888888] group-hover:text-white transition-colors">Click to upload cover image</p>
                  </>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" className="hidden" />
              </div>
            </div>
          </div>

          <div className="bg-[#111111] border border-[#222222] rounded-[24px] overflow-hidden shadow-lg">
            <div className="p-5 border-b border-[#222222]">
              <h3 className="font-semibold text-white">Organization</h3>
            </div>
            <div className="p-5 space-y-5">
              <div className="space-y-2 relative" ref={categoryRef}>
                <label className="text-sm font-medium text-[#888888]">Category</label>
                <div 
                  className="w-full px-4 py-3 rounded-xl border border-[#333333] bg-[#0a0a0a] flex items-center justify-between cursor-pointer hover:border-[#555] transition-colors"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                  <span className={category ? "text-white" : "text-[#555555]"}>{category || "Select a category..."}</span>
                  <svg className={`w-4 h-4 text-[#888888] transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
                {isCategoryOpen && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-[#1a1a1a] border border-[#333333] rounded-xl overflow-hidden shadow-2xl z-20">
                    {categories.map(cat => (
                      <div 
                        key={cat} 
                        className="px-4 py-3 hover:bg-[#007ee1]/10 hover:text-[#007ee1] cursor-pointer transition-colors"
                        onClick={() => { setCategory(cat); setIsCategoryOpen(false); }}
                      >
                        {cat}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#888888]">Tags</label>
                <div className="w-full min-h-[50px] p-2 rounded-xl border border-[#333333] bg-[#0a0a0a] flex flex-wrap gap-2 items-center focus-within:border-[#007ee1] transition-colors">
                  {tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-[#1a1a1a] border border-[#333333] rounded-lg text-sm flex items-center gap-2">
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)} className="text-[#888888] hover:text-[#ff4444] transition-colors">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </span>
                  ))}
                  <input 
                    type="text" 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="flex-1 min-w-[100px] bg-transparent border-none focus:outline-none text-sm px-2 text-white placeholder:text-[#555555]"
                    placeholder="Add tags..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#111111] border border-[#222222] rounded-[24px] overflow-hidden shadow-lg">
            <div className="p-5 border-b border-[#222222] flex justify-between items-center">
              <h3 className="font-semibold text-white">SEO Settings</h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#888888]">Meta Title <span className="text-[#555555] ml-1">({metaTitle.length}/60)</span></label>
                <input 
                  type="text" 
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#333333] bg-[#0a0a0a] text-white focus:outline-none focus:border-[#007ee1] transition-colors text-sm" 
                  placeholder="SEO optimized title..." 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#888888]">Meta Description <span className="text-[#555555] ml-1">({metaDescription.length}/160)</span></label>
                <textarea 
                  rows={2}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#333333] bg-[#0a0a0a] text-white focus:outline-none focus:border-[#007ee1] transition-colors text-sm resize-none" 
                  placeholder="Brief summary for search engines..." 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="space-y-6 w-full">
          <div className="bg-[#111111] border border-[#222222] rounded-[24px] p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-[#007ee1]/10 blur-[100px] pointer-events-none"></div>
            <div className="relative z-10 space-y-6">
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog Post Title..."
                className="w-full bg-transparent text-4xl sm:text-5xl font-bold text-white placeholder:text-[#333333] focus:outline-none focus:ring-0 border-none p-0 resize-none"
              />
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
                <div className="flex items-center text-[#888888] bg-[#0a0a0a] border border-[#333333] rounded-full overflow-hidden focus-within:border-[#007ee1] transition-colors flex-1 max-w-md">
                  <span className="px-4 py-2 bg-[#1a1a1a] border-r border-[#333333] shrink-0">unity11.com/blog/</span>
                  <input 
                    type="text" 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="post-url-slug"
                    className="flex-1 px-4 py-2 bg-transparent text-white focus:outline-none placeholder:text-[#555555] min-w-0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#111111] border border-[#222222] rounded-[24px] shadow-xl flex flex-col min-h-[600px] relative">
            {/* Editor Toolbar - Sticky Top */}
            {editor && (
              <div className="w-full shrink-0 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-[#222222] flex flex-row items-center px-4 py-3 gap-2 overflow-x-auto custom-scrollbar z-40 sticky top-[52px] md:top-[44px] lg:top-[36px] rounded-t-[24px]">
                
                <div className="flex flex-row items-center gap-1 pr-4 border-r border-[#333333]">
                  <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!canUndo} className="p-2 rounded-lg transition-colors text-[#888888] hover:text-white hover:bg-[#222222] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#888888]" title="Undo (Ctrl+Z)">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                  </button>
                  <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!canRedo} className="p-2 rounded-lg transition-colors text-[#888888] hover:text-white hover:bg-[#222222] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#888888]" title="Redo (Ctrl+Shift+Z)">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" /></svg>
                  </button>
                </div>

                {/* Formatting */}
                <div className="flex flex-row items-center gap-1 px-2 pr-4 border-r border-[#333333]">
                  <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('paragraph') ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Paragraph"><span className="text-sm font-bold">P</span></button>
                  <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 1 }) ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Heading 1"><span className="text-sm font-bold">H1</span></button>
                  <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 2 }) ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Heading 2"><span className="text-sm font-bold">H2</span></button>
                  <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 3 }) ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Heading 3"><span className="text-sm font-bold">H3</span></button>
                </div>
                
                {/* Text Styles */}
                <div className="flex flex-row items-center gap-1 px-2 pr-4 border-r border-[#333333]">
                  <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('bold') ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Bold"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" /></svg></button>
                  <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('italic') ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Italic"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg></button>
                  <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('underline') ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Underline"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 21h16" /></svg></button>
                  <button type="button" onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffc107' }).run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('highlight') ? 'text-[#ffc107] bg-[#ffc107]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Highlight"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                  
                  <div className="w-[1px] h-4 bg-[#333333] mx-1"></div>
                  <button type="button" onClick={() => (editor.chain().focus() as any).setTextTransform('uppercase').run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('textStyle', { textTransform: 'uppercase' }) ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Uppercase"><span className="text-sm font-bold uppercase">AA</span></button>
                  <button type="button" onClick={() => (editor.chain().focus() as any).setTextTransform('lowercase').run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('textStyle', { textTransform: 'lowercase' }) ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Lowercase"><span className="text-sm font-bold lowercase">aa</span></button>
                  <button type="button" onClick={() => (editor.chain().focus() as any).setTextTransform('capitalize').run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('textStyle', { textTransform: 'capitalize' }) ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Capitalize"><span className="text-sm font-bold capitalize">Aa</span></button>
                  <button type="button" onClick={() => (editor.chain().focus() as any).unsetTextTransform().run()} className={`p-2 rounded-lg transition-colors text-[#888888] hover:text-[#ff4444] hover:bg-[#ff4444]/10`} title="Clear Transform"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>

                {/* Alignment (X & Y) */}
                <div className="flex flex-row items-center gap-1 px-2 pr-4 border-r border-[#333333]">
                  <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`p-2 rounded-lg transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Align Left"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" /></svg></button>
                  <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`p-2 rounded-lg transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Align Center"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M4 18h16" /></svg></button>
                  <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`p-2 rounded-lg transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Align Right"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M4 18h16" /></svg></button>
                  
                  <div className="w-[1px] h-4 bg-[#333333] mx-1"></div>
                  
                  <button type="button" onClick={() => editor.chain().focus().updateAttributes('tableCell', { valign: 'top' }).run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('tableCell', { valign: 'top' }) ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Align Top (Grid)">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16M4 10h10" /></svg>
                  </button>
                  <button type="button" onClick={() => editor.chain().focus().updateAttributes('tableCell', { valign: 'middle' }).run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('tableCell', { valign: 'middle' }) ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Align Middle (Grid)">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16M4 8h10M4 16h10" /></svg>
                  </button>
                  <button type="button" onClick={() => editor.chain().focus().updateAttributes('tableCell', { valign: 'bottom' }).run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('tableCell', { valign: 'bottom' }) ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Align Bottom (Grid)">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20h16M4 14h10" /></svg>
                  </button>
                </div>

                {/* Inserts & Lists */}
                <div className="flex flex-row items-center gap-1 px-2 pr-4 border-r border-[#333333]">
                  <button type="button" onClick={setLink} className={`p-2 rounded-lg transition-colors ${editor.isActive('link') ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Link"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg></button>
                  <button type="button" onClick={addImage} className={`p-2 rounded-lg transition-colors ${editor.isActive('image') ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Image"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></button>
                  <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('codeBlock') ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Code Block"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg></button>
                  <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('blockquote') ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Quote"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg></button>
                </div>

                <div className="flex flex-row items-center gap-1 px-2 pr-4 border-r border-[#333333]">
                  <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded-lg transition-colors ${editor.isActive('bulletList') ? 'text-[#007ee1] bg-[#007ee1]/10' : 'text-[#888888] hover:text-white hover:bg-[#222222]'}`} title="Bullet List"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
                </div>

                <div className="flex flex-row items-center gap-1 px-2 pr-4 border-r border-[#333333]">
                  <select
                    className="bg-[#111111] border border-[#333333] rounded-lg px-2 py-1.5 text-[#888888] focus:outline-none focus:border-[#007ee1] transition-colors text-sm hover:bg-[#222222] hover:text-white cursor-pointer appearance-none text-center"
                    onChange={(e) => {
                      if (e.target.value) {
                        (editor.chain().focus() as any).setFontSize(e.target.value).run();
                      } else {
                        (editor.chain().focus() as any).unsetFontSize().run();
                      }
                    }}
                    value={editor.getAttributes('textStyle').fontSize || ''}
                    title="Font Size"
                  >
                    <option value="">Default</option>
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                    <option value="24px">24px</option>
                    <option value="30px">30px</option>
                    <option value="36px">36px</option>
                  </select>
                </div>

                {/* Layouts / Grid */}
                <div className="flex flex-row items-center gap-1 pl-2">
                  <button 
                    type="button" 
                    onClick={() => editor.chain().focus().insertTable({ rows: 1, cols: 2, withHeaderRow: false }).run()} 
                    className="p-2 rounded-lg text-[#888888] hover:text-white hover:bg-[#222222] transition-colors" 
                    title="Insert Grid / Side-by-Side Layout"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
                  </button>
                  {editor.isActive('table') && (
                    <div className="flex flex-row items-center gap-1 bg-[#1a1a1a] rounded-xl border border-[#333333] p-1 shadow-md ml-2">
                      <button type="button" onClick={() => editor.chain().focus().addColumnAfter().run()} className="p-1.5 text-[#cccccc] hover:text-[#007ee1] hover:bg-[#007ee1]/10 rounded-lg transition-colors" title="Add Column">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                      </button>
                      <button type="button" onClick={() => editor.chain().focus().deleteColumn().run()} className="p-1.5 text-[#cccccc] hover:text-[#ff4444] hover:bg-[#ff4444]/10 rounded-lg transition-colors" title="Delete Column">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                      </button>
                      <button type="button" onClick={() => editor.chain().focus().addRowAfter().run()} className="p-1.5 text-[#cccccc] hover:text-[#007ee1] hover:bg-[#007ee1]/10 rounded-lg transition-colors" title="Add Row">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16m-8-8v16" /></svg>
                      </button>
                      <button type="button" onClick={() => editor.chain().focus().deleteRow().run()} className="p-1.5 text-[#cccccc] hover:text-[#ff4444] hover:bg-[#ff4444]/10 rounded-lg transition-colors" title="Delete Row">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16" /></svg>
                      </button>
                      <div className="w-[1px] h-4 bg-[#333333] mx-1"></div>
                      <button type="button" onClick={() => editor.chain().focus().deleteTable().run()} className="p-1.5 text-[#888888] hover:text-[#ff4444] hover:bg-[#ff4444]/10 rounded-lg transition-colors" title="Delete Entire Layout">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Contextual Image Controls */}
            {editor?.isActive('image') && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#1a1a1a]/95 backdrop-blur-md rounded-lg border border-[#007ee1]/30 p-2 shadow-2xl z-20">
                <span className="text-xs text-[#007ee1] font-medium mr-2">Image:</span>
                <button type="button" onClick={() => editor.chain().focus().updateAttributes('image', { class: 'w-1/4 max-w-[25%] h-auto object-cover rounded-2xl mx-auto my-8' }).run()} className="px-2 py-1 text-xs font-medium text-[#888888] hover:text-[#007ee1] hover:bg-[#007ee1]/10 rounded transition-colors">Small</button>
                <button type="button" onClick={() => editor.chain().focus().updateAttributes('image', { class: 'w-1/2 max-w-[50%] h-auto object-cover rounded-2xl mx-auto my-8' }).run()} className="px-2 py-1 text-xs font-medium text-[#888888] hover:text-[#007ee1] hover:bg-[#007ee1]/10 rounded transition-colors">Medium</button>
                <button type="button" onClick={() => editor.chain().focus().updateAttributes('image', { class: 'w-full max-w-full h-auto object-cover rounded-2xl mx-auto my-8' }).run()} className="px-2 py-1 text-xs font-medium text-[#888888] hover:text-[#007ee1] hover:bg-[#007ee1]/10 rounded transition-colors">Full</button>
                <div className="w-[1px] h-3 bg-[#333333] mx-1"></div>
                <button type="button" onClick={() => editor.chain().focus().updateAttributes('image', { class: 'w-1/2 max-w-[50%] h-auto object-cover rounded-2xl mr-auto my-8' }).run()} className="p-1 text-[#888888] hover:text-[#007ee1] hover:bg-[#007ee1]/10 rounded transition-colors" title="Align Left"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8M4 18h16" /></svg></button>
                <button type="button" onClick={() => editor.chain().focus().updateAttributes('image', { class: 'w-1/2 max-w-[50%] h-auto object-cover rounded-2xl ml-auto my-8' }).run()} className="p-1 text-[#888888] hover:text-[#007ee1] hover:bg-[#007ee1]/10 rounded transition-colors" title="Align Right"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M12 12h8M4 18h16" /></svg></button>
              </div>
            )}
            {/* Editor Area */}
            <div className="flex-1 p-8 overflow-y-auto w-full">
              <EditorContent editor={editor} className="w-full h-full min-h-[500px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-[#222222] bg-[#0a0a0a]">
            <h2 className="text-white font-medium flex items-center gap-2">
              <svg className="w-5 h-5 text-[#007ee1]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              Live Preview Mode
            </h2>
            <button 
              onClick={() => setIsPreviewOpen(false)}
              className="px-4 py-2 rounded-lg bg-[#222222] text-white hover:bg-[#333333] transition-colors text-sm font-medium"
            >
              Close Preview
            </button>
          </div>
          <div className="flex-1 overflow-y-auto bg-[#111111] p-4 sm:p-8">
            <div className="max-w-4xl mx-auto bg-[#0a0a0a] rounded-[32px] overflow-hidden border border-[#222222] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              {coverMedia && (
                <div className="w-full aspect-[21/9] relative border-b border-[#222222]">
                  <img src={URL.createObjectURL(coverMedia)} alt="Cover" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-8 sm:p-12 lg:p-16">
                <div className="flex flex-wrap gap-2 mb-6">
                  {category && <span className="text-xs px-3 py-1 rounded-full bg-[#007ee1]/10 text-[#007ee1] font-medium border border-[#007ee1]/20">{category}</span>}
                  {tags.map(tag => <span key={tag} className="text-xs px-3 py-1 rounded-full bg-[#222222] text-[#e0e0e0] border border-[#333333]">{tag}</span>)}
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">{title || "Untitled Blog Post"}</h1>
                <div className="flex items-center gap-4 mb-12 pb-12 border-b border-[#222222]">
                  <div className="w-12 h-12 rounded-full bg-[#222222] overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Author" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Alex Rivera</p>
                    <p className="text-[#888888] text-sm">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} • {schedule === 'Immediate' ? 'Published' : 'Draft'}</p>
                  </div>
                </div>
                
                {/* The HTML Content rendered with tailwind typography */}
                <article 
                  className="w-full bg-transparent text-[#e0e0e0] text-lg leading-relaxed prose prose-invert max-w-none prose-table:table-auto prose-table:w-auto prose-td:border-none prose-th:border-none prose-a:text-[#007ee1] hover:prose-a:text-[#00b4d8] prose-img:rounded-2xl [&_.tableWrapper]:overflow-x-auto [&_.tableWrapper]:max-w-full"
                  dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "<p>Start writing to see your content previewed here...</p>" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
