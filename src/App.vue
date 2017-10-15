<template>
  <div id="app">
    <guesser/>
  </div>
</template>

<script>
import Guesser from './components/Guesser';

export default {
  name: 'app',
  components: {
    Guesser,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
