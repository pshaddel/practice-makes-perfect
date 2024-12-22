export const availableTags = [
  'Grammatik',
  'Wortschatz',
  'Hören',
  'Lesen',
  'Schreiben',
  'Sprechen',
  'Aussprache',
  'Redewendungen',
  'Kultur',
  'Literatur',
  'Geschichte',
  'Geographie',
  'Alltag',
  'Reisen',
  'Beruf',
  'Bildung',
] as const;

export const questions = [
  {
    id: '1',
    text: 'Was ist der Unterschied zwischen "sein" und "haben" im Perfekt?',
    type: 'text',
    duration: 120,
    tags: ['Grammatik', 'Schreiben']
  },
  {
    id: '2',
    text: 'Welche dieser Wörter sind Synonyme für "gehen"?',
    type: 'multiple-choice',
    duration: 60,
    tags: ['Wortschatz', 'Lesen'],
    choices: [
      { id: 'laufen', text: 'laufen' },
      { id: 'fahren', text: 'fahren' },
      { id: 'rennen', text: 'rennen' },
      { id: 'fliegen', text: 'fliegen' }
    ]
  },
  // Add more sample questions as needed
];