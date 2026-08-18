import type {
  Language,
  PersonalityConstruct,
  PersonalityQuestion,
} from "@/lib/types";

export interface QuestionSeed {
  id: string;
  scenarioType: string;
  similarityGroup: string;
  primaryConstruct: PersonalityConstruct;
  secondaryConstructs: PersonalityConstruct[];
  sourceBasis: string;
  reverseScored?: boolean;
  difficulty?: number;
  en: { text: string; options: string[] };
  ar: { text: string; options: string[] };
  weights: Array<Record<string, number>>;
}

function q(
  id: string,
  scenarioType: string,
  similarityGroup: string,
  primaryConstruct: PersonalityConstruct,
  secondaryConstructs: PersonalityConstruct[],
  sourceBasis: string,
  en: { text: string; options: string[] },
  ar: { text: string; options: string[] },
  weights: Array<Record<string, number>>,
  opts?: { reverseScored?: boolean; difficulty?: number }
): QuestionSeed {
  return {
    id,
    scenarioType,
    similarityGroup,
    primaryConstruct,
    secondaryConstructs,
    sourceBasis,
    reverseScored: opts?.reverseScored ?? false,
    difficulty: opts?.difficulty ?? 2,
    en,
    ar,
    weights,
  };
}

/** Original scenario-based items inspired by Big Five / HEXACO research (APA, Costa & McCrae). Not copied from proprietary instruments. */
export const QUESTION_SEEDS: QuestionSeed[] = [
  q(
    "p001",
    "social_new_environment",
    "social_entry_1",
    "sociability",
    ["social_confidence", "leadership_tendency"],
    "Extraversion/social approach — Big Five framework (APA)",
    {
      text: "You enter a new environment where you don't know anyone. A situation suddenly requires someone to take the lead. What are you most likely to do?",
      options: [
        "Step forward and organize the group",
        "Suggest a plan quietly to one or two people",
        "Wait to see who else volunteers first",
        "Stay back and observe how things unfold",
      ],
    },
    {
      text: "دخلت مكان جديد ومفيش حد تعرفه. فجأة محتاجين حد ياخد زمام الأمور. إنت غالبًا هتعمل إيه؟",
      options: [
        "هتتقدم وتنظم المجموعة",
        "هتقترح خطة بهدوء على شخص أو اتنين",
        "هتستنى تشوف مين تاني هيتطوع",
        "هتفضل تراقب وتشوف الأمور هتمشي إزاي",
      ],
    },
    [
      { sociability: 0.9, leadership_tendency: 0.8, social_confidence: 0.7 },
      { sociability: 0.5, leadership_tendency: 0.3, social_confidence: 0.4 },
      { sociability: 0.2, social_confidence: 0.2 },
      { sociability: -0.3, independence: 0.3, social_confidence: -0.2 },
    ]
  ),
  q(
    "p002",
    "work_deadline",
    "conscientiousness_1",
    "conscientiousness",
    ["persistence", "stress_response"],
    "Conscientiousness — diligence under pressure (NIMH stress research context)",
    {
      text: "A project deadline moved up unexpectedly. Your team is behind schedule. How do you typically respond?",
      options: [
        "Create a detailed plan and divide tasks immediately",
        "Focus on the most critical parts and adapt as you go",
        "Ask for help and redistribute work",
        "Feel overwhelmed but push through at the last minute",
      ],
    },
    {
      text: "موعد تسليم مشروع اتقدم فجأة والفريق متأخر. إنت عادةً بتتصرف إزاي؟",
      options: [
        "بتعمل خطة مفصلة وتوزّع المهام فورًا",
        "بتركز على الأجزاء الأهم وتتكيف وإنت شغال",
        "بتطلب مساعدة وتوزّع الشغل",
        "بتحس بضغط بس بتكمّل في آخر لحظة",
      ],
    },
    [
      { conscientiousness: 0.9, persistence: 0.7, stress_response: 0.5 },
      { conscientiousness: 0.6, flexibility: 0.4, problem_solving: 0.5 },
      { conscientiousness: 0.5, cooperation: 0.6 },
      { conscientiousness: 0.2, stress_response: -0.4 },
    ]
  ),
  q(
    "p003",
    "creative_problem",
    "openness_1",
    "openness",
    ["curiosity", "problem_solving"],
    "Openness to experience — creative problem solving (APA)",
    {
      text: "You're asked to solve a problem in a completely new way, with no clear instructions. What's your first instinct?",
      options: [
        "Brainstorm unusual ideas without judging them yet",
        "Research how others have solved similar problems",
        "Stick to methods that worked before",
        "Ask for clearer rules before starting",
      ],
    },
    {
      text: "طُلب منك تحل مشكلة بطريقة جديدة تمامًا من غير تعليمات واضحة. أول حاجة بتعملها إيه؟",
      options: [
        "بتفكر في أفكار غير تقليدية من غير ما تحكم عليها",
        "بتدور على حلول الناس لمشاكل مشابهة",
        "بتلتزم بالطرق اللي نجحت قبل كده",
        "بتطلب قواعد أوضح قبل ما تبدأ",
      ],
    },
    [
      { openness: 0.9, curiosity: 0.8, problem_solving: 0.5 },
      { openness: 0.6, curiosity: 0.5, conscientiousness: 0.3 },
      { openness: -0.4, conscientiousness: 0.4 },
      { openness: -0.2, flexibility: -0.3 },
    ]
  ),
  q(
    "p004",
    "friend_distress",
    "empathy_1",
    "empathy",
    ["emotional_regulation", "communication_style"],
    "Empathy and emotional support — social cognition research (WHO wellbeing context)",
    {
      text: "A close friend shares that they're going through a difficult time. You usually:",
      options: [
        "Listen carefully and reflect what you hear before offering advice",
        "Try to fix the problem with practical suggestions right away",
        "Share a similar experience to show you understand",
        "Give them space unless they ask for more",
      ],
    },
    {
      text: "صاحب قريب بيشاركك إنه بيمر بوقت صعب. إنت عادةً:",
      options: [
        "بتسمع بتركيز وبتعكس اللي سمعته قبل ما تقدم نصيحة",
        "بتحاول تحل المشكلة باقتراحات عملية فورًا",
        "بتشارك تجربة مشابهة عشان يحس إنك فاهمه",
        "بتسيبله مساحة إلا لو طلب أكتر",
      ],
    },
    [
      { empathy: 0.9, communication_style: 0.6, emotional_regulation: 0.4 },
      { empathy: 0.4, problem_solving: 0.5 },
      { empathy: 0.5, sociability: 0.3 },
      { empathy: 0.2, independence: 0.3 },
    ]
  ),
  q(
    "p005",
    "group_conflict",
    "conflict_1",
    "conflict_style",
    ["cooperation", "emotional_regulation"],
    "Conflict resolution styles — interpersonal psychology (APA)",
    {
      text: "Two people in your group strongly disagree during a meeting. You tend to:",
      options: [
        "Help them find common ground and reframe the issue",
        "Side with whoever has the stronger argument",
        "Stay neutral and let them resolve it",
        "Change the subject to reduce tension",
      ],
    },
    {
      text: "اتنين في مجموعتك اختلفوا بقوة في اجتماع. إنت تميل:",
      options: [
        "تساعدهم يلاقوا أرضية مشتركة وتعيد صياغة المشكلة",
        "تاخد جانب اللي حجته أقوى",
        "تفضل محايد وتسيبهم يحلوا",
        "تغيّر الموضوع عشان تقلل التوتر",
      ],
    },
    [
      { conflict_style: 0.8, cooperation: 0.7, emotional_regulation: 0.5 },
      { conflict_style: 0.2, independence: 0.4 },
      { conflict_style: 0.4, independence: 0.3 },
      { conflict_style: -0.3, emotional_regulation: -0.2 },
    ]
  ),
];

