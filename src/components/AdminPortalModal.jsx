import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  User,
  KeyRound,
  X,
  Search,
  Users,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  LogOut,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Copy,
  Check,
  Calendar,
  BarChart3,
  PieChart,
  Table2,
  UserCircle2,
  Filter,
  TrendingUp,
  Download,
  Server,
  Activity,
  ExternalLink,
} from "lucide-react";
import {
  getRegisteredTeams,
  cancelTeamRegistration,
  reactivateTeamRegistration,
  isAdminAuthenticated,
  setAdminAuthenticated,
  searchTeamById,
} from "../utils/adminStore";
import {
  fetchTeamsApi,
  cancelTeamApi,
  reactivateTeamApi,
  checkBackendHealth,
} from "../utils/api";
import { cn } from "../utils/cn";

// ---------- Mini Chart Components ----------
function DonutChart({ data, centerLabel }) {
  const total = data.reduce((s, d) => s + (d.value || 0), 0) || 1;
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto">
      <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(30,41,59,0.6)" strokeWidth="14" />
      {data.map((d, i) => {
        const value = d.value || 0;
        const length = (value / total) * circumference;
        const circle = (
          <circle
            key={i}
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={d.color}
            strokeWidth="14"
            strokeDasharray={`${length} ${circumference - length}`}
            strokeDashoffset={-offset}
            transform="rotate(-90 60 60)"
            strokeLinecap="butt"
          />
        );
        offset += length;
        return circle;
      })}
      <text x="60" y="56" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="18" fontWeight="800">
        {centerLabel ?? total}
      </text>
      <text x="60" y="74" textAnchor="middle" dominantBaseline="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
        TOTAL
      </text>
    </svg>
  );
}

function BarChart({ data, color }) {
  const maxVal = Math.max(...data.map((d) => d.value || 0), 1);
  return (
    <div className="space-y-2.5">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-2">
          <div className="w-24 sm:w-32 text-[10px] text-slate-300 truncate" title={d.label}>
            {d.label}
          </div>
          <div className="flex-1 h-2.5 rounded-full bg-navy-800/80 overflow-hidden border border-acm-blue/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((d.value || 0) / maxVal) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: color || "linear-gradient(90deg,#0085CA,#22D3EE)" }}
            />
          </div>
          <div className="w-8 text-right text-[10px] font-mono text-slate-400">{d.value}</div>
        </div>
      ))}
    </div>
  );
}

