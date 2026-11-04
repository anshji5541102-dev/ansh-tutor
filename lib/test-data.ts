export interface QuestionItem {
  id: number;
  subject: string;
  questionNumber: number;
  text: string;
  options: {
    key: string;
    text: string;
  }[];
  correctOptionKey: string;
  explanation: {
    steps: string[];
    concept: string;
    conclusion: string;
  };
  positiveMarks?: number;
  negativeMarks?: number;
}

export const defaultQuestions: QuestionItem[] = [
  {
    id: 1,
    subject: "Maths",
    questionNumber: 1,
    text: "Let R be a relation on the set N of natural numbers defined by n R m if n divides m. Then R is:",
    options: [
      { key: "1", text: "Reflexive and symmetric" },
      { key: "2", text: "Transitive and symmetric" },
      { key: "3", text: "Equivalence" },
      { key: "4", text: "Reflexive, transitive but not symmetric" },
    ],
    correctOptionKey: "4",
    explanation: {
      steps: [
        "1. Reflexivity: For every n ∈ N, n divides n since n = n · 1. Thus, (n, n) ∈ R for all n ∈ N. Hence, R is reflexive.",
        "2. Symmetry: If n divides m, m may not divide n. For example, 2 divides 4, so (2, 4) ∈ R. But 4 does not divide 2, so (4, 2) ∉ R. Thus, R is NOT symmetric.",
        "3. Transitivity: If n divides m (m = k₁n) and m divides p (p = k₂m), then p = k₂(k₁n) = (k₁k₂)n. Since k₁k₂ ∈ N, n divides p. Thus, (n, p) ∈ R. Hence, R is transitive.",
      ],
      concept: "Relations on Natural Numbers: Divisibility satisfies reflexivity and transitivity but violates symmetry.",
      conclusion: "Therefore, R is reflexive, transitive but not symmetric (Option 4).",
    },
  },
  {
    id: 2,
    subject: "Maths",
    questionNumber: 2,
    text: "If f: R → R is defined by f(x) = 3x - 4, then f⁻¹(x) is given by:",
    options: [
      { key: "1", text: "(x + 4) / 3" },
      { key: "2", text: "(x - 4) / 3" },
      { key: "3", text: "3x + 4" },
      { key: "4", text: "None of these" },
    ],
    correctOptionKey: "1",
    explanation: {
      steps: [
        "Let y = f(x) = 3x - 4.",
        "Express x in terms of y: y + 4 = 3x  ⇒  x = (y + 4) / 3.",
        "Since f is a linear bijection from R to R, its inverse exists and is given by f⁻¹(y) = (y + 4) / 3.",
        "Replacing the variable y with x gives f⁻¹(x) = (x + 4) / 3.",
      ],
      concept: "Inverse of a bijective function y = mx + c is x = (y - c) / m.",
      conclusion: "Hence, f⁻¹(x) = (x + 4) / 3 (Option 1).",
    },
  },
  {
    id: 3,
    subject: "Maths",
    questionNumber: 3,
    text: "The domain of the function f(x) = √(4 - x²) is:",
    options: [
      { key: "1", text: "(-2, 2)" },
      { key: "2", text: "[-2, 2]" },
      { key: "3", text: "[0, 2]" },
      { key: "4", text: "(-∞, -2] ∪ [2, ∞)" },
    ],
    correctOptionKey: "2",
    explanation: {
      steps: [
        "For f(x) = √(4 - x²) to be defined in real numbers, the expression under the square root must be non-negative.",
        "4 - x² ≥ 0  ⇒  x² ≤ 4.",
        "Taking square roots on both sides gives -2 ≤ x ≤ 2.",
        "In interval notation, x ∈ [-2, 2].",
      ],
      concept: "Domain of real square root functions requires the radicand ≥ 0.",
      conclusion: "Thus, Domain = [-2, 2] (Option 2).",
    },
  },
  {
    id: 4,
    subject: "Maths",
    questionNumber: 4,
    text: "A relation R on set A = {1, 2, 3} given by R = {(1, 1), (2, 2), (1, 2), (2, 1)} is:",
    options: [
      { key: "1", text: "Reflexive" },
      { key: "2", text: "Symmetric" },
      { key: "3", text: "Transitive" },
      { key: "4", text: "Equivalence relation" },
    ],
    correctOptionKey: "2",
    explanation: {
      steps: [
        "Check reflexivity: (3, 3) ∉ R, so R is NOT reflexive on set A.",
        "Check symmetry: (1, 2) ∈ R and (2, 1) ∈ R; (1, 1) ∈ R and (2, 2) ∈ R. For every (a, b) ∈ R, (b, a) ∈ R. Hence, R is symmetric.",
        "Check transitivity: (1, 2) ∈ R and (2, 1) ∈ R, but (1, 1) ∈ R. However, because (3, 3) is missing, it is not an equivalence relation.",
      ],
      concept: "A relation is symmetric if (a, b) ∈ R ⇒ (b, a) ∈ R for all pairs.",
      conclusion: "Therefore, R is symmetric (Option 2).",
    },
  },
  {
    id: 5,
    subject: "Maths",
    questionNumber: 5,
    text: "Let f: A → B and g: B → C be bijective functions, then (g ∘ f)⁻¹ is equal to:",
    options: [
      { key: "1", text: "f⁻¹ ∘ g⁻¹" },
      { key: "2", text: "g⁻¹ ∘ f⁻¹" },
      { key: "3", text: "f ∘ g" },
      { key: "4", text: "g ∘ f" },
    ],
    correctOptionKey: "1",
    explanation: {
      steps: [
        "By the standard reversal law of composition of invertible functions:",
        "(g ∘ f)⁻¹ ∘ (g ∘ f) = I_A.",
        "(f⁻¹ ∘ g⁻¹) ∘ (g ∘ f) = f⁻¹ ∘ (g⁻¹ ∘ g) ∘ f = f⁻¹ ∘ I_B ∘ f = f⁻¹ ∘ f = I_A.",
        "Since the inverse is unique, (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹.",
      ],
      concept: "Reversal Law for Function Composition Inverses: (g ∘ f)⁻¹ = f⁻¹ ∘ g⁻¹.",
      conclusion: "Hence, the correct answer is Option 1.",
    },
  },
];

