import type { CognitiveQuestion, Language } from "@/lib/types";

interface CognitiveSeed {
  id: string;
  category: "mathematical" | "logic" | "situational";
  difficulty: number;
  correctIndex: number;
  en: { text: string; options: string[]; explanation: string };
  ar: { text: string; options: string[]; explanation: string };
}

const SEEDS: CognitiveSeed[] = [
  // Mathematical (10)
  { id: "c001", category: "mathematical", difficulty: 1, correctIndex: 1, en: { text: "What is 15% of 200?", options: ["20", "30", "25", "35"], explanation: "15% of 200 = 0.15 × 200 = 30" }, ar: { text: "ما هو 15% من 200؟", options: ["20", "30", "25", "35"], explanation: "15% من 200 = 30" } },
  { id: "c002", category: "mathematical", difficulty: 1, correctIndex: 2, en: { text: "What is 7 × 8?", options: ["54", "55", "56", "58"], explanation: "7 × 8 = 56" }, ar: { text: "ما هو 7 × 8؟", options: ["54", "55", "56", "58"], explanation: "7 × 8 = 56" } },
  { id: "c003", category: "mathematical", difficulty: 2, correctIndex: 0, en: { text: "Find the missing number: 3, 9, 27, ?, 243", options: ["81", "72", "54", "90"], explanation: "Each term ×3: 27×3=81" }, ar: { text: "الرقم المفقود: 3، 9، 27، ؟، 243", options: ["81", "72", "54", "90"], explanation: "كل رقم ×3" } },
  { id: "c004", category: "mathematical", difficulty: 2, correctIndex: 1, en: { text: "Which fraction is largest?", options: ["1/3", "3/7", "2/5", "4/9"], explanation: "3/7 ≈ 0.43 is largest" }, ar: { text: "أي كسر الأكبر؟", options: ["1/3", "3/7", "2/5", "4/9"], explanation: "3/7 هو الأكبر" } },
  { id: "c005", category: "mathematical", difficulty: 2, correctIndex: 2, en: { text: "If you divide 100 by 0.5 you get:", options: ["50", "100", "200", "150"], explanation: "100 ÷ 0.5 = 200" }, ar: { text: "100 ÷ 0.5 =", options: ["50", "100", "200", "150"], explanation: "100 ÷ 0.5 = 200" } },
  { id: "c006", category: "mathematical", difficulty: 2, correctIndex: 0, en: { text: "What is the next even number after 998?", options: ["1000", "999", "1002", "998"], explanation: "998 + 2 = 1000" }, ar: { text: "العدد الزوجي التالي بعد 998؟", options: ["1000", "999", "1002", "998"], explanation: "1000" } },
  { id: "c007", category: "mathematical", difficulty: 3, correctIndex: 1, en: { text: "If A=1, B=2, C=3, what is CAB?", options: ["312", "321", "6", "123"], explanation: "C(3)+A(1)+B(2)=321 as digits or sum=6; digit concat 321" }, ar: { text: "A=1,B=2,C=3 — قيمة CAB؟", options: ["312", "321", "6", "123"], explanation: "321" } },
  { id: "c008", category: "mathematical", difficulty: 2, correctIndex: 3, en: { text: "Area of rectangle 4×6?", options: ["20", "22", "26", "24"], explanation: "4×6=24" }, ar: { text: "مساحة مستطيل 4×6؟", options: ["20", "22", "26", "24"], explanation: "24" } },
  { id: "c009", category: "mathematical", difficulty: 3, correctIndex: 0, en: { text: "Which number is prime?", options: ["29", "21", "27", "33"], explanation: "29 has no divisors except 1 and itself" }, ar: { text: "أي عدد أولي؟", options: ["29", "21", "27", "33"], explanation: "29" } },
  { id: "c010", category: "mathematical", difficulty: 3, correctIndex: 2, en: { text: "5 machines make 5 items in 5 min. 100 machines make 100 items in?", options: ["100 min", "20 min", "5 min", "1 min"], explanation: "Each machine makes 1 item in 5 min" }, ar: { text: "5 ماكينات = 5 قطع في 5 دق. 100 ماكينة = 100 قطعة في؟", options: ["100 د", "20 د", "5 د", "1 د"], explanation: "5 دقائق" } },
  // Logic (10)
  { id: "c011", category: "logic", difficulty: 1, correctIndex: 2, en: { text: "Next in sequence: 2, 4, 6, 8, ?", options: ["9", "11", "10", "12"], explanation: "+2 each time → 10" }, ar: { text: "التسلسل: 2، 4، 6، 8، ؟", options: ["9", "11", "10", "12"], explanation: "10" } },
  { id: "c012", category: "logic", difficulty: 2, correctIndex: 2, en: { text: "Which does NOT belong: Dog, Cat, Car, Horse?", options: ["Dog", "Cat", "Car", "Horse"], explanation: "Car is not an animal" }, ar: { text: "أي كلمة لا تنتمي: كلب، قط، سيارة، حصان؟", options: ["كلب", "قط", "سيارة", "حصان"], explanation: "سيارة" } },
  { id: "c013", category: "logic", difficulty: 2, correctIndex: 0, en: { text: "All Bloops are Razzies. All Razzies are Lazzies. Are all Bloops Lazzies?", options: ["Yes", "No", "Sometimes", "Cannot determine"], explanation: "Transitive: Bloops → Razzies → Lazzies" }, ar: { text: "كل Bloops هي Razzies وكل Razzies هي Lazzies. هل كل Bloops هي Lazzies؟", options: ["نعم", "لا", "أحيانًا", "لا يمكن الجزم"], explanation: "نعم" } },
  { id: "c014", category: "logic", difficulty: 2, correctIndex: 3, en: { text: "Odd one out: 9, 16, 25, 36, 45", options: ["9", "16", "25", "45"], explanation: "45 is not a perfect square" }, ar: { text: "المختلف: 9، 16، 25، 36، 45", options: ["9", "16", "25", "45"], explanation: "45" } },
  { id: "c015", category: "logic", difficulty: 2, correctIndex: 1, en: { text: "Rearrange LISTEN to get:", options: ["SILENT", "ENLIST", "TINSEL", "INLETS"], explanation: "LISTEN → SILENT (anagram)" }, ar: { text: "LISTEN →", options: ["SILENT", "ENLIST", "TINSEL", "INLETS"], explanation: "SILENT" } },
  { id: "c016", category: "logic", difficulty: 1, correctIndex: 0, en: { text: "Pattern: ▲, ▼, ▲, ▼, ?", options: ["▲", "▼", "◆", "●"], explanation: "Alternating pattern" }, ar: { text: "▲، ▼، ▲، ▼، ؟", options: ["▲", "▼", "◆", "●"], explanation: "▲" } },
  { id: "c017", category: "logic", difficulty: 2, correctIndex: 2, en: { text: "Fibonacci next: 1,1,2,3,5,8,?", options: ["11", "12", "13", "14"], explanation: "5+8=13" }, ar: { text: "1،1،2،3،5،8،؟", options: ["11", "12", "13", "14"], explanation: "13" } },
  { id: "c018", category: "logic", difficulty: 2, correctIndex: 1, en: { text: "John > Ali > Sara. Youngest?", options: ["John", "Sara", "Ali", "Same age"], explanation: "Sara is youngest" }, ar: { text: "جون > علي > سارة. الأصغر؟", options: ["جون", "سارة", "علي", "نفس العمر"], explanation: "سارة" } },
  { id: "c019", category: "logic", difficulty: 3, correctIndex: 0, en: { text: "Most similar pair: Hot–Cold, Tall–High, Fast–Quick, Old–Young", options: ["Fast–Quick", "Hot–Cold", "Tall–High", "Old–Young"], explanation: "Synonyms: Fast–Quick" }, ar: { text: "أكثر زوج تشابهًا؟", options: ["Fast–Quick", "Hot–Cold", "Tall–High", "Old–Young"], explanation: "Fast–Quick" } },
  { id: "c020", category: "logic", difficulty: 3, correctIndex: 2, en: { text: "Which shape has most sides?", options: ["Pentagon", "Hexagon", "Octagon", "Square"], explanation: "Octagon has 8 sides" }, ar: { text: "أي شكل له أكثر أضلاع؟", options: ["خماسي", "سداسي", "ثماني", "مربع"], explanation: "ثماني" } },
  // Situational (10)
  { id: "c021", category: "situational", difficulty: 2, correctIndex: 1, en: { text: "You have 3 boxes: one has gold. Box A says 'gold here'. Box B says 'not in A'. Box C says 'in B'. Only one truth. Where is gold?", options: ["A", "C", "B", "Cannot know"], explanation: "Classic logic: gold in C if only B true" }, ar: { text: "3 صناديق — واحد فيه ذهب. أين؟ (منطق: B وحده صادق)", options: ["A", "C", "B", "لا نعرف"], explanation: "C" } },
  { id: "c022", category: "situational", difficulty: 2, correctIndex: 0, en: { text: "Train leaves at 3:00, you need 25 min travel + 10 min buffer. Latest leave?", options: ["2:25", "2:30", "2:35", "2:40"], explanation: "3:00 - 35 min = 2:25" }, ar: { text: "قطار 3:00 — سفر 25 د + 10 د. آخر موعد خروج؟", options: ["2:25", "2:30", "2:35", "2:40"], explanation: "2:25" } },
  { id: "c023", category: "situational", difficulty: 2, correctIndex: 2, en: { text: "If yesterday was two days after Monday, today is?", options: ["Wednesday", "Thursday", "Friday", "Saturday"], explanation: "Yesterday=Wed, today=Thu... recalc: Mon+2=Wed yesterday → today Thu. Fix: Mon+2 days = Wed as 'two days after Monday' = Wed. Yesterday Wed → today Thu. Answer index 1", options: ["Wednesday", "Thursday", "Friday", "Saturday"] }, ar: { text: "أمس كان بعد يومين من الإثنين. اليوم؟", options: ["أربعاء", "خميس", "جمعة", "سبت"], explanation: "خميس" } },
  { id: "c024", category: "situational", difficulty: 1, correctIndex: 1, en: { text: "Which is lightest?", options: ["Brick", "Feather", "Book", "Shoe"], explanation: "Feather" }, ar: { text: "أيها الأخف؟", options: ["طوب", "ريشة", "كتاب", "حذاء"], explanation: "ريشة" } },
  { id: "c025", category: "situational", difficulty: 2, correctIndex: 0, en: { text: "Team of 4 completes work in 8 days. How long for 8 people (same rate)?", options: ["4 days", "8 days", "16 days", "2 days"], explanation: "Double workers → half time" }, ar: { text: "4 أشخاص ينهون عمل في 8 أيام. 8 أشخاص؟", options: ["4 أيام", "8", "16", "2"], explanation: "4 أيام" } },
  { id: "c026", category: "situational", difficulty: 2, correctIndex: 3, en: { text: "Largest angle in a triangle?", options: ["Always 90°", "Always 60°", "Always equal", "Can exceed 90°"], explanation: "Obtuse triangles exist" }, ar: { text: "أكبر زاوية في مثلث؟", options: ["دائمًا 90", "دائمًا 60", "متساوية", "قد تتجاوز 90"], explanation: "قد تتجاوز 90" } },
  { id: "c027", category: "situational", difficulty: 3, correctIndex: 1, en: { text: "You flip a fair coin 3 times. P(exactly 2 heads)?", options: ["1/8", "3/8", "1/2", "5/8"], explanation: "C(3,2)/8 = 3/8" }, ar: { text: "3 رميات — احتمال وجهين بالضبط؟", options: ["1/8", "3/8", "1/2", "5/8"], explanation: "3/8" } },
  { id: "c028", category: "situational", difficulty: 2, correctIndex: 2, en: { text: "Road A: 60km at 60km/h. Road B: 30km at 30km/h. Total time?", options: ["1h", "1.5h", "2h", "2.5h"], explanation: "Each takes 1h → 2h total" }, ar: { text: "60كم ب60 + 30كم ب30. الوقت الكلي؟", options: ["1س", "1.5س", "2س", "2.5س"], explanation: "2 ساعات" } },
  { id: "c029", category: "situational", difficulty: 2, correctIndex: 0, en: { text: "If all managers are employees, and some employees are remote, which MUST be true?", options: ["Some managers may be remote", "All remote are managers", "No managers are remote", "All employees are managers"], explanation: "Managers ⊆ employees; remote subset possible" }, ar: { text: "كل مدير موظف. بعض الموظفين عن بُعد. أيها MUST؟", options: ["بعض المديرين قد يكونوا عن بُعد", "كل عن بُعد مدير", "لا مدير عن بُعد", "كل موظف مدير"], explanation: "الأول" } },
  { id: "c030", category: "situational", difficulty: 3, correctIndex: 1, en: { text: "Water fills tank: 1/3 in 6 min. Full tank time?", options: ["12 min", "18 min", "24 min", "9 min"], explanation: "6 min per third × 3 = 18" }, ar: { text: "1/3 الخزان في 6 د. امتلاء كامل؟", options: ["12", "18", "24", "9"], explanation: "18 دقيقة" } },
];

