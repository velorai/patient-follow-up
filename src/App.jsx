import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { TrendingUp, MessageSquare, Mail, Search, X, CheckCircle2, AlertTriangle, Clock, ChevronRight, Phone, Activity, ShieldCheck, FileText, Send, CalendarClock, Banknote, Sparkles } from "lucide-react";

const AVG_VISIT = 110;
const ACCENT = "#7c6af7";

const LOGO_URL = "https://wsrv.nl/?url=framerusercontent.com%2Fimages%2F4qitVPYfnOc0RLHH5VqUM7aQCUc.png&w=120&h=120&fit=contain&output=png";
const IMG_CLINIC = "https://pikaso.cdnpk.net/private/production/4584743789/render.jpg?token=exp=1781740800~hmac=5f2fad17ffcd8bd608c5a46ca3badfb75fda612a8526a6c0d67b0628fe980f50";
const IMG_ILLUST = "https://pikaso.cdnpk.net/private/production/4584744179/render.jpg?token=exp=1781740800~hmac=1ad4a6833e8617bb8330e56df9a4f1478e7f5999d9177c933a7d40d3085d9b7b";

const initialPatients = [
  { id: 1, name: "Sarah Mitchell", initials: "SM", practitioner: "Dr. Emma Walsh", daysSince: 25, visitsDone: 2, planTotal: 6, condition: "Lower back pain", phone: "0412 555 081", risk: "high", status: "atrisk" },
  { id: 2, name: "James O'Connor", initials: "JO", practitioner: "Dr. Liam Chen", daysSince: 22, visitsDone: 3, planTotal: 8, condition: "ACL rehab", phone: "0423 555 194", risk: "high", status: "atrisk" },
  { id: 3, name: "Priya Sharma", initials: "PS", practitioner: "Dr. Emma Walsh", daysSince: 19, visitsDone: 2, planTotal: 5, condition: "Shoulder impingement", phone: "0434 555 327", risk: "medium", status: "atrisk" },
  { id: 4, name: "Tom Riley", initials: "TR", practitioner: "Dr. Sofia Russo", daysSince: 17, visitsDone: 4, planTotal: 10, condition: "Post-op knee", phone: "0445 555 268", risk: "medium", status: "atrisk" },
  { id: 5, name: "Grace Nguyen", initials: "GN", practitioner: "Dr. Liam Chen", daysSince: 15, visitsDone: 1, planTotal: 6, condition: "Neck pain / whiplash", phone: "0456 555 412", risk: "medium", status: "atrisk" },
  { id: 6, name: "David Kowalski", initials: "DK", practitioner: "Dr. Marcus Reid", daysSince: 28, visitsDone: 3, planTotal: 6, condition: "Tennis elbow", phone: "0467 555 533", risk: "high", status: "atrisk" },
  { id: 7, name: "Lily Thompson", initials: "LT", practitioner: "Dr. Sofia Russo", daysSince: 11, visitsDone: 2, planTotal: 8, condition: "Hip bursitis", phone: "0478 555 645", risk: "watch", status: "atrisk" },
  { id: 8, name: "Ahmed Hassan", initials: "AH", practitioner: "Dr. Marcus Reid", daysSince: 9, visitsDone: 5, planTotal: 12, condition: "Achilles tendinopathy", phone: "0489 555 756", risk: "watch", status: "atrisk" },
  { id: 9, name: "Chloe Martin", initials: "CM", practitioner: "Dr. Emma Walsh", daysSince: 8, visitsDone: 1, planTotal: 4, condition: "Plantar fasciitis", phone: "0490 555 867", risk: "watch", status: "atrisk" },
  { id: 10, name: "Ben Carter", initials: "BC", practitioner: "Dr. Liam Chen", daysSince: 31, visitsDone: 2, planTotal: 7, condition: "Rotator cuff strain", phone: "0401 555 978", risk: "high", status: "atrisk" },
];

