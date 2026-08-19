import type { ParsedIntent } from '../types';
import { getCategory } from './categoryMap';

// ─── Word-to-number map ──────────────────────────────────────────────────────

const WORD_NUMBERS: Record<string, number> = {
  a: 1,
  an: 1,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  dozen: 12,
  'a dozen': 12,
  'half a dozen': 6,
  fifteen: 15,
  twenty: 20,
};

// ─── Units ──────────────────────────────────────────────────────────────────

const UNIT_PATTERNS = [
  'bottles?',
  'cans?',
  'jars?',
  'boxes?',
  'bags?',
  'packs?',
  'packages?',
  'cartons?',
  'gallons?',
  'liters?',
  'litres?',
  'pounds?',
  'lbs?',
  'ounces?',
  'oz',
  'grams?',
  'kg',
  'kilograms?',
  'dozens?',
  'bunches?',
  'heads?',
  'loaves?',
  'slices?',
  'cups?',
  'rolls?',
  'sheets?',
];

const UNIT_REGEX = new RegExp(
  `^(${UNIT_PATTERNS.join('|')})\\s+of\\s+|^(${UNIT_PATTERNS.join('|')})\\s+`,
  'i'
);

// ─── Intent patterns ─────────────────────────────────────────────────────────

const ADD_TRIGGERS =
  /^(add|buy|get|i need|i want|i'll need|put|grab|throw in|pick up|we need|we're out of|get me|can you add|please add|could you add|order)\s+/i;