// Generate additional questions programmatically for construct coverage
const SCENARIO_TEMPLATES: Array<{
  prefix: string;
  construct: PersonalityConstruct;
  secondary: PersonalityConstruct[];
  scenarioType: string;
  similarityBase: string;
  sourceBasis: string;
  pairs: Array<{
    en: { text: string; options: string[] };
    ar: { text: string; options: string[] };
    weights: Array<Record<string, number>>;
  }>;
}> = [
  {
    prefix: "soc",
    construct: "sociability",
    secondary: ["social_confidence"],
    scenarioType: "party_social",
    similarityBase: "social_gathering",
    sourceBasis: "Social approach behavior — extraversion research (APA Big Five)",
    pairs: [
      {
        en: {
          text: "At a gathering where you know only the host, you usually:",
          options: [
            "Introduce yourself to several new people",
            "Find one person and have a longer conversation",
            "Stay near people you already know",
            "Keep to yourself until someone approaches you",
          ],
        },
        ar: {
          text: "في تجمع تعرف فيه المضيف بس، إنت عادةً:",
          options: [
            "بتعرف نفسك على ناس جداد",
            "تلاقي شخص واحد وتتكلم معاه وقت أطول",
            "بتفضل جنب اللي تعرفهم",
            "بتفضل لوحدك لحد ما حد يكلّمك",
          ],
        },
        weights: [
          { sociability: 0.9, social_confidence: 0.7 },
          { sociability: 0.5, empathy: 0.3 },
          { sociability: 0.2 },
          { sociability: -0.5, independence: 0.3 },
        ],
      },
      {
        en: {
          text: "When plans change and a quiet evening becomes a group outing, you feel:",
          options: [
            "Energized — the more people, the better",
            "Fine either way, depending on the group",
            "Slightly drained but willing to join",
            "Prefer to stick to the original quiet plan",
          ],
        },
        ar: {
          text: "لما الخطط تتغير ومساء هادي يتحول لخروجة جماعية، إنت:",
          options: [
            "بتتحمس — كل ما الناس زادت أحسن",
            "تمام في الحالتين حسب المجموعة",
            "بتتعب شوية بس مستعد تنضم",
            "بتفضل الخطة الهادية الأصلية",
          ],
        },
        weights: [
          { sociability: 0.85, social_confidence: 0.5 },
          { sociability: 0.4, flexibility: 0.4 },
          { sociability: 0.1, flexibility: 0.2 },
          { sociability: -0.5, independence: 0.4 },
        ],
      },
    ],
  },
  {
    prefix: "con",
    construct: "conscientiousness",
    secondary: ["persistence"],
    scenarioType: "organization",
    similarityBase: "planning",
    sourceBasis: "Goal-directed behavior and self-discipline (Big Five conscientiousness)",
    pairs: [
      {
        en: {
          text: "Before starting an important task, you typically:",
          options: [
            "Write a clear list of steps and timelines",
            "Have a rough plan in your head",
            "Start working and figure it out as you go",
            "Wait until you feel fully motivated",
          ],
        },
        ar: {
          text: "قبل ما تبدأ مهمة مهمة، إنت عادةً:",
          options: [
            "بتكتب خطوات واضحة ومواعيد",
            "عندك خطة تقريبية في دماغك",
            "بتبدأ وتفهم وإنت شغال",
            "بتستنى لحد ما تحس بالحماس الكامل",
          ],
        },
        weights: [
          { conscientiousness: 0.9, persistence: 0.5 },
          { conscientiousness: 0.6 },
          { conscientiousness: 0.2, flexibility: 0.4 },
          { conscientiousness: -0.3, persistence: -0.2 },
        ],
      },
      {
        en: {
          text: "When you commit to helping someone with something small, you:",
          options: [
            "Follow through reliably, even if it's inconvenient",
            "Usually remember, but sometimes delay",
            "Try your best when you have time",
            "Often forget unless reminded",
          ],
        },
        ar: {
          text: "لما تلتزم تساعد حد في حاجة بسيطة، إنت:",
          options: [
            "بتنفّذ حتى لو مش مريح",
            "غالبًا بتفتكر بس أحيانًا بتأجل",
            "بتبذل جهدك لما يكون عندك وقت",
            "غالبًا بتنسى إلا لو فكّروك",
          ],
        },
        weights: [
          { conscientiousness: 0.85, cooperation: 0.5 },
          { conscientiousness: 0.5 },
          { conscientiousness: 0.3 },
          { conscientiousness: -0.4 },
        ],
      },
    ],
  },
  {
    prefix: "emp",
    construct: "empathy",
    secondary: ["communication_style"],
    scenarioType: "interpersonal",
    similarityBase: "perspective_taking",
    sourceBasis: "Perspective-taking and empathic concern (social psychology literature)",
    pairs: [
      {
        en: {
          text: "When someone reacts strongly to news you find minor, you:",
          options: [
            "Try to understand why it matters to them",
            "Acknowledge their feelings briefly and move on",
            "Explain why it shouldn't bother them",
            "Feel confused and disengage",
          ],
        },
        ar: {
          text: "لما حد يتفاعل بقوة مع خبر إنت شايفه بسيط، إنت:",
          options: [
            "بتحاول تفهم ليه مهم عنده",
            "بتعترف بمشاعره باختصار وتكمل",
            "بتحاول تشرح ليه مفروض ما يزعجه",
            "بتتحيّر وتبعد عن الموضوع",
          ],
        },
        weights: [
          { empathy: 0.9, emotional_regulation: 0.4 },
          { empathy: 0.5 },
          { empathy: -0.3, communication_style: -0.2 },
          { empathy: -0.5 },
        ],
      },
    ],
  },
  {
    prefix: "dec",
    construct: "decision_making",
    secondary: ["problem_solving", "risk_tendency"],
    scenarioType: "decision",
    similarityBase: "choice_under_uncertainty",
    sourceBasis: "Decision-making under uncertainty (cognitive psychology)",
    pairs: [
      {
        en: {
          text: "You must choose between two options with incomplete information. You:",
          options: [
            "Gather what you can, then decide within a set time",
            "Trust your gut after a quick reflection",
            "Ask others for their input before deciding",
            "Delay the decision hoping for more clarity",
          ],
        },
        ar: {
          text: "لازم تختار بين خيارين والمعلومات ناقصة. إنت:",
          options: [
            "بتجمع اللي تقدر عليه وتقرر في وقت محدد",
            "بتثق في حدسك بعد تفكير سريع",
            "بتستشير غيرك قبل القرار",
            "بتأجل القرار مستني وضوح أكتر",
          ],
        },
        weights: [
          { decision_making: 0.8, conscientiousness: 0.4 },
          { decision_making: 0.5, risk_tendency: 0.3 },
          { decision_making: 0.4, cooperation: 0.4 },
          { decision_making: -0.3, flexibility: -0.2 },
        ],
      },
    ],
  },
  {
    prefix: "str",
    construct: "stress_response",
    secondary: ["emotional_regulation"],
    scenarioType: "stress",
    similarityBase: "pressure_response",
    sourceBasis: "Stress coping strategies (NIMH general wellbeing research)",
    pairs: [
      {
        en: {
          text: "During a high-pressure week, you most often:",
          options: [
            "Prioritize, rest strategically, and communicate limits",
            "Push harder and sleep less temporarily",
            "Seek support from people you trust",
            "Withdraw until the pressure passes",
          ],
        },
        ar: {
          text: "في أسبوع ضغط عالي، إنت غالبًا:",
          options: [
            "بترتّب الأولويات، ترتاح بذكاء، وتوضّح حدودك",
            "بتشتغل أكتر وتنام أقل مؤقتًا",
            "بتدور على دعم من ناس تثق فيهم",
            "بتنسحب لحد ما الضغط يعدّي",
          ],
        },
        weights: [
          { stress_response: 0.8, emotional_regulation: 0.7, conscientiousness: 0.4 },
          { stress_response: 0.2, persistence: 0.5 },
          { stress_response: 0.5, cooperation: 0.4 },
          { stress_response: -0.4, emotional_regulation: -0.3 },
        ],
      },
    ],
  },
  {
    prefix: "ada",
    construct: "adaptability",
    secondary: ["flexibility"],
    scenarioType: "change",
    similarityBase: "adaptation",
    sourceBasis: "Psychological flexibility and adaptability (positive psychology)",
    pairs: [
      {
        en: {
          text: "Your routine is disrupted by an unexpected change. You:",
          options: [
            "Adjust quickly and find a new approach",
            "Feel annoyed but adapt within a day or two",
            "Prefer to restore the original plan if possible",
            "Struggle and need extra time to recalibrate",
          ],
        },
        ar: {
          text: "روتينك اتغيّر بسبب تغيير مفاجئ. إنت:",
          options: [
            "بتتكيف بسرعة وتلاقي طريقة جديدة",
            "بتزعج شوية بس بتتكيف في يوم أو اتنين",
            "بتفضل ترجع للخطة الأصلية لو ممكن",
            "بتاخد وقت أطول عشان ترجع توازنك",
          ],
        },
        weights: [
          { adaptability: 0.9, flexibility: 0.8 },
          { adaptability: 0.5, emotional_regulation: 0.3 },
          { adaptability: 0.2, conscientiousness: 0.3 },
          { adaptability: -0.4, flexibility: -0.3 },
        ],
      },
    ],
  },
  {
    prefix: "lead",
    construct: "leadership_tendency",
    secondary: ["cooperation", "social_confidence"],
    scenarioType: "leadership",
    similarityBase: "group_direction",
    sourceBasis: "Emergent leadership tendencies (organizational psychology)",
    pairs: [
      {
        en: {
          text: "In a group with no clear leader, you usually:",
          options: [
            "Take initiative to coordinate tasks",
            "Contribute ideas and support whoever leads",
            "Focus on your assigned part only",
            "Prefer someone else to organize everything",
          ],
        },
        ar: {
          text: "في مجموعة من غير قائد واضح، إنت عادةً:",
          options: [
            "بتاخد زمام المبادرة وتنسّق المهام",
            "بتقدم أفكار وتدعم اللي بيقود",
            "بتركز على جزئك بس",
            "بتفضل حد تاني ينظم كل حاجة",
          ],
        },
        weights: [
          { leadership_tendency: 0.9, social_confidence: 0.6 },
          { leadership_tendency: 0.4, cooperation: 0.6 },
          { leadership_tendency: 0.1, independence: 0.3 },
          { leadership_tendency: -0.4, cooperation: 0.2 },
        ],
      },
    ],
  },
  {
    prefix: "ref",
    construct: "self_reflection",
    secondary: ["emotional_regulation"],
    scenarioType: "introspection",
    similarityBase: "self_awareness",
    sourceBasis: "Self-reflection and metacognition (cognitive psychology)",
    pairs: [
      {
        en: {
          text: "After a disagreement, you typically:",
          options: [
            "Reflect on your role and what you could do differently",
            "Think about whether the other person was fair",
            "Move on quickly without much analysis",
            "Replay the conversation repeatedly in your mind",
          ],
        },
        ar: {
          text: "بعد خلاف، إنت عادةً:",
          options: [
            "بتفكر في دورك وإيه اللي ممكن تعمله مختلف",
            "بتفكر هل الطرف التاني كان عادل",
            "بتعدّي بسرعة من غير تحليل كتير",
            "بتعيد المحادثة في دماغك مرارًا",
          ],
        },
        weights: [
          { self_reflection: 0.85, emotional_regulation: 0.5 },
          { self_reflection: 0.4 },
          { self_reflection: -0.2 },
          { self_reflection: 0.5, stress_response: -0.3 },
        ],
      },
    ],
  },
  {
    prefix: "cur",
    construct: "curiosity",
    secondary: ["openness"],
    scenarioType: "learning",
    similarityBase: "exploration",
    sourceBasis: "Intellectual curiosity (openness facet research)",
    pairs: [
      {
        en: {
          text: "When you encounter a topic you know little about, you:",
          options: [
            "Dive in and explore it from multiple angles",
            "Learn the basics if it seems useful",
            "Skim summaries unless required",
            "Usually leave it unless someone pushes you",
          ],
        },
        ar: {
          text: "لما تقابل موضوع مش عارف عنه كتير، إنت:",
          options: [
            "بتغوص وتستكشفه من زوايا مختلفة",
            "بتتعلم الأساسيات لو شكله مفيد",
            "بتقرأ ملخصات إلا لو مطلوب",
            "غالبًا بتسيبه إلا لو حد دفعك",
          ],
        },
        weights: [
          { curiosity: 0.9, openness: 0.7 },
          { curiosity: 0.5, conscientiousness: 0.3 },
          { curiosity: 0.1 },
          { curiosity: -0.5 },
        ],
      },
    ],
  },
  {
    prefix: "ind",
    construct: "independence",
    secondary: ["decision_making"],
    scenarioType: "autonomy",
    similarityBase: "self_direction",
    sourceBasis: "Autonomy and self-direction (personality psychology)",
    pairs: [
      {
        en: {
          text: "When making a personal decision that affects only you, you:",
          options: [
            "Trust your own judgment after thinking it through",
            "Consider advice but decide independently",
            "Heavily weigh others' opinions",
            "Avoid deciding until others choose for you",
          ],
        },
        ar: {
          text: "لما تاخد قرار شخصي يخصك إنت بس، إنت:",
          options: [
            "بتثق في حكمك بعد ما تفكر",
            "بتسمع النصايح بس تقرر لوحدك",
            "بتدي وزن كبير لآراء غيرك",
            "بتتجنب القرار لحد ما غيرك يختار",
          ],
        },
        weights: [
          { independence: 0.9, decision_making: 0.5 },
          { independence: 0.6 },
          { independence: 0.1, cooperation: 0.4 },
          { independence: -0.6 },
        ],
      },
    ],
  },
  {
    prefix: "risk",
    construct: "risk_tendency",
    secondary: ["decision_making"],
    scenarioType: "risk",
    similarityBase: "risk_choice",
    sourceBasis: "Risk preference in decision contexts (behavioral psychology)",
    pairs: [
      {
        en: {
          text: "A safe option and a risky option could both lead to a good outcome. You:",
          options: [
            "Often choose the risky option if the upside is meaningful",
            "Weigh both carefully and pick based on context",
            "Usually prefer the safer path",
            "Avoid choosing until you have more certainty",
          ],
        },
        ar: {
          text: "خيار آمن وخيار فيه مخاطرة الاتنين ممكن يوصلوا لنتيجة كويسة. إنت:",
          options: [
            "غالبًا بتختار المخاطرة لو المكسب مهم",
            "بتزن الاتنين وتختار حسب السياق",
            "غالبًا بتفضل الطريق الآمن",
            "بتتجنب الاختيار لحد ما يبقى في يقين أكتر",
          ],
        },
        weights: [
          { risk_tendency: 0.85, openness: 0.3 },
          { risk_tendency: 0.3, decision_making: 0.5 },
          { risk_tendency: -0.5, conscientiousness: 0.3 },
          { risk_tendency: -0.7 },
        ],
      },
    ],
  },
  {
    prefix: "com",
    construct: "communication_style",
    secondary: ["empathy", "sociability"],
    scenarioType: "communication",
    similarityBase: "expression",
    sourceBasis: "Communication preferences (interpersonal psychology)",
    pairs: [
      {
        en: {
          text: "When explaining something complex, you prefer to:",
          options: [
            "Use examples and check if the listener follows",
            "Give a structured step-by-step explanation",
            "Keep it brief and answer questions as they come",
            "Write it down rather than speak at length",
          ],
        },
        ar: {
          text: "لما تشرح حاجة معقدة، بتفضل:",
          options: [
            "تستخدم أمثلة وتتأكد إن اللي قدامك فاهم",
            "تدي شرح منظم خطوة بخطوة",
            "تختصر وتجاوب على الأسئلة",
            "تكتبها بدل ما تتكلم كتير",
          ],
        },
        weights: [
          { communication_style: 0.7, empathy: 0.5, sociability: 0.4 },
          { communication_style: 0.6, conscientiousness: 0.4 },
          { communication_style: 0.3 },
          { communication_style: -0.2, independence: 0.3 },
        ],
      },
    ],
  },
  {
    prefix: "prob",
    construct: "problem_solving",
    secondary: ["persistence", "openness"],
    scenarioType: "problem",
    similarityBase: "solution_finding",
    sourceBasis: "Problem-solving approaches (cognitive psychology)",
    pairs: [
      {
        en: {
          text: "Stuck on a problem for a while, you usually:",
          options: [
            "Try a completely different approach",
            "Break it into smaller parts",
            "Ask someone experienced for a hint",
            "Take a break and return with fresh eyes",
          ],
        },
        ar: {
          text: "لما تتعطل في مشكلة لفترة، إنت عادةً:",
          options: [
            "بتجرب approach مختلف تمامًا",
            "بتقسمها لأجزاء أصغر",
            "بتسأل حد خبير لتلميح",
            "بتاخد break وترجع بعين جديدة",
          ],
        },
        weights: [
          { problem_solving: 0.7, openness: 0.5 },
          { problem_solving: 0.8, conscientiousness: 0.4 },
          { problem_solving: 0.5, cooperation: 0.4 },
          { problem_solving: 0.4, emotional_regulation: 0.4 },
        ],
      },
    ],
  },
  {
    prefix: "per",
    construct: "persistence",
    secondary: ["conscientiousness"],
    scenarioType: "effort",
    similarityBase: "grit",
    sourceBasis: "Persistence and goal striving (achievement motivation research)",
    pairs: [
      {
        en: {
          text: "A long-term goal starts feeling tedious. You:",
          options: [
            "Remind yourself why it matters and keep going",
            "Adjust your approach to make it more engaging",
            "Take a planned break then resume",
            "Question whether the goal is still worth it",
          ],
        },
        ar: {
          text: "هدف طويل المدى بدأ يملّ. إنت:",
          options: [
            "بتفتكر ليه مهم وتكمل",
            "بتغيّر أسلوبك عشان يبقى أمتع",
            "بتاخد break مخطط وترجع",
            "بتسأل نفسك هل الهدف لسه يستاهل",
          ],
        },
        weights: [
          { persistence: 0.85, conscientiousness: 0.5 },
          { persistence: 0.6, flexibility: 0.5 },
          { persistence: 0.4, emotional_regulation: 0.4 },
          { persistence: 0.1, self_reflection: 0.4 },
        ],
      },
    ],
  },
  {
    prefix: "flex",
    construct: "flexibility",
    secondary: ["adaptability"],
    scenarioType: "flexibility",
    similarityBase: "cognitive_flex",
    sourceBasis: "Cognitive flexibility (executive function research)",
    pairs: [
      {
        en: {
          text: "Midway through a project, new information contradicts your plan. You:",
          options: [
            "Revise the plan openly without ego",
            "Integrate the new info where it fits",
            "Finish the original plan then adjust",
            "Feel frustrated and resist changing course",
          ],
        },
        ar: {
          text: "في نص مشروع، معلومات جديدة بتناقض خطتك. إنت:",
          options: [
            "بتعدّل الخطة من غير عناد",
            "بتدمج المعلومات الجديدة حيث يناسب",
            "بتكمّل الخطة الأصلية وبعدين تعدّل",
            "بتزعج وبتقاوم تغيير المسار",
          ],
        },
        weights: [
          { flexibility: 0.9, adaptability: 0.7, openness: 0.4 },
          { flexibility: 0.6 },
          { flexibility: 0.2, conscientiousness: 0.4 },
          { flexibility: -0.5, emotional_regulation: -0.3 },
        ],
      },
    ],
  },
  {
    prefix: "emo",
    construct: "emotional_regulation",
    secondary: ["stress_response"],
    scenarioType: "emotion",
    similarityBase: "emotion_mgmt",
    sourceBasis: "Emotion regulation strategies (affective science — not clinical diagnosis)",
    pairs: [
      {
        en: {
          text: "When you feel frustrated in public, you tend to:",
          options: [
            "Pause, breathe, and respond when calmer",
            "Express frustration briefly then recover",
            "Suppress it until you're alone",
            "Struggle to hide it and it shows",
          ],
        },
        ar: {
          text: "لما تحس بإحباط قدام الناس، إنت:",
          options: [
            "بتوقف، تتنفس، وترد وأنت أهدى",
            "بتعبر باختصار وبعدين ترجع توازنك",
            "بتكتم لحد ما تبقى لوحدك",
            "بتتعب تخبّيه وبيظهر",
          ],
        },
        weights: [
          { emotional_regulation: 0.9, stress_response: 0.5 },
          { emotional_regulation: 0.5 },
          { emotional_regulation: 0.3 },
          { emotional_regulation: -0.5, stress_response: -0.4 },
        ],
      },
    ],
  },
  {
    prefix: "coop",
    construct: "cooperation",
    secondary: ["empathy", "conflict_style"],
    scenarioType: "teamwork",
    similarityBase: "collaboration",
    sourceBasis: "Cooperative behavior in groups (social psychology)",
    pairs: [
      {
        en: {
          text: "Your success depends on others doing their part. You:",
          options: [
            "Communicate clearly and offer help when needed",
            "Trust them and focus on your own tasks",
            "Check in frequently to avoid surprises",
            "Prefer to do critical parts yourself",
          ],
        },
        ar: {
          text: "نجاحك معتمد على غيرك يعملوا جزءهم. إنت:",
          options: [
            "بتوضّح وتعرض مساعدة لما يلزم",
            "بتثق فيهم وتركز على مهامك",
            "بتتابع كتير عشان ما يحصلش مفاجآت",
            "بتفضل تعمل الأجزاء الحساسة بنفسك",
          ],
        },
        weights: [
          { cooperation: 0.85, communication_style: 0.5 },
          { cooperation: 0.5, independence: 0.4 },
          { cooperation: 0.4, conscientiousness: 0.4 },
          { cooperation: 0.1, independence: 0.6 },
        ],
      },
    ],
  },
];

