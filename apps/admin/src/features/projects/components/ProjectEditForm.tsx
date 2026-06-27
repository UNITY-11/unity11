"use client";

import { useState, useRef, useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createProject, updateProject, deleteProject } from "../actions/createProject";
import { stashListMutation } from "@/lib/adminListCache";

const statusOptions = [
  { value: "new", label: "New" },
  { value: "working", label: "Working On" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

type ProjectEditData = {
  id?: string;
  title: string;
  description: string;
  status: string;
  tags: string[];
  bgStart: string;
  bgEnd: string;
  image: string;
  date?: string;
  visibility?: "public" | "private";
  liveLink?: string;
};

export function ProjectEditForm({ project }: { project?: ProjectEditData }) {
  const isEdit = Boolean(project?.id);
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    isEdit ? updateProject : createProject,
    null
  );

  useEffect(() => {
    if (state?.success && state.item) {
      stashListMutation("projects", {
        op: isEdit ? "update" : "add",
        item: state.item,
      });
      router.push("/projects");
    }
  }, [state, router, isEdit]);

  const [title, setTitle] = useState(project?.title ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [status, setStatus] = useState(project?.status ?? "new");
  const [date, setDate] = useState(project?.date ? new Date(project.date).toISOString().split("T")[0] : "");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [tags, setTags] = useState<string[]>(project?.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [startColor, setStartColor] = useState(project?.bgStart ?? "#2052bd");
  const [endColor, setEndColor] = useState(project?.bgEnd ?? "#7fcbe4");
  const [visibility, setVisibility] = useState<"public" | "private">(project?.visibility ?? "public");
  const [liveLink, setLiveLink] = useState(project?.liveLink ?? "");
  const [previewImage, setPreviewImage] = useState<string | null>(project?.image ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const TITLE_LIMIT = 30;
  const DESC_LIMIT = 150;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  const handleDelete = async () => {
    if (!project?.id || !confirm("Delete this project?")) return;
    const result = await deleteProject(project.id);
    if (result?.error) alert(result.error);
    else {
      stashListMutation("projects", { op: "remove", id: project.id });
      router.push("/projects");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (title.length > TITLE_LIMIT) {
      e.preventDefault();
      alert(`Title exceeds the ${TITLE_LIMIT} character limit.`);
      return;
    }
    if (description.length > DESC_LIMIT) {
      e.preventDefault();
      alert(`Description exceeds the ${DESC_LIMIT} character limit.`);
      return;
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            {isEdit ? "Edit Project" : "Add New Project"}
          </h1>
          <p className="text-text-muted mt-2">
            {isEdit ? "Modify the details of your existing project." : "Create a new project portfolio entry."}
          </p>
        </div>

        {state?.error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">
            {state.error}
          </div>
        )}

        <form action={formAction} onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {isEdit && <input type="hidden" name="id" value={project?.id} />}
          <input type="hidden" name="status" value={status} />
          <input type="hidden" name="tags" value={JSON.stringify(tags)} />
          <input type="hidden" name="bgStart" value={startColor} />
          <input type="hidden" name="bgEnd" value={endColor} />
          <input type="hidden" name="visibility" value={visibility} />
          <input type="hidden" name="liveLink" value={liveLink} />
          <input type="hidden" name="previewImage" value={previewImage ?? ""} />

          <div className="lg:col-span-2 space-y-6 bg-surface rounded-[24px] border border-border-base p-8 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2 space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="title" className="block text-sm font-medium text-text-muted">Project Title</label>
                  <span className={`text-xs ${title.length > TITLE_LIMIT ? "text-red-500" : "text-text-dim"}`}>
                    {TITLE_LIMIT - title.length} characters left
                  </span>
                </div>
                <input
                  required
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={TITLE_LIMIT}
                  className="w-full px-4 py-3 rounded-xl border border-border-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  placeholder="e.g. Modern E-Commerce Platform"
                />
              </div>

              <div className="space-y-2 relative">
                <label className="block text-sm font-medium text-text-muted">Project Type</label>
                <button
                  type="button"
                  onClick={() => setIsTypeOpen(!isTypeOpen)}
                  className="w-full px-4 py-3 rounded-xl border border-border-base bg-background text-foreground flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                >
                  <span className={tags[0] ? "text-foreground" : "text-text-muted"}>
                    {tags[0] || "Select Project Type"}
                  </span>
                  <svg className={`w-5 h-5 transition-transform ${isTypeOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isTypeOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border-base rounded-xl shadow-xl overflow-hidden z-50 max-h-60 overflow-y-auto">
                    {[
                      "UI/UX Design",
                      "Landing Page",
                      "Corporate Website",
                      "Portfolio",
                      "Portfolio Website",
                      "eCommerce Platform",
                      "Web Application",
                      "Mobile App",
                      "Desktop App",
                      "SaaS",
                      "Admin Dashboard",
                      "Custom Software",
                      "Enterprise Solution",
                      "API Development",
                      "System Integration",
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => { setTags([type]); setIsTypeOpen(false); }}
                        className="w-full text-left px-4 py-3 hover:bg-surface-hover"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2 relative">
                <label className="block text-sm font-medium text-text-muted">Project Status</label>
                <button
                  type="button"
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                  className="w-full px-4 py-3 rounded-xl border border-border-base bg-background text-foreground flex items-center justify-between"
                >
                  <span>{statusOptions.find((o) => o.value === status)?.label}</span>
                </button>
                {isStatusOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border-base rounded-xl shadow-xl overflow-hidden z-50">
                    {statusOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => { setStatus(option.value); setIsStatusOpen(false); }}
                        className="w-full text-left px-4 py-3 hover:bg-surface-hover"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {status === "completed" && (
                <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-muted">Visibility</label>
                    <div className="flex gap-6 px-4 py-3 border border-border-base rounded-xl bg-background">
                      <label className="flex items-center gap-2 cursor-pointer text-foreground">
                        <input
                          type="radio"
                          name="visibility_radio"
                          value="public"
                          checked={visibility === "public"}
                          onChange={() => setVisibility("public")}
                          className="accent-primary"
                        />
                        Public
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-foreground">
                        <input
                          type="radio"
                          name="visibility_radio"
                          value="private"
                          checked={visibility === "private"}
                          onChange={() => setVisibility("private")}
                          className="accent-primary"
                        />
                        Private
                      </label>
                    </div>
                  </div>

                  {visibility === "public" && (
                    <div className="space-y-2">
                      <label htmlFor="liveLink_input" className="block text-sm font-medium text-text-muted">Project Live Link</label>
                      <input
                        type="url"
                        id="liveLink_input"
                        value={liveLink}
                        onChange={(e) => setLiveLink(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border-base bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        placeholder="https://yourproject.com"
                      />
                    </div>
                  )}

                </div>
              )}

              <div className="col-span-1 md:col-span-2 space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="description" className="block text-sm font-medium text-text-muted">Description</label>
                  <span className={`text-xs ${description.length > DESC_LIMIT ? "text-red-500" : "text-text-dim"}`}>
                    {DESC_LIMIT - description.length} characters left
                  </span>
                </div>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={DESC_LIMIT}
                  className="w-full px-4 py-3 rounded-xl border border-border-base bg-background text-foreground focus:outline-none resize-none"
                />
              </div>

              <div className="col-span-1 md:col-span-2 flex items-center justify-between pt-6 mt-4 border-t border-border-base">
                {isEdit ? (
                  <button type="button" onClick={handleDelete} className="px-6 py-2.5 rounded-full border border-red-500/50 text-red-500 font-medium hover:bg-red-500 hover:text-white transition-all">
                    Delete Project
                  </button>
                ) : <div />}
                <div className="flex gap-4">
                  <Link href="/projects" className="px-6 py-2.5 rounded-full text-text-muted font-medium">Cancel</Link>
                  <button disabled={isPending} type="submit" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-light text-white font-medium disabled:opacity-50">
                    {isPending ? "Saving..." : isEdit ? "Save Changes" : "Publish Project"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-surface rounded-[24px] border border-border-base p-6 shadow-xl space-y-4">
              <label className="block text-sm font-medium text-text-muted">Project Image (16:9)</label>
              <div
                className="border-2 border-dashed border-border-muted rounded-[16px] cursor-pointer aspect-video relative overflow-hidden"
                onClick={() => fileInputRef.current?.click()}
              >
                <input type="file" name="image" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-dim">Click to upload</div>
                )}
              </div>
            </div>

            <div className="bg-surface rounded-[24px] border border-border-base p-6 shadow-xl space-y-4">
              <label className="block text-sm font-medium text-text-muted">Card Gradient Design</label>
              <div className="w-full h-24 rounded-[16px]" style={{ backgroundImage: `linear-gradient(to right, ${startColor}, ${endColor})` }} />
              <div className="grid grid-cols-2 gap-4">
                <input type="color" value={startColor} onChange={(e) => setStartColor(e.target.value)} className="w-full h-10 rounded-lg" />
                <input type="color" value={endColor} onChange={(e) => setEndColor(e.target.value)} className="w-full h-10 rounded-lg" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

