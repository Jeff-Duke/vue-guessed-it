<template>
  <section class="guesser-container">
    <article class="message">
      <h1 class="title">
        Number <span>Guesser</span>
      </h1>

      <p class="range">
        Enter a guess between {{min}} and {{max}}
      </p>
    </article>
    <article class="game-body container">

      <input
        v-model="userGuess"
        type="number"
        @keyup.enter="submitGuess"
        class="input input--guess"
        placeholder="enter your guess"
        ref="userGuess"
      />

      <div class="wrapper wrapper--range">
        <label for="minInput">
          Min
        <input
          v-model="min"
          id="minInput"
          class="input input--range"
          type="number"
          @blur="getNewRandom"
        />
        </label>

        <label for="maxInput">
          Max
        <input
          v-model="max"
          id="maxInput"
          class="input input--range"
          type="number"
          @blur="getNewRandom"
        />
        </label>
      </div>

      <div class="wrapper wrapper--buttons">
        <button
          @click="submitGuess"
          class="btn btn--submit"
          :disabled="!userGuess"
        >
          Submit
        </button>

        <button
          @click="clearInput"
          class="btn btn--clear"
          :disabled="!userGuess"
        >
          Clear
        </button>
      </div>

      <article
        class="guess--output"
        v-if="lastGuess"
      >
        Your last guess was
        <span>{{lastGuess}}</span>
      </article>
      <article
        class="guess--output"
        v-if="!lastGuess"
      >
        <span>??</span>
      </article>

      <p
        v-show="guessResult"
        class="guess--result"
      >
        {{ guessResult }}
      </p>

      <button
        @click="resetGame"
        class="btn btn--reset"
        :disabled="level <= 1"
      >
        Reset
      </button>

    </article>

  </section>
</template>

<script>
const GUESS_ISNAN = 'That was not a number.  Please enter a number';
const GUESS_ISHIGH = 'That was too high';
const GUESS_ISLOW = 'That was too low';

export default {
  name: 'Guesser',

  data() {
    return {
      userGuess: '',
      guessResult: '',
      lastGuess: 0,
      min: 0,
      max: 100,
      rando: 0,
      level: 1,
    };
  },

  mounted() {
    this.getNewRandom();
  },

  methods: {
    submitGuess() {
      this.evaluateGuess();
      this.clearInput();
      this.$refs.userGuess.focus();
    },

    clearInput() {
      this.$data.userGuess = '';
    },

    getNewRandom() {
      const max = parseInt(this.max, 10);
      const min = parseInt(this.min, 10);

      if (min > max) {
        this.guessResult = 'Please enter a valid range';
        return null;
      }

      // eslint-disable-next-line
      const newRando = Math.round(Math.random() * (max - min) + min);
      this.rando = newRando;

      return null;
    },

    evaluateGuess() {
      this.lastGuess = this.userGuess;
      const intGuess = parseInt(this.userGuess, 10);
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

  &--reset {
    margin-top: 2rem;
  }
}
</style>
