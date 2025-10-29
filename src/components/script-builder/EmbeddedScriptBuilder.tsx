"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Target,
  TrendingUp,
  FileText,
  CheckCircle2,
  Download
} from "lucide-react";
import {
  ScriptBuilderNavigation,
  ScriptBuilderTab
} from "@/components/script-builder/ScriptBuilderNavigation";
import { jsPDF } from "jspdf";
import BORScriptPDF from "@/assets/files/BORscript.pdf";

type ScriptSectionId = "opening" | "decision" | "pitch" | "proposal" | "final";

type ScriptTemplateFieldType = "input" | "textarea" | "select";

type ScriptTemplateField = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  type: ScriptTemplateFieldType;
  options?: string[];
};

type ScriptTemplateSection = {
  template: string;
  fields: ScriptTemplateField[];
};

type ScriptTemplate = Record<
  Exclude<ScriptSectionId, "final">,
  ScriptTemplateSection
>;

type GatekeeperPlayfulSelection = {
  callVolume?: "over" | "under";
  quotingCalls?: "yes" | "no";
  strategyPath?: "quotingDead" | "newStrategy";
};

type GatekeeperDirectSelection = {
  strategyPath?: "quotingDead" | "newStrategy";
};

type DecisionMakerPlayfulSelection = {
  callVolume?: "over" | "under";
  quotingCalls?: "yes" | "no";
  strategyPath?: "quotingDead" | "newStrategy";
};

type DecisionMakerDirectSelection = {
  strategyPath?: "quotingDead" | "newStrategy";
};

const gatekeeperCallVolumeResponses: Record<
  NonNullable<GatekeeperPlayfulSelection["callVolume"]>,
  string
> = {
  over: "Wow, that's a lot of calls.",
  under: "Wow, you're lucky. Some people are getting hit with 30 calls a week."
};

const gatekeeperQuotingResponses: Record<
  NonNullable<GatekeeperPlayfulSelection["quotingCalls"]>,
  string
> = {
  yes: "Yeah, that's pretty typical. That's what most brokers do.",
  no: "That's even worse. They're just calling to be friends?"
};

const gatekeeperPlayfulPathContent: Record<
  NonNullable<GatekeeperPlayfulSelection["strategyPath"]>,
  {
    label: string;
    blurb: string;
    lines: string[];
  }
> = {
  quotingDead: {
    label: "Quoting Is Dead",
    blurb: "Position BOR strategy as the smarter alternative to quoting.",
    lines: [
      "The reality is that quoting is no longer an effective way to [save on premiums]. It used to work, but the game has changed. There is a new strategy you can use to negotiate better premiums. You can use it with or without me.",
      "Look, this strategy is so good you're probably going to get a bonus after you bring it to the owner.",
      "Are you ready for that? What would you spend it on? Ohh, come on, anything."
    ]
  },
  newStrategy: {
    label: "New Strategy",
    blurb: "Introduce the strategy as a fresh way to negotiate premiums.",
    lines: [
      "There is a new strategy businesses are using to negotiate better premiums. You can use it with or without me.",
      "Look, this strategy is so good you're probably going to get a bonus after you bring it to the owner.",
      "Are you ready for that? What would you spend it on? Ohh, come on, anything."
    ]
  }
};

const gatekeeperDirectPathContent: Record<
  NonNullable<GatekeeperDirectSelection["strategyPath"]>,
  {
    label: string;
    blurb: string;
    lines: string[];
  }
> = {
  quotingDead: {
    label: "Quoting Is Dead",
    blurb: "Position BOR strategy as the smarter alternative to quoting.",
    lines: [
      "Quoting is no longer an effective way to [save on premiums]. It used to work, but the game has changed. There is a new strategy you can use to negotiate better premiums. You can use it with or without me."
    ]
  },
  newStrategy: {
    label: "New Strategy",
    blurb: "Introduce the strategy as a fresh way to negotiate premiums.",
    lines: [
      "There is a new strategy businesses are using to negotiate better premiums. You can use it with or without me."
    ]
  }
};

const gatekeeperCallVolumeQuestion =
  "Alright, cool. I'm guessing you get a ton of calls from insurance brokers. Is it over or under 10 a week?";
const gatekeeperQuotingQuestion =
  "Let me guess, they are all calling to quote. Is that right?";
const gatekeeperDirectIntro = "Alright, cool. I'll keep this quick.";

