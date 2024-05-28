<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/pivotTable">pivotTable</router-link> |
    <router-link to="/pivotTableUi">pivotTableUi</router-link> |
    <router-link to="/CreatePageView">CreatePageView</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.pointer{
  cursor: pointer;
}

select.select{
  width: 100%;
  padding: 8px 4px;
  font-weight: bold;
  border: 1px solid #a2b1c6;
  border-radius: 4px;
  &:focus-visible{
    outline: none;
  }
}
</style>