const REMOVE_TRIGGERS =
  /^(remove|delete|take off|cross off|scratch|cancel|drop|get rid of|i don't need|i no longer need|forget)\s+/i;

const SEARCH_TRIGGERS =
  /^(find|search|search for|look for|show me|show|where is|where can i find|do you have|any)\s+/i;

const CLEAR_TRIGGERS = /^(clear|reset|empty|clear (?:the )?(?:list|cart)|start over)\b/i;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseQuantity(
  text: string
): { quantity: number; rest: string; unit?: string } {
  let remaining = text.trim();
  let quantity = 1;
  let unit: string | undefined;

  // "a dozen" / "half a dozen" special cases
  for (const [phrase, val] of Object.entries(WORD_NUMBERS).sort(
    ([a], [b]) => b.length - a.length
  )) {
    if (remaining.toLowerCase().startsWith(phrase + ' ')) {
      quantity = val;
      remaining = remaining.slice(phrase.length).trim();
      break;
    }
  }

  // Numeric prefix: "2", "3.5"
  const numMatch = remaining.match(/^(\d+\.?\d*)\s*/);
  if (numMatch) {
    quantity = parseFloat(numMatch[1]);
    remaining = remaining.slice(numMatch[0].length).trim();
  }

  // Unit extraction: "bottles of", "cans of", etc.
  const unitMatch = remaining.match(UNIT_REGEX);
  if (unitMatch) {
    unit = unitMatch[0].replace(/\s+of\s+/i, '').replace(/\s+/g, '').trim();
    remaining = remaining.slice(unitMatch[0].length).trim();
  }

  // Strip leading "of " if still present
  remaining = remaining.replace(/^of\s+/i, '').trim();

  return { quantity, rest: remaining, unit };
}

function extractPriceFilter(text: string): { maxPrice?: number; rest: string } {
  // "under $5", "less than $10", "below $3.99", "under 5 dollars"
  const match = text.match(
    /\s+(?:under|less than|below|no more than)\s+\$?(\d+\.?\d*)(?:\s+dollars?)?/i
  );
  if (match) {
    return {
      maxPrice: parseFloat(match[1]),
      rest: text.replace(match[0], '').trim(),
    };
  }
  return { rest: text };
}

function extractFilters(text: string): string[] {
  const keywords = ['organic', 'fresh', 'local', 'gluten-free', 'vegan', 'sugar-free'];
  return keywords.filter((kw) => text.toLowerCase().includes(kw));
}

function cleanItemName(text: string): string {
  // Remove trailing punctuation, filler words
  return text
    .replace(/[.,!?]+$/, '')
    .replace(/\s+(please|thanks|now|today|asap)$/i, '')
    .trim();
}

// ─── Non-item filler words & greetings ───────────────────────────────────────
const GREETINGS_AND_CHATTER = new Set([
  'hi',
  'hello',
  'hey',
  'namaste',
  'good morning',
  'good evening',
  'good afternoon',
  'thanks',
  'thank you',
  'ok',
  'okay',
  'yes',
  'no',
  'test',
  'testing',
  'bye',
  'goodbye',
  'help',
  'who are you',
  'what is this',
]);

// ─── Main parser ─────────────────────────────────────────────────────────────

/**
 * Pure, unit-testable command parser.
 * Input:  raw transcript string from SpeechRecognition
 * Output: structured ParsedIntent object
 */
export function parseCommand(transcript: string): ParsedIntent {
  const raw = transcript.trim();
  const lower = raw.toLowerCase().replace(/[.,!?]+$/, '').trim();

  // ── GREETINGS & CHATTER FILTER ───────────────────────────────────────────
  if (GREETINGS_AND_CHATTER.has(lower)) {
    return { action: 'unknown', transcript: raw };
  }

  // ── CLEAR ────────────────────────────────────────────────────────────────
  if (CLEAR_TRIGGERS.test(raw)) {
    return { action: 'clear' };
  }

  // ── SEARCH ───────────────────────────────────────────────────────────────
  const searchMatch = raw.match(SEARCH_TRIGGERS);
  if (searchMatch) {
    let query = raw.slice(searchMatch[0].length);
    const { maxPrice, rest } = extractPriceFilter(query);
    const filters = extractFilters(rest);
    return {
      action: 'search',
      query: cleanItemName(rest),
      maxPrice,
      filters,
    };
  }

  // ── REMOVE ───────────────────────────────────────────────────────────────
  const removeMatch = raw.match(REMOVE_TRIGGERS);
  if (removeMatch) {
    const item = cleanItemName(raw.slice(removeMatch[0].length));
    const cleaned = item.replace(/\s+(from\s+the\s+(?:list|cart))?$/i, '').trim();
    return { action: 'remove', item: cleaned };
  }

  // ── ADD ──────────────────────────────────────────────────────────────────
  const addMatch = raw.match(ADD_TRIGGERS);
  if (addMatch) {
    const afterTrigger = raw.slice(addMatch[0].length);
    const { quantity, rest, unit } = parseQuantity(afterTrigger);
    const itemName = cleanItemName(rest);
    if (!itemName || GREETINGS_AND_CHATTER.has(itemName.toLowerCase())) {
      return { action: 'unknown', transcript: raw };
    }
    return {
      action: 'add',
      item: itemName,
      quantity,
      unit,
      category: getCategory(itemName),
    };
  }

  // ── Implicit ADD heuristic (no trigger word) ─────────────────────────────
  // ONLY add implicit items ("milk", "2 apples", "headphones") IF they match a known store category or catalog item!
  // Prevents random background speech, non-English filler words, or chatter (e.g. "Athuku", "Oh okay", "Hi") from being added.
  const { quantity, rest, unit } = parseQuantity(raw);
  const itemName = cleanItemName(rest);
  const category = getCategory(itemName);

  if (
    itemName &&
    itemName.split(' ').length <= 4 &&
    !raw.includes('?') &&
    !GREETINGS_AND_CHATTER.has(itemName.toLowerCase()) &&
    itemName.length > 1 &&
    category !== 'other' // Must belong to a recognized store category!
  ) {
    return {
      action: 'add',
      item: itemName,
      quantity,
      unit,
      category,
    };
  }

  return { action: 'unknown', transcript: raw };
}
