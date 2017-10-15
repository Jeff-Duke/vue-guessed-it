import Vue from 'vue';
import Guesser from '@/components/Guesser';

describe('Guesser', () => {
  it('has a created hook', () => {
    expect(typeof Guesser.created).toBe('function');
  });

  it('has the correct default state', () => {
    expect(typeof Guesser.data).toBe('function');
    const defaultState = Guesser.Data();
    expect(defaultState.level).toBe(1);
  });
});
