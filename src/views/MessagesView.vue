<template>
  <div class="hello">
    <img src="@/assets/logo-django.png" style="width: 250px" />
    <p>
      The data below is added/removed from the SQLite Database using Django's ORM and Rest
      Framework.
    </p>
    <br />
    <div v-if="user">
      Logged in user data:
      <pre>{{ user }}</pre>
      <input type="submit" value="Logout" @click="logout" />
      <br />
      <p>Subject</p>
      <input type="text" placeholder="Hello" v-model="subject" />
      <p>Message</p>
      <input type="text" placeholder="From the other side" v-model="msgBody" />
      <br />
      <input
        type="submit"
        value="Add"
        @click="addMessage({ subject: subject, body: msgBody })"
        :disabled="!subject || !msgBody"
      />
    </div>
    <div v-else>
      <p>You need to be logged in to add messages</p>
      <input type="text" v-model="username" placeholder="username" />
      <input type="password" v-model="password" placeholder="password" />
      <input type="submit" value="Login" @click="login" />
      <input type="submit" value="Register" @click="register" />
      <p v-if="loginError">
        {{ loginError }}
      </p>
    </div>

    <hr />
    <h3>Messages on Database</h3>
    <p v-if="messages.length === 0">No Messages</p>
    <div class="msg" v-for="(msg, index) in messages" :key="index">
      <p class="msg-index">[{{ index }}]</p>
      <p class="msg-subject" v-html="msg.subject"></p>
      <p class="msg-body" v-html="msg.body"></p>
      <input type="submit" @click="deleteMessage(msg.pk)" value="Delete" :disabled="!user" />
    </div>
  </div>
</template>

<script>
import messageService from "../services/messageService"
import authService from "../services/authService"

export default {
  name: "MessagesView",
  data() {
    return {
      subject: "",
      msgBody: "",
      messages: [],
      username: "",
      password: "",
      loginError: ""
    }
  },
  async mounted() {
    authService.getUser()
    this.messages = await messageService.fetchMessages()
  },
  computed: {
    user() {
      return authService.user.value
    }
  },
  methods: {
    login() {
      this.loginError = ""
      authService
        .login({
          username: this.username,
          password: this.password
        })
        .catch((err) => {
          this.loginError = err.response.data
        })
    },
    logout() {
      authService.logout()
    },
    register() {
      this.loginError = ""
      authService
        .register({
          username: this.username,
          password: this.password
        })
        .catch((err) => {
          this.loginError = err.response.data
        })
    },
    addMessage(localMessage) {
      // local instant feedback
      this.messages.push(localMessage)
      // send to server
      messageService.postMessage(localMessage).then((serverMessage) => {
        // update with result from server (to get pk and other fields added by server)
        Object.assign(localMessage, serverMessage)
      })
      this.subject = ""
      this.msgBody = ""
    },
    deleteMessage(pk) {
      this.messages = this.messages.filter((obj) => obj.pk !== pk)
      messageService.deleteMessage(pk)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
hr {
  max-width: 65%;
}

.msg {
  margin: 0 auto;
  max-width: 30%;
  text-align: left;
  border-bottom: 1px solid #ccc;
  padding: 1rem;
}

.msg-index {
  color: #ccc;
  font-size: 0.8rem;
  /* margin-bottom: 0; */
}

img {
  width: 250px;
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>