export function AdminPortalModal({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminAuthenticated());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [teams, setTeams] = useState(getRegisteredTeams());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [expandedTeamId, setExpandedTeamId] = useState(null);
  const [confirmCancelTeam, setConfirmCancelTeam] = useState(null);
  const [cancelReason, setCancelReason] = useState("Disqualified / Rule violation or requested by team");
  const [copiedId, setCopiedId] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [lookupId, setLookupId] = useState("");
  const [lookedUpTeam, setLookedUpTeam] = useState(null);
  const [lookupError, setLookupError] = useState("");
  const [participantQuery, setParticipantQuery] = useState("");
  const [backendStatus, setBackendStatus] = useState({ checked: false, online: false });

  // Sync teams state from Backend API or local storage fallback
  const refreshTeams = async () => {
    try {
      const apiTeams = await fetchTeamsApi();
      if (Array.isArray(apiTeams)) {
        setTeams(apiTeams);
        setBackendStatus({ checked: true, online: true });
        return;
      }
    } catch {
      // Backend offline or error -> smoothly use local store
    }
    setTeams(getRegisteredTeams());
  };

  useEffect(() => {
    if (isOpen) {
      checkBackendHealth().then((health) => {
        setBackendStatus({ checked: true, online: health.online });
      });
      refreshTeams();
    }
    const handleUpdate = () => refreshTeams();
    window.addEventListener("acm_teams_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    const interval = isOpen ? setInterval(refreshTeams, 4000) : null;
    return () => {
      window.removeEventListener("acm_teams_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      if (interval) clearInterval(interval);
    };
  }, [isOpen]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    if (username.trim() === "ACMCODENITE" && password.trim() === "RONAK12") {
      setIsAuthenticated(true);
      setAdminAuthenticated(true);
      refreshTeams();
    } else {
      setLoginError("Invalid Admin credentials. Access restricted to authorized ACM organizers.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  // Cancel team registration
  const handleExecuteCancel = async (teamId) => {
    try {
      await cancelTeamApi(teamId, cancelReason);
    } catch (err) {
      console.warn("Backend API cancel failed, using local store:", err.message);
    }
    cancelTeamRegistration(teamId, cancelReason);
    setConfirmCancelTeam(null);
    refreshTeams();
  };

  // Reactivate team registration
  const handleExecuteReactivate = async (teamId) => {
    try {
      await reactivateTeamApi(teamId);
    } catch (err) {
      console.warn("Backend API reactivate failed, using local store:", err.message);
    }
    reactivateTeamRegistration(teamId);
    refreshTeams();
  };

  // Download CSV export handler
  const handleDownloadCSV = () => {
    if (backendStatus.online) {
      window.open("/api/teams/export/csv", "_blank");
    } else {
      // Offline fallback CSV generator
      const headers = ["Registration ID", "Team Name", "Track", "Team Size", "Status", "Timestamp", "Leader Name", "Leader Email", "Leader Phone", "Leader College"];
      const rows = teams.map((t) => {
        const leader = t.members?.[0] || {};
        return [
          `"${t.registrationId || ''}"`,
          `"${t.teamName || ''}"`,
          `"${t.track || ''}"`,
          `"${t.teamSize || ''}"`,
          `"${t.status || ''}"`,
          `"${t.timestamp || ''}"`,
          `"${leader.name || ''}"`,
          `"${leader.email || ''}"`,
          `"${leader.phone || ''}"`,
          `"${leader.college || ''}"`
        ].join(",");
      });
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `acm-codenite-teams-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  const handleLookup = (e) => {
    if (e) e.preventDefault();
    if (!lookupId.trim()) return;
    const res = searchTeamById(lookupId);
    if (res) {
      setLookedUpTeam(res);
      setLookupError("");
    } else {
      setLookedUpTeam(null);
      setLookupError("No team found for the given ID / name / email / phone.");
    }
  };

  const filteredTeams = teams.filter((team) => {
    const matchesFilter =
      statusFilter === "ALL" ||
      (statusFilter === "ACTIVE" && team.status === "ACTIVE") ||
      (statusFilter === "CANCELLED" && team.status === "CANCELLED");
    if (!matchesFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const idMatch = team.registrationId?.toLowerCase().includes(q);
    const nameMatch = team.teamName?.toLowerCase().includes(q);
    const trackMatch = team.track?.toLowerCase().includes(q);
    const memberMatch = team.members?.some(
      (m) =>
        m.name?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.phone?.includes(q) ||
        m.college?.toLowerCase().includes(q)
    );
    return idMatch || nameMatch || trackMatch || memberMatch;
  });

  const totalTeams = teams.length;
  const activeTeams = teams.filter((t) => t.status === "ACTIVE").length;
  const cancelledTeams = teams.filter((t) => t.status === "CANCELLED").length;
  const totalMembers = teams.reduce((acc, t) => acc + (t.members?.length || 0), 0);

  const trackStats = useMemo(() => {
    const map = {};
    teams.forEach((t) => {
      map[t.track] = (map[t.track] || 0) + 1;
    });
    return Object.entries(map)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
  }, [teams]);

  const sizeStats = useMemo(() => {
    const map = { "4": 0, "5": 0, "6": 0 };
    teams.forEach((t) => {
      const key = String(t.teamSize);
      if (map[key] !== undefined) map[key] += 1;
      else map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map).map(([label, value]) => ({ label: `${label} Members`, value }));
  }, [teams]);

  const genderStats = useMemo(() => {
    const map = {};
    teams.forEach((t) => {
      (t.members || []).forEach((m) => {
        const g = m.gender || "Unknown";
        map[g] = (map[g] || 0) + 1;
      });
    });
    const colors = { Male: "#38bdf8", Female: "#f472b6", Other: "#a78bfa", "Prefer not to say": "#94a3b8", Unknown: "#64748b" };
    return Object.entries(map).map(([label, value]) => ({ label, value, color: colors[label] || "#22d3ee" }));
  }, [teams]);

  const tshirtStats = useMemo(() => {
    const map = {};
    teams.forEach((t) => {
      (t.members || []).forEach((m) => {
        const s = m.tshirt || "NA";
        map[s] = (map[s] || 0) + 1;
      });
    });
    return Object.entries(map).map(([label, value]) => ({ label: `Size ${label}`, value }));
  }, [teams]);

  const statusStats = useMemo(
    () => [
      { label: "Active", value: activeTeams, color: "#34d399" },
      { label: "Cancelled", value: cancelledTeams, color: "#f43f5e" },
    ],
    [activeTeams, cancelledTeams]
  );

  const participants = useMemo(() => {
    return teams.flatMap((t) =>
      (t.members || []).map((m, idx) => ({
        team: t,
        member: m,
        role: idx === 0 ? "Leader" : `Member ${idx + 1}`,
      }))
    );
  }, [teams]);

  const filteredParticipants = useMemo(() => {
    if (!participantQuery.trim()) return participants;
    const q = participantQuery.toLowerCase().trim();
    return participants.filter(
      (p) =>
        p.member.name?.toLowerCase().includes(q) ||
        p.member.email?.toLowerCase().includes(q) ||
        p.member.phone?.includes(q) ||
        p.member.college?.toLowerCase().includes(q) ||
        p.member.enrollmentNo?.toLowerCase().includes(q) ||
        p.team.teamName?.toLowerCase().includes(q) ||
        p.team.registrationId?.toLowerCase().includes(q)
    );
  }, [participants, participantQuery]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-navy-950/90 backdrop-blur-md cursor-pointer"
        />

        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative w-full max-w-6xl z-10 rounded-2xl bg-navy-900 border border-acm-cyan/40 shadow-glow-lg p-5 sm:p-8 max-h-[92vh] overflow-y-auto custom-scrollbar flex flex-col"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-acm-blue via-acm-cyan to-indigo-500 rounded-t-2xl pointer-events-none" />

          <div className="flex items-center justify-between pb-4 mb-6 border-b border-acm-blue/20">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-acm-blue/20 text-acm-cyan border border-acm-cyan/40 shadow-sm">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                  ACM CodeNite Admin Portal
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  Organizer Control & Team Registration Management
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={refreshTeams}
                  className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white border border-acm-blue/30 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Refresh
                </button>
              )}
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-rose-950 text-slate-300 hover:text-rose-300 border border-acm-blue/30 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white border border-acm-blue/30 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isAuthenticated ? (
            <div className="py-6 max-w-md mx-auto w-full">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-navy-950 border-2 border-acm-cyan/40 flex items-center justify-center text-acm-cyan mx-auto mb-3 shadow-glow-sm">
                  <Lock className="w-7 h-7" />
                </div>
                <h4 className="font-heading font-extrabold text-lg text-white">Authentication Required</h4>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Enter ACM CodeNite administrative credentials to proceed.
                </p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                {loginError && (
                  <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{loginError}</span>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">Username</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter Admin Username"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-acm-blue/30 text-white text-sm focus:outline-none focus:border-acm-cyan font-mono"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">Password</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Admin Password"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-navy-950 border border-acm-blue/30 text-white text-sm focus:outline-none focus:border-acm-cyan font-mono"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-acm-blue to-sky-500 hover:from-sky-500 hover:to-acm-cyan text-white font-heading font-bold text-sm shadow-glow-sm hover:shadow-glow-md transition-all cursor-pointer mt-2">
                  Unlock Admin Portal
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Backend Status & Sync Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-navy-950/60 border border-acm-blue/20">
                <div className="flex flex-wrap items-center gap-2">
                  <div className={cn("w-2.5 h-2.5 rounded-full animate-pulse", backendStatus.online ? "bg-emerald-400" : "bg-amber-400")} />
                  <span className="text-xs font-mono text-slate-300">
                    Backend API: {backendStatus.online ? <strong className="text-emerald-400">Connected (:5000)</strong> : <strong className="text-amber-400">Local Cache Mode</strong>}
                  </span>
                  <span className="text-slate-600 hidden sm:inline">•</span>
                  <span className="text-xs font-mono text-sky-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    Google Sheets Sync: <strong className="text-emerald-400">Active ☁️</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={refreshTeams}
                    className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 border border-acm-blue/30 transition-colors cursor-pointer"
                    title="Refresh live registrations"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Sync</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadCSV}
                    className="px-3 py-1.5 rounded-lg bg-acm-blue/30 hover:bg-acm-blue/50 text-acm-cyan text-xs font-mono font-bold flex items-center gap-1.5 border border-acm-cyan/40 transition-colors cursor-pointer shadow-sm"
                    title="Download spreadsheet of all registered squads"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Stat Counters Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-navy-950/80 border border-acm-blue/30">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Total Teams</div>
                    <Users className="w-4 h-4 text-acm-cyan" />
                  </div>
                  <div className="font-orbitron font-extrabold text-2xl text-white mt-1">{totalTeams}</div>
                </div>
                <div className="p-4 rounded-xl bg-navy-950/80 border border-emerald-500/30">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-mono uppercase text-emerald-400">Active Teams</div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="font-orbitron font-extrabold text-2xl text-emerald-400 mt-1">{activeTeams}</div>
                </div>
                <div className="p-4 rounded-xl bg-navy-950/80 border border-rose-500/30">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-mono uppercase text-rose-400">Cancelled</div>
                    <XCircle className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="font-orbitron font-extrabold text-2xl text-rose-400 mt-1">{cancelledTeams}</div>
                </div>
                <div className="p-4 rounded-xl bg-navy-950/80 border border-sky-500/30">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-mono uppercase text-sky-400">Total Hackers</div>
                    <UserCircle2 className="w-4 h-4 text-sky-300" />
                  </div>
                  <div className="font-orbitron font-extrabold text-2xl text-sky-300 mt-1">{totalMembers}</div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-navy-950 border border-acm-blue/30 w-fit flex-wrap">
                {[
                  { id: "overview", label: "Overview", icon: BarChart3 },
                  { id: "teams", label: "Teams", icon: Users },
                  { id: "participants", label: "Participants", icon: Table2 },
                  { id: "lookup", label: "Team Lookup", icon: Search },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1.5",
                      activeTab === tab.id
                        ? "bg-acm-blue text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                ))}
              </div>
              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-navy-950/70 border border-acm-blue/20">
                      <div className="flex items-center gap-2 mb-4">
                        <PieChart className="w-4 h-4 text-acm-cyan" />
                        <h4 className="font-heading font-bold text-sm text-white">Registration Status</h4>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <DonutChart data={statusStats} centerLabel={totalTeams} />
                        <div className="flex-1 space-y-2 w-full">
                          {statusStats.map((d) => (
                            <div key={d.label} className="flex items-center justify-between text-xs font-mono">
                              <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                                <span className="text-slate-300">{d.label}</span>
                              </div>
                              <span className="text-white font-bold">{d.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-navy-950/70 border border-acm-blue/20">
                      <div className="flex items-center gap-2 mb-4">
                        <Activity className="w-4 h-4 text-acm-cyan" />
                        <h4 className="font-heading font-bold text-sm text-white">Teams by Track</h4>
                      </div>
                      <BarChart data={trackStats} color="linear-gradient(90deg,#0085CA,#22D3EE)" />
                      {trackStats.length === 0 && (
                        <div className="text-xs text-slate-500 font-mono text-center py-4">No data yet</div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-navy-950/70 border border-acm-blue/20">
                      <div className="flex items-center gap-2 mb-4">
                        <Users className="w-4 h-4 text-acm-cyan" />
                        <h4 className="font-heading font-bold text-sm text-white">Team Size Distribution</h4>
                      </div>
                      <BarChart data={sizeStats} color="linear-gradient(90deg,#34d399,#22d3ee)" />
                    </div>

                    <div className="p-5 rounded-2xl bg-navy-950/70 border border-acm-blue/20">
                      <div className="flex items-center gap-2 mb-4">
                        <UserCircle2 className="w-4 h-4 text-acm-cyan" />
                        <h4 className="font-heading font-bold text-sm text-white">Gender Distribution</h4>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <DonutChart data={genderStats} centerLabel={totalMembers} />
                        <div className="flex-1 space-y-2 w-full">
                          {genderStats.map((d) => (
                            <div key={d.label} className="flex items-center justify-between text-xs font-mono">
                              <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                                <span className="text-slate-300">{d.label}</span>
                              </div>
                              <span className="text-white font-bold">{d.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-navy-950/70 border border-acm-blue/20">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-4 h-4 text-acm-cyan" />
                        <h4 className="font-heading font-bold text-sm text-white">T-Shirt Sizes</h4>
                      </div>
                      <BarChart data={tshirtStats} color="linear-gradient(90deg,#a78bfa,#38bdf8)" />
                    </div>

                    <div className="p-5 rounded-2xl bg-navy-950/70 border border-acm-blue/20">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-4 h-4 text-acm-cyan" />
                        <h4 className="font-heading font-bold text-sm text-white">Recent Registrations</h4>
                      </div>
                      <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                        {teams.slice(0, 8).map((t) => (
                          <div key={t.registrationId} className="flex items-center justify-between p-2.5 rounded-xl bg-navy-900/80 border border-acm-blue/10">
                            <div>
                              <div className="text-xs font-bold text-white">{t.teamName}</div>
                              <div className="text-[10px] font-mono text-slate-400">{t.registrationId} � {t.track}</div>
                            </div>
                            <span className={cn("text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border", t.status === "ACTIVE" ? "bg-emerald-950 text-emerald-300 border-emerald-500/40" : "bg-rose-950 text-rose-300 border-rose-500/40")}>
                              {t.status}
                            </span>
                          </div>
                        ))}
                        {teams.length === 0 && (
                          <div className="text-xs text-slate-500 font-mono text-center py-4">No registrations yet</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TEAMS TAB */}
              {activeTab === "teams" && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by Team ID, Team Name, Member, Email..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-acm-blue/30 text-white text-xs sm:text-sm focus:outline-none focus:border-acm-cyan font-mono"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-navy-950 border border-acm-blue/30">
                      {["ALL", "ACTIVE", "CANCELLED"].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setStatusFilter(status)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer",
                            statusFilter === status ? "bg-acm-blue text-white shadow-sm" : "text-slate-400 hover:text-white"
                          )}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {filteredTeams.length === 0 ? (
                      <div className="p-10 text-center rounded-2xl bg-navy-950/50 border border-acm-blue/20 text-slate-400 font-mono text-xs">
                        No registered teams found matching your query.
                      </div>
                    ) : (
                      filteredTeams.map((team) => {
                        const isCancelled = team.status === "CANCELLED";
                        const isExpanded = expandedTeamId === team.registrationId;
                        const leader = team.members?.[0] || {};
                        return (
                          <div key={team.registrationId} className={cn("rounded-2xl border transition-all duration-200 overflow-hidden", isCancelled ? "bg-rose-950/20 border-rose-500/40" : "bg-navy-950/80 border-acm-blue/30 hover:border-acm-cyan/50")}>
                            <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                  {isCancelled ? (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/50">
                                      <XCircle className="w-3 h-3 text-rose-400" /> CANCELLED
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/50">
                                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> ACTIVE
                                    </span>
                                  )}
                                  <span onClick={() => handleCopy(team.registrationId)} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-navy-900 border border-sky-400/30 text-sky-300 cursor-pointer hover:border-acm-cyan" title="Click to copy ID">
                                    {team.registrationId}
                                    {copiedId === team.registrationId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                  </span>
                                  <span className="text-[11px] font-mono text-slate-400">{team.teamSize} Members</span>
                                </div>
                                <h4 className="font-heading font-extrabold text-lg text-white truncate">{team.teamName}</h4>
                                <div className="text-xs text-slate-300 flex flex-wrap items-center gap-3 mt-1 font-mono">
                                  <span>Track: <strong className="text-acm-cyan">{team.track}</strong></span>
                                  <span>Leader: <strong className="text-white">{leader.name}</strong></span>
                                </div>
                                {isCancelled && team.cancellationReason && (
                                  <div className="mt-2 text-xs font-mono text-rose-300 flex items-center gap-1.5">
                                    <AlertTriangle className="w-3 h-3" /> {team.cancellationReason}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                {team.pdfUrl && (
                                  <a
                                    href={team.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 rounded-xl bg-sky-950/80 hover:bg-sky-900 text-sky-300 border border-sky-500/50 text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                                    title="View Official Registration PDF on Google Drive"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    <span>Drive PDF</span>
                                  </a>
                                )}
                                <button type="button" onClick={() => setExpandedTeamId(isExpanded ? null : team.registrationId)} className="px-3 py-1.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-white border border-acm-blue/30 text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1.5">
                                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                  {isExpanded ? "Hide" : "Details"}
                                </button>
                                {isCancelled ? (
                                  <button type="button" onClick={() => handleExecuteReactivate(team.registrationId)} className="px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/50 text-xs font-mono font-bold transition-colors cursor-pointer">Reactivate</button>
                                ) : (
                                  <button type="button" onClick={() => setConfirmCancelTeam(team)} className="px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/50 text-xs font-mono font-bold transition-colors cursor-pointer">Cancel</button>
                                )}
                              </div>
                            </div>
                            {isExpanded && (
                              <div className="p-4 sm:p-5 bg-navy-900/90 border-t border-acm-blue/20">
                                <div className="text-xs font-mono font-bold uppercase text-slate-400 mb-3">Squad Members ({team.members?.length || 0}):</div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {team.members?.map((m, mIdx) => (
                                    <div key={mIdx} className="p-3 rounded-xl bg-navy-950/80 border border-acm-blue/20 text-xs text-slate-300 space-y-0.5">
                                      <div className="flex items-center justify-between font-bold text-white">
                                        <span>{m.name}</span>
                                        <span className="text-[10px] font-mono text-sky-400">{mIdx === 0 ? "LEADER" : `MEMBER ${mIdx + 1}`}</span>
                                      </div>
                                      <div className="text-slate-400">{m.email} � {m.phone}</div>
                                      <div className="text-slate-400">{m.college} ({m.enrollmentNo})</div>
                                      <div className="text-slate-400">{m.branch} - {m.year} {m.city ? `� ${m.city}` : ""}</div>
                                      {(m.gender || m.tshirt || m.dietary) && (
                                        <div className="text-sky-300 font-mono text-[10px] mt-1 pt-1 border-t border-acm-blue/10">
                                          {m.gender ? `${m.gender} � ` : ""}{m.tshirt ? `Size: ${m.tshirt} � ` : ""}{m.dietary ? `Diet: ${m.dietary}` : ""}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* PARTICIPANTS TAB */}
              {activeTab === "participants" && (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={participantQuery}
                      onChange={(e) => setParticipantQuery(e.target.value)}
                      placeholder="Search participants by name, email, phone, college, enrollment, team..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-acm-blue/30 text-white text-xs sm:text-sm focus:outline-none focus:border-acm-cyan font-mono"
                    />
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">Showing {filteredParticipants.length} of {participants.length} participants</div>
                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-left text-slate-400 font-mono uppercase border-b border-acm-blue/20">
                          <th className="py-2 px-2">Name</th>
                          <th className="py-2 px-2">Role</th>
                          <th className="py-2 px-2">Team</th>
                          <th className="py-2 px-2">Email</th>
                          <th className="py-2 px-2">Phone</th>
                          <th className="py-2 px-2">College / Enrollment</th>
                          <th className="py-2 px-2">Branch / Year</th>
                          <th className="py-2 px-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredParticipants.map((p, i) => (
                          <tr key={i} className="border-b border-acm-blue/10 hover:bg-navy-900/60">
                            <td className="py-2 px-2 text-white font-bold">{p.member.name}</td>
                            <td className="py-2 px-2 text-sky-300 font-mono">{p.role}</td>
                            <td className="py-2 px-2 text-slate-300">
                              <div className="font-bold">{p.team.teamName}</div>
                              <div className="text-[10px] text-slate-500 font-mono">{p.team.registrationId}</div>
                            </td>
                            <td className="py-2 px-2 text-slate-300">{p.member.email}</td>
                            <td className="py-2 px-2 text-slate-300 font-mono">{p.member.phone}</td>
                            <td className="py-2 px-2 text-slate-300">{p.member.college} <span className="text-slate-500">({p.member.enrollmentNo})</span></td>
                            <td className="py-2 px-2 text-slate-300">{p.member.branch} � {p.member.year}</td>
                            <td className="py-2 px-2">
                              <span className={cn("text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border", p.team.status === "ACTIVE" ? "bg-emerald-950 text-emerald-300 border-emerald-500/40" : "bg-rose-950 text-rose-300 border-rose-500/40")}>
                                {p.team.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {filteredParticipants.length === 0 && (
                          <tr>
                            <td colSpan={8} className="py-8 text-center text-slate-500 font-mono text-xs">No participants found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* LOOKUP TAB */}
              {activeTab === "lookup" && (
                <div className="space-y-4">
                  <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={lookupId}
                        onChange={(e) => setLookupId(e.target.value)}
                        placeholder="Enter Team ID (e.g. CN27-ALPHA1) or name / email / phone"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-acm-blue/30 text-white text-xs sm:text-sm focus:outline-none focus:border-acm-cyan font-mono"
                      />
                    </div>
                    <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-acm-blue to-sky-500 hover:from-sky-500 hover:to-acm-cyan text-white font-heading font-bold text-sm shadow-glow-sm cursor-pointer">
                      Fetch Team Details
                    </button>
                  </form>

                  {lookupError && (
                    <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{lookupError}</span>
                    </div>
                  )}

                  {lookedUpTeam && (
                    <div className="rounded-2xl border border-acm-blue/30 bg-navy-950/80 overflow-hidden">
                      <div className="p-5 border-b border-acm-blue/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={cn("text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border", lookedUpTeam.status === "ACTIVE" ? "bg-emerald-950 text-emerald-300 border-emerald-500/50" : "bg-rose-950 text-rose-300 border-rose-500/50")}>
                              {lookedUpTeam.status}
                            </span>
                            <span onClick={() => handleCopy(lookedUpTeam.registrationId)} className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-navy-900 border border-sky-400/30 text-sky-300 cursor-pointer hover:border-acm-cyan">
                              {lookedUpTeam.registrationId}
                              {copiedId === lookedUpTeam.registrationId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            </span>
                          </div>
                          <h4 className="font-heading font-extrabold text-xl text-white">{lookedUpTeam.teamName}</h4>
                          <p className="text-xs text-slate-300 font-mono mt-1">Track: <strong className="text-acm-cyan">{lookedUpTeam.track}</strong> � {lookedUpTeam.teamSize} Members</p>
                          {lookedUpTeam.cancelledAt && (
                            <p className="text-xs text-rose-300 font-mono mt-1">Cancelled at {new Date(lookedUpTeam.cancelledAt).toLocaleString()} � {lookedUpTeam.cancellationReason}</p>
                          )}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">Registered: {new Date(lookedUpTeam.timestamp).toLocaleString()}</div>
                      </div>
                      <div className="p-5">
                        <div className="text-xs font-mono font-bold uppercase text-slate-400 mb-3">Squad Members ({lookedUpTeam.members?.length || 0}):</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {lookedUpTeam.members?.map((m, mIdx) => (
                            <div key={mIdx} className="p-3 rounded-xl bg-navy-900/80 border border-acm-blue/20 text-xs text-slate-300 space-y-0.5">
                              <div className="flex items-center justify-between font-bold text-white">
                                <span>{m.name}</span>
                                <span className="text-[10px] font-mono text-sky-400">{mIdx === 0 ? "LEADER" : `MEMBER ${mIdx + 1}`}</span>
                              </div>
                              <div className="text-slate-400">{m.email} � {m.phone}</div>
                              <div className="text-slate-400">{m.college} ({m.enrollmentNo})</div>
                              <div className="text-slate-400">{m.branch} - {m.year} {m.city ? `� ${m.city}` : ""}</div>
                              {(m.gender || m.tshirt || m.dietary) && (
                                <div className="text-sky-300 font-mono text-[10px] mt-1 pt-1 border-t border-acm-blue/10">
                                  {m.gender ? `${m.gender} � ` : ""}{m.tshirt ? `Size: ${m.tshirt} � ` : ""}{m.dietary ? `Diet: ${m.dietary}` : ""}
                                </div>
                              )}
                              {(m.github || m.linkedin) && (
                                <div className="text-slate-500 font-mono text-[10px] mt-1 truncate">
                                  {m.github && <span className="mr-2">GH: {m.github}</span>}
                                  {m.linkedin && <span>LI: {m.linkedin}</span>}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {confirmCancelTeam && (
            <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-2xl bg-navy-900 border-2 border-rose-500 p-6 shadow-glow-lg">
                <div className="flex items-center gap-3 text-rose-400 mb-3">
                  <AlertTriangle className="w-6 h-6" />
                  <h4 className="font-heading font-extrabold text-lg text-white">Confirm Cancellation</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Are you sure you want to cancel the registration for{" "}
                  <strong className="text-white">"{confirmCancelTeam.teamName}"</strong> (ID:{" "}
                  <code className="text-sky-300 font-bold">{confirmCancelTeam.registrationId}</code>)? This will reflect to the team that their registration was cancelled by Admin.
                </p>
                <div className="mb-4">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1">Reason for cancellation</label>
                  <input type="text" value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-acm-blue/30 text-white text-xs focus:outline-none focus:border-rose-400" />
                </div>
                <div className="flex items-center justify-end gap-3">
                  <button type="button" onClick={() => setConfirmCancelTeam(null)} className="px-4 py-2 rounded-xl bg-navy-800 text-slate-300 hover:text-white text-xs font-mono cursor-pointer">Keep Active</button>
                  <button type="button" onClick={() => handleExecuteCancel(confirmCancelTeam.registrationId)} className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-heading font-bold shadow-md cursor-pointer">Yes, Cancel Registration</button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