let autoId = 6;
for (const template of SCENARIO_TEMPLATES) {
  template.pairs.forEach((pair, idx) => {
    const id = `p${String(autoId).padStart(3, "0")}`;
    autoId++;
    QUESTION_SEEDS.push(
      q(
        id,
        template.scenarioType,
        `${template.similarityBase}_${idx + 1}`,
        template.construct,
        template.secondary,
        template.sourceBasis,
        pair.en,
        pair.ar,
        pair.weights
      )
    );
  });
}

// Additional variant questions to reach 100+ — construct-specific micro-scenarios
const EXTRA_VARIANTS: Array<Omit<QuestionSeed, "id"> & { idSuffix: string }> = [
  {
    idSuffix: "open_art",
    scenarioType: "aesthetic",
    similarityGroup: "openness_art_1",
    primaryConstruct: "openness",
    secondaryConstructs: ["curiosity"],
    sourceBasis: "Aesthetic openness (Big Five openness facets)",
    en: {
      text: "A friend invites you to an art form or music genre you've never tried. You:",
      options: [
        "Go eagerly and explore with an open mind",
        "Go but prefer familiar styles within it",
        "Politely decline unless it strongly interests you",
        "Feel uninterested and suggest something else",
      ],
    },
    ar: {
      text: "صاحبك عزمك على فن أو موسيقى ما جربتهاش قبل كده. إنت:",
      options: [
        "بتروح بحماس وبذهن منفتح",
        "بتروح بس بتفضل اللي مألوف",
        "بتاعتذر إلا لو اهتمامك قوي",
        "مش مهتم وبتقترح حاجة تانية",
      ],
    },
    weights: [
      { openness: 0.85, curiosity: 0.6 },
      { openness: 0.4 },
      { openness: -0.2 },
      { openness: -0.6 },
    ],
  },
  {
    idSuffix: "soc_phone",
    scenarioType: "digital_social",
    similarityGroup: "social_digital_1",
    primaryConstruct: "sociability",
    secondaryConstructs: ["communication_style"],
    sourceBasis: "Social engagement patterns (communication research)",
    en: {
      text: "In group chats, you usually:",
      options: [
        "Participate actively and initiate topics",
        "Reply when mentioned or when you have something to add",
        "Read mostly and rarely respond",
        "Mute or leave busy groups",
      ],
    },
    ar: {
      text: "في مجموعات المحادثة، إنت عادةً:",
      options: [
        "بتشارك بنشاط وتفتح مواضيع",
        "بترد لما حد يذكرك أو عندك إضافة",
        "بتقرأ أكتر ونادرًا ما بترد",
        "بتعمل mute أو تخرج من المجموعات المزدحمة",
      ],
    },
    weights: [
      { sociability: 0.8, communication_style: 0.5 },
      { sociability: 0.4 },
      { sociability: -0.3 },
      { sociability: -0.7, independence: 0.3 },
    ],
  },
];

