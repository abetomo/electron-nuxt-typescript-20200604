<template>
  <div>
    <section class="section">
      <div class="columns is-mobile">
        <card title="Free" icon="github-circle">
          Open source on
          <a href="https://github.com/buefy/buefy">
            GitHub
          </a>
        </card>

        <card title="Responsive" icon="cellphone-link">
          <b class="has-text-grey">
            Every
          </b>
          component is responsive
        </card>

        <card title="Modern" icon="alert-decagram">
          Built with
          <a href="https://vuejs.org/">
            Vue.js
          </a>
          and
          <a href="http://bulma.io/">
            Bulma
          </a>
        </card>

        <card title="Lightweight" icon="arrange-bring-to-front">
          No other internal dependency
        </card>
      </div>
    </section>

    <section class="section">
      <b-button @click="outputLog">
        output log
      </b-button>
      <b-message type="is-info"> log file: {{ logPath }} </b-message>
    </section>

    <section class="section">
      <b-button @click="openDialog">
        dialog example: openDirectory
      </b-button>

      <b-message v-if="directoryName.length > 0" type="is-info">
        {{ directoryName }}
      </b-message>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '~/components/Card.vue'

declare global {
  interface Window {
    electron: {
      remote: {
        require: Function
      }
      ipcRenderer: {
        sendSync: Function
      }
      logPath: string
    }
  }
}

const fs = window.electron.remote.require('fs')

export default Vue.extend({
  name: 'HomePage',

  components: {
    Card
  },

  data() {
    return {
      logPath: window.electron.logPath,
      directoryName: ''
    }
  },

  methods: {
    outputLog() {
      fs.appendFileSync(window.electron.logPath, Date.now() + '\n')
    },

    openDialog() {
      const options = {
        properties: ['createDirectory', 'openDirectory']
      }
      const paths = window.electron.ipcRenderer.sendSync('open-dialog', options)
      if (paths != null && paths.length > 0) {
        this.directoryName = paths[0]
      } else {
        this.directoryName = '<undefined>'
      }
    }
  }
})
</script>
