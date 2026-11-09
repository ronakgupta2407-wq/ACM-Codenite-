import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  UsersRound,
  Crown,
  User,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Send,
  Edit2,
  HelpCircle,
  FileDown,
  FolderArchive,
  ExternalLink,
  ShieldCheck,
  Search,
  XCircle,
} from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Stepper } from "../components/ui/Stepper";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { FormAssistantBot } from "../components/3d/FormAssistantBot";
import { EVENT_DATA } from "../data/codeniteData";
import { triggerConfetti } from "../utils/confetti";
import { openPrintSlipWindow } from "../utils/generatePdfSlip";
import {
  saveRegisteredTeam,
  searchTeamById,
  getRegisteredTeams,
} from "../utils/adminStore";
import { registerTeamApi } from "../utils/api";
import { cn } from "../utils/cn";

// Single member schema - contains exactly the requested fields per person
const memberSchema = z.object({
  name: z.string().min(2, "Full name is required (min 2 chars)"),
  email: z.string().email("Please provide a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must have at least 10 digits")
    .refine((val) => val.replace(/\D/g, "").length >= 10, {
      message: "Please enter a valid 10-digit mobile number",
    }),
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"], {
    errorMap: () => ({ message: "Please select gender" }),
  }),
  college: z.string().min(2, "College/Institute name is required"),
  enrollmentNo: z.string().min(2, "Student Enrollment / Roll No. is required"),
  year: z.string().min(1, "Please select year of study"),
  branch: z.string().min(2, "Branch / Department is required"),
  city: z.string().min(2, "City / State is required"),
});

