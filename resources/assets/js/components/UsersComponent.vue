<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column>

        <!-- User List -->
        <v-list class="elevation-0">
          <v-list-tile v-for="user in users" :key="user.id" avatar @click="showUserContacts(user)">
            <v-list-tile-avatar size="38" color="teal">
              <span class="white--text headline">{{ user.name.substr(0,1) }}</span>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ user.name + ' ' + user.surname }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-btn  icon ripple @click="deleteUser($event, user.id)">
                  <v-icon color="grey lighten-1">delete</v-icon>
                </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>


        <!-- Form Dialog -->
        <v-layout v-if="dialogVisible" row justify-center>
          <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">User Profile</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field v-model="name" label="Name" required :rules="[rules.required]"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="surname" label="Surname" required :rules="[rules.required]"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="closeDialog()">Close</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>  
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        dialog: false,
        name: '',
        surname: '',
        currentUser: '',
        search: '',
        headers: [
          {
            text: 'Contact',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { 
            text: 'Actions', 
            sortable: false,
            align: 'right',
          },
        ],
        rules: {
          required: (value) => !!value || 'Required.',
          number: (value) => {
            const reg = /^[0-9]{10}$/
            return reg.test(value) || 'Invalid number';
          }
        }
      }
    },

    methods: {
      getAllUsers(){
        this.$store.dispatch('getAllUsers')
      },
      showUserContacts(user){
        this.$store.commit('updateCurrentUser', user.id) 
        this.$store.dispatch('getUserContactList')
        this.$store.commit('updatePageTitle', user.name.substr(user.name.length - 1,1) !== 's' ? `${user.name}'s Contacts` : `${user.name}' Contacts`)        
        this.$router.push({name: 'ContactsComponentPerUser', params: {id: user.id}})
      },
      closeDialog(){
        this.$store.commit('changeDialogState')
      },
      save(){
        var payload = {
          name: this.name,
          surname: this.surname
        }
        this.$store.dispatch('insertUser', payload)
      },
      deleteUser($event, userId){
        $event.stopImmediatePropagation();
        this.$store.dispatch('deleteUser', userId)
      }

    },

    computed: {
      ...mapState(['userList', 'showDialog']),
      users(){
        return this.userList
      },
      dialogVisible(){
        this.dialog = this.showDialog
        return this.showDialog
      }
    },

    mounted(){
      this.getAllUsers()
    },

    created(){
    //   this.$store.watch(
    //     function (state) {
    //         return state.showDialog;
    //     },
    //     () => {
    //         this.dialog = this.$store.state.showDialog
    //     }
    //   )
     }

  }
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
