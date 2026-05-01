/**
 * TOGAF 10 model: ADM phases and the canonical deliverable set.
 *
 * The deliverable list and ADM-phase mapping follow the TOGAF Standard,
 * 10th Edition (Architecture Development Method and ADM Techniques).
 * Each deliverable carries an automatic-check spec used by the EA
 * checklist engine and a generator-prompt key used by the LLM agent.
 */

export type ADMPhase =
  | "P"   // Preliminary
  | "A"   // Architecture Vision
  | "B"   // Business Architecture
  | "C-D" // Data Architecture
  | "C-A" // Application Architecture
  | "D"   // Technology Architecture
  | "E"   // Opportunities & Solutions
  | "F"   // Migration Planning
  | "G"   // Implementation Governance
  | "H"   // Architecture Change Management
  | "RM"; // Requirements Management (centre of the wheel)

export interface ADMPhaseDef {
  id: ADMPhase;
  letter: string;       // letter shown on the wheel
  name: string;
  short: string;
  purpose: string;
  steps: string[];      // canonical TOGAF steps within the phase
  inputs: string[];
  outputs: string[];    // deliverable ids produced
  /** Angle on the corn-circle wheel, degrees clockwise from 12 o'clock. */
  wheelAngle: number;
}

export const ADM_PHASES: ADMPhaseDef[] = [
  {
    id: "P",
    letter: "P",
    name: "Preliminary",
    short: "Preliminary",
    purpose:
      "Prepare the organisation to undertake successful architecture projects: scope, principles, governance, frameworks and tools.",
    steps: [
      "Scope the enterprise organisations impacted",
      "Confirm governance and support frameworks",
      "Define and establish the EA team and organisation",
      "Identify and establish architecture principles",
      "Tailor the TOGAF framework and other reference models",
      "Develop a strategy and implementation plan for tools",
    ],
    inputs: ["Board strategies", "Reference models", "Existing governance"],
    outputs: [
      "organizational-model",
      "tailored-architecture-framework",
      "architecture-principles",
      "architecture-governance-framework",
      "architecture-board-charter",
    ],
    wheelAngle: 0,
  },
  {
    id: "A",
    letter: "A",
    name: "Architecture Vision",
    short: "Vision",
    purpose:
      "Develop a high-level aspirational vision of the capabilities and business value delivered by the proposed architecture; secure approval for a Statement of Architecture Work.",
    steps: [
      "Establish the architecture project",
      "Identify stakeholders, concerns and business requirements",
      "Confirm and elaborate business goals, drivers and constraints",
      "Evaluate capabilities",
      "Assess readiness for business transformation",
      "Define scope",
      "Confirm and elaborate architecture principles, including business principles",
      "Develop the Architecture Vision",
      "Define the Target Architecture value propositions and KPIs",
      "Identify the business transformation risks and mitigation activities",
      "Develop Statement of Architecture Work; secure approval",
    ],
    inputs: [
      "Request for Architecture Work (RfAW)",
      "Architecture Principles",
      "Capability Assessment",
    ],
    outputs: [
      "request-for-architecture-work",
      "statement-of-architecture-work",
      "architecture-vision",
      "stakeholder-map",
      "business-scenarios",
      "communications-plan",
    ],
    wheelAngle: 36,
  },
  {
    id: "B",
    letter: "B",
    name: "Business Architecture",
    short: "Business",
    purpose:
      "Develop the Target Business Architecture, describe how the enterprise needs to operate to achieve the business goals and respond to the strategic drivers set out in the Architecture Vision.",
    steps: [
      "Select reference models, viewpoints and tools",
      "Develop Baseline Business Architecture description",
      "Develop Target Business Architecture description",
      "Perform gap analysis",
      "Define candidate roadmap components",
      "Resolve impacts across the Architecture Landscape",
      "Conduct formal stakeholder review",
      "Finalise the Business Architecture",
      "Create Architecture Definition Document",
    ],
    inputs: ["Architecture Vision", "Statement of Architecture Work"],
    outputs: ["business-architecture", "architecture-definition-document"],
    wheelAngle: 72,
  },
  {
    id: "C-D",
    letter: "C",
    name: "Information Systems Architecture — Data",
    short: "Data",
    purpose:
      "Define the major types and sources of data needed to support the business in a way that is understandable by stakeholders, complete, consistent and stable.",
    steps: [
      "Select reference models, viewpoints and tools",
      "Develop Baseline Data Architecture description",
      "Develop Target Data Architecture description",
      "Perform gap analysis",
      "Define candidate roadmap components",
      "Resolve impacts across the Architecture Landscape",
      "Conduct formal stakeholder review",
      "Finalise the Data Architecture",
    ],
    inputs: ["Business Architecture", "Architecture Vision"],
    outputs: ["data-architecture"],
    wheelAngle: 108,
  },
  {
    id: "C-A",
    letter: "C",
    name: "Information Systems Architecture — Application",
    short: "Application",
    purpose:
      "Define the major kinds of application systems necessary to process the data and support the business.",
    steps: [
      "Select reference models, viewpoints and tools",
      "Develop Baseline Application Architecture description",
      "Develop Target Application Architecture description",
      "Perform gap analysis",
      "Define candidate roadmap components",
      "Resolve impacts across the Architecture Landscape",
      "Conduct formal stakeholder review",
      "Finalise the Application Architecture",
    ],
    inputs: ["Data Architecture", "Business Architecture"],
    outputs: ["application-architecture"],
    wheelAngle: 144,
  },
  {
    id: "D",
    letter: "D",
    name: "Technology Architecture",
    short: "Technology",
    purpose:
      "Develop the Target Technology Architecture that will be the basis of the implementation work; define the logical software and hardware capabilities required.",
    steps: [
      "Select reference models, viewpoints and tools",
      "Develop Baseline Technology Architecture description",
      "Develop Target Technology Architecture description",
      "Perform gap analysis",
      "Define candidate roadmap components",
      "Resolve impacts across the Architecture Landscape",
      "Conduct formal stakeholder review",
      "Finalise the Technology Architecture",
    ],
    inputs: ["Application Architecture", "Standards Information Base"],
    outputs: ["technology-architecture"],
    wheelAngle: 180,
  },
  {
    id: "E",
    letter: "E",
    name: "Opportunities & Solutions",
    short: "Opportunities",
    purpose:
      "Generate the initial complete version of the Architecture Roadmap, based upon the gap analysis and candidate Architecture Roadmap components from Phases B, C and D.",
    steps: [
      "Determine/confirm key corporate change attributes",
      "Determine business constraints for implementation",
      "Review and consolidate gap analysis results from B–D",
      "Review consolidated requirements across functions",
      "Consolidate and reconcile interoperability requirements",
      "Refine and validate dependencies",
      "Confirm readiness and risk for business transformation",
      "Formulate Implementation and Migration Strategy",
      "Identify and group major work packages",
      "Identify Transition Architectures",
      "Create Architecture Roadmap and Implementation and Migration Plan",
    ],
    inputs: ["B/C/D outputs", "Capability Assessment", "Constraints"],
    outputs: [
      "architecture-roadmap",
      "gap-analysis",
      "architecture-building-blocks",
      "solution-building-blocks",
      "trade-off-analysis",
      "business-models",
    ],
    wheelAngle: 216,
  },
  {
    id: "F",
    letter: "F",
    name: "Migration Planning",
    short: "Migration",
    purpose:
      "Finalise the Architecture Roadmap and the supporting Implementation and Migration Plan and ensure it is coordinated with the enterprise's portfolio and project management approach.",
    steps: [
      "Confirm management framework interactions for the I&M Plan",
      "Assign business value to each work package",
      "Estimate resource requirements, project timings and availability",
      "Prioritise migration projects through cost/benefit and risk validation",
      "Confirm Architecture Roadmap and update the ADD",
      "Complete the I&M Plan",
      "Complete the architecture development cycle and document lessons learned",
    ],
    inputs: ["Architecture Roadmap", "ABBs/SBBs"],
    outputs: ["implementation-and-migration-plan"],
    wheelAngle: 252,
  },
  {
    id: "G",
    letter: "G",
    name: "Implementation Governance",
    short: "Governance",
    purpose:
      "Provide architectural oversight of the implementation; ensure the implementation project conforms to the target architecture.",
    steps: [
      "Confirm scope and priorities for deployment with development management",
      "Identify deployment resources and skills",
      "Guide development of solutions deployment",
      "Perform Enterprise Architecture compliance reviews",
      "Implement business and IT operations",
      "Perform post-implementation review and close the implementation",
    ],
    inputs: ["Architecture Contract", "Implementation Governance Model"],
    outputs: [
      "implementation-governance-model",
      "architecture-contract",
      "compliance-assessment",
    ],
    wheelAngle: 288,
  },
  {
    id: "H",
    letter: "H",
    name: "Architecture Change Management",
    short: "Change Mgmt",
    purpose:
      "Establish procedures for managing change to the new architecture, ensure architecture changes are managed in a cohesive and architected way.",
    steps: [
      "Establish value-realisation process",
      "Deploy monitoring tools",
      "Manage risks",
      "Provide analysis for architecture change management",
      "Develop change requirements to meet performance targets",
      "Manage governance process",
      "Activate the process to implement change",
    ],
    inputs: ["Operational performance data", "Change requests"],
    outputs: ["change-requests"],
    wheelAngle: 324,
  },
  {
    id: "RM",
    letter: "RM",
    name: "Requirements Management",
    short: "Requirements",
    purpose:
      "Operate the process by which requirements for enterprise architecture are managed throughout the entire ADM cycle.",
    steps: [
      "Identify/document requirements (continuous)",
      "Baseline requirements",
      "Monitor baseline requirements",
      "Identify changed requirements; remove, add, modify, reassess priorities",
      "Identify changed requirements and record priorities",
      "Implement requirements arising from Phase H",
      "Update the requirements repository",
      "Implement change in the current phase",
      "Assess and revise gap analysis for past phases",
    ],
    inputs: ["All ADM phase outputs"],
    outputs: ["architecture-requirements-specification"],
    wheelAngle: -1, // centre
  },
];