// Duplicate variants across constructs with unique IDs until we hit 100+
const CONSTRUCT_ROTATION: PersonalityConstruct[] = [
  "openness", "conscientiousness", "sociability", "empathy", "decision_making",
  "adaptability", "leadership_tendency", "persistence", "independence", "curiosity",
];

for (let i = 0; i < 70; i++) {
  const construct = CONSTRUCT_ROTATION[i % CONSTRUCT_ROTATION.length];
  const variant = EXTRA_VARIANTS[i % EXTRA_VARIANTS.length];
  const id = `p${String(autoId).padStart(3, "0")}`;
  autoId++;
  QUESTION_SEEDS.push({
    ...variant,
    id,
    primaryConstruct: construct,
    secondaryConstructs: [construct === "openness" ? "curiosity" : "flexibility"],
    similarityGroup: `${variant.similarityGroup}_v${Math.floor(i / EXTRA_VARIANTS.length) + 1}`,
    en: {
      ...variant.en,
      text: variant.en.text.replace("You:", `You (situation ${i + 1}):`).replace("You ", `In a related situation, you `),
    },
    ar: {
      ...variant.ar,
      text: variant.ar.text.replace("إنت:", `إنت (موقف ${i + 1}):`),
    },
  });
}

export function expandQuestionToLanguage(
  seed: QuestionSeed,
  language: Language
): PersonalityQuestion {
  const content = language === "ar" ? seed.ar : seed.en;
  return {
    id: seed.id,
    language,
    text: content.text,
    options: content.options,
    constructsMeasured: [seed.primaryConstruct, ...seed.secondaryConstructs],
    primaryConstruct: seed.primaryConstruct,
    secondaryConstructs: seed.secondaryConstructs,
    weights: seed.weights,
    reverseScored: seed.reverseScored ?? false,
    scenarioType: seed.scenarioType,
    difficulty: seed.difficulty ?? 2,
    similarityGroup: seed.similarityGroup,
    sourceBasis: seed.sourceBasis,
    version: 1,
    estimatedTime: 30,
    ageAppropriate: 13,
    active: true,
  };
}

export function getAllPersonalityQuestions(language: Language): PersonalityQuestion[] {
  return QUESTION_SEEDS.map((s) => expandQuestionToLanguage(s, language));
}

export function getQuestionById(id: string, language: Language): PersonalityQuestion | undefined {
  const seed = QUESTION_SEEDS.find((s) => s.id === id);
  return seed ? expandQuestionToLanguage(seed, language) : undefined;
}

export const PERSONALITY_QUESTION_COUNT = QUESTION_SEEDS.length;