const initialClaims = [
  { id: 1, name: "Luke Pearson", scheme: "WorkCover", claimNo: "WC-2026-08812", practitioner: "Dr. Marcus Reid", sessionsUsed: 7, sessionsApproved: 8, daysToExpiry: 5, expiry: "17 Jun 2026", unbilled: 440, condition: "Lumbar strain — warehouse injury", extensionRequested: false },
  { id: 2, name: "Marco Bianchi", scheme: "TAC", claimNo: "TAC-2026-48217", practitioner: "Dr. Sofia Russo", sessionsUsed: 9, sessionsApproved: 12, daysToExpiry: 8, expiry: "20 Jun 2026", unbilled: 330, condition: "Whiplash — MVA rehabilitation", extensionRequested: false },
  { id: 3, name: "Karen Liu", scheme: "WorkCover", claimNo: "WC-2026-09934", practitioner: "Dr. Emma Walsh", sessionsUsed: 5, sessionsApproved: 8, daysToExpiry: 13, expiry: "25 Jun 2026", unbilled: 0, condition: "Repetitive strain — wrist", extensionRequested: false },
  { id: 4, name: "Steve Adams", scheme: "WorkCover", claimNo: "WC-2026-07156", practitioner: "Dr. Liam Chen", sessionsUsed: 11, sessionsApproved: 12, daysToExpiry: 48, expiry: "30 Jul 2026", unbilled: 550, condition: "Shoulder reconstruction rehab", extensionRequested: false },
  { id: 5, name: "Fatima Rahman", scheme: "TAC", claimNo: "TAC-2026-51903", practitioner: "Dr. Sofia Russo", sessionsUsed: 3, sessionsApproved: 10, daysToExpiry: 64, expiry: "15 Aug 2026", unbilled: 220, condition: "Knee ligament — MVA", extensionRequested: false },
];

const trendData = [
  { month: "Nov", leaked: 4180, recovered: 880 },
  { month: "Dec", leaked: 5240, recovered: 1100 },
  { month: "Jan", leaked: 4950, recovered: 1430 },
  { month: "Feb", leaked: 4620, recovered: 1870 },
  { month: "Mar", leaked: 4070, recovered: 2310 },
  { month: "Apr", leaked: 3850, recovered: 2640 },
  { month: "May", leaked: 3520, recovered: 2970 },
  { month: "Jun", leaked: 3190, recovered: 3410 },
];

const practitionerBase = [
  { name: "Dr. Emma Walsh", rebookRate: 84, patients: 142 },
  { name: "Dr. Liam Chen", rebookRate: 71, patients: 128 },
  { name: "Dr. Sofia Russo", rebookRate: 89, patients: 156 },
  { name: "Dr. Marcus Reid", rebookRate: 66, patients: 117 },
];