const decisionMakerCallVolumeQuestion =
  "Alright, cool. I'm guessing you get a ton of calls from insurance brokers. Is it over or under 10 a week?";
const decisionMakerQuotingQuestion =
  "Let me guess, they are all calling to quote. Is that right?";
const decisionMakerDirectIntro = "Alright, cool. I'll keep this quick.";

const decisionMakerCallVolumeResponses: Record<
  NonNullable<DecisionMakerPlayfulSelection["callVolume"]>,
  string
> = {
  over: "Wow, that's a lot of calls.",
  under: "Wow, you're lucky. Some people are getting hit with 30 calls a week."
};

const decisionMakerQuotingResponses: Record<
  NonNullable<DecisionMakerPlayfulSelection["quotingCalls"]>,
  string
> = {
  yes: "Yeah, that's pretty typical. That's what most brokers do.",
  no: "That's even worse. They're just calling to be friends?"
};

const decisionMakerPlayfulPathContent: Record<
  NonNullable<DecisionMakerPlayfulSelection["strategyPath"]>,
  {
    label: string;
    blurb: string;
    lines: string[];
  }
> = {
  quotingDead: {
    label: "Quoting Is Dead",
    blurb: "Position BOR strategy as the smarter alternative to quoting.",
    lines: [
      "The reality is that quoting is no longer an effective way to [save on premiums]. It used to work, but the game has changed. There is a new strategy you can use to negotiate better premiums. You can use it with or without me.",
      "You against jumping on a 15-minute call to see if or how it applies to your business?"
    ]
  },
  newStrategy: {
    label: "New Strategy",
    blurb: "Introduce the strategy as a fresh way to negotiate premiums.",
    lines: [
      "There is a new strategy businesses are using to negotiate better premiums. You can use it with or without me.",
      "You against jumping on a 15-minute call to see if or how it applies to your business?"
    ]
  }
};

const decisionMakerDirectPathContent: Record<
  NonNullable<DecisionMakerDirectSelection["strategyPath"]>,
  {
    label: string;
    blurb: string;
    lines: string[];
  }
> = {
  quotingDead: {
    label: "Quoting Is Dead",
    blurb: "Position BOR strategy as the smarter alternative to quoting.",
    lines: [
      "Quoting is no longer an effective way to [save on premiums]. It used to work, but the game has changed. There is a new strategy you can use to negotiate better premiums. You can use it with or without me.",
      "You against jumping on a 15-minute call to see if or how it will work?"
    ]
  },
  newStrategy: {
    label: "New Strategy",
    blurb: "Introduce the strategy as a fresh way to negotiate premiums.",
    lines: [
      "There is a new strategy businesses are using to negotiate better premiums. You can use it with or without me.",
      "You against jumping on a 15-minute call to see if or how it applies to your business?"
    ]
  }
};

const gatekeeperCallVolumeOptions = [
  { value: "over", label: "Over" },
  { value: "under", label: "Under" }
] as const;

const gatekeeperQuotingOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" }
] as const;

type PitchAudience = "gatekeeper" | "decisionMaker";
type PitchTone = "playful" | "direct";

const scriptTabs: ScriptBuilderTab<ScriptSectionId>[] = [
  {
    id: "opening",
    label: "Opening Introduction",
    icon: BookOpen
  },
  {
    id: "decision",
    label: "Decision Maker",
    icon: Target
  },
  {
    id: "pitch",
    label: "Pitch",
    icon: TrendingUp
  },
  {
    id: "proposal",
    label: "Proposal",
    icon: FileText
  },
  {
    id: "final",
    label: "Final Script",
    icon: CheckCircle2
  }
];

const SECTION_ORDER: Array<Exclude<ScriptSectionId, "final">> = [
  "opening",
  "decision",
  "pitch",
  "proposal"
];

const pitchPresets: Record<
  PitchAudience,
  {
    label: string;
    variants: Record<
      PitchTone,
      {
        label: string;
        script: string;
      }
    >;
  }
