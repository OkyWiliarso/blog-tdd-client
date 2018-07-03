<template>
  <div>
    <navbar/>

    <div class="login container">
      <div class="card">
        <div class="card-content center-align">
          <h2 class="black-text">LOGIN</h2>
          <form @submit.prevent="login">
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">mail_outline</i>
                <input id="email" v-model="email" v-validate="'required|email'" type="email" name="email">
                <label for="email">Email</label>
                <span class="helper-text">{{ errors.first('email') }}</span>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">lock_outline</i>
                <input id="password" v-model="password" v-validate="'required|min:6'" type="password" name="password">
                <label for="password">Password</label>
                <span class="helper-text">{{ errors.first('password') }}</span>
              </div>
            </div>
            <button class="btn black">Login</button>
          </form>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  name: 'login',
  components: {
    'navbar': Navbar,
    Footer
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      let user = {
        email: this.email,
        password: this.password
      }

      axios.post('https://blog-server.okywiliarso.me/users/login', user)
      .then(response => {
        let token = response.data.token
        localStorage.setItem('token', token)
        localStorage.setItem('status', true)
        swal(
            'Welcome!',
            'Login success',
            'success'
        )
        this.$router.push('/')
      })
      .catch(err => {
        console.log(err)
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Login failed!'
        })
      })
    }
  }
}
</script>

<style scoped>
  .login{
    max-width: 450px;
    margin-top: 100px;
    margin-bottom: 100px;
  }
  .login h2{
    font-size: 3em;
    font-family: 'Alfa Slab One', cursive;
  }
  .btn{
    margin: 30px auto;
  }
  .helper-text {
    color: red;
  }
</style>
