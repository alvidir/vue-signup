<template>
  <div class="wrapper rcorner" :style="{height: signin ? '450px' : '580px'}">
    <div class="sign-in-card rcorner">
      <div class="rcorner-top-only banner">
        <img class="logo" :src="get_logo"/>
        <p class="text">
          <text id="app-title">Sign in with </text>
          <text id="app-name">Alvidir</text>
          <button class="rcorner" id="link-button" @click="link_button_clicked">
            <img id="link-icon" :src="get_link"/>
          </button>
        </p>
      </div>
      <div id="credentials">
        <div class="field" v-if="!signin">
          <div class="title">Username <br> </div>
          <input class="input rcorner" type="text" v-model="username">
        </div>
        <div class="field">
          <div class="title"> <text v-if="signin"> Username /</text> Email <br> </div>
          <input class="input rcorner" type="text" v-model="email">
        </div>
        <div class="field">
          <div class="title">Password <br> </div>
          <input class="input rcorner" type="password" v-model="password">
        </div>
        <div class="field"  v-if="!signin">
          <div class="title">Repeat password <br> </div>
          <input class="input rcorner" type="password" v-model="password_repeat">
        </div>
      </div>
      <div id="actions">
        <button class="rcorner" id="login-button" @click="login_button_clicked">
          <text> {{get_sign_button_text}} </text>
        </button>
        <a href="#" ><br>Forgot password?</a> | 
        <a href="#" @click="signup_button_clicked"><strong>{{get_signin_option}}</strong></a>
      </div>
      <toggle-button @change="onChangeEventHandler"/>
    </div>
  </div>
</template>

<script>
import image_logo_dark from "../assets/logo.dark.png"
import image_logo_light from "../assets/logo.light.png"
import image_link_dark from "../assets/link.dark.svg"
import image_link_light from "../assets/link.light.svg"

export default {
  name: 'SignInCard',
  props: {},

  data () {
      return {
          dark_theme: false,
          signin: true,
      }
  },

  watch: {
    signin() {

    }
  },

  computed: {
    get_logo(){
      if (this.dark_theme) {
        return image_logo_light
      } else {
        return image_logo_dark
      }
    },

    get_link(){
      if (this.dark_theme) {
        return image_link_light
      } else {
        return image_link_dark
      }
    },

    get_signin_option() {
      if (this.signin) {
        return "Sign up to Alvidir"
      }
      
      return "Sign in to Alvidir"
    },

    get_sign_button_text() {
      if (this.signin) {
        return "Sign in"
      }

      return "Sign up"
    }
  },

  methods: {
    link_button_clicked(){
      
    },

    login_button_clicked() {

    },

    signup_button_clicked() {
      this.signin = !this.signin
    },

    onChangeEventHandler() {
      this.dark_theme = !this.dark_theme
    },

  },

  mounted() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.dark_theme = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a {
    color: #3888ca;
    font-weight: normal;
    text-decoration: none;
    font-size: 14px;
  }

  h1 {
     margin: 0;
     padding: 0;
  }

  div {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    /*background: gold;*/ /** <-- For the demo **/
  }

  button {
    background: transparent;
    border: none;
    border: none;
    outline: none;
    height: 21px;
    margin-bottom: 5px;
  }

  button:hover{
    background: #e1e1e1;
  }

  button:active{
    background-color:#8e8e8e;
  }

  input:focus{
    outline-width: 0;
    -moz-box-shadow:    inset 0px 0px 3px 1px #00000055;
    -webkit-box-shadow: inset 0px 0px 3px 1px #00000055;
    box-shadow:         inset 0px 0px 3px 1px #00000055;
  }

  #link-button {
    margin-left: 5px;
  }

  #link-icon {
    height: 20px;
  }

  #app-title {
    font-size: 21px;
  }

  #app-name {
    font-size: 24px;
  }

  #panel {
    background: #1e1e1e;
  }

  #credentials {
    margin-top: 8%;
    margin-bottom: 15%;
    text-align: center;
  }

  #login-button {
    background: rgb(62, 155, 70);
    color: white;
    font-size: 16px;
    height: 35px;
    width: 80%;

    border: 1px solid;
    border-color: #2b522c;

    margin-bottom: 10px;
  }

  #actions {
    width: 100%;
    text-align: center;
  }

  .banner {
    padding-top: 5%;
    text-align: center;
  }

  .banner .logo {
    margin: auto 0;
    padding-top: 10px;
    height: 70px;
  }

  .banner .text {
    margin-left: 10px;
  }

  .field {
    width: 100%;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
  }

  .field .input {
    margin-top: 10px;
    padding-left: 10px;
    border: 1px solid;
    border-color: #bbbbbb;
    width: 80%;
    height: 25px;
    font-size: 16px;
  }

  .title {
    width: 80%;
    text-align: left;
  }

  .rcorner {
    border-radius: 6px;
  }

  .rcorner-top-only{
    border-radius: 6px 6px 0px 0px;
  }

  .rcorner-bottom-only{
    border-radius: 0px 0px 6px 6px;
  }

  .wrapper {
    margin-top: 5%;
    border: 1px dashed;
    border-color: #6e6e6e;
    max-width: 350px;
    box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.1);
  }

  .sign-in-card {
    display: block;
    height: 100%;
    /*background: #db0d9d;*/
  }
</style>
