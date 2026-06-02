export function TeamStats({ totalMembers, engineering, design, management }: { totalMembers: number, engineering: number, design: number, management: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
        <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-muted text-sm font-medium">Total Team</p>
          </div>
          <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{totalMembers}</p>
        </div>
      </div>
      <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
        <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-muted text-sm font-medium">Engineering</p>
          </div>
          <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{engineering}</p>
        </div>
      </div>
      <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
        <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-muted text-sm font-medium">Design</p>
          </div>
          <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{design}</p>
        </div>
      </div>
      <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
        <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-muted text-sm font-medium">Management</p>
          </div>
          <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{management}</p>
        </div>
      </div>
    </div>
  );
}
