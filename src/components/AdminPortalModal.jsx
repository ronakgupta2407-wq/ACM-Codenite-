import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import {
  getRegisteredTeams,
  cancelTeamRegistration,
  reactivateTeamRegistration,
  isAdminAuthenticated,
  setAdminAuthenticated,
} from "../utils/adminStore";
import { cn } from "../utils/cn";

export function AdminPortalModal({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminAuthenticated());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [teams, setTeams] = useState(getRegisteredTeams());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // "ALL" | "ACTIVE" | "CANCELLED"
  const [expandedTeamId, setExpandedTeamId] = useState(null);
  const [confirmCancelTeam, setConfirmCancelTeam] = useState(null);
  const [cancelReason, setCancelReason] = useState("Disqualified / Rule violation or requested by team");
  const [copiedId, setCopiedId] = useState("");

  // Sync teams state
  const refreshTeams = () => {
    setTeams(getRegisteredTeams());
  };

  useEffect(() => {
    refreshTeams();
    const handleUpdate = () => refreshTeams();
    window.addEventListener("acm_teams_updated", handleUpdate);
    return () => window.removeEventListener("acm_teams_updated", handleUpdate);
  }, []);

  // Login handler
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

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  // Cancel team registration
  const handleExecuteCancel = (teamId) => {
    cancelTeamRegistration(teamId, cancelReason);
    setConfirmCancelTeam(null);
    refreshTeams();
  };

  // Reactivate team registration
  const handleExecuteReactivate = (teamId) => {
    reactivateTeamRegistration(teamId);
    refreshTeams();
  };

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  // Filtered teams list
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-navy-950/90 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative w-full max-w-5xl z-10 rounded-2xl bg-navy-900 border border-acm-cyan/40 shadow-glow-lg p-5 sm:p-8 max-h-[92vh] overflow-y-auto custom-scrollbar flex flex-col"
        >
          {/* Top highlight bar */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-acm-blue via-acm-cyan to-indigo-500 rounded-t-2xl pointer-events-none" />

          {/* Modal Header */}
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
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-rose-950 text-slate-300 hover:text-rose-300 border border-acm-blue/30 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-white border border-acm-blue/30 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ================= VIEW 1: LOGIN GATE ================= */}
          {!isAuthenticated ? (
            <div className="py-6 max-w-md mx-auto w-full">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-navy-950 border-2 border-acm-cyan/40 flex items-center justify-center text-acm-cyan mx-auto mb-3 shadow-glow-sm">
                  <Lock className="w-7 h-7" />
                </div>
                <h4 className="font-heading font-extrabold text-lg text-white">
                  Authentication Required
                </h4>
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
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Username
                  </label>
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
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Password
                  </label>
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
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-acm-blue to-sky-500 hover:from-sky-500 hover:to-acm-cyan text-white font-heading font-bold text-sm shadow-glow-sm hover:shadow-glow-md transition-all cursor-pointer mt-2"
                >
                  Unlock Admin Portal
                </button>
              </form>
            </div>
          ) : (
            /* ================= VIEW 2: AUTHENTICATED DASHBOARD ================= */
            <div className="space-y-6">
              {/* Stat Counters Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-navy-950/80 border border-acm-blue/30">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Total Teams</div>
                  <div className="font-orbitron font-extrabold text-2xl text-white mt-1">
                    {totalTeams}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-navy-950/80 border border-emerald-500/30">
                  <div className="text-[10px] font-mono uppercase text-emerald-400">Active Teams</div>
                  <div className="font-orbitron font-extrabold text-2xl text-emerald-400 mt-1">
                    {activeTeams}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-navy-950/80 border border-rose-500/30">
                  <div className="text-[10px] font-mono uppercase text-rose-400">Cancelled by Admin</div>
                  <div className="font-orbitron font-extrabold text-2xl text-rose-400 mt-1">
                    {cancelledTeams}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-navy-950/80 border border-sky-500/30">
                  <div className="text-[10px] font-mono uppercase text-sky-400">Total Hackers</div>
                  <div className="font-orbitron font-extrabold text-2xl text-sky-300 mt-1">
                    {totalMembers}
                  </div>
                </div>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by Team ID (CN27-...), Team Name, Member Name, Email..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-acm-blue/30 text-white text-xs sm:text-sm focus:outline-none focus:border-acm-cyan font-mono"
                  />
                </div>

                {/* Status filter tabs */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-navy-950 border border-acm-blue/30">
                  {["ALL", "ACTIVE", "CANCELLED"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setStatusFilter(status)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer",
                        statusFilter === status
                          ? "bg-acm-blue text-white shadow-sm"
                          : "text-slate-400 hover:text-white"
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Teams List */}
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
                      <div
                        key={team.registrationId}
                        className={cn(
                          "rounded-2xl border transition-all duration-200 overflow-hidden",
                          isCancelled
                            ? "bg-rose-950/20 border-rose-500/40"
                            : "bg-navy-950/80 border-acm-blue/30 hover:border-acm-cyan/50"
                        )}
                      >
                        {/* Summary Bar */}
                        <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              {/* Status Badge */}
                              {isCancelled ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/50">
                                  <XCircle className="w-3 h-3 text-rose-400" /> CANCELLED BY ADMIN
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/50">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> ACTIVE
                                </span>
                              )}

                              {/* Team ID Pill */}
                              <span
                                onClick={() => handleCopy(team.registrationId)}
                                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-navy-900 border border-sky-400/30 text-sky-300 cursor-pointer hover:border-acm-cyan"
                                title="Click to copy ID"
                              >
                                {team.registrationId}
                                {copiedId === team.registrationId ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </span>

                              <span className="text-[11px] font-mono text-slate-400">
                                {team.teamSize} Members Squad
                              </span>
                            </div>

                            <h4 className="font-heading font-extrabold text-lg text-white">
                              {team.teamName}
                            </h4>

                            <div className="text-xs text-slate-300 flex flex-wrap items-center gap-3 mt-1 font-mono">
                              <span>Track: <strong className="text-acm-cyan">{team.track}</strong></span>
                              <span>Leader: <strong className="text-white">{leader.name}</strong> ({leader.email})</span>
                              <span>Phone: {leader.phone}</span>
                            </div>

                            {/* Show cancellation alert if cancelled */}
                            {isCancelled && team.cancellationReason && (
                              <div className="mt-2 text-xs font-mono text-rose-300 flex items-center gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                                <span>Reason: {team.cancellationReason}</span>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                            {/* Expand Member Details */}
                            <button
                              type="button"
                              onClick={() => setExpandedTeamId(isExpanded ? null : team.registrationId)}
                              className="px-3 py-1.5 rounded-xl bg-navy-900 hover:bg-navy-800 border border-acm-blue/30 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <span>{isExpanded ? "Hide Members" : "View Members"}</span>
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>

                            {/* Cancel Registration Button / Reactivate Button */}
                            {isCancelled ? (
                              <button
                                type="button"
                                onClick={() => handleExecuteReactivate(team.registrationId)}
                                className="px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/50 text-xs font-mono font-bold transition-colors cursor-pointer"
                              >
                                Reactivate
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmCancelTeam(team)}
                                className="px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/50 text-xs font-mono font-bold transition-colors cursor-pointer"
                              >
                                Cancel Team
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Expanded Members Table */}
                        {isExpanded && (
                          <div className="p-4 sm:p-5 bg-navy-900/90 border-t border-acm-blue/20">
                            <div className="text-xs font-mono font-bold uppercase text-slate-400 mb-3">
                              Squad Members ({team.members?.length || 0}):
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {team.members?.map((m, mIdx) => (
                                <div
                                  key={mIdx}
                                  className="p-3 rounded-xl bg-navy-950/80 border border-acm-blue/20 text-xs text-slate-300 space-y-0.5"
                                >
                                  <div className="flex items-center justify-between font-bold text-white">
                                    <span>{m.name}</span>
                                    <span className="text-[10px] font-mono text-sky-400">
                                      {mIdx === 0 ? "LEADER" : `MEMBER ${mIdx + 1}`}
                                    </span>
                                  </div>
                                  <div className="text-slate-400">{m.email} • {m.phone}</div>
                                  <div className="text-slate-400">{m.college} ({m.enrollmentNo})</div>
                                  <div className="text-slate-400">{m.branch} - {m.year}</div>
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

          {/* Cancellation Confirmation Dialog */}
          {confirmCancelTeam && (
            <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-2xl bg-navy-900 border-2 border-rose-500 p-6 shadow-glow-lg">
                <div className="flex items-center gap-3 text-rose-400 mb-3">
                  <AlertTriangle className="w-6 h-6" />
                  <h4 className="font-heading font-extrabold text-lg text-white">
                    Confirm Cancellation
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Are you sure you want to cancel the registration for{" "}
                  <strong className="text-white">"{confirmCancelTeam.teamName}"</strong> (ID:{" "}
                  <code className="text-sky-300 font-bold">{confirmCancelTeam.registrationId}</code>)?
                  This will reflect to the team that their registration was cancelled by Admin.
                </p>

                <div className="mb-4">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1">
                    Reason for cancellation
                  </label>
                  <input
                    type="text"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-acm-blue/30 text-white text-xs focus:outline-none focus:border-rose-400"
                  />
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setConfirmCancelTeam(null)}
                    className="px-4 py-2 rounded-xl bg-navy-800 text-slate-300 hover:text-white text-xs font-mono cursor-pointer"
                  >
                    Keep Active
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExecuteCancel(confirmCancelTeam.registrationId)}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-heading font-bold shadow-md cursor-pointer"
                  >
                    Yes, Cancel Registration
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
