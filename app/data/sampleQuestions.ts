import { Question } from "../types/quiz";

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
];

export const questions: Question[] = [
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
  {
    id: '3',
    text: 'Wie sagt man "Guten Morgen" auf Französisch?',
    type: 'text',
    duration: 30,
    tags: ['Wortschatz', 'Sprechen']
  },
  {
    id: '4',
    text: 'Welche dieser Städte liegt in Deutschland?',
    type: 'multiple-choice',
    duration: 45,
    tags: ['Geographie', 'Lesen'],
    choices: [
      { id: 'berlin', text: 'Berlin' },
      { id: 'paris', text: 'Paris' },
      { id: 'wien', text: 'Wien' },
      { id: 'zürich', text: 'Zürich' }
    ]
  },
  {
    id: '5',
    text: 'Was ist die Hauptstadt von Bayern?',
    type: 'text',
    duration: 30,
    tags: availableTags as string[]
  },
  {
    id: '6',
    text: 'Wie sagt man "Guten Morgen" auf Französisch?',
    type: 'text',
    duration: 30,
    tags: availableTags
  },
  {
    id: '7',
    text: 'Welche dieser Städte liegt in Deutschland?',
    type: 'multiple-choice',
    duration: 45,
    tags: ['Geographie', 'Lesen'],
    choices: [
      { id: 'berlin', text: 'Berlin' },
      { id: 'paris', text: 'Paris' },
      { id: 'wien', text: 'Wien' },
      { id: 'zürich', text: 'Zürich' }
    ]
  },
  {
    id: '8',
    text: 'Wie sagt man "Guten Morgen" auf Französisch?',
    type: 'text',
    duration: 30,
    tags: availableTags
  },
  {
    id: '9',
    text: 'Welche dieser Städte liegt in Deutschland?',
    type: 'multiple-choice',
    duration: 45,
    tags: availableTags,
    choices: [
      { id: 'berlin', text: 'Berlin' },
      { id: 'paris', text: 'Paris' },
      { id: 'wien', text: 'Wien' },
      { id: 'zürich', text: 'Zürich' }
    ]
  },
  // Add more sample questions as needed
];