// Full registration schema - Team Name, Team Size & Members only
const registrationSchema = z
  .object({
    teamName: z.string().min(3, "Team name must be at least 3 characters"),
    teamSize: z.enum(["4", "5", "6"], {
      required_error: "Team size must be 4, 5, or 6 members",
    }),
    track: z.string().optional().default("General Track"),
    consentRules: z.boolean().refine((val) => val === true, {
      message: "You must accept the event rules and code of conduct",
    }),
    members: z.array(memberSchema),
  })
  .superRefine((data, ctx) => {
    const targetSize = parseInt(data.teamSize, 10);
    if (data.members.length !== targetSize) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Your squad must have exactly ${targetSize} members. Current count: ${data.members.length}`,
        path: ["members"],
      });
    }

    // Check unique emails
    const emails = data.members.map((m) => m.email?.toLowerCase().trim()).filter(Boolean);
    const uniqueEmails = new Set(emails);
    if (uniqueEmails.size !== emails.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Every team member must have a distinct, unique email address",
        path: ["members"],
      });
    }

    // Check unique phone numbers
    const phones = data.members.map((m) => m.phone?.replace(/\D/g, "")).filter(Boolean);
    const uniquePhones = new Set(phones);
    if (uniquePhones.size !== phones.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Every team member must have a distinct, unique 10-digit mobile number",
        path: ["members"],
      });
    }
  });

// Initial member template
const createMemberTemplate = () => ({
  name: "",
  email: "",
  phone: "",
  gender: "Male",
  college: "MITS Gwalior",
  enrollmentNo: "",
  year: "3rd Year",
  branch: "Computer Science & Engineering",
  city: "Gwalior, MP",
});

export function Registration({ onOpenAdmin }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [teamRegistrationId, setTeamRegistrationId] = useState("");
  const [copiedId, setCopiedId] = useState(false);
  const [pdfDriveUrl, setPdfDriveUrl] = useState("");
  const [step2ErrorMsg, setStep2ErrorMsg] = useState("");
  const [liveTeamStatus, setLiveTeamStatus] = useState("ACTIVE");
  const [cancellationReason, setCancellationReason] = useState("");

  // Team live status search state
  const [showStatusLookup, setShowStatusLookup] = useState(false);
  const [lookupQuery, setLookupQuery] = useState("");
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupExecuted, setLookupExecuted] = useState(false);

  // Sync with admin cancellations in real-time
  useEffect(() => {
    const handleUpdate = () => {
      if (teamRegistrationId) {
        const teams = getRegisteredTeams();
        const current = teams.find(
          (t) => t.registrationId.toUpperCase() === teamRegistrationId.toUpperCase()
        );
        if (current) {
          setLiveTeamStatus(current.status);
          if (current.cancellationReason) {
            setCancellationReason(current.cancellationReason);
          }
        }
      }
    };

    window.addEventListener("acm_teams_updated", handleUpdate);
    return () => window.removeEventListener("acm_teams_updated", handleUpdate);
  }, [teamRegistrationId]);

  const handleLookupSubmit = (e) => {
    e.preventDefault();
    if (!lookupQuery.trim()) return;
    const res = searchTeamById(lookupQuery);
    setLookupResult(res || null);
    setLookupExecuted(true);
  };

  const steps = [
    { title: "Team Details" },
    { title: "Squad Members" },
    { title: "Review & Confirm" },
    { title: "Status" },
  ];

  const defaultValues = {
    teamName: "",
    teamSize: "4",
    track: "General Track",
    consentRules: true,
    members: Array.from({ length: 4 }).map(() => createMemberTemplate()),
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const selectedTeamSize = watch("teamSize");
  const currentMembers = watch("members");
  const formValues = watch();

  // Dynamically update member fields when toggle between 4 and 6 happens
  useEffect(() => {
    const targetCount = parseInt(selectedTeamSize, 10);
    const currentCount = currentMembers.length;

    if (currentCount < targetCount) {
      for (let i = currentCount; i < targetCount; i++) {
        append(createMemberTemplate());
      }
    } else if (currentCount > targetCount) {
      for (let i = currentCount - 1; i >= targetCount; i--) {
        remove(i);
      }
    }
  }, [selectedTeamSize, append, remove, currentMembers.length]);

  // Step 1 Validation
  const handleNextFromStep1 = async () => {
    const isTeamNameValid = await trigger("teamName");
    const isTeamSizeValid = await trigger("teamSize");

    if (isTeamNameValid && isTeamSizeValid) {
      setCurrentStep(2);
      window.scrollTo({ top: document.getElementById("register").offsetTop - 80, behavior: "smooth" });
    }
  };

  // Step 2 Validation
  const handleNextFromStep2 = async () => {
    setStep2ErrorMsg("");
    const isMembersValid = await trigger("members");

    if (isMembersValid) {
      setCurrentStep(3);
      window.scrollTo({ top: document.getElementById("register").offsetTop - 80, behavior: "smooth" });
    } else {
      setStep2ErrorMsg(
        "Please fill in all required fields for each squad member (Full Name, valid Email, 10-digit Mobile Number, Gender, College, Enrollment Number, Year, Branch, and City)."
      );
      // Smoothly scroll to the first element with validation error
      setTimeout(() => {
        const firstErr = document.querySelector(".text-rose-400, .border-rose-500, input:invalid");
        if (firstErr) {
          firstErr.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 80);
    }
  };

  // Submit Handler
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const generatedRegId = `CN27-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    try {
      const payload = {
        timestamp: new Date().toISOString(),
        registrationId: generatedRegId,
        ...data,
      };

      let finalRegId = generatedRegId;
      let finalTeam = payload;

      try {
        // Attempt transmission to real backend API server
        const apiResponse = await registerTeamApi(payload);
        if (apiResponse && apiResponse.registrationId) {
          finalRegId = apiResponse.registrationId;
          finalTeam = apiResponse.team || { ...payload, registrationId: finalRegId };
          if (apiResponse.pdfUrl) {
            setPdfDriveUrl(apiResponse.pdfUrl);
          }
        }
      } catch (apiErr) {
        // If it's a conflict or business logic error, throw it so the user can fix the input
        if (apiErr.message && (apiErr.message.includes("already registered") || apiErr.message.includes("valid"))) {
          throw apiErr;
        }
        // Otherwise, server might be offline - proceed smoothly with local fallback & direct Google Sheets sync
        console.warn("Backend API not reachable, falling back to local persistent store:", apiErr.message);

        const googleScriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;
        if (googleScriptUrl) {
          try {
            const res = await fetch(googleScriptUrl, {
              method: "POST",
              headers: { "Content-Type": "text/plain;charset=utf-8" },
              body: JSON.stringify(payload),
            });
            const resData = await res.json();
            if (resData && resData.pdfUrl) {
              setPdfDriveUrl(resData.pdfUrl);
            }
          } catch (gasErr) {
            console.warn("Direct Google Script sync notice:", gasErr);
          }
        }
      }

      // Save to local team store as well for immediate offline/hybrid availability
      saveRegisteredTeam(finalTeam);

      setTeamRegistrationId(finalRegId);
      setLiveTeamStatus("ACTIVE");
      setIsSubmitted(true);
      setCurrentStep(4);
      triggerConfetti();
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmitError(err.message || "Failed to transmit registration. Please retry or contact ACM technical support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(teamRegistrationId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <section id="register" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Registration Portal"
          title="Register Your"
          highlight="CodeNite Squad"
          subtitle="Form a team of 4 to 6 members. Registration is 100% free with meals, swag, and trophies included on campus."
        />

        {/* Action Header: Status Lookup & Admin Portal */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <button
            type="button"
            onClick={() => {
              setShowStatusLookup(!showStatusLookup);
              setLookupExecuted(false);
            }}
            className="px-4 py-2 rounded-xl bg-navy-900 border border-acm-blue/30 hover:border-acm-cyan text-slate-300 hover:text-white text-xs font-mono font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-acm-cyan" />
            <span>{showStatusLookup ? "Close Status Lookup" : "Check Team Registration Status"}</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenAdmin && onOpenAdmin()}
            className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 border border-sky-400/40 text-acm-cyan hover:text-white text-xs font-mono font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Portal</span>
          </button>
        </div>

        {/* Live Team Status Lookup Expandable Box */}
        <AnimatePresence>
          {showStatusLookup && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 p-6 rounded-2xl bg-navy-900/95 border-2 border-acm-cyan/40 shadow-glow-sm overflow-hidden"
            >
              <h4 className="font-heading font-extrabold text-base text-white mb-1">
                Lookup Live Squad Registration Status
              </h4>
              <p className="text-xs text-slate-400 font-mono mb-4">
                Enter your Team Registration ID (e.g. <code>CN27-XXXXXX</code>) to check your real-time status.
              </p>

              <form onSubmit={handleLookupSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
                <input
                  type="text"
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                  placeholder="Enter Team ID or Leader Email (e.g. CN27-ALPHA1)"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-navy-950 border border-acm-blue/30 text-white text-xs font-mono focus:outline-none focus:border-acm-cyan"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-acm-blue hover:bg-sky-500 text-white font-heading font-bold text-xs transition-colors cursor-pointer"
                >
                  Verify Status
                </button>
              </form>

              {/* Lookup Result Display */}
              {lookupExecuted && (
                <div className="pt-3 border-t border-acm-blue/20">
                  {lookupResult ? (
                    lookupResult.status === "CANCELLED" ? (
                      <div className="p-4 rounded-xl bg-rose-950/80 border-2 border-rose-500 text-rose-200 text-xs font-mono">
                        <div className="flex items-center gap-2 font-bold text-sm text-white mb-1">
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                          <span>REGISTRATION CANCELLED BY ADMIN</span>
                        </div>
                        <div>Team: <strong>{lookupResult.teamName}</strong> (ID: {lookupResult.registrationId})</div>
                        {lookupResult.cancellationReason && (
                          <div className="mt-1 text-rose-300">
                            Reason: {lookupResult.cancellationReason}
                          </div>
                        )}
                        <div className="mt-2 text-slate-300">
                          Notice: Your team registration was revoked by the ACM MITS Administrator. For inquiries, email: acmmits@mitsgwalior.in.
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl bg-emerald-950/60 border-2 border-emerald-500 text-emerald-200 text-xs font-mono">
                        <div className="flex items-center gap-2 font-bold text-sm text-white mb-1">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          <span>REGISTRATION ACTIVE & CONFIRMED</span>
                        </div>
                        <div>Team: <strong>{lookupResult.teamName}</strong> (ID: {lookupResult.registrationId})</div>
                        <div>Track: {lookupResult.track} • Size: {lookupResult.teamSize} Members</div>
                        <div className="mt-2 text-slate-300">
                          Reporting: 17 January 2027 at 06:00 PM IST, MITS Gwalior Computing Complex.
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="p-3 rounded-xl bg-navy-950/60 border border-slate-700 text-slate-400 text-xs font-mono">
                      No registered squad found matching "{lookupQuery}". Please check the ID and retry.
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Animated Registration Assistant Drone ("Form-Bot") */}
        <FormAssistantBot memberCount={currentMembers.length || 4} />

        {/* Multi-step Stepper */}
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={(step) => {
            if (step < currentStep && !isSubmitted) {
              setCurrentStep(step);
            }
          }}
        />

        {/* Main Form Container Card */}
        <Card
          tilt={false}
          spotlight={false}
          className="p-6 sm:p-10 bg-gradient-to-b from-[#09153b]/95 via-[#050c26]/95 to-[#020412]/98 border-2 border-cyan-400/35 shadow-[0_0_50px_rgba(0,240,255,0.2)] backdrop-blur-3xl rounded-3xl relative overflow-hidden"
        >
          {/* Top glowing neon beam */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00f0ff]" />
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ================= STEP 1: TEAM DETAILS ================= */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white mb-1">
                    Step 1: Team Details
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-mono">
                    Enter your team name and select squad size (4, 5, or 6 members).
                  </p>
                </div>

                {/* Team Guidelines Info Strip */}
                <div className="p-3.5 rounded-xl bg-navy-950/70 border border-acm-blue/30 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-acm-blue/15 text-acm-cyan border border-acm-cyan/30 shrink-0">
                    <UsersRound className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-mono text-slate-300">
                    <span className="text-white font-bold">Squad Guidelines:</span> Teams can consist of <strong className="text-acm-cyan">4, 5, or 6 members</strong>. Inter-college and multi-department collaborations are welcomed.
                  </div>
                </div>

                {/* Team Name Input */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Team Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Midnight Synapse"
                    {...register("teamName")}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-navy-950 border text-white font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-acm-electric transition-all",
                      errors.teamName
                        ? "border-rose-500/60 ring-1 ring-rose-500/40"
                        : "border-acm-blue/30 focus:border-acm-cyan"
                    )}
                  />
                  {errors.teamName && (
                    <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.teamName.message}
                    </p>
                  )}
                </div>

                {/* Team Size Animated Segmented Control */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                      Team Size Selection <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[11px] font-mono text-acm-cyan font-semibold">
                      Allowed: 4, 5, or 6 members
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {/* Option 4 */}
                    <div
                      onClick={() => setValue("teamSize", "4")}
                      className={cn(
                        "p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between",
                        selectedTeamSize === "4"
                          ? "bg-acm-blue/20 border-acm-cyan shadow-glow-sm"
                          : "bg-navy-950/60 border-acm-blue/20 hover:border-acm-blue/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center font-orbitron font-extrabold text-base",
                            selectedTeamSize === "4"
                              ? "bg-acm-cyan text-navy-950"
                              : "bg-navy-800 text-slate-300"
                          )}
                        >
                          4
                        </div>
                        <div>
                          <div className="font-heading font-bold text-white text-xs sm:text-sm">
                            4 Members
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Agile Strike Squad
                          </div>
                        </div>
                      </div>

                      {selectedTeamSize === "4" && (
                        <CheckCircle2 className="w-4 h-4 text-acm-cyan shrink-0" />
                      )}
                    </div>

                    {/* Option 5 */}
                    <div
                      onClick={() => setValue("teamSize", "5")}
                      className={cn(
                        "p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between",
                        selectedTeamSize === "5"
                          ? "bg-acm-blue/20 border-acm-cyan shadow-glow-sm"
                          : "bg-navy-950/60 border-acm-blue/20 hover:border-acm-blue/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center font-orbitron font-extrabold text-base",
                            selectedTeamSize === "5"
                              ? "bg-acm-cyan text-navy-950"
                              : "bg-navy-800 text-slate-300"
                          )}
                        >
                          5
                        </div>
                        <div>
                          <div className="font-heading font-bold text-white text-xs sm:text-sm">
                            5 Members
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Balanced Vanguard
                          </div>
                        </div>
                      </div>

                      {selectedTeamSize === "5" && (
                        <CheckCircle2 className="w-4 h-4 text-acm-cyan shrink-0" />
                      )}
                    </div>

                    {/* Option 6 */}
                    <div
                      onClick={() => setValue("teamSize", "6")}
                      className={cn(
                        "p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between",
                        selectedTeamSize === "6"
                          ? "bg-acm-blue/20 border-acm-cyan shadow-glow-sm"
                          : "bg-navy-950/60 border-acm-blue/20 hover:border-acm-blue/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-9 h-9 rounded-xl flex items-center justify-center font-orbitron font-extrabold text-base",
                            selectedTeamSize === "6"
                              ? "bg-acm-cyan text-navy-950"
                              : "bg-navy-800 text-slate-300"
                          )}
                        >
                          6
                        </div>
                        <div>
                          <div className="font-heading font-bold text-white text-xs sm:text-sm">
                            6 Members
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Enterprise Powerhouse
                          </div>
                        </div>
                      </div>

                      {selectedTeamSize === "6" && (
                        <CheckCircle2 className="w-4 h-4 text-acm-cyan shrink-0" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 1 Next Button */}
                <div className="flex justify-end pt-4 border-t border-acm-blue/20">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleNextFromStep1}
                  >
                    Proceed to Member Details
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 2: SQUAD MEMBERS ================= */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-acm-blue/20 pb-4">
                  <div>
                    <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white mb-1">
                      Step 2: Enter {selectedTeamSize} Member Profiles
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-mono">
                      Member 1 is designated as the Team Leader. All fields marked with * are required.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="px-3 py-1.5 rounded-lg text-xs font-mono bg-navy-900 border border-acm-blue/30 text-acm-cyan">
                      {selectedTeamSize} Members
                    </span>
                  </div>
                </div>

                {/* Global Members Validation Error if any */}
                {errors.members?.message && (
                  <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 text-rose-300 text-xs sm:text-sm flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                    <span>{errors.members.message}</span>
                  </div>
                )}

                {/* Member Cards */}
                <div className="space-y-6">
                  {fields.map((field, index) => {
                    const isLeader = index === 0;

                    return (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={cn(
                          "rounded-2xl p-5 sm:p-6 border backdrop-blur-md transition-all",
                          isLeader
                            ? "bg-navy-950/90 border-acm-cyan/50 shadow-glow-sm"
                            : "bg-navy-950/60 border-acm-blue/25"
                        )}
                      >
                        {/* Member Header */}
                        <div className="flex items-center justify-between mb-4 border-b border-acm-blue/15 pb-3">
                          <div className="flex items-center gap-2.5">
                            {isLeader ? (
                              <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40">
                                <Crown className="w-4 h-4" />
                              </span>
                            ) : (
                              <span className="p-1.5 rounded-lg bg-navy-800 text-slate-300 border border-acm-blue/30">
                                <User className="w-4 h-4" />
                              </span>
                            )}
                            <h4 className="font-heading font-bold text-base sm:text-lg text-white">
                              {isLeader ? "Team Leader (Member 1)" : `Member ${index + 1}`}
                            </h4>
                          </div>

                          <span className="text-[11px] font-mono text-slate-400">
                            {isLeader ? "Primary Point of Contact" : "Squad Teammate"}
                          </span>
                        </div>

                        {/* Input Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {/* Full Name */}
                          <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                              Full Name <span className="text-rose-400">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Rahul Sharma"
                              {...register(`members.${index}.name`)}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-acm-blue/30 text-white text-sm focus:outline-none focus:border-acm-cyan"
                            />
                            {errors.members?.[index]?.name && (
                              <p className="mt-1 text-[11px] text-rose-400 font-mono">
                                {errors.members[index].name.message}
                              </p>
                            )}
                          </div>

                          {/* Email */}
                          <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                              Email Address <span className="text-rose-400">*</span>
                            </label>
                            <input
                              type="email"
                              placeholder="e.g. rahul@mitsgwalior.in"
                              {...register(`members.${index}.email`)}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-acm-blue/30 text-white text-sm focus:outline-none focus:border-acm-cyan"
                            />
                            {errors.members?.[index]?.email && (
                              <p className="mt-1 text-[11px] text-rose-400 font-mono">
                                {errors.members[index].email.message}
                              </p>
                            )}
                          </div>

                          {/* Phone */}
                          <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                              Phone (10 digits) <span className="text-rose-400">*</span>
                            </label>
                            <input
                              type="tel"
                              maxLength={15}
                              placeholder="e.g. 9876543210"
                              {...register(`members.${index}.phone`)}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-acm-blue/30 text-white text-sm focus:outline-none focus:border-acm-cyan"
                            />
                            {errors.members?.[index]?.phone && (
                              <p className="mt-1 text-[11px] text-rose-400 font-mono">
                                {errors.members[index].phone.message}
                              </p>
                            )}
                          </div>

                          {/* Gender */}
                          <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                              Gender <span className="text-rose-400">*</span>
                            </label>
                            <select
                              {...register(`members.${index}.gender`)}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-acm-blue/30 text-white text-sm focus:outline-none focus:border-acm-cyan"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other / Non-Binary</option>
                              <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                            {errors.members?.[index]?.gender && (
                              <p className="mt-1 text-[11px] text-rose-400 font-mono">
                                {errors.members[index].gender.message}
                              </p>
                            )}
                          </div>

                          {/* College */}
                          <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                              College / Institute <span className="text-rose-400">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. MITS Gwalior"
                              {...register(`members.${index}.college`)}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-acm-blue/30 text-white text-sm focus:outline-none focus:border-acm-cyan"
                            />
                            {errors.members?.[index]?.college && (
                              <p className="mt-1 text-[11px] text-rose-400 font-mono">
                                {errors.members[index].college.message}
                              </p>
                            )}
                          </div>

                          {/* Enrollment Number */}
                          <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                              Enrollment / Roll No. <span className="text-rose-400">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 0901CS221045"
                              {...register(`members.${index}.enrollmentNo`)}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-acm-blue/30 text-white text-sm focus:outline-none focus:border-acm-cyan"
                            />
                            {errors.members?.[index]?.enrollmentNo && (
                              <p className="mt-1 text-[11px] text-rose-400 font-mono">
                                {errors.members[index].enrollmentNo.message}
                              </p>
                            )}
                          </div>

                          {/* Year of study */}
                          <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                              Year of Study <span className="text-rose-400">*</span>
                            </label>
                            <select
                              {...register(`members.${index}.year`)}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-acm-blue/30 text-white text-sm focus:outline-none focus:border-acm-cyan"
                            >
                              <option value="1st Year">1st Year (Fresher)</option>
                              <option value="2nd Year">2nd Year (Sophomore)</option>
                              <option value="3rd Year">3rd Year (Junior)</option>
                              <option value="4th Year">4th Year (Senior)</option>
                              <option value="Postgraduate">Postgraduate (M.Tech/MCA)</option>
                            </select>
                          </div>

                          {/* Branch */}
                          <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                              Branch / Dept <span className="text-rose-400">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. CSE / IT / AI-DS"
                              {...register(`members.${index}.branch`)}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-acm-blue/30 text-white text-sm focus:outline-none focus:border-acm-cyan"
                            />
                            {errors.members?.[index]?.branch && (
                              <p className="mt-1 text-[11px] text-rose-400 font-mono">
                                {errors.members[index].branch.message}
                              </p>
                            )}
                          </div>

                          {/* City / State */}
                          <div>
                            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                              City & State <span className="text-rose-400">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Gwalior, MP"
                              {...register(`members.${index}.city`)}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-acm-blue/30 text-white text-sm focus:outline-none focus:border-acm-cyan"
                            />
                            {errors.members?.[index]?.city && (
                              <p className="mt-1 text-[11px] text-rose-400 font-mono">
                                {errors.members[index].city.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Validation Error Banner if any required field is missing */}
                {step2ErrorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/60 text-rose-200 text-xs sm:text-sm flex items-start gap-3 shadow-md"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-heading font-bold text-white mb-0.5">
                        Incomplete Member Details
                      </div>
                      <div>{step2ErrorMsg}</div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2 Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-acm-blue/20">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setCurrentStep(1)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    Back to Team Details
                  </Button>

                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleNextFromStep2}
                  >
                    Review Team Application
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 3: REVIEW & CONFIRM ================= */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white mb-1">
                    Step 3: Review & Final Confirmation
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-mono">
                    Verify all squad details before transmitting application to ACM MITS Chapter.
                  </p>
                </div>

                {/* Team Info Overview Banner */}
                <div className="p-6 rounded-2xl bg-navy-950/80 border border-acm-cyan/40 shadow-glow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-acm-cyan">
                      Squad Overview
                    </span>
                    <h4 className="font-heading font-black text-2xl text-white">
                      {formValues.teamName}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-mono text-slate-300">
                      <span className="px-2.5 py-0.5 rounded bg-sky-950 border border-sky-600/30 text-acm-cyan font-bold">
                        Squad Size: {formValues.teamSize} Members
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentStep(1)}
                  >
                    <Edit2 className="w-3.5 h-3.5 mr-1" />
                    Edit Team Details
                  </Button>
                </div>

                {/* Member Roster Review */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-base text-white">
                      Squad Roster ({formValues.members?.length} Members)
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentStep(2)}
                    >
                      <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit Members
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formValues.members?.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-navy-950/70 border border-acm-blue/30 text-xs text-slate-300 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                            {idx === 0 && <Crown className="w-3.5 h-3.5 text-amber-400" />}
                            {m.name || "Member Name"}
                          </span>
                          <span className="font-mono text-[10px] text-sky-400 font-bold px-2 py-0.5 rounded bg-navy-900 border border-acm-blue/30">
                            {idx === 0 ? "LEADER" : `MEMBER ${idx + 1}`}
                          </span>
                        </div>
                        <div className="text-slate-200">
                          <strong>{m.gender || "Gender N/A"}</strong> • {m.city || "City N/A"}
                        </div>
                        <div className="text-slate-400">{m.email} • {m.phone}</div>
                        <div className="text-slate-400">{m.college} • Roll: {m.enrollmentNo}</div>
                        <div className="text-slate-400">{m.branch} • {m.year}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="p-4 rounded-xl bg-navy-950 border border-acm-blue/30 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    {...register("consentRules")}
                    className="mt-1 w-4 h-4 rounded text-acm-blue bg-navy-900 border-acm-blue/40 focus:ring-acm-cyan cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-slate-300 leading-relaxed cursor-pointer">
                    We certify that all member information is genuine. Our team consists of {formValues.teamSize} members and all work submitted during CodeNite will be authored from scratch during the 12-hour period in full accordance with the ACM Code of Conduct.
                  </label>
                </div>

                {errors.consentRules && (
                  <p className="text-xs text-rose-400 font-mono">
                    {errors.consentRules.message}
                  </p>
                )}

                {submitError && (
                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500 text-rose-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-rose-400" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Step 3 Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-acm-blue/20">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setCurrentStep(2)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    Back to Members
                  </Button>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    pulseRing
                    isLoading={isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-1.5" />
                    Confirm & Submit Registration
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 4: SUBMISSION SUCCESS / STATUS ================= */}
            {currentStep === 4 && isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="py-8 text-center flex flex-col items-center max-w-lg mx-auto"
              >
                {/* Live Cancellation Alert if cancelled by Admin */}
                {liveTeamStatus === "CANCELLED" ? (
                  <div className="w-full p-6 rounded-2xl bg-rose-950/80 border-2 border-rose-500 shadow-glow-md mb-6 text-left">
                    <div className="flex items-center gap-2.5 text-rose-400 font-heading font-black text-lg mb-2">
                      <XCircle className="w-6 h-6 shrink-0" />
                      <span>Registration Cancelled by Admin</span>
                    </div>
                    <p className="text-xs text-rose-200 leading-relaxed font-mono">
                      Your team registration for <strong className="text-white">"{formValues.teamName}"</strong> (ID: <code>{teamRegistrationId}</code>) has been cancelled by the ACM MITS Administrator.
                    </p>
                    {cancellationReason && (
                      <div className="mt-2 text-xs font-mono text-rose-300">
                        <strong>Reason:</strong> {cancellationReason}
                      </div>
                    )}
                    <div className="mt-4 pt-3 border-t border-rose-500/30 text-[11px] text-slate-300">
                      If you believe this cancellation was made in error, please contact the ACM MITS Organizing Committee immediately at <a href="mailto:acmmits@mitsgwalior.in" className="text-sky-300 underline">acmmits@mitsgwalior.in</a>.
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Animated Draw Checkmark Circle */}
                    <div className="relative w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_30px_rgba(52,211,153,0.4)]">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                      >
                        <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
                      </motion.div>
                      <span className="absolute -inset-2 rounded-full border border-emerald-400/30 animate-ping pointer-events-none" />
                    </div>

                    <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-2">
                      Registration Successful!
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                      Your squad <strong className="text-white">"{formValues.teamName}"</strong> has been successfully registered for CodeNite 2027 by ACM MITS Student Chapter!
                    </p>
                  </>
                )}

                {/* Registration ID Card */}
                <div className="w-full p-4 rounded-xl bg-navy-950 border border-acm-cyan/40 shadow-glow-sm flex items-center justify-between gap-3 mb-6">
                  <div className="text-left">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                      Team Registration Code
                    </div>
                    <div className="font-orbitron font-extrabold text-lg text-acm-cyan tracking-wider">
                      {teamRegistrationId}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyId}
                    className="p-2.5 rounded-lg bg-navy-800 text-slate-300 hover:text-white border border-acm-blue/30 transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
                  >
                    {copiedId ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Action Buttons: PDF Download & Community Links */}
                <div className="w-full space-y-3 mb-6">
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                    <button
                      type="button"
                      onClick={() => openPrintSlipWindow(formValues, teamRegistrationId)}
                      className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-acm-blue hover:from-sky-400 hover:to-acm-electric text-white text-xs font-heading font-bold text-center shadow-glow-sm hover:shadow-glow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Download Registration PDF (Slip)</span>
                    </button>

                    {pdfDriveUrl && (
                      <a
                        href={pdfDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto py-3 px-4 rounded-xl bg-navy-800 hover:bg-navy-700 text-acm-cyan text-xs font-heading font-bold text-center border border-acm-cyan/40 hover:border-acm-cyan transition-all flex items-center justify-center gap-1.5"
                      >
                        <FolderArchive className="w-4 h-4" />
                        <span>View in Drive</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-navy-950/80 border border-acm-blue/30 text-[11px] text-slate-300 flex items-center justify-center gap-2 font-mono">
                    <FolderArchive className="w-4 h-4 text-acm-cyan shrink-0" />
                    <span>PDF saved to Google Drive: "CodeNite 2027 Registration PDFs"</span>
                  </div>
                </div>

                {/* Important Instructions Box */}
                <div className="w-full text-left p-4 rounded-xl bg-sky-950/30 border border-sky-600/30 text-xs text-slate-300 space-y-2 mb-8">
                  <div className="font-heading font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-acm-cyan" />
                    Next Immediate Steps:
                  </div>
                  <div>1. A confirmation email with the official registration PDF has been dispatched to the Team Leader.</div>
                  <div>2. Keep the downloaded PDF safe or printed for on-campus verification at MITS Gwalior.</div>
                  <div>3. Follow ACM MITS on Instagram (@acm.mits) & LinkedIn, and join the WhatsApp group for live announcements.</div>
                  <div>4. Check-in reporting begins at 06:00 PM on 17 January 2027 at the MITS Gwalior Campus.</div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                  <a
                    href={EVENT_DATA.contacts.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:opacity-95 text-white text-xs font-heading font-bold text-center shadow-md hover:shadow-glow-sm transition-all"
                  >
                    Follow on Instagram (@acm.mits)
                  </a>
                  <a
                    href={EVENT_DATA.contacts.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-heading font-bold text-center transition-all"
                  >
                    Join WhatsApp Community
                  </a>
                </div>
              </motion.div>
            )}
          </form>
        </Card>
      </div>
    </section>
  );
}
