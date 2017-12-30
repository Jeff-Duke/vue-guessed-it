<template>
  <section class="guesser-container">
    <h1 class="message">{{ msg }}</h1>
    <h3>Enter a guess between {{min}} and {{max}}</h3>
    <article class="inputs-buttons">
      <input :min="min" :max="max" type="number" v-on:keyup.enter="submitGuess" class="guess-input" placeholder="enter your guess" v-model="userGuess" />
      <button id="submitButton" v-on:click="submitGuess" :disabled="!userGuess">Submit</button>
      <button id="clearButton" v-on:click="clearInput" :disabled="!userGuess">clear</button>
      <button id="resetButton" v-on:click="resetGame" :disabled="level <= 1">reset</button>
    </article>
    <label for="minInput">Min</label>
    <input id="minInput" type="number" v-model="min" v-on:blur="getNewRandom" />
    <label for="maxInput">Max</label>
    <input id="maxInput" type="number" v-model="max" v-on:blur="getNewRandom" />
    <h3 v-if="guessResult">{{ guessResult }}</h3>
    <h3 v-if="lastGuess">your last guess was: {{lastGuess}} </h3>
    <h4>{{userGuess}}</h4>
  </section>
</template>

<script>
export default {
  name: 'Guesser',
  data() {
    return {
      msg: 'Welcome to number guesser',
      userGuess: '',
      guessResult: '',
      min: 0,
      max: 100,
      rando: 0,
      lastGuess: 0,
      level: 1,
    };
  },
  computed: {
    isResetDisabled() {
      return this.$data.level === 1;
    },
  },
  mounted: function getRandomOnMount() {
    this.getNewRandom();
  },
  methods: {
    submitGuess: function submitGuess() {
      this.evaluateGuess(this.userGuess);
      this.clearInput();
    },

    clearInput: function clearInput() {
      this.$data.userGuess = '';
    },

    getNewRandom: function getRandom() {
      const newRando = Math.round((Math.random() * (this.max - this.min)) + this.min);
      this.$data.rando = newRando;
    },

    evaluateGuess: function evaluateGuess(guess) {
      const intGuess = parseInt(guess, 10);
      if (isNaN(intGuess)) {
        this.badGuess('NaN');
      }
      if (intGuess > this.rando) {
        this.badGuess('high');
      }
      if (intGuess < this.rando) {
        this.badGuess('low');
      }
      if (intGuess === this.rando) {
        this.gameWon();
      }
      this.$data.lastGuess = intGuess;
    },

    badGuess: function badGuess(feedback) {
      if (feedback === 'high') {
        this.$data.guessResult = 'your guess was too high';
      }
      if (feedback === 'low') {
        this.$data.guessResult = 'your guess was too low';
      }
      if (feedback === 'NaN') {
        this.$data.guessResult = 'you did not enter a number!';
      }
    },

    gameWon: function gameWon() {
      this.$data.guessResult = 'You Guessed It, min range decreased, max range increased!';
      this.$data.min -= 10;
      this.$data.max += 10;
      this.$data.level += 1;
      this.getNewRandom();
    },

    resetGame: function resetGame() {
      this.$data.lastGuess = 0;
      this.$data.guessResult = '';
      this.$data.min = 0;
      this.$data.max = 100;
      this.$data.level = 1;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
