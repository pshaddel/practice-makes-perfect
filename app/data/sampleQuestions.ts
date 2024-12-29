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
    tags: ['Grammatik', 'Schreiben'],
    answers: ['sein ist ein Hilfsverb', 'haben ist ein Vollverb']
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
    ],
    answers: ['laufen', 'rennen']
  },
  {
    id: '3',
    text: 'Wie sagt man "Guten Morgen" auf Französisch?',
    type: 'text',
    duration: 30,
    tags: ['Wortschatz', 'Sprechen'],
    answers: ['Bonjour']
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
    ],
    answers: ['berlin']
  },
  {
    id: '5',
    text: 'Was ist die Hauptstadt von Bayern?',
    type: 'text',
    duration: 30,
    tags: availableTags as string[],
    answers: ['München', 'Muenchen']
  },
  {
    id: '6',
    text: 'Wie sagt man "Guten Morgen" auf Französisch?',
    type: 'text',
    duration: 30,
    tags: availableTags,
    answers: ['Bonjour']
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
    ],
    answers: ['berlin']
  },
  {
    id: '8',
    text: 'Wie sagt man "Guten Morgen" auf Französisch?',
    type: 'text',
    duration: 30,
    tags: availableTags,
    answers: ['Bonjour']
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
      { id: 'zürich', text: 'Zürich' },
      { id: 'london', text: 'London' },
      { id: 'münchen', text: 'München' },
      { id: 'hamburg', text: 'Hamburg' },
      { id: 'frankfurt', text: 'Frankfurt' }
    ],
    answers: ['berlin', 'münchen', 'hamburg', 'frankfurt']
  },
  {
    id: '10',
    text: 'Welche Satz ist richtig?',
    type: 'multiple-choice',
    duration: 45,
    tags: availableTags,
    choices: [
      { id: 'ich bin in München', text: 'Ich bin in München' },
      { id: 'ich bin in Berlin', text: 'Ich bin in Berlin' },
      { id: 'ich bin in Hamburg', text: 'Ich bin in Hamburg' },
      { id: 'ich bin in Frankfurt', text: 'Ich bin in Frankfurt am Main' },
      { id: 'ich bin in Köln', text: 'Ich bin in Köln' },
      { id: 'ich bin in Stuttgart', text: 'Ich bin in Stuttgart' },
      { id: 'ich bin in Düsseldorf', text: 'Ich bin in Düsseldorf' },
      { id: 'ich bin in Dortmund', text: 'Ich bin in Dortmund' }
    ],
    answers: ['ich bin in München', 'ich bin in Berlin', 'ich bin in Hamburg', 'ich bin in Frankfurt']
  }
  // Add more sample questions as needed
];