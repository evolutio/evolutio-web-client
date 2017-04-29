<template>
  <main>
<!--     <v-content>
      <v-container fluid>
        <div class="title">
          <h2>Main content</h2>
          <router-link :to="'/profile'">AAA profile</router-link>
          <v-btn primary>Primary button</v-btn>
          <v-btn secondary>Secondary button</v-btn>
          <v-btn success>Success button</v-btn>
        </div>
      </v-container>
    </v-content> -->
      <v-card>
        <v-card-row class="green darken-1">
          <v-card-title>
            <span class="white--text">Marriot Rewards</span>
            <v-spacer></v-spacer>
            <div>
              <v-menu id="marriot" bottom left origin="top right">
                <v-btn icon="icon" slot="activator" class="white--text">
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-item>
                    <v-list-tile>
                      <v-list-tile-title>Never show rewards</v-list-tile-title>
                    </v-list-tile>
                  </v-list-item>
                  <v-list-item>
                    <v-list-tile>
                      <v-list-tile-title>Remove Card</v-list-tile-title>
                    </v-list-tile>
                  </v-list-item>
                  <v-list-item>
                    <v-list-tile>
                      <v-list-tile-title>Send Feedback</v-list-tile-title>
                    </v-list-tile>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </v-card-title>
        </v-card-row>
        <v-card-text>
          <v-card-row height="75px">
            <v-icon class="mr-5">card_membership</v-icon>
            <div>
              <div>Membership Number</div><strong>113241423</strong>
            </div>
          </v-card-row>
        </v-card-text>
        <v-card-row actions>
          <v-btn flat class="green--text darken-1">View Email</v-btn>
        </v-card-row>
      </v-card>
  </main>
</template>

<script>
  export default {
    asyncData() {
      return {
      }
    }
  }
</script>

<style scoped>
  .title {
    padding-left: 20px;
  }
</style>