// Add questions 6 to 25
const extraQuestions = [
  {
    id: 6,
    text: "The number of non-empty relations on a set containing 3 elements is:",
    options: [
      { key: "1", text: "2⁹" },
      { key: "2", text: "2⁹ - 1" },
      { key: "3", text: "9" },
      { key: "4", text: "2³" },
    ],
    correctOptionKey: "2",
    concept: "Total relations on set A with n elements is 2^(n²). Non-empty relations = 2^(n²) - 1.",
  },
  {
    id: 7,
    text: "If A = {a, b, c}, then the number of equivalence relations containing (a, b) is:",
    options: [
      { key: "1", text: "1" },
      { key: "2", text: "2" },
      { key: "3", text: "3" },
      { key: "4", text: "4" },
    ],
    correctOptionKey: "2",
    concept: "Equivalence relations containing (a, b) on a 3-element set are exactly 2.",
  },
  {
    id: 8,
    text: "If set A has 4 elements and set B has 5 elements, then the number of injective mappings from A to B is:",
    options: [
      { key: "1", text: "120" },
      { key: "2", text: "60" },
      { key: "3", text: "24" },
      { key: "4", text: "5⁴" },
    ],
    correctOptionKey: "1",
    concept: "Number of one-to-one (injective) functions from set of size m to size n (n ≥ m) is ⁿPₘ = 5! / (5-4)! = 120.",
  },
];

extraQuestions.forEach((q) => {
  defaultQuestions.push({
    id: q.id,
    subject: "Maths",
    questionNumber: q.id,
    text: q.text,
    options: q.options,
    correctOptionKey: q.correctOptionKey,
    explanation: {
      steps: [
        `Step 1: Identify the standard combinatorial / algebraic definition.`,
        `Step 2: Apply the formula directly for n = 3 or sets A and B.`,
        `Step 3: Evaluate the numerical value.`,
      ],
      concept: q.concept,
      conclusion: `Therefore, Option ${q.correctOptionKey} is correct.`,
    },
  });
});

for (let i = 9; i <= 25; i++) {
  const opt = String(((i % 4) + 1));
  defaultQuestions.push({
    id: i,
    subject: "Maths",
    questionNumber: i,
    text: `Question ${i}: Determine the nature of relation R on set of integers Z such that a R b ⇔ a - b is divisible by ${i % 3 === 0 ? "3" : "5"}.`,
    options: [
      { key: "1", text: "Reflexive only" },
      { key: "2", text: "Symmetric only" },
      { key: "3", text: "Transitive only" },
      { key: "4", text: "Equivalence relation" },
    ],
    correctOptionKey: "4",
    explanation: {
      steps: [
        "1. Reflexive: a - a = 0 is divisible by the modulus.",
        "2. Symmetric: If a - b is divisible, then b - a = -(a - b) is also divisible.",
        "3. Transitive: (a - b) + (b - c) = a - c is a sum of multiples, hence also divisible.",
      ],
      concept: "Congruence modulo n is always an Equivalence relation.",
      conclusion: "Since all 3 properties hold, it is an Equivalence relation (Option 4).",
    },
  });
}
