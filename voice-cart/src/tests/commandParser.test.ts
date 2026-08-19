import { describe, it, expect } from 'vitest';
import { parseCommand } from '../lib/commandParser';

describe('parseCommand — intent parser unit tests', () => {
  // ── ADD intents ─────────────────────────────────────────────────────────────

  it('should parse simple add command', () => {
    const result = parseCommand('add milk');
    expect(result.action).toBe('add');
    if (result.action === 'add') {
      expect(result.item).toBe('milk');
      expect(result.quantity).toBe(1);
      expect(result.category).toBe('dairy');
    }
  });

  it('should parse "I need" phrasing', () => {
    const result = parseCommand('I need apples');
    expect(result.action).toBe('add');
    if (result.action === 'add') {
      expect(result.item).toBe('apples');
      expect(result.category).toBe('produce');
    }
  });

  it('should parse numeric quantity with unit', () => {
    const result = parseCommand('buy 2 bottles of water');
    expect(result.action).toBe('add');
    if (result.action === 'add') {
      expect(result.quantity).toBe(2);
      expect(result.unit).toMatch(/bottles?/i);
      expect(result.item).toBe('water');
      expect(result.category).toBe('beverages');
    }
  });

  it('should parse word-number quantity', () => {
    const result = parseCommand('get three cartons of oat milk');
    expect(result.action).toBe('add');
    if (result.action === 'add') {
      expect(result.quantity).toBe(3);
      expect(result.item).toContain('oat milk');
    }
  });

  it('should parse "a dozen" quantity', () => {
    const result = parseCommand('add a dozen eggs');
    expect(result.action).toBe('add');
    if (result.action === 'add') {
      expect(result.quantity).toBe(12);
      expect(result.item).toBe('eggs');
      expect(result.category).toBe('dairy');
    }
  });

  it('should handle implicit add (no trigger word)', () => {
    const result = parseCommand('bananas');
    expect(result.action).toBe('add');
    if (result.action === 'add') {
      expect(result.item).toBe('bananas');
      expect(result.category).toBe('produce');
    }
  });

  // ── REMOVE intents ──────────────────────────────────────────────────────────

  it('should parse simple remove command', () => {
    const result = parseCommand('remove milk');
    expect(result.action).toBe('remove');
    if (result.action === 'remove') {
      expect(result.item).toBe('milk');
    }
  });

  it('should parse "take off" phrasing', () => {
    const result = parseCommand('take off bread from the list');
    expect(result.action).toBe('remove');
    if (result.action === 'remove') {
      expect(result.item).toContain('bread');
    }
  });

  // ── SEARCH intents ──────────────────────────────────────────────────────────

  it('should parse search with price filter', () => {
    const result = parseCommand('find organic avocados under $5');
    expect(result.action).toBe('search');
    if (result.action === 'search') {
      expect(result.query).toContain('avocados');
      expect(result.maxPrice).toBe(5);
      expect(result.filters).toContain('organic');
    }
  });

  // ── UNKNOWN intents ─────────────────────────────────────────────────────────

  it('should return unknown for unrecognized long sentences', () => {
    const result = parseCommand('what is the weather like today?');
    expect(result.action).toBe('unknown');
  });

  // ── CLEAR intent ────────────────────────────────────────────────────────────

  it('should parse clear command', () => {
    const result = parseCommand('clear the list');
    expect(result.action).toBe('clear');
  });
});
