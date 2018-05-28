<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        
        <!-- Table Component -->
        <v-card class="elevation-0">
          <v-card-title>
            <h1 class="hidden-sm-and-down headline">Contact List</h1>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="contactListData"
            :search="search"
            hide-actions
            class="elevation-0"
          >
            <template slot="items" slot-scope="props">
              <td @click="getContactDetails(props.item.id)">{{ props.item.name + ' ' + props.item.surname}}</td>
              <td style="justify-content: flex-end;" class="justify-right layout px-0">
                <v-btn icon class="mx-0" onclick="alert('The edit functionality is not implemented')">
                  <v-icon color="teal">edit</v-icon>
                </v-btn>
                <v-tooltip left>
                  <v-btn slot="activator" icon class="mx-0" @dblclick="deleteContact(props.item.id)">
                    <v-icon color="grey lighten-1">delete</v-icon>
                  </v-btn>
                  <span>Double Click to Delete</span>
                </v-tooltip>
              </td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>
        

        <!-- Form Dialog -->
        <v-layout v-if="dialog" row justify-center>
          <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Contact Profile</span>
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
                    <v-flex xs12 md6 lg4>
                      <v-text-field v-model="cellNo" label="Cell No." required :rules="[rules.required, rules.number]"></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6 lg4>
                      <v-text-field v-model="workNo" label="Work No." :rules="[rules.number]"></v-text-field>
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
  import Axios from 'axios'

  export default {
    data () {
      return {
        alert: false,
        dialog: false,
        name: '',
        surname: '',
        cellNo: '',
        workNo: '',
        currentUser: '',
        search: '',
        rules: {
          required: (value) => !!value || 'Required.',
          number: (value) => {
            const reg = /^[0-9]{10}$/
            return reg.test(value) || 'Invalid number'
          }
        },
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
        contacts: []
      }
    },

    methods: {
       closeDialog(){
         this.$store.commit('changeDialogState')
       },
       save(){
         var payload = {
          name: this.name,
          surname: this.surname,
          cellNo: this.cellNo,
          workNo: this.workNo
         }
         this.$store.dispatch('insertContact', payload)
       },
       getContactDetails(contactId){
         this.$store.dispatch('getContactDetails', contactId)
         this.$store.commit('toggleUserDetailDrawer')
       },
       deleteContact(contactId){
         this.$store.dispatch('deleteContact', contactId)
       },

    },

    computed: {
      contactListData(){
        return this.$store.state.contactList.length > 0 ? this.$store.state.contactList : []
      }
    },

    mounted(){

    },

    created(){
      this.$store.watch(
        function (state) {
            return state.showDialog;
        },
        () => {
            this.dialog = this.$store.state.showDialog
        }
      )

      this.$store.watch(
        function (state) {
            return state.contactList;
        },
        () => {
            this.contacts = this.$store.state.contactList
        }
      )
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
