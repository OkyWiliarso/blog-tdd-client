<template>
  <div class="home">
    <navbar/>
    <br>
    <h3>Articles.</h3>
      <ul class="collection">
        <div v-for="(article, index) in articles" :key="index">
          <li class="collection-item avatar">
            <img src="paper.png" class="circle">
            <router-link to="article">
            <span class="title" @click="articleDetail(article)">{{article.title}}</span>
            </router-link>
            <p><span>{{ article.createdAt | moment("dddd, MMMM Do YYYY") }}</span></p>
            <a v-if="loginStatus" class="secondary-content" @click="deleteArticle(article._id)" href="#"><i class="material-icons">delete</i></a>
          </li>
        </div>
      </ul>
    <Footer/>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { mapState, mapActions } from 'vuex'
import swal from 'sweetalert2'

export default {
  name: 'home',
  components: {
    'navbar': Navbar,
    Footer
  },
  computed: {
    ...mapState([
      'articles',
      'loginStatus'
    ])
  },
  created () {
    this.getArticles()
  },
  methods: {
    ...mapActions([
      'getArticles'
    ]),
    deleteArticle: function (id) {
      axios.delete(`https://blog-server.okywiliarso.me/users/delete-article/${id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.getArticles()
      })
      .catch(err => {
        console.log(err)
      })
    },
    articleDetail: function (article) {
      this.$store.dispatch('article',article)
    }
  }
}
</script>

<style scoped>
  h3 {
    margin-left: 10px;
    font-family: 'Alfa Slab One', cursive;
  }
</style>
