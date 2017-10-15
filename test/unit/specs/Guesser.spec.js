import Vue from 'vue';
import Guesser from '@/components/Guesser';

describe('Guesser.vue', () => {
  const Constructor = Vue.extend(Guesser);
  it('should render correct contents', () => {
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.message').textContent).to.equal('Welcome to number guesser');
  });

  it('has correct default state', () => {
    const vm = new Constructor().$mount();
    expect(vm.msg).to.equal('Welcome to number guesser');
    expect(vm.userGuess).to.equal('');
    expect(vm.min).to.equal(0);
    expect(vm.max).to.equal(100);
    expect(vm.lastGuess).to.equal(0);
    expect(vm.level).to.equal(1);
  });
});