> = {
  gatekeeper: {
    label: "Gatekeeper Script",
    variants: {
      playful: {
        label: "Playful Pitch",
        script:
          "We're the team helping gatekeepers look like heroes'by giving their decision makers a strategy to control premiums without another quoting fire drill. Can I show you how that plays out in under two minutes?"
      },
      direct: {
        label: "Direct Pitch",
        script:
          "I work with teams like yours to get the decision maker a premium control strategy that doesn't rely on shopping the market. Who should I connect with so we can walk them through it?"
      }
    }
  },
  decisionMaker: {
    label: "Decision Maker Script",
    variants: {
      playful: {
        label: "Playful Pitch",
        script:
          "We help companies like yours turn renewals into a negotiation, not a guessing game. Let me walk you through how one of your peers used our BOR strategy to cut out the quoting chaos."
      },
      direct: {
        label: "Direct Pitch",
        script:
          "We specialize in BOR strategies that give you leverage at renewal. Let me show you how we helped a company like yours drive premiums down without gutting coverage."
      }
    }
  }
};

export function EmbeddedScriptBuilder() {
  const [activeTab, setActiveTab] =
    React.useState<ScriptSectionId>("opening");
  const [pitchAudience, setPitchAudience] =
    React.useState<PitchAudience>("gatekeeper");
  const [pitchTone, setPitchTone] =
    React.useState<PitchTone>("playful");
  const [scriptTemplate, setScriptTemplate] = React.useState<ScriptTemplate>(() => ({
    opening: {
      template:
        "Hi [Prospect's First Name], this is [Your Name] with [Agency Name]. Am I catching you at a bad time?",
      fields: [
        {
          id: "prospectFirstName",
          label: "Prospect's First Name",
          placeholder: "e.g., John",
          value: "",
          type: "input"
        },
        {
          id: "yourName",
          label: "Your Name",
          placeholder: "e.g., Sarah",
          value: "",
          type: "input"
        },
        {
          id: "agencyName",
          label: "Agency Name",
          placeholder: "e.g., Acme Insurance",
          value: "",
          type: "input"
        }
      ]
    },
    decision: {
      template:
        "Quick question for you'are you the person who handles the commercial insurance, or is that someone else?",
      fields: []
    },
    pitch: {
      template: "",
      fields: []
    },
    proposal: {
      template:
        "Awesome — we're set to meet on [Day] at [Time]. I'll send over the calendar invite.\n\nAnd real quick, before we jump off. What are you most excited about with this new strategy?\n\nAlright, cool. We will dive into that on our call.",
      fields: [
        {
          id: "day",
          label: "Day",
          placeholder: "e.g., Tuesday, next Wednesday",
          value: "",
          type: "input"
        },
        {
          id: "time",
          label: "Time",
          placeholder: "e.g., 9:30 AM",
          value: "",
          type: "input"
        }
      ]
    }
  }));

  const [gatekeeperPlayfulState, setGatekeeperPlayfulState] =
    React.useState<GatekeeperPlayfulSelection>({});
  const isGatekeeperPlayful = pitchAudience === "gatekeeper" && pitchTone === "playful";
  const [gatekeeperDirectState, setGatekeeperDirectState] =
    React.useState<GatekeeperDirectSelection>({});
  const isGatekeeperDirect = pitchAudience === "gatekeeper" && pitchTone === "direct";

  const [decisionMakerPlayfulState, setDecisionMakerPlayfulState] =
    React.useState<DecisionMakerPlayfulSelection>({});
  const isDecisionMakerPlayful = pitchAudience === "decisionMaker" && pitchTone === "playful";
  const [decisionMakerDirectState, setDecisionMakerDirectState] =
    React.useState<DecisionMakerDirectSelection>({});
  const isDecisionMakerDirect = pitchAudience === "decisionMaker" && pitchTone === "direct";

  React.useEffect(() => {
    if (!isGatekeeperPlayful) {
      setGatekeeperPlayfulState({});
    }
  }, [isGatekeeperPlayful]);

  React.useEffect(() => {
    if (!isGatekeeperDirect) {
      setGatekeeperDirectState({});
    }
  }, [isGatekeeperDirect]);

  React.useEffect(() => {
    if (!isDecisionMakerPlayful) {
      setDecisionMakerPlayfulState({});
    }
  }, [isDecisionMakerPlayful]);

  React.useEffect(() => {
    if (!isDecisionMakerDirect) {
      setDecisionMakerDirectState({});
    }
  }, [isDecisionMakerDirect]);

  const gatekeeperPlayfulSummary = React.useMemo(() => {
    const selectionKeys: Array<keyof GatekeeperPlayfulSelection> = [
      "callVolume",
      "quotingCalls",
      "strategyPath"
    ];
    const { callVolume, quotingCalls, strategyPath } =
      gatekeeperPlayfulState;
    const lines: string[] = [];
    lines.push(gatekeeperCallVolumeQuestion);
    lines.push(
      callVolume
        ? gatekeeperCallVolumeResponses[callVolume]
        : "[Select over or under 10 a week]"
    );
    lines.push(gatekeeperQuotingQuestion);
    lines.push(
      quotingCalls
        ? gatekeeperQuotingResponses[quotingCalls]
        : "[Select how they respond]"
    );
    if (strategyPath) {
      gatekeeperPlayfulPathContent[strategyPath].lines.forEach((line, idx) => {
        lines.push(`${idx + 1}. ${line}`);
      });
    } else {
      lines.push("[Choose a path: Quoting Is Dead or New Strategy]");
    }
    lines.push("Ask for the 15-minute call:");
    lines.push("All we need is 15 minutes to see if or how it applies.");
    const completion = Math.round(
      (selectionKeys.filter(key => gatekeeperPlayfulState[key]).length /
        selectionKeys.length) *
        100
    );
    return { lines, completion };
  }, [gatekeeperPlayfulState]);

  const gatekeeperDirectSummary = React.useMemo(() => {
    const selectionKeys: Array<keyof GatekeeperDirectSelection> = [
      "strategyPath"
    ];
    const { strategyPath } = gatekeeperDirectState;
    const lines: string[] = [gatekeeperDirectIntro];
    if (strategyPath) {
      gatekeeperDirectPathContent[strategyPath].lines.forEach((line, idx) => {
        lines.push(`${idx + 1}. ${line}`);
      });
    } else {
      lines.push("[Choose a path: Quoting Is Dead or New Strategy]");
    }
    lines.push("Ask for the 15-minute call:");
    lines.push("All we need is 15 minutes to see if or how it applies.");
    const completion = Math.round(
      (selectionKeys.filter(key => gatekeeperDirectState[key]).length /
        selectionKeys.length) *
        100
    );
    return { lines, completion };
  }, [gatekeeperDirectState]);

  const decisionMakerPlayfulSummary = React.useMemo(() => {
    const selectionKeys: Array<keyof DecisionMakerPlayfulSelection> = [
      "callVolume",
      "quotingCalls",
      "strategyPath"
    ];
    const { callVolume, quotingCalls, strategyPath } =
      decisionMakerPlayfulState;
    const lines: string[] = [];
    lines.push(decisionMakerCallVolumeQuestion);
    lines.push(
      callVolume
        ? decisionMakerCallVolumeResponses[callVolume]
        : "[Select over or under 10 a week]"
    );
    lines.push(decisionMakerQuotingQuestion);
    lines.push(
      quotingCalls
        ? decisionMakerQuotingResponses[quotingCalls]
        : "[Select how they respond]"
    );
    if (strategyPath) {
      decisionMakerPlayfulPathContent[strategyPath].lines.forEach((line, idx) => {
        lines.push(`${idx + 1}. ${line}`);
      });
    } else {
      lines.push("[Choose a path: Quoting Is Dead or New Strategy]");
    }
    const completion = Math.round(
      (selectionKeys.filter(key => decisionMakerPlayfulState[key]).length /
        selectionKeys.length) *
        100
    );
    return { lines, completion };
  }, [decisionMakerPlayfulState]);

  const decisionMakerDirectSummary = React.useMemo(() => {
    const selectionKeys: Array<keyof DecisionMakerDirectSelection> = [
      "strategyPath"
    ];
    const { strategyPath } = decisionMakerDirectState;
    const lines: string[] = [decisionMakerDirectIntro];
    if (strategyPath) {
      decisionMakerDirectPathContent[strategyPath].lines.forEach((line, idx) => {
        lines.push(`${idx + 1}. ${line}`);
      });
    } else {
      lines.push("[Choose a path: Quoting Is Dead or New Strategy]");
    }
    const completion = Math.round(
      (selectionKeys.filter(key => decisionMakerDirectState[key]).length /
        selectionKeys.length) *
        100
    );
    return { lines, completion };
  }, [decisionMakerDirectState]);

  const sectionOrder = SECTION_ORDER;

  const handleGatekeeperSelection = React.useCallback(
    <K extends keyof GatekeeperPlayfulSelection>(
      key: K,
      value: GatekeeperPlayfulSelection[K]
    ) => {
      setGatekeeperPlayfulState(prev => {
        if (prev[key] === value) {
          return prev;
        }
        return {
          ...prev,
          [key]: value
        };
      });
    },
    []
  );

  const handleGatekeeperDirectSelection = React.useCallback(
    <K extends keyof GatekeeperDirectSelection>(
      key: K,
      value: GatekeeperDirectSelection[K]
    ) => {
      setGatekeeperDirectState(prev => {
        if (prev[key] === value) return prev;
        return {
          ...prev,
          [key]: value
        };
      });
    },
    []
  );

  const handleDecisionMakerSelection = React.useCallback(
    <K extends keyof DecisionMakerPlayfulSelection>(
      key: K,
      value: DecisionMakerPlayfulSelection[K]
    ) => {
      setDecisionMakerPlayfulState(prev => {
        if (prev[key] === value) {
          return prev;
        }
        return {
          ...prev,
          [key]: value
        };
      });
    },
    []
  );

  const handleDecisionMakerDirectSelection = React.useCallback(
    <K extends keyof DecisionMakerDirectSelection>(
      key: K,
      value: DecisionMakerDirectSelection[K]
    ) => {
      setDecisionMakerDirectState(prev => {
        if (prev[key] === value) return prev;
        return {
          ...prev,
          [key]: value
        };
      });
    },
    []
  );

  const handleFieldChange = React.useCallback(
    (
      sectionId: Exclude<ScriptSectionId, "final">,
      fieldId: string,
      value: string
    ) => {
      setScriptTemplate(prev => ({
        ...prev,
        [sectionId]: {
          ...prev[sectionId],
          fields: prev[sectionId].fields.map(field =>
            field.id === fieldId ? { ...field, value } : field
          )
        }
      }));
    },
    []
  );

  const renderScript = React.useCallback(
    (sectionId: Exclude<ScriptSectionId, "final">) => {
      if (sectionId === "pitch") {
        if (isGatekeeperPlayful) {
          return gatekeeperPlayfulSummary.lines.join("\n");
        }
        if (isGatekeeperDirect) {
          return gatekeeperDirectSummary.lines.join("\n");
        }
        if (isDecisionMakerPlayful) {
          return decisionMakerPlayfulSummary.lines.join("\n");
        }
        if (isDecisionMakerDirect) {
          return decisionMakerDirectSummary.lines.join("\n");
        }
        return pitchPresets[pitchAudience].variants[pitchTone].script;
      }
      const section = scriptTemplate[sectionId];
      let rendered = section.template;
      section.fields.forEach(field => {
        const placeholder = `[${field.label}]`;
        const value = field.value.trim() || placeholder;
        rendered = rendered.split(placeholder).join(value);
      });
      return rendered;
    },
    [gatekeeperDirectSummary, gatekeeperPlayfulSummary, isGatekeeperDirect, isGatekeeperPlayful, decisionMakerDirectSummary, decisionMakerPlayfulSummary, isDecisionMakerDirect, isDecisionMakerPlayful, pitchAudience, pitchTone, scriptTemplate]
  );

  const getCompletionPercentage = React.useCallback(
    (sectionId: Exclude<ScriptSectionId, "final">) => {
      if (sectionId === "pitch") {
        if (isGatekeeperPlayful) {
          return gatekeeperPlayfulSummary.completion;
        }
        if (isGatekeeperDirect) {
          return gatekeeperDirectSummary.completion;
        }
        if (isDecisionMakerPlayful) {
          return decisionMakerPlayfulSummary.completion;
        }
        if (isDecisionMakerDirect) {
          return decisionMakerDirectSummary.completion;
        }
        return 100;
      }
      const section = scriptTemplate[sectionId];
      const totalFields = section.fields.length;
      const completed = section.fields.filter(
        field => field.value.trim().length > 0
      ).length;
      return totalFields === 0
        ? 0
        : Math.round((completed / totalFields) * 100);
    },
    [gatekeeperDirectSummary, gatekeeperPlayfulSummary, isGatekeeperDirect, isGatekeeperPlayful, decisionMakerDirectSummary, decisionMakerPlayfulSummary, isDecisionMakerDirect, isDecisionMakerPlayful, scriptTemplate]
  );

  const completionMap = React.useMemo<
    Partial<Record<ScriptSectionId, boolean>>
  >(() => {
    const map: Partial<Record<ScriptSectionId, boolean>> = {};
    sectionOrder.forEach(section => {
      map[section] = getCompletionPercentage(section) > 0;
    });
    map.final = sectionOrder.some(section => map[section]);
    return map;
  }, [getCompletionPercentage]);

  const activeSectionKey =
    activeTab === "final"
      ? null
      : (activeTab as Exclude<ScriptSectionId, "final">);

  const activeSectionFields = activeSectionKey
    ? scriptTemplate[activeSectionKey].fields
    : [];

  const isPitchSection = activeSectionKey === "pitch";
  const hasActiveFields =
    !isPitchSection && activeSectionFields.length > 0;

  const activeSectionCompletion = activeSectionKey
    ? getCompletionPercentage(activeSectionKey)
    : 0;

  const activeSectionPreview = activeSectionKey
    ? renderScript(activeSectionKey)
    : "";

  const progressValue = (() => {
    if (!isPitchSection) return activeSectionCompletion;
    if (isGatekeeperPlayful) return gatekeeperPlayfulSummary.completion;
    if (isGatekeeperDirect) return gatekeeperDirectSummary.completion;
    if (isDecisionMakerPlayful) return decisionMakerPlayfulSummary.completion;
    if (isDecisionMakerDirect) return decisionMakerDirectSummary.completion;
    return activeSectionCompletion;
  })();

  const showProgress =
    (isPitchSection && (isGatekeeperPlayful || isGatekeeperDirect || isDecisionMakerPlayful || isDecisionMakerDirect)) ||
    (!isPitchSection && hasActiveFields);

  const sectionDescription =
    activeSectionKey == null
      ? ""
      : isPitchSection
        ? isGatekeeperPlayful
          ? "Choose the script path that fits this call."
          : isGatekeeperDirect
            ? "Pick the script language you want to deploy."
            : isDecisionMakerPlayful
              ? "Choose the script path that fits this call."
              : isDecisionMakerDirect
                ? "Pick the script language you want to deploy."
                : "Use this language live on the call."
        : hasActiveFields
          ? "Fill in the blanks and tailor the script to this prospect."
          : "Use this language live on the call.";

  const compiledScript = React.useMemo(() => {
    return sectionOrder
      .map(section => {
        const label =
          scriptTabs.find(tab => tab.id === section)?.label || section;
        return `${label}:\n${renderScript(section)}`;
      })
      .join("\n\n");
  }, [renderScript]);

  const handleDownloadPDF = React.useCallback(() => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxLineWidth = pageWidth - margin * 2;

    // Add title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Cold Call Script", margin, margin);

    // Add date
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const date = new Date().toLocaleDateString();
    doc.text(`Generated: ${date}`, margin, margin + 8);

    // Add script content
    doc.setFontSize(11);
    let yPosition = margin + 20;

    const lines = doc.splitTextToSize(compiledScript, maxLineWidth);

    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 6;
    });

    // Save the PDF
    doc.save("cold-call-script.pdf");
  }, [compiledScript]);

  const handleDownloadBORScript = React.useCallback(() => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = BORScriptPDF;
    link.download = 'BOR-Script.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <ScriptBuilderNavigation
          tabs={scriptTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          completionMap={completionMap}
        />
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl shadow-slate-900/5"
      >
        {activeSectionKey && (
          <div className="space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {scriptTabs.find(tab => tab.id === activeSectionKey)?.label}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {sectionDescription}
                </p>
              </div>
              {showProgress && (
                <div className="flex items-center gap-3">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {progressValue}% Complete
                  </div>
                  <div className="w-28 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressValue}%` }}
                      transition={{ duration: 0.4 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>

            {isPitchSection ? (
              <>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                    Script Audience
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(pitchPresets) as PitchAudience[]).map(option => {
                      const optionData = pitchPresets[option];
                      const isActive = option === pitchAudience;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setPitchAudience(option)}
                          className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${isActive ? "bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-500/30" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-200 hover:text-emerald-600"}`}
                        >
                          {optionData.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
                    Tone
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(pitchPresets[pitchAudience].variants) as PitchTone[]).map(option => {
                      const optionData = pitchPresets[pitchAudience].variants[option];
                      const isActive = option === pitchTone;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setPitchTone(option)}
                          className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${isActive ? "bg-teal-500 text-white border-teal-500 shadow-sm shadow-teal-500/30" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-teal-200 hover:text-teal-600"}`}
                        >
                          {optionData.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {isGatekeeperPlayful ? (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {gatekeeperCallVolumeQuestion}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {gatekeeperCallVolumeOptions.map(option => {
                          const isActive = gatekeeperPlayfulState.callVolume === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() =>
                                handleGatekeeperSelection("callVolume", option.value)
                              }
                              className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${isActive ? "bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-500/30" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-200 hover:text-emerald-600"}`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                      {gatekeeperPlayfulState.callVolume ? (
                        <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                          {gatekeeperCallVolumeResponses[gatekeeperPlayfulState.callVolume]}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Select an option to personalize this line.
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {gatekeeperQuotingQuestion}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {gatekeeperQuotingOptions.map(option => {
                          const isActive = gatekeeperPlayfulState.quotingCalls === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() =>
                                handleGatekeeperSelection("quotingCalls", option.value)
                              }
                              className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${isActive ? "bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-500/30" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-200 hover:text-emerald-600"}`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                      {gatekeeperPlayfulState.quotingCalls ? (
                        <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                          {gatekeeperQuotingResponses[gatekeeperPlayfulState.quotingCalls]}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Select an option to personalize this line.
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        Choose a path
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {(Object.keys(gatekeeperPlayfulPathContent) as Array<NonNullable<GatekeeperPlayfulSelection["strategyPath"]>>).map(key => {
                          const option = gatekeeperPlayfulPathContent[key];
                          const isActive = gatekeeperPlayfulState.strategyPath === key;
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => handleGatekeeperSelection("strategyPath", key)}
                              className={`text-left px-4 py-3 rounded-2xl border transition-all ${isActive ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 shadow-sm shadow-emerald-500/20" : "border-slate-200 dark:border-slate-800 hover:border-emerald-200 hover:text-emerald-600"}`}
                            >
                              <span className="block font-semibold text-slate-900 dark:text-slate-100">
                                {option.label}
                              </span>
                              <span className="block text-sm text-slate-600 dark:text-slate-400 mt-1">
                                {option.blurb}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {gatekeeperPlayfulState.strategyPath ? (
                        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
                          {gatekeeperPlayfulPathContent[gatekeeperPlayfulState.strategyPath].lines.map((line, idx) => (
                            <p key={idx} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              {idx + 1}. {line}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Choose a strategy path to see the script lines.
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}

                {isGatekeeperDirect ? (
                  <div className="space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {gatekeeperDirectIntro}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        Choose a path
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {(Object.keys(gatekeeperDirectPathContent) as Array<NonNullable<GatekeeperDirectSelection["strategyPath"]>>).map(key => {
                          const option = gatekeeperDirectPathContent[key];
                          const isActive = gatekeeperDirectState.strategyPath === key;
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => handleGatekeeperDirectSelection("strategyPath", key)}
                              className={`text-left px-4 py-3 rounded-2xl border transition-all ${isActive ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 shadow-sm shadow-emerald-500/20" : "border-slate-200 dark:border-slate-800 hover:border-emerald-200 hover:text-emerald-600"}`}
                            >
                              <span className="block font-semibold text-slate-900 dark:text-slate-100">
                                {option.label}
                              </span>
                              <span className="block text-sm text-slate-600 dark:text-slate-400 mt-1">
                                {option.blurb}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {gatekeeperDirectState.strategyPath ? (
                        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
                          {gatekeeperDirectPathContent[gatekeeperDirectState.strategyPath].lines.map((line, idx) => (
                            <p key={idx} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              {idx + 1}. {line}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Choose a strategy path to see the script lines.
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}

                {isDecisionMakerPlayful ? (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {decisionMakerCallVolumeQuestion}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {gatekeeperCallVolumeOptions.map(option => {
                          const isActive = decisionMakerPlayfulState.callVolume === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() =>
                                handleDecisionMakerSelection("callVolume", option.value)
                              }
                              className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${isActive ? "bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-500/30" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-200 hover:text-emerald-600"}`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                      {decisionMakerPlayfulState.callVolume ? (
                        <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                          {decisionMakerCallVolumeResponses[decisionMakerPlayfulState.callVolume]}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Select an option to personalize this line.
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {decisionMakerQuotingQuestion}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {gatekeeperQuotingOptions.map(option => {
                          const isActive = decisionMakerPlayfulState.quotingCalls === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() =>
                                handleDecisionMakerSelection("quotingCalls", option.value)
                              }
                              className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${isActive ? "bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-500/30" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-200 hover:text-emerald-600"}`}
                            >
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                      {decisionMakerPlayfulState.quotingCalls ? (
                        <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                          {decisionMakerQuotingResponses[decisionMakerPlayfulState.quotingCalls]}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Select an option to personalize this line.
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        Choose a path
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {(Object.keys(decisionMakerPlayfulPathContent) as Array<NonNullable<DecisionMakerPlayfulSelection["strategyPath"]>>).map(key => {
                          const option = decisionMakerPlayfulPathContent[key];
                          const isActive = decisionMakerPlayfulState.strategyPath === key;
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => handleDecisionMakerSelection("strategyPath", key)}
                              className={`text-left px-4 py-3 rounded-2xl border transition-all ${isActive ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 shadow-sm shadow-emerald-500/20" : "border-slate-200 dark:border-slate-800 hover:border-emerald-200 hover:text-emerald-600"}`}
                            >
                              <span className="block font-semibold text-slate-900 dark:text-slate-100">
                                {option.label}
                              </span>
                              <span className="block text-sm text-slate-600 dark:text-slate-400 mt-1">
                                {option.blurb}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {decisionMakerPlayfulState.strategyPath ? (
                        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
                          {decisionMakerPlayfulPathContent[decisionMakerPlayfulState.strategyPath].lines.map((line, idx) => (
                            <p key={idx} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              {idx + 1}. {line}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Choose a strategy path to see the script lines.
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}

                {isDecisionMakerDirect ? (
                  <div className="space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {decisionMakerDirectIntro}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        Choose a path
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {(Object.keys(decisionMakerDirectPathContent) as Array<NonNullable<DecisionMakerDirectSelection["strategyPath"]>>).map(key => {
                          const option = decisionMakerDirectPathContent[key];
                          const isActive = decisionMakerDirectState.strategyPath === key;
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => handleDecisionMakerDirectSelection("strategyPath", key)}
                              className={`text-left px-4 py-3 rounded-2xl border transition-all ${isActive ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 shadow-sm shadow-emerald-500/20" : "border-slate-200 dark:border-slate-800 hover:border-emerald-200 hover:text-emerald-600"}`}
                            >
                              <span className="block font-semibold text-slate-900 dark:text-slate-100">
                                {option.label}
                              </span>
                              <span className="block text-sm text-slate-600 dark:text-slate-400 mt-1">
                                {option.blurb}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {decisionMakerDirectState.strategyPath ? (
                        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
                          {decisionMakerDirectPathContent[decisionMakerDirectState.strategyPath].lines.map((line, idx) => (
                            <p key={idx} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              {idx + 1}. {line}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Choose a strategy path to see the script lines.
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                {activeSectionFields.map(field => (
                  <div key={field.id} className="space-y-2">
                    <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {field.label}
                    </label>
                    {field.type === "input" ? (
                      <input
                        type="text"
                        value={field.value}
                        onChange={e =>
                          handleFieldChange(activeSectionKey, field.id, e.target.value)
                        }
                        placeholder={field.placeholder}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    ) : field.type === "textarea" ? (
                      <textarea
                        value={field.value}
                        onChange={e =>
                          handleFieldChange(activeSectionKey, field.id, e.target.value)
                        }
                        placeholder={field.placeholder}
                        rows={4}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    ) : field.type === "select" ? (
                      <select
                        value={field.value}
                        onChange={e =>
                          handleFieldChange(activeSectionKey, field.id, e.target.value)
                        }
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {field.options?.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : null}
                  </div>
                ))}
              </>
            )}

            <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                Preview
              </h4>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/15 dark:to-teal-950/15 rounded-2xl p-6 border border-emerald-200/60 dark:border-emerald-900/40">
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed italic whitespace-pre-line">
                  {activeSectionPreview ||
                    "Complete the fields above to see your draft language."}
                </p>
              </div>
            </div>

            {activeSectionKey === "decision" && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      If No:
                    </p>
                    <p>Follow the Gatekeeper Script.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      If Yes:
                    </p>
                    <p>Continue to Decision Maker Script.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

          {activeTab === "final" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Compile Your Call Flow
                </h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  Review the complete script before you bring it into the call block.
                  Refine transitions, tighten language, and make sure each section
                  leads to the next ask.
                </p>
              </div>
              <pre className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                {compiledScript}
              </pre>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleDownloadBORScript}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-white px-4 py-2 text-sm font-medium shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download BOR Script
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download as PDF
                </button>
              </div>
            </div>
          )}
        </motion.div>
    </div>
  );
}











