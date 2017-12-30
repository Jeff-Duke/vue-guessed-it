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
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,700');

$primary-font: 'Open Sans', sans-serif;

$color-background-dark: #404041;
$color-primary-pink: #eb008b;
$color-title-pink: #ed458b;
$color-active-gray: #929497;
$color-disabled-gray: #d0d2d3;
$color-light-gray: #e6e7e8;
$color-white: #fff;

html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  font-family: $primary-font;
  margin: 0;
}

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

.container {
  max-width: 60vw;
  margin: 0 auto;

  @media screen and(max-width: 768px) {
    max-width: 80vw;
  }
}

.game-body {
  display: flex;
  flex-direction: column;
}

.message {
  padding: 2rem;
  background-color: $color-background-dark;
  margin-bottom: 1rem;

  .title {
    margin: 0;
    color: $color-title-pink;
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;

    span {
      color: $color-light-gray;
      font-weight: 300;
    }
  }

  .range {
    font-size: 1.5rem;
    font-weight: 300;
    color: $color-light-gray;
    text-align: center;
  }
}

.guess--output {
  span {
    font-size: 10rem;
    color: $color-primary-pink;
    font-weight: 300;
    display: block;
    line-height: 9rem;
  }
}

.guess--output,
.guess--result {
  text-align: center;
  font-size: 1.25rem;
}

.guess--result {
  margin-top: 0.5rem;
}

.input {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  padding: 0.5rem;

  &--guess {
    width: 100%;
  }

  &--range {
    width: 100%;
  }
}

.wrapper {
  display: flex;

  &--range {
    justify-content: space-between;

    label ~ label {
      margin-left: 0.5rem;
    }

    @media screen and (min-width: 768px) {
      justify-content: center;

      label ~ label {
        margin-left: 2rem;
      }
    }
  }

  &--buttons {
    justify-content: space-around;

    .btn {
      width: 40%;
    }
  }
}

.btn {
  background-color: $color-active-gray;
  color: $color-white;
  border: none;
  border-radius: 1.25rem;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: $color-primary-pink;
  }

  &:disabled {
    background-color: $color-disabled-gray;
  }
}
</style>
