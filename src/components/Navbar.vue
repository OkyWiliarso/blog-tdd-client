<template>
  <div class="nav">
    <nav>
      <div class="nav-wrapper teal lighten-2">
        <router-link to="/">
          <a class="brand-logo">Foo-Ball</a>
        </router-link>
        <ul id="nav-mobile" class="right hide-on-med-and-down">

          <div v-if="loginStatus">
            <li>
              <router-link to="post">
                <a class="waves-effect waves-light btn grey darken-1">post</a>  
              </router-link>
            </li>
            <li>
              <a class="waves-effect waves-light btn red lighten-1" @click="logout">logout</a>  
            </li>
          </div>

          <div v-else>
            <li>
              <router-link to="login">
                <a class="waves-effect waves-light btn grey darken-1">login</a>
              </router-link>
            </li>
          </div>
            
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'navbar',
  computed: {
    ...mapState([
      'loginStatus'
    ])
  },
  created () {
    this.checkStatus()
  },
  methods: {
    ...mapActions([
      'checkStatus'
    ]),
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('status')
      this.$store.dispatch('logoutStatus', false)
      swal(
        'Bye!',
        'Logout success!',
        'success'
      )
      this.checkStatus()
    }
  }
}
</script>

<style scoped>
  .brand-logo {
    margin-left: 10px;
    font-family: 'Alfa Slab One', cursive;
  }
</style>
