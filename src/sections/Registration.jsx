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
} from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Stepper } from "../components/ui/Stepper";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { EVENT_DATA } from "../data/codeniteData";
import { triggerConfetti } from "../utils/confetti";
import { cn } from "../utils/cn";

// Single member schema
const memberSchema = z.object({
  name: z.string().min(2, "Full name is required (min 2 chars)"),
  email: z.string().email("Please provide a valid email address"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  college: z.string().min(2, "College/Institute name is required"),
  enrollmentNo: z.string().min(2, "Student Enrollment / Roll No. is required"),
  year: z.string().min(1, "Please select year of study"),
  branch: z.string().min(2, "Branch / Department is required"),
  github: z
    .string()
    .url("Enter a valid URL (e.g. https://github.com/...)")
    .optional()
    .or(z.literal("")),
  linkedin: z
    .string()
    .url("Enter a valid URL (e.g. https://linkedin.com/in/...)")
    .optional()
    .or(z.literal("")),
});

// Full registration schema
const registrationSchema = z
  .object({
    teamName: z.string().min(3, "Team name must be at least 3 characters"),
    teamSize: z.enum(["4", "6"], {
      required_error: "Team size must be strictly 4 or 6 members",
    }),
    track: z.string().min(1, "Please select a preferred innovation track"),
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
  });

// Initial member template
const createMemberTemplate = () => ({
  name: "",
  email: "",
  phone: "",
  college: "MITS Gwalior",
  enrollmentNo: "",
  year: "3rd Year",
  branch: "Computer Science & Engineering",
  github: "",
  linkedin: "",
});

export function Registration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [teamRegistrationId, setTeamRegistrationId] = useState("");
  const [copiedId, setCopiedId] = useState(false);

  const steps = [
    { title: "Team Details" },
    { title: "Squad Members" },
    { title: "Review & Confirm" },
    { title: "Status" },
  ];

  const defaultValues = {
    teamName: "",
    teamSize: "4",
    track: EVENT_DATA.tracks[0].title,
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
    const isTrackValid = await trigger("track");

    if (isTeamNameValid && isTeamSizeValid && isTrackValid) {
      setCurrentStep(2);
      window.scrollTo({ top: document.getElementById("register").offsetTop - 80, behavior: "smooth" });
    }
  };

  // Step 2 Validation
  const handleNextFromStep2 = async () => {
    const isMembersValid = await trigger("members");
    if (isMembersValid) {
      setCurrentStep(3);
      window.scrollTo({ top: document.getElementById("register").offsetTop - 80, behavior: "smooth" });
    }
  };

  // Submit Handler
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Simulated or Real Webhook POST to Google Apps Script / Formspree / Backend
      const payload = {
        timestamp: new Date().toISOString(),
        registrationId: `CN27-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        ...data,
      };

      // In production, user can replace this with their Google Apps Script URL:
      // const response = await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload)
      // });

      // Simulated network call (1.2s delay)
      await new Promise((resolve) => setTimeout(resolve, 1400));

      setTeamRegistrationId(payload.registrationId);
      setIsSubmitted(true);
      setCurrentStep(4);
      triggerConfetti();
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmitError("Failed to transmit registration. Please retry or contact ACM technical support.");
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
          subtitle="Form a team of strictly 4 or 6 members. Registration is free. No gender requirement. Lock in your spot."
        />

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
          className="p-6 sm:p-10 bg-navy-900/90 border border-acm-blue/30 shadow-glow-md backdrop-blur-2xl"
        >
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
                    Step 1: Team & Track Identification
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-mono">
                    Give your squad a battle name and select an innovation track.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  {/* Track Preference */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Innovation Track <span className="text-rose-400">*</span>
                    </label>
                    <select
                      {...register("track")}
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-acm-blue/30 text-white font-medium focus:outline-none focus:ring-2 focus:ring-acm-electric transition-all"
                    >
                      {EVENT_DATA.tracks.map((t) => (
                        <option key={t.id} value={t.title} className="bg-navy-950 text-white">
                          {t.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Team Size Animated Segmented Control */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                      Team Size Selection <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[11px] font-mono text-acm-cyan">
                      Strict Rule: Exactly 4 or 6 members only
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Option 4 */}
                    <div
                      onClick={() => setValue("teamSize", "4")}
                      className={cn(
                        "p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between",
                        selectedTeamSize === "4"
                          ? "bg-acm-blue/20 border-acm-cyan shadow-glow-sm"
                          : "bg-navy-950/60 border-acm-blue/20 hover:border-acm-blue/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center font-orbitron font-extrabold text-lg",
                            selectedTeamSize === "4"
                              ? "bg-acm-cyan text-navy-950"
                              : "bg-navy-800 text-slate-300"
                          )}
                        >
                          4
                        </div>
                        <div>
                          <div className="font-heading font-bold text-white text-sm">
                            4 Members
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Agile Strike Squad
                          </div>
                        </div>
                      </div>

                      {selectedTeamSize === "4" && (
                        <CheckCircle2 className="w-5 h-5 text-acm-cyan" />
                      )}
                    </div>

                    {/* Option 6 */}
                    <div
                      onClick={() => setValue("teamSize", "6")}
                      className={cn(
                        "p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-between",
                        selectedTeamSize === "6"
                          ? "bg-acm-blue/20 border-acm-cyan shadow-glow-sm"
                          : "bg-navy-950/60 border-acm-blue/20 hover:border-acm-blue/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center font-orbitron font-extrabold text-lg",
                            selectedTeamSize === "6"
                              ? "bg-acm-cyan text-navy-950"
                              : "bg-navy-800 text-slate-300"
                          )}
                        >
                          6
                        </div>
                        <div>
                          <div className="font-heading font-bold text-white text-sm">
                            6 Members
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Powerhouse Enterprise Squad
                          </div>
                        </div>
                      </div>

                      {selectedTeamSize === "6" && (
                        <CheckCircle2 className="w-5 h-5 text-acm-cyan" />
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-acm-blue/20 pb-4">
                  <div>
                    <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white mb-1">
                      Step 2: Enter {selectedTeamSize} Member Profiles
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-mono">
                      Member 1 is designated as the Team Leader. All fields marked with * are required.
                    </p>
                  </div>

                  <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-mono bg-sky-950 border border-sky-600/30 text-acm-cyan">
                    Squad Size: {selectedTeamSize} Members
                  </span>
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
                              maxLength={10}
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

                          {/* GitHub Profile */}
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                              GitHub Profile (Optional)
                            </label>
                            <input
                              type="url"
                              placeholder="https://github.com/..."
                              {...register(`members.${index}.github`)}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-acm-blue/20 text-white text-sm focus:outline-none focus:border-acm-cyan"
                            />
                            {errors.members?.[index]?.github && (
                              <p className="mt-1 text-[11px] text-rose-400 font-mono">
                                {errors.members[index].github.message}
                              </p>
                            )}
                          </div>

                          {/* LinkedIn Profile */}
                          <div>
                            <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                              LinkedIn Profile (Optional)
                            </label>
                            <input
                              type="url"
                              placeholder="https://linkedin.com/in/..."
                              {...register(`members.${index}.linkedin`)}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-acm-blue/20 text-white text-sm focus:outline-none focus:border-acm-cyan"
                            />
                            {errors.members?.[index]?.linkedin && (
                              <p className="mt-1 text-[11px] text-rose-400 font-mono">
                                {errors.members[index].linkedin.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

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
                      <span className="px-2.5 py-0.5 rounded bg-navy-900 border border-acm-blue/30">
                        Track: {formValues.track}
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-sky-950 border border-sky-600/30 text-acm-cyan font-bold">
                        Size: {formValues.teamSize} Members
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentStep(1)}
                  >
                    <Edit2 className="w-3.5 h-3.5 mr-1" />
                    Edit Team Name / Track
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
                        className="p-4 rounded-xl bg-navy-950/60 border border-acm-blue/20 text-xs text-slate-300 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                            {idx === 0 && <Crown className="w-3.5 h-3.5 text-amber-400" />}
                            {m.name || "Member Name"}
                          </span>
                          <span className="font-mono text-[10px] text-sky-400">
                            {idx === 0 ? "LEADER" : `MEMBER ${idx + 1}`}
                          </span>
                        </div>
                        <div className="text-slate-400">{m.email} • {m.phone}</div>
                        <div className="text-slate-400">{m.college} ({m.enrollmentNo})</div>
                        <div className="text-slate-400">{m.branch} - {m.year}</div>
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
                    We certify that all member information is genuine. Our team consists of strictly {formValues.teamSize} members and all work submitted during CodeNite will be authored from scratch during the 12-hour period in full accordance with the ACM Code of Conduct.
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

            {/* ================= STEP 4: SUBMISSION SUCCESS ================= */}
            {currentStep === 4 && isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="py-8 text-center flex flex-col items-center max-w-lg mx-auto"
              >
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

                {/* Important Instructions Box */}
                <div className="w-full text-left p-4 rounded-xl bg-sky-950/30 border border-sky-600/30 text-xs text-slate-300 space-y-2 mb-8">
                  <div className="font-heading font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-acm-cyan" />
                    Next Immediate Steps:
                  </div>
                  <div>1. A confirmation email has been dispatched to all {formValues.teamSize} registered team members.</div>
                  <div>2. Join the official ACM Discord & WhatsApp group using the links below for announcements.</div>
                  <div>3. Check-in reporting begins at 06:00 PM on 17 January 2027 at the MITS Gwalior Campus.</div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                  <a
                    href={EVENT_DATA.contacts.socials.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-acm-blue text-white text-xs font-heading font-bold text-center shadow-md hover:shadow-glow-sm transition-all"
                  >
                    Join Discord Server
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
