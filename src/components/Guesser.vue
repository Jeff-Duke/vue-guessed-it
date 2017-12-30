<template>
  <section class="guesser-container">

    <h1 class="message">
      {{ msg }}
    </h1>

    <h3>
      Enter a guess between {{min}} and {{max}}
    </h3>

    <article class="inputs-buttons">

      <input
        v-model="userGuess"
        type="number"
        @keyup.enter="submitGuess"
        class="guess-input"
        placeholder="enter your guess"
      />

      <button
        id="submitButton"
        @click="submitGuess"
        :disabled="!userGuess"
      >
        Submit
      </button>

      <button
        id="clearButton"
        @click="clearInput"
        :disabled="!userGuess"
      >
        clear
      </button>

      <button
        id="resetButton"
        @click="resetGame"
        :disabled="level <= 1"
      >
        reset
      </button>
    </article>

    <label for="minInput">Min</label>
    <input
      v-model="min"
      id="minInput"
      type="number"
      @blur="getNewRandom"
    />

    <label for="maxInput">Max</label>
    <input
      v-model="max"
      id="maxInput"
      type="number"
      @blur="getNewRandom"
    />

    <h3 v-if="guessResult">{{ guessResult }}</h3>
    <h3 v-if="lastGuess">your last guess was: {{lastGuess}} </h3>

  </section>
</template>

<script>
const GUESS_ISNAN = 'Your guess was not a number.  Please enter a number';
const GUESS_ISHIGH = 'Your guess was too high';
const GUESS_ISLOW = 'Your guess was too low';

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

  mounted() {
    this.getNewRandom();
  },

  methods: {
    submitGuess() {
      this.evaluateGuess(this.userGuess);
      this.clearInput();
    },

    clearInput() {
      this.$data.userGuess = '';
    },

    getNewRandom() {
      // eslint-disable-next-line
      const newRando = Math.round(Math.random() * (this.max - this.min) + this.min);
      this.rando = newRando;
    },

    evaluateGuess(guess) {
      const intGuess = parseInt(guess, 10);
      const { rando } = this;
      if (isNaN(intGuess)) {
        this.guessResult = GUESS_ISNAN;
      }
      if (intGuess > rando) {
        this.guessResult = GUESS_ISHIGH;
      }
      if (intGuess < rando) {
        this.guessResult = GUESS_ISLOW;
      }
      if (intGuess === rando) {
        this.gameWon();
      }
    },

    gameWon() {
      this.guessResult = 'You Guessed It, min range decreased, max range increased!';
      this.min -= 10;
      this.max += 10;
      this.level += 1;
      this.getNewRandom();
    },

    resetGame() {
      this.lastGuess = 0;
      this.guessResult = '';
      this.min = 0;
      this.max = 100;
      this.level = 1;
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