const riskConfig = {
  high: { label: "High risk", bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
  medium: { label: "Medium", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
  watch: { label: "Watch", bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200", dot: "bg-violet-500" },
};

const fmt = (n) => "$" + n.toLocaleString("en-AU");
const rem = (p) => (p.planTotal - p.visitsDone) * AVG_VISIT;
const hideImg = (e) => { e.currentTarget.style.display = "none"; };
const logoFallback = (e) => { e.currentTarget.style.display = "none"; const p = e.currentTarget.parentElement; if (p && !p.querySelector(".lf")) { const s = document.createElement("span"); s.className = "lf"; s.textContent = "V"; s.style.cssText = "color:#7c6af7;font-weight:800;font-size:15px"; p.appendChild(s); } };

function smsTemplate(p) {
  const first = p.name.split(" ")[0];
  return `Hi ${first}, it's the team at Brunswick Physio. ${p.practitioner.replace("Dr. ", "")} noticed it's been a while since your last session for your ${p.condition.toLowerCase()}. You were making great progress — shall we get your next appointment booked? Reply YES and we'll sort a time, or call (03) 9388 0123.`;
}
function emailTemplate(p) {
  const first = p.name.split(" ")[0];
  return `Hi ${first},\n\nWe hope you're doing well. ${p.practitioner} asked us to check in — it's been ${p.daysSince} days since your last visit for your ${p.condition.toLowerCase()}, and you're ${p.visitsDone} sessions into your ${p.planTotal}-session recovery plan.\n\nConsistency at this stage makes a real difference to your long-term outcome.\n\nYou can book your next session online in under a minute, or simply reply to this email.\n\nWarm regards,\nThe Brunswick Physio Team\n(03) 9388 0123`;
}

export default function VelorAI() {
  const [tab, setTab] = useState("overview");
  const [patients, setPatients] = useState(initialPatients);
  const [claims, setClaims] = useState(initialClaims);
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [pracFilter, setPracFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [draft, setDraft] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3200); };

  const stats = useMemo(() => {
    const open = patients.filter((p) => p.status !== "rebooked");
    return {
      atRiskValue: open.reduce((s, p) => s + rem(p), 0),
      recovered: 3410 + patients.filter((p) => p.status === "rebooked").reduce((s, p) => s + rem(p), 0),
      openCount: open.length,
    };
  }, [patients]);

  const claimStats = useMemo(() => ({
    unbilled: claims.reduce((s, c) => s + c.unbilled, 0),
    expiring: claims.filter((c) => c.daysToExpiry <= 14 && !c.extensionRequested).length,
  }), [claims]);

  const filtered = useMemo(() => patients.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.condition.toLowerCase().includes(search.toLowerCase())) return false;
    if (riskFilter !== "all" && p.risk !== riskFilter) return false;
    if (pracFilter !== "all" && p.practitioner !== pracFilter) return false;
    return true;
  }), [patients, search, riskFilter, pracFilter]);

  const practitioners = useMemo(() => practitionerBase.map((pr) => {
    const atRisk = patients.filter((p) => p.practitioner === pr.name && p.status !== "rebooked");
    return { ...pr, atRiskCount: atRisk.length, atRiskValue: atRisk.reduce((s, p) => s + rem(p), 0) };
  }), [patients]);

  const sortedFiltered = [...filtered].sort((a, b) => {
    const o = { atrisk: 0, contacted: 1, rebooked: 2 };
    if (o[a.status] !== o[b.status]) return o[a.status] - o[b.status];
    return b.daysSince - a.daysSince;
  });

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "patients", label: "At-Risk Patients", badge: stats.openCount },
    { id: "workcover", label: "WorkCover / TAC", badge: claimStats.expiring },
    { id: "team", label: "Team" },
    { id: "digest", label: "Weekly Digest" },
  ];

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center shadow-sm overflow-hidden shrink-0">
              <img src={LOGO_URL} alt="VelorAI" className="w-7 h-7 object-contain" onError={logoFallback} />
            </div>
            <div className="min-w-0">
              <h1 className="text-base font-bold text-slate-900 leading-tight tracking-tight">VelorAI</h1>
              <p className="text-xs text-slate-500 leading-tight truncate">Brunswick Physio · Melbourne</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Synced with Cliniko · 4 min ago
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-3.5 py-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${tab === t.id ? "border-violet-600 text-violet-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
              {t.label}
              {t.badge > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${tab === t.id ? "bg-violet-100 text-violet-700" : "bg-slate-200 text-slate-600"}`}>{t.badge}</span>
              )}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* KPI CARDS */}
        {tab !== "digest" && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-2"><AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0" /><span className="truncate">REVENUE AT RISK</span></div>
              <div className="text-2xl font-bold text-slate-900">{fmt(stats.atRiskValue + claimStats.unbilled)}</div>
              <div className="text-xs text-slate-500 mt-1">incl. {fmt(claimStats.unbilled)} unbilled comp.</div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-2"><TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" /><span className="truncate">RECOVERED — JUNE</span></div>
              <div className="text-2xl font-bold text-emerald-600">{fmt(stats.recovered)}</div>
              <div className="text-xs text-slate-500 mt-1">↑ +15% vs May</div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-2"><Activity className="w-3.5 h-3.5 text-violet-500 shrink-0" /><span className="truncate">REBOOK RATE</span></div>
              <div className="text-2xl font-bold text-slate-900">78%</div>
              <div className="text-xs text-slate-500 mt-1">Target 85% · avg 72%</div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-2"><ShieldCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0" /><span className="truncate">APPROVALS EXPIRING</span></div>
              <div className="text-2xl font-bold text-slate-900">{claimStats.expiring}</div>
              <div className="text-xs text-slate-500 mt-1">Next 14 days</div>
            </div>
          </div>
        )}

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div className="space-y-6">
            {/* Hero banner */}
            <div className="rounded-2xl overflow-hidden border border-violet-200 shadow-sm flex flex-col md:flex-row" style={{ background: "linear-gradient(135deg,#7c6af7 0%,#9d6af0 100%)" }}>
              <div className="p-5 sm:p-6 flex-1">
                <div className="flex items-center gap-1.5 text-violet-100 text-xs font-semibold mb-1.5"><Sparkles className="w-3.5 h-3.5" /> FRIDAY, 12 JUNE</div>
                <h2 className="text-lg sm:text-xl font-bold leading-snug text-white">Good morning, Alex.</h2>
                <p className="text-sm text-violet-50 mt-1 max-w-md">You recovered {fmt(stats.recovered)} this month. {stats.openCount} patients and {claimStats.expiring} expiring approvals need attention today.</p>
                <button onClick={() => setTab("patients")} className="mt-3.5 inline-flex items-center gap-1.5 bg-white text-violet-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-violet-50 transition-colors shadow-sm">
                  Start today's recalls <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="hidden md:block w-64 relative shrink-0">
                <img src={IMG_ILLUST} alt="" onError={hideImg} className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-90" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right,#7c6af7,transparent 60%)" }}></div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-sm font-semibold text-slate-900">Revenue leaked vs recovered</h2>
                <span className="text-xs text-slate-400">Last 8 months</span>
              </div>
              <p className="text-xs text-slate-500 mb-4">Leakage trending down since recall workflows activated in February.</p>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gL" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ef4444" stopOpacity={0.25} /><stop offset="100%" stopColor="#ef4444" stopOpacity={0.02} /></linearGradient>
                      <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity={0.25} /><stop offset="100%" stopColor="#10b981" stopOpacity={0.02} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => "$" + v / 1000 + "k"} />
                    <Tooltip formatter={(v, n) => [fmt(v), n === "leaked" ? "Leaked" : "Recovered"]} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
                    <Area type="monotone" dataKey="leaked" stroke="#ef4444" strokeWidth={2.5} fill="url(#gL)" />
                    <Area type="monotone" dataKey="recovered" stroke="#10b981" strokeWidth={2.5} fill="url(#gR)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-5 mt-2 justify-center">
                <span className="flex items-center gap-1.5 text-xs text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Revenue leaked</span>
                <span className="flex items-center gap-1.5 text-xs text-slate-600"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Revenue recovered</span>
              </div>
            </div>

            {/* Priority recalls */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">Today's priority recalls</h2>
              <div className="space-y-2">
                {patients.filter((p) => p.risk === "high" && p.status === "atrisk").slice(0, 3).map((p) => (
                  <button key={p.id} onClick={() => setTab("patients")} className="w-full flex items-center justify-between p-3 rounded-xl bg-red-50 border border-red-100 hover:border-red-300 transition-colors text-left">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold shrink-0">{p.initials}</div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-900 truncate">{p.name}</div>
                        <div className="text-xs text-slate-500 truncate">{p.daysSince} days since last visit · {p.condition}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-sm font-bold text-red-600">{fmt(rem(p))}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </button>
                ))}
                {patients.filter((p) => p.risk === "high" && p.status === "atrisk").length === 0 && (
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-sm text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 shrink-0" /> All high-risk patients have been actioned. Nice work.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PATIENTS */}
        {tab === "patients" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patients or conditions…" className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
              </div>
              <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option value="all">All risk levels</option><option value="high">High risk</option><option value="medium">Medium</option><option value="watch">Watch</option>
              </select>
              <select value={pracFilter} onChange={(e) => setPracFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option value="all">All practitioners</option>
                {practitionerBase.map((pr) => <option key={pr.name} value={pr.name}>{pr.name}</option>)}
              </select>
            </div>

            <div className="space-y-3">
              {sortedFiltered.length === 0 && <div className="text-center py-12 text-slate-400 text-sm bg-white rounded-2xl border border-slate-200">No patients match your filters.</div>}
              {sortedFiltered.map((p) => {
                const rc = riskConfig[p.risk];
                const progress = Math.round((p.visitsDone / p.planTotal) * 100);
                return (
                  <div key={p.id} className={`bg-white rounded-2xl border shadow-sm p-4 transition-all ${p.status === "rebooked" ? "border-emerald-200 opacity-70" : "border-slate-200"}`}>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${rc.bg} ${rc.text}`}>{p.initials}</div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-slate-900">{p.name}</span>
                            {p.status === "atrisk" && <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${rc.bg} ${rc.text} ${rc.border}`}><span className={`w-1.5 h-1.5 rounded-full ${rc.dot}`}></span>{rc.label}</span>}
                            {p.status === "contacted" && <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200"><MessageSquare className="w-3 h-3" /> Contacted</span>}
                            {p.status === "rebooked" && <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"><CheckCircle2 className="w-3 h-3" /> Rebooked</span>}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5 truncate">{p.condition} · {p.practitioner}</div>
                          <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5"><Clock className="w-3 h-3 shrink-0" /> {p.daysSince} days since last visit</div>
                        </div>
                      </div>

                      <div className="lg:w-44 shrink-0">
                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Plan progress</span><span className="font-medium text-slate-700">{p.visitsDone}/{p.planTotal} visits</span></div>
                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-violet-500" style={{ width: progress + "%" }}></div></div>
                        <div className="text-xs text-slate-500 mt-1">Value remaining: <span className="font-bold text-slate-800">{fmt(rem(p))}</span></div>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        {p.status === "atrisk" && <>
                          <button onClick={() => { setModal({ patient: p, channel: "sms" }); setDraft(smsTemplate(p)); }} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-colors shadow-sm"><MessageSquare className="w-3.5 h-3.5" /> SMS</button>
                          <button onClick={() => { setModal({ patient: p, channel: "email" }); setDraft(emailTemplate(p)); }} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-violet-500 hover:text-violet-700 text-slate-700 text-xs font-semibold transition-colors"><Mail className="w-3.5 h-3.5" /> Email</button>
                        </>}
                        {p.status === "contacted" && <button onClick={() => { setPatients((prev) => prev.map((x) => x.id === p.id ? { ...x, status: "rebooked" } : x)); showToast(`${p.name} rebooked — ${fmt(rem(p))} recovered`, "recover"); }} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-sm"><CheckCircle2 className="w-3.5 h-3.5" /> Mark rebooked</button>}
                        {p.status === "rebooked" && <div className="flex items-center gap-1.5 px-3.5 py-2 text-emerald-600 text-xs font-semibold"><CheckCircle2 className="w-4 h-4" /> {fmt(rem(p))} recovered</div>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* WORKCOVER */}
        {tab === "workcover" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-1"><ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" /><h2 className="text-sm font-semibold text-slate-900">Compensable claims watchdog</h2></div>
              <p className="text-xs text-slate-500">Tracking {claims.length} active WorkCover Victoria and TAC claims. <span className="font-semibold text-red-600">{fmt(claimStats.unbilled)}</span> unbilled · <span className="font-semibold text-amber-600">{claimStats.expiring} approval{claimStats.expiring !== 1 ? "s" : ""}</span> expire within 14 days.</p>
            </div>

            <div className="space-y-3">
              {[...claims].sort((a, b) => a.daysToExpiry - b.daysToExpiry).map((c) => {
                const urgent = c.daysToExpiry <= 14 && !c.extensionRequested;
                const pct = Math.round((c.sessionsUsed / c.sessionsApproved) * 100);
                const left = c.sessionsApproved - c.sessionsUsed;
                return (
                  <div key={c.id} className={`bg-white rounded-2xl border shadow-sm p-4 ${urgent ? "border-amber-300" : "border-slate-200"}`}>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${c.scheme === "TAC" ? "bg-indigo-50 text-indigo-700" : "bg-violet-50 text-violet-700"}`}>{c.scheme === "TAC" ? "TAC" : "WC"}</div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-slate-900">{c.name}</span>
                            <span className="text-xs text-slate-400 font-mono">{c.claimNo}</span>
                            {urgent && <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200"><CalendarClock className="w-3 h-3" /> Expires in {c.daysToExpiry} days</span>}
                            {c.extensionRequested && <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200"><FileText className="w-3 h-3" /> Extension requested</span>}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5 truncate">{c.condition} · {c.practitioner}</div>
                          <div className="text-xs text-slate-400 mt-0.5">Approval expires {c.expiry}</div>
                        </div>
                      </div>

                      <div className="lg:w-48 shrink-0">
                        <div className="flex justify-between text-xs text-slate-500 mb-1"><span>Sessions used</span><span className="font-medium text-slate-700">{c.sessionsUsed}/{c.sessionsApproved}</span></div>
                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className={`h-full rounded-full ${left <= 1 ? "bg-amber-500" : "bg-indigo-500"}`} style={{ width: pct + "%" }}></div></div>
                        <div className="text-xs mt-1">{c.unbilled > 0 ? <span className="text-red-600 font-semibold flex items-center gap-1"><Banknote className="w-3.5 h-3.5 shrink-0" /> {fmt(c.unbilled)} unbilled</span> : <span className="text-emerald-600 font-medium flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Fully invoiced</span>}</div>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        {urgent && <button onClick={() => { setClaims((prev) => prev.map((x) => x.id === c.id ? { ...x, extensionRequested: true } : x)); showToast(`Extension request drafted for ${c.name}`); }} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-sm"><FileText className="w-3.5 h-3.5" /> Request extension</button>}
                        {c.unbilled > 0 && <button onClick={() => { setClaims((prev) => prev.map((x) => x.id === c.id ? { ...x, unbilled: 0 } : x)); showToast(`Invoice for ${fmt(c.unbilled)} sent to ${c.scheme}`, "recover"); }} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-emerald-500 hover:text-emerald-700 text-slate-700 text-xs font-semibold transition-colors"><Send className="w-3.5 h-3.5" /> Invoice now</button>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-xs text-indigo-800 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Extension requests are pre-filled with treatment notes and outcome scores from your PMS, ready for review before submission — cutting a 25-minute admin job to under 3 minutes.</span>
            </div>
          </div>
        )}

        {/* TEAM */}
        {tab === "team" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900 mb-1">Rebook rate by practitioner</h2>
              <p className="text-xs text-slate-500 mb-4">Clinic target: 85% · Industry average: 72%</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={practitioners} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => v.replace("Dr. ", "")} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => v + "%"} />
                    <Tooltip formatter={(v) => [v + "%", "Rebook rate"]} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
                    <Bar dataKey="rebookRate" radius={[8, 8, 0, 0]} maxBarSize={56}>
                      {practitioners.map((pr) => <Cell key={pr.name} fill={pr.rebookRate >= 85 ? "#10b981" : pr.rebookRate >= 75 ? "#7c6af7" : "#f59e0b"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 pb-3"><h2 className="text-sm font-semibold text-slate-900">Practitioner detail</h2></div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-500 border-b border-slate-100">
                      <th className="px-5 py-2 font-medium">Practitioner</th><th className="px-3 py-2 font-medium">Active patients</th><th className="px-3 py-2 font-medium">Rebook rate</th><th className="px-3 py-2 font-medium">At-risk now</th><th className="px-5 py-2 font-medium text-right">Revenue at risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {practitioners.map((pr) => (
                      <tr key={pr.name} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                        <td className="px-5 py-3 font-medium text-slate-900">{pr.name}</td>
                        <td className="px-3 py-3 text-slate-600">{pr.patients}</td>
                        <td className="px-3 py-3"><span className={`font-semibold ${pr.rebookRate >= 85 ? "text-emerald-600" : pr.rebookRate >= 75 ? "text-violet-600" : "text-amber-600"}`}>{pr.rebookRate}%</span>{pr.rebookRate < 75 && <span className="ml-2 text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md">Coach</span>}</td>
                        <td className="px-3 py-3 text-slate-600">{pr.atRiskCount}</td>
                        <td className="px-5 py-3 text-right font-semibold text-slate-900">{fmt(pr.atRiskValue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 bg-slate-50 text-xs text-slate-500 flex items-start gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />Dr. Marcus Reid's rebook rate is 19 points below target. A 10-point lift would recover an estimated $2,100/month.</div>
            </div>
          </div>
        )}

        {/* DIGEST */}
        {tab === "digest" && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0"><h2 className="text-sm font-semibold text-slate-900">Weekly owner digest</h2><p className="text-xs text-slate-500">Lands in your inbox every Monday at 7:00am — no login needed.</p></div>
              <button onClick={() => showToast("Test digest sent to alex@brunswickphysio.com.au")} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold transition-colors shadow-sm shrink-0"><Send className="w-3.5 h-3.5" /> Send test</button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 text-xs text-slate-500">
                <div><span className="font-semibold text-slate-700">From:</span> VelorAI &lt;digest@velorai.com.au&gt;</div>
                <div><span className="font-semibold text-slate-700">Subject:</span> 📈 Brunswick Physio recovered $1,430 last week</div>
              </div>
              <div className="w-full h-40 bg-slate-100 overflow-hidden"><img src={IMG_CLINIC} alt="Brunswick Physio clinic" onError={hideImg} className="w-full h-full object-cover" /></div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center overflow-hidden"><img src={LOGO_URL} alt="VelorAI" onError={logoFallback} className="w-5 h-5 object-contain" /></div>
                  <span className="text-sm font-bold text-slate-900">Your week at Brunswick Physio</span>
                </div>
                <p className="text-sm text-slate-600 mb-5">Morning Alex — here's what VelorAI did for you last week, and what needs your eyes this week.</p>
                <div className="grid grid-cols-3 gap-2 mb-5">
                  <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-center"><div className="text-lg font-bold text-emerald-600">$1,430</div><div className="text-xs text-slate-500 mt-0.5">recovered</div></div>
                  <div className="rounded-xl bg-violet-50 border border-violet-100 p-3 text-center"><div className="text-lg font-bold text-violet-700">9</div><div className="text-xs text-slate-500 mt-0.5">recalls sent</div></div>
                  <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-3 text-center"><div className="text-lg font-bold text-indigo-700">58%</div><div className="text-xs text-slate-500 mt-0.5">rebooked</div></div>
                </div>
                <div className="space-y-2.5 mb-5">
                  <div className="flex items-start gap-2.5 text-sm text-slate-700"><TrendingUp className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /><span><strong>Marcus's rebook rate is up 4 points</strong> after last month's coaching conversation — keep it going.</span></div>
                  <div className="flex items-start gap-2.5 text-sm text-slate-700"><CalendarClock className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" /><span><strong>2 TAC/WorkCover approvals expire within 14 days</strong> — extension requests are drafted and waiting for review.</span></div>
                  <div className="flex items-start gap-2.5 text-sm text-slate-700"><Banknote className="w-4 h-4 text-red-500 mt-0.5 shrink-0" /><span><strong>$1,540 in compensable sessions is unbilled.</strong> One click sends the invoices.</span></div>
                  <div className="flex items-start gap-2.5 text-sm text-slate-700"><Phone className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" /><span><strong>4 high-risk patients</strong> haven't rebooked mid-plan — worth a personal follow-up from their physio.</span></div>
                </div>
                <button onClick={() => setTab("overview")} className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-colors shadow-sm">Open your dashboard</button>
                <p className="text-xs text-slate-400 text-center mt-4">VelorAI · Made in Melbourne · contact@velorai.com.au</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ background: "rgba(15,23,42,0.45)" }} onClick={() => setModal(null)}>
          <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col" style={{ maxHeight: "90vh" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-violet-50 text-violet-600 shrink-0">{modal.channel === "sms" ? <MessageSquare style={{ width: 18, height: 18 }} /> : <Mail style={{ width: 18, height: 18 }} />}</div>
                <div className="min-w-0"><h3 className="text-sm font-bold text-slate-900">{modal.channel === "sms" ? "Send recall SMS" : "Send recall email"}</h3><p className="text-xs text-slate-500 flex items-center gap-1 truncate"><Phone className="w-3 h-3 shrink-0" /> {modal.patient.name} · {modal.patient.phone}</p></div>
              </div>
              <button onClick={() => setModal(null)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors shrink-0"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 overflow-y-auto">
              <label className="text-xs font-medium text-slate-500 mb-1.5 block">Message — personalised from template, edit as needed</label>
              <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={modal.channel === "sms" ? 6 : 11} className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none leading-relaxed" />
              {modal.channel === "sms" && <div className="text-xs text-slate-400 mt-1.5 text-right">{draft.length} characters</div>}
            </div>
            <div className="p-5 pt-2 flex gap-2 border-t border-slate-100">
              <button onClick={() => setModal(null)} className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={() => { setPatients((prev) => prev.map((p) => p.id === modal.patient.id ? { ...p, status: "contacted" } : p)); showToast(`${modal.channel === "sms" ? "SMS" : "Email"} sent to ${modal.patient.name}`); setModal(null); }} className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-colors shadow-sm flex items-center justify-center gap-2"><Send className="w-4 h-4" /> Send now</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-md">
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-lg text-sm font-medium text-white ${toast.type === "recover" ? "bg-emerald-600" : "bg-slate-900"}`}>
            <CheckCircle2 style={{ width: 18, height: 18 }} className="shrink-0" /><span>{toast.msg}</span>
          </div>
        </div>
      )}
    </div>
  );
}
