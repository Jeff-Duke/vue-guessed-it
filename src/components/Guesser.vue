<template>
  <section class="guesser-container">
    <h1>{{ msg }}</h1>
    <h3>Enter a guess between {{min}} and {{max}}</h3>
    <h3>{{ guessResult }}</h3>
    <h3>{{ lastGuess}} </h3>
    <article class="inputs-buttons">
      <input class="guess-input" placeholder="enter your guess" v-model="userGuess"/>
      <button v-on:click="submitGuess">Submit</button>
    </article>
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
      lastGuess: undefined,
    };
  },
  mounted: function getRandomOnMount() {
    this.getNewRandom();
  },
  methods: {
    submitGuess: function submitGuess() {
      this.evaluateGuess(this.userGuess);
      this.$data.userGuess = '';
    },

    getNewRandom: function getRandom() {
      const newRando = Math.round((Math.random() * (this.max - this.min)) + this.min);
      this.$data.rando = newRando;
    },

    evaluateGuess: function evaluateGuess(guess) {
      const intGuess = parseInt(guess, 10);
      if (intGuess > this.rando) {
        this.badGuess(`your guess of ${guess} was too high!`);
      }
      if (intGuess < this.rando) {
        this.badGuess(`your guess of ${guess} was too low!`);
      }
      if (intGuess === this.rando) {
        this.gameWon();
      }
      this.$lastGuess = intGuess;
    },

    badGuess: function badGuess(feedback) {
      this.$data.guessResult = feedback;
    },

    gameWon: function gameWon() {
      this.$data.guessResult = 'You Guessed It';
      this.$data.min -= 10;
      this.$data.max += 10;
      this.getNewRandom();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
