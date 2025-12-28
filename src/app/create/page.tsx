"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import { useCreateFlow } from "@/client/hooks/useCreateFlow";

// Components
import { Step1Basics } from "@/client/components/create/Step1Basics";
import { Step2Templates } from "@/client/components/create/Step2Templates";
import { Step3Colors } from "@/client/components/create/Step3Colors";
import { Step4Content } from "@/client/components/create/Step4Content";
import { Step5Cover } from "@/client/components/create/Step5Cover";
import { GeneratingOverlay } from "@/client/components/ui/GeneratingOverlay";

export default function CreatePage() {
  const {
    step,
    totalSteps,
    recipientName,
    setRecipientName,
    selectedOccasion,
    setSelectedOccasion,
    relationshipContext,
    setRelationshipContext,
    selectedTemplates,
    toggleTemplate,
    removeTemplate,
    selectedColorScheme,
    setSelectedColorScheme,
    templateContent,
    setTemplateContent,
    images,
    setImages,
    refineWithAI,
    setRefineWithAI,
    expandedSections,
    toggleSection,
    isGenerating,
    isSaving,
    errorMessage,
    setErrorMessage,
    handleNext,
    handleBack,
    handleGenerate,
    saveProject,
    canProceed,
    projectId
  } = useCreateFlow();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-700">
              Step {step} of {totalSteps}
            </h2>
            <span className="text-xs text-slate-500">
              {step === 1 && "Start with the basics"}
              {step === 2 && "Choose your sections"}
              {step === 3 && "Pick a style"}
              {step === 4 && "Write your message"}
              {step === 5 && "Add photos"}
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <Step1Basics
                recipientName={recipientName}
                setRecipientName={setRecipientName}
                relationshipContext={relationshipContext}
                setRelationshipContext={setRelationshipContext}
                selectedOccasion={selectedOccasion}
                setSelectedOccasion={setSelectedOccasion}
              />
            )}

            {step === 2 && (
              <Step2Templates
                selectedTemplates={selectedTemplates}
                toggleTemplate={toggleTemplate}
              />
            )}

            {step === 3 && (
              <Step3Colors
                selectedColorScheme={selectedColorScheme}
                setSelectedColorScheme={setSelectedColorScheme}
              />
            )}

            {step === 4 && (
              <Step4Content
                selectedTemplates={selectedTemplates}
                templateContent={templateContent}
                setTemplateContent={setTemplateContent}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                removeTemplate={removeTemplate}
                refineWithAI={refineWithAI}
                setRefineWithAI={setRefineWithAI}
                recipientName={recipientName}
                selectedOccasion={selectedOccasion}
              />
            )}

            {step === 5 && (
              <Step5Cover
                images={images}
                setImages={setImages}
                selectedTemplates={selectedTemplates}
                templateContent={templateContent}
                setTemplateContent={setTemplateContent}
                refineWithAI={refineWithAI}
                setRefineWithAI={setRefineWithAI}
              />
            )}
          </AnimatePresence>

          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-red-50 border-2 border-red-200 rounded-2xl p-6"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 text-2xl">⚠️</div>
                <div className="flex-1">
                  <h3 className="font-bold text-red-900 mb-1">Oops! Something went wrong</h3>
                  <p className="text-red-700">{errorMessage}</p>
                  <button
                    onClick={() => setErrorMessage("")}
                    className="mt-3 text-sm font-semibold text-red-700 hover:text-red-900 underline"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-12">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            {step < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                <>
                  Next
                  <ArrowRight className="w-5 h-5" />
                </>
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <Sparkles className="w-5 h-5" />
                    Generate Website
                  </>
                )}
              </button>
            )}
          </div>

          {/* Save Draft Button */}
          <div className="mt-8 text-center border-t border-slate-200 pt-6">
            <button
              onClick={() => saveProject()}
              disabled={isSaving}
              className="text-slate-500 hover:text-purple-600 font-medium text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Start over or save for later? <span className="underline">Save Draft</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
      <GeneratingOverlay isGenerating={isGenerating} />
    </div >
  );
}