// ---------------------------------------------------------------------------
// Deliverables
// ---------------------------------------------------------------------------

export interface DeliverableDef {
  id: string;
  title: string;
  phase: ADMPhase;
  /** Section headings used both for the LLM prompt and the auto-checks. */
  sections: string[];
  /** Auto-checkable rules: each is the markdown heading that must be present. */
  requiredHeadings: string[];
  /** Brief description of the deliverable (TOGAF 10). */
  description: string;
}

export const DELIVERABLES: DeliverableDef[] = [
  // ----------------------- Preliminary -----------------------
  {
    id: "organizational-model",
    title: "Organizational Model for Enterprise Architecture",
    phase: "P",
    description:
      "Defines the EA scope, organisations involved, governance, roles, responsibilities, budget, fit-for-purpose criteria and constraints.",
    sections: [
      "Scope of Organisations Impacted",
      "Maturity Assessment, Gaps and Resolution Approach",
      "Roles and Responsibilities",
      "Constraints",
      "Budget Requirements",
      "Governance and Support Strategy",
    ],
    requiredHeadings: ["Roles and Responsibilities", "Governance and Support Strategy"],
  },
  {
    id: "tailored-architecture-framework",
    title: "Tailored Architecture Framework",
    phase: "P",
    description:
      "Tailoring of the TOGAF framework, including method, content, metamodel, and reference models for the enterprise.",
    sections: [
      "Tailored Architecture Method",
      "Tailored Architecture Content",
      "Configured and Deployed Tools",
      "Interfaces with Governance Models",
    ],
    requiredHeadings: ["Tailored Architecture Method", "Tailored Architecture Content"],
  },
  {
    id: "architecture-principles",
    title: "Architecture Principles",
    phase: "P",
    description:
      "The fundamental principles that govern the architecture, expressed as Name / Statement / Rationale / Implications.",
    sections: ["Business Principles", "Data Principles", "Application Principles", "Technology Principles"],
    requiredHeadings: ["Business Principles", "Data Principles", "Application Principles", "Technology Principles"],
  },
  {
    id: "architecture-governance-framework",
    title: "Architecture Governance Framework",
    phase: "P",
    description:
      "Defines the governance content (process, content, context) and the governance organisation (board, repository, compliance).",
    sections: ["Governance Process", "Governance Content", "Governance Organisation", "Governance Repository"],
    requiredHeadings: ["Governance Process", "Governance Organisation"],
  },
  {
    id: "architecture-board-charter",
    title: "Architecture Board Charter",
    phase: "P",
    description: "Establishes the cross-functional Architecture Board: purpose, membership, mandate, decision rights.",
    sections: ["Purpose", "Membership", "Responsibilities", "Decision Rights", "Meeting Cadence"],
    requiredHeadings: ["Purpose", "Membership", "Decision Rights"],
  },

  // ----------------------- Phase A -----------------------
  {
    id: "request-for-architecture-work",
    title: "Request for Architecture Work (RfAW)",
    phase: "A",
    description:
      "Document sent from the sponsoring organisation to the architecture organisation that triggers an ADM cycle.",
    sections: [
      "Organisation Sponsors",
      "Organisation's Mission Statement",
      "Business Goals (and Changes)",
      "Strategic Plans of the Business",
      "Time Limits",
      "Changes in the Business Environment",
      "Organisational Constraints",
      "Budget Information, Financial Constraints",
      "External Constraints, Business Constraints",
      "Current Business System Description",
      "Current Architecture/IT System Description",
      "Description of Developing Organisation",
      "Description of Resources Available to Developing Organisation",
    ],
    requiredHeadings: [
      "Organisation Sponsors",
      "Business Goals (and Changes)",
      "Time Limits",
      "Budget Information, Financial Constraints",
      "External Constraints, Business Constraints",
    ],
  },
  {
    id: "statement-of-architecture-work",
    title: "Statement of Architecture Work (SoAW)",
    phase: "A",
    description:
      "The contract between the EA function and sponsor: scope, approach, deliverables, schedule, and acceptance.",
    sections: [
      "Architecture Project Request and Background",
      "Architecture Project Description and Scope",
      "Overview of Architecture Vision",
      "Specific Change of Scope Procedures",
      "Roles, Responsibilities, and Deliverables",
      "Acceptance Criteria and Procedures",
      "Architecture Project Plan and Schedule",
      "Approvals",
    ],
    requiredHeadings: [
      "Architecture Project Description and Scope",
      "Roles, Responsibilities, and Deliverables",
      "Acceptance Criteria and Procedures",
      "Architecture Project Plan and Schedule",
    ],
  },
  {
    id: "architecture-vision",
    title: "Architecture Vision",
    phase: "A",
    description:
      "High-level aspirational view of the target architecture and the value it delivers; basis of the SoAW approval.",
    sections: [
      "Problem Description",
      "Objective of the Engagement",
      "Summary Views Necessary to Communicate the Vision",
      "Mapped Requirements",
      "Reference to Draft Architecture Definition Document",
      "Capability Assessment",
      "Confirmed Statement of Architecture Work",
    ],
    requiredHeadings: [
      "Problem Description",
      "Objective of the Engagement",
      "Mapped Requirements",
    ],
  },
  {
    id: "stakeholder-map",
    title: "Stakeholder Map",
    phase: "A",
    description: "Identifies stakeholders, classifies them by power/interest, and lists their concerns.",
    sections: ["Stakeholder Catalog", "Power vs. Interest Matrix", "Stakeholder Concerns", "Engagement Approach"],
    requiredHeadings: ["Stakeholder Catalog", "Stakeholder Concerns"],
  },
  {
    id: "business-scenarios",
    title: "Business Scenarios",
    phase: "A",
    description:
      "Method for describing a business problem so that requirements can be defined; covers process, actors, environment, desired outcome.",
    sections: [
      "Problem",
      "Business and Technical Environment",
      "Objectives",
      "Human Actors and Their Place in the Problem",
      "Computer Actors and Their Place in the Problem",
      "Roles, Responsibilities and Measures of Success",
      "Specific Requirements",
    ],
    requiredHeadings: ["Problem", "Objectives", "Specific Requirements"],
  },
  {
    id: "communications-plan",
    title: "Communications Plan",
    phase: "A",
    description: "Identifies stakeholders, the communications they need, channel, frequency, and owners.",
    sections: ["Identified Stakeholders", "Communications Needs", "Communications Channels", "Schedule"],
    requiredHeadings: ["Identified Stakeholders", "Communications Channels"],
  },

  // ----------------------- Phase B -----------------------
  {
    id: "business-architecture",
    title: "Business Architecture",
    phase: "B",
    description:
      "Description of baseline and target business strategy, governance, organisation, business processes, capabilities and value streams.",
    sections: [
      "Baseline Business Architecture",
      "Target Business Architecture",
      "Business Capabilities",
      "Value Streams",
      "Organisation Map",
      "Business Process Models",
      "Gap Analysis",
      "Candidate Roadmap Components",
    ],
    requiredHeadings: [
      "Baseline Business Architecture",
      "Target Business Architecture",
      "Gap Analysis",
    ],
  },
  {
    id: "architecture-definition-document",
    title: "Architecture Definition Document (ADD)",
    phase: "B",
    description:
      "Living deliverable produced through the ADM that contains baseline and target architectures (Business, Data, Application, Technology) and gap analyses across each.",
    sections: [
      "Scope",
      "Goals, Objectives, and Constraints",
      "Architecture Principles",
      "Baseline Architecture",
      "Target Architecture",
      "Architecture Models (Business, Data, Application, Technology)",
      "Rationale and Justification",
      "Mapping to Architecture Repository",
      "Gap Analysis",
      "Impact Assessment",
    ],
    requiredHeadings: ["Scope", "Baseline Architecture", "Target Architecture", "Gap Analysis"],
  },

  // ----------------------- Phase C-D -----------------------
  {
    id: "data-architecture",
    title: "Data Architecture",
    phase: "C-D",
    description:
      "Defines the structure of an organisation's logical and physical data assets and data management resources.",
    sections: [
      "Baseline Data Architecture",
      "Target Data Architecture",
      "Data Entity / Data Component Catalog",
      "Data Lifecycle Diagram",
      "Data Migration Diagram",
      "Gap Analysis",
    ],
    requiredHeadings: ["Baseline Data Architecture", "Target Data Architecture", "Gap Analysis"],
  },

  // ----------------------- Phase C-A -----------------------
  {
    id: "application-architecture",
    title: "Application Architecture",
    phase: "C-A",
    description: "Defines the major kinds of application systems necessary to process the data and support the business.",
    sections: [
      "Baseline Application Architecture",
      "Target Application Architecture",
      "Application Portfolio Catalog",
      "Application/Data Matrix",
      "Application Communication Diagram",
      "Gap Analysis",
    ],
    requiredHeadings: ["Baseline Application Architecture", "Target Application Architecture", "Gap Analysis"],
  },

  // ----------------------- Phase D -----------------------
  {
    id: "technology-architecture",
    title: "Technology Architecture",
    phase: "D",
    description:
      "Describes the logical software and hardware capabilities required to support the deployment of business, data and application services.",
    sections: [
      "Baseline Technology Architecture",
      "Target Technology Architecture",
      "Technology Standards Catalog",
      "Technology Portfolio Catalog",
      "Environments and Locations Diagram",
      "Platform Decomposition Diagram",
      "Gap Analysis",
    ],
    requiredHeadings: ["Baseline Technology Architecture", "Target Technology Architecture", "Gap Analysis"],
  },

  // ----------------------- Phase E -----------------------
  {
    id: "architecture-roadmap",
    title: "Architecture Roadmap",
    phase: "E",
    description:
      "Lists individual work packages organised onto a timeline to realise the Target Architecture, including transition architectures.",
    sections: [
      "Work Packages",
      "Transition Architectures",
      "Implementation Factor Assessment & Deduction Matrix",
      "Consolidated Gaps, Solutions, and Dependencies Matrix",
      "Timeline",
    ],
    requiredHeadings: ["Work Packages", "Transition Architectures", "Timeline"],
  },
  {
    id: "gap-analysis",
    title: "Gap Analysis",
    phase: "E",
    description: "Consolidated cross-domain gap analysis across Business, Data, Application and Technology.",
    sections: [
      "Business Gaps",
      "Data Gaps",
      "Application Gaps",
      "Technology Gaps",
      "Consolidated Gap List",
      "Mitigation Approach",
    ],
    requiredHeadings: ["Consolidated Gap List", "Mitigation Approach"],
  },
  {
    id: "architecture-building-blocks",
    title: "Architecture Building Blocks (ABBs)",
    phase: "E",
    description:
      "Capabilities required to deliver the architecture, defined in technology-neutral terms.",
    sections: ["ABB Catalog", "Specification per ABB", "Dependencies", "Sourcing Options"],
    requiredHeadings: ["ABB Catalog"],
  },
  {
    id: "solution-building-blocks",
    title: "Solution Building Blocks (SBBs)",
    phase: "E",
    description:
      "Candidate products/services that realise ABBs; vendor- and product-specific.",
    sections: ["SBB Catalog", "Mapping ABB → SBB", "Procurement Notes"],
    requiredHeadings: ["SBB Catalog", "Mapping ABB → SBB"],
  },
  {
    id: "trade-off-analysis",
    title: "Trade-off Analysis",
    phase: "E",
    description:
      "Documents the trade-offs that stakeholders must accept across cost, risk, time, capability and quality attributes.",
    sections: [
      "Trade-off Drivers",
      "Options Considered",
      "Trade-off Matrix (Cost / Time / Risk / Quality / Capability)",
      "Recommendations",
      "Decision Required",
    ],
    requiredHeadings: ["Options Considered", "Trade-off Matrix (Cost / Time / Risk / Quality / Capability)", "Recommendations"],
  },
  {
    id: "business-models",
    title: "Business Models",
    phase: "E",
    description:
      "Business Model Canvas and Value Proposition Canvas derived from the SoAW + Vision + Change Request, used to communicate value to executives.",
    sections: [
      "Customer Segments",
      "Value Propositions",
      "Channels",
      "Customer Relationships",
      "Revenue Streams",
      "Key Resources",
      "Key Activities",
      "Key Partnerships",
      "Cost Structure",
      "Linked Architecture Outcomes",
    ],
    requiredHeadings: [
      "Customer Segments",
      "Value Propositions",
      "Revenue Streams",
      "Cost Structure",
      "Linked Architecture Outcomes",
    ],
  },

  // ----------------------- Phase F -----------------------
  {
    id: "implementation-and-migration-plan",
    title: "Implementation and Migration Plan",
    phase: "F",
    description:
      "Detailed, prioritised, costed plan for moving from the baseline to the target architecture via transition architectures.",
    sections: [
      "Implementation Strategy",
      "Project Charters",
      "Work Package Sequencing",
      "Cost / Benefit / Risk Per Project",
      "Resource Requirements",
      "Migration Approach",
    ],
    requiredHeadings: ["Work Package Sequencing", "Cost / Benefit / Risk Per Project"],
  },

  // ----------------------- Phase G -----------------------
  {
    id: "implementation-governance-model",
    title: "Implementation Governance Model",
    phase: "G",
    description:
      "Defines the architecture governance applied to delivery: roles, processes, escalation paths, and gates.",
    sections: [
      "Governance Processes",
      "Governance Organisation Structure",
      "Governance Roles and Responsibilities",
      "Governance-Related Standards",
    ],
    requiredHeadings: ["Governance Processes", "Governance Roles and Responsibilities"],
  },
  {
    id: "architecture-contract",
    title: "Architecture Contract",
    phase: "G",
    description:
      "Joint agreement between development partners and sponsors on the deliverables, quality, and fitness-for-purpose of the architecture.",
    sections: [
      "Introduction and Background",
      "Nature of Agreement",
      "Scope of Architecture",
      "Architecture and Strategic Principles and Requirements",
      "Conformance Requirements",
      "Architecture Development and Management Process and Roles",
      "Target Architecture Measures",
      "Defined Phases of Deliverables",
      "Prioritised Joint Workplan",
      "Time Window(s)",
      "Architecture Delivery and Business Metrics",
    ],
    requiredHeadings: [
      "Scope of Architecture",
      "Conformance Requirements",
      "Defined Phases of Deliverables",
    ],
  },
  {
    id: "compliance-assessment",
    title: "Compliance Assessment",
    phase: "G",
    description: "Assesses whether implementation projects conform to the target architecture.",
    sections: [
      "Project Description",
      "Architecture Compliance Review Checklist",
      "Findings",
      "Recommendations",
      "Decision",
    ],
    requiredHeadings: ["Findings", "Recommendations", "Decision"],
  },

  // ----------------------- Phase H -----------------------
  {
    id: "change-requests",
    title: "Change Requests",
    phase: "H",
    description:
      "Captured architecture change requests; classified as simplification, incremental or re-architecting changes.",
    sections: [
      "Change Request Catalog",
      "Classification (Simplification / Incremental / Re-architecting)",
      "Impact Assessment",
      "Recommended Action",
    ],
    requiredHeadings: ["Change Request Catalog", "Classification (Simplification / Incremental / Re-architecting)"],
  },

  // ----------------------- Requirements Mgmt -----------------------
  {
    id: "architecture-requirements-specification",
    title: "Architecture Requirements Specification",
    phase: "RM",
    description:
      "Quantitative statement of business needs that the architecture must meet; baselined and traced through the ADM.",
    sections: [
      "Success Measures",
      "Architecture Requirements (Functional & Non-Functional)",
      "Business Service Contracts",
      "Application Service Contracts",
      "Implementation Guidelines",
      "Implementation Specifications",
      "Implementation Standards",
      "Interoperability Requirements",
      "Constraints",
      "Assumptions",
    ],
    requiredHeadings: [
      "Architecture Requirements (Functional & Non-Functional)",
      "Constraints",
      "Assumptions",
    ],
  },
];

export const DELIVERABLES_BY_ID: Record<string, DeliverableDef> = Object.fromEntries(
  DELIVERABLES.map((d) => [d.id, d])
);

export const PHASE_BY_ID: Record<ADMPhase, ADMPhaseDef> = Object.fromEntries(
  ADM_PHASES.map((p) => [p.id, p])
) as Record<ADMPhase, ADMPhaseDef>;

export function deliverablesForPhase(phase: ADMPhase): DeliverableDef[] {
  return DELIVERABLES.filter((d) => d.phase === phase);
}
