import Link from "next/link";
import { TeamMember } from "../types";

const getStatusColor = (status: string) => {
  return status === "Active" ? "bg-success text-success" : "bg-warning text-warning";
};

export function TeamGrid({ team }: { team: TeamMember[] }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        {team.map((member) => (
          <div key={member.id} className="group relative rounded-[28px] bg-surface border border-border-base shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col">
            <Link href={`/team/${member.id}`} className="flex-1 p-6 relative z-10 flex flex-col h-full cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border-base relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={member.avatar} alt={member.name} className="object-cover w-full h-full" />
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusColor(member.status)} bg-opacity-10 border shadow-sm ${member.status === 'Active' ? 'border-success/20' : 'border-warning/20'}`}>
                    {member.status}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                <p className="text-sm font-medium text-text-dim mb-3">{member.role}</p>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <span className="w-2 h-2 rounded-full bg-primary/40"></span>
                  {member.department}
                </div>
              </div>
            </Link>

            <div className="px-6 pb-6 pt-2 bg-gradient-to-b from-transparent to-surface-active/50 relative z-20 mt-auto">
              <div className="flex w-full gap-3">
                <a 
                  href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`} 
                  className="flex-1 flex items-center justify-center py-3 bg-surface rounded-full text-primary hover:bg-primary hover:text-white transition-colors duration-300 shadow-md"
                  title="Call"
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </a>
                <a 
                  href={`mailto:${member.email}`}
                  className="flex-1 flex items-center justify-center py-3 bg-surface rounded-full text-danger hover:bg-danger hover:text-white transition-colors duration-300 shadow-md"
                  title="Email"
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                </a>
                <a 
                  href={`https://wa.me/${member.phone.replace(/[^0-9+]/g, '')}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center py-3 bg-surface rounded-full text-success hover:bg-success hover:text-white transition-colors duration-300 shadow-md"
                  title="WhatsApp"
                >
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {team.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-surface border border-border-base rounded-[24px] mt-8">
          <div className="w-20 h-20 bg-surface-hover border border-border-base rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <h3 className="text-xl font-medium text-foreground mb-2">No team members found</h3>
          <p className="text-text-muted max-w-md">We couldn't find any team members matching your criteria. Try adjusting your search or filter parameters.</p>
        </div>
      )}
    </>
  );
}