// Fix c023 correct index
SEEDS.find((s) => s.id === "c023")!.correctIndex = 1;

export function expandCognitive(seed: CognitiveSeed, language: Language): CognitiveQuestion {
  const c = language === "ar" ? seed.ar : seed.en;
  return {
    id: seed.id,
    language,
    text: c.text,
    options: c.options,
    correctIndex: seed.correctIndex,
    explanation: c.explanation,
    category: seed.category,
    difficulty: seed.difficulty,
  };
}

export function getAllCognitiveQuestions(language: Language): CognitiveQuestion[] {
  return SEEDS.map((s) => expandCognitive(s, language));
}

export function selectCognitiveTestQuestions(language: Language, count = 30): CognitiveQuestion[] {
  const all = getAllCognitiveQuestions(language);
  const byCat = {
    mathematical: all.filter((q) => q.category === "mathematical"),
    logic: all.filter((q) => q.category === "logic"),
    situational: all.filter((q) => q.category === "situational"),
  };
  const perCat = Math.floor(count / 3);
  const selected = [
    ...shuffle(byCat.mathematical).slice(0, perCat),
    ...shuffle(byCat.logic).slice(0, perCat),
    ...shuffle(byCat.situational).slice(0, count - perCat * 2),
  ];
  return shuffle(selected);
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function shuffleOptions(question: CognitiveQuestion): CognitiveQuestion {
  const indices = question.options.map((_, i) => i);
  const shuffled = shuffle(indices);
  const newOptions = shuffled.map((i) => question.options[i]);
  const newCorrect = shuffled.indexOf(question.correctIndex);
  return { ...question, options: newOptions, correctIndex: newCorrect };
}

export function scoreCognitiveAnswers(
  questions: CognitiveQuestion[],
  answers: Record<string, number>
): { score: number; categoryScores: Record<string, number> } {
  let correct = 0;
  const catCorrect: Record<string, number> = { mathematical: 0, logic: 0, situational: 0 };
  const catTotal: Record<string, number> = { mathematical: 0, logic: 0, situational: 0 };

  for (const q of questions) {
    catTotal[q.category]++;
    if (answers[q.id] === q.correctIndex) {
      correct++;
      catCorrect[q.category]++;
    }
  }

  const categoryScores: Record<string, number> = {};
  for (const cat of Object.keys(catTotal)) {
    categoryScores[cat] = catTotal[cat] ? Math.round((catCorrect[cat] / catTotal[cat]) * 100) : 0;
  }

  return {
    score: Math.round((correct / questions.length) * 100),
    categoryScores,
  };
}
