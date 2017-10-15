import Vue from 'vue';
import { assert } from 'chai';
import Guesser from '@/components/Guesser';

describe('Guesser.vue initial setup', () => {
  const Constructor = Vue.extend(Guesser);
  it('has correct default state', () => {
    const vm = new Constructor().$mount();
    expect(vm.msg).to.equal('Welcome to number guesser');
    expect(vm.userGuess).to.equal('');
    expect(vm.min).to.equal(0);
    expect(vm.max).to.equal(100);
    expect(vm.lastGuess).to.equal(0);
    expect(vm.level).to.equal(1);
    assert.isAtLeast(vm.rando, 0);
    assert.isAtMost(vm.rando, 100);
  });

  it('has a clear button that is disabled by default', () => {
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('#clearButton').disabled).to.equal(true);
  });

  it('has a reset button that is disabled by default', () => {
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('#resetButton').disabled).to.equal(true);
  });

  it('has a submit button that is disabled by default', () => {
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('#submitButton').disabled).to.equal(true);
  });

  it('has a min input that is defaulted to 0', () => {
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('#minInput').value).to.equal('0');
  });

  it('has a max input that is defaulted to 100', () => {
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('#maxInput').value).to.equal('100');
  });
});
