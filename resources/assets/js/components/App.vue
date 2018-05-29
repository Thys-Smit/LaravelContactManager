<template>
  <v-app :dark="dark" :style="!dark ? 'background-color:white;': ''">

    <!-- Left Side Drawer -->
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
      class="elevation-0"
    >
      <v-toolbar color="white" height="100px" class="elevation-4">
        <v-toolbar-title class="justify-center layout ml-0">
          <v-list>
            <v-list-tile style="height:60px; padding-top:5px" v-if="!miniVariant">
              <v-list-tile-title class="title">Contact Manager</v-list-tile-title>
            </v-list-tile>
            <v-list-tile avatar v-else>
              <v-list-tile-avatar tile size="50" color="teal">
                <span class="white--text headline">C</span>
              </v-list-tile-avatar>
            </v-list-tile>
        </v-list>
       </v-toolbar-title>
      </v-toolbar>
      <v-divider class="grey lighten-4"></v-divider>
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          @click="navClicked(item)"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-footer fixed style="justify-content: flex-end;" class="hidden-lg-and-up layout" app>
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn>
      </v-footer>
    </v-navigation-drawer>

    <!-- Main Toolbar -->
    <v-toolbar
      app
      :clipped-left="clipped"
      class="elevation-1"
      :color="dark ? 'grey darken-3' : 'white'"
    >
      <v-toolbar-side-icon class="hidden-lg-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn class="hidden-md-and-down" icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title>{{ pageName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>perm_identity</v-icon>
      </v-btn>
      <v-menu bottom left>
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile>
             <v-list-tile-avatar>
              <v-icon large>account_circle</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Billow User</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-action>
              <v-switch v-model="dark" color="blue"></v-switch>
            </v-list-tile-action>
            <v-list-tile-title>Dark Theme</v-list-tile-title>
          </v-list-tile>
          <v-list-tile v-for="(item, i) in menuItems" :key="i" @click="console.log('')">
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <!-- Main Content Area -->
    <v-content>
      <router-view/>
    </v-content>

    <!-- Right Side Drawer -->
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list two-line>
        <template v-if="details">
        <v-list-tile >
            <v-list-tile-title class="justify-center layout title">Contact Details</v-list-tile-title>
        </v-list-tile>
        <v-divider ></v-divider>
        <v-list-tile >
          <v-list-tile-action>
            <v-icon>perm_identity</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ details.name }}</v-list-tile-title>
            <v-list-tile-sub-title class="caption">Name</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
           <v-list-tile-action>
            <v-icon>perm_identity</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ details.surname }}</v-list-tile-title>
            <v-list-tile-sub-title class="caption">Surname</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile >
           <v-list-tile-action>
            <v-icon>phone</v-icon>
          </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ details.cellnumber }}</v-list-tile-title>
          <v-list-tile-sub-title class="caption">Mobile</v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
        <v-list-tile >
           <v-list-tile-action>
            <v-icon>phone</v-icon>
          </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ details.worknumber ? details.worknumber : '_'}}</v-list-tile-title>
          <v-list-tile-sub-title class="caption">Work</v-list-tile-sub-title>
        </v-list-tile-content>
        </v-list-tile>
        </template>
        
      </v-list>
    </v-navigation-drawer>

    <!-- Floating Action Button -->
    <v-fab-transition>
      <v-btn
        v-show="showBtn"
        color="blue darken-4"
        dark
        fab
        fixed
        bottom
        right
        @click="addClicked()"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'App',
    data () {
      return {
        currentView: '',
        dark: false,
        clipped: false,
        drawer: true,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        icons: [
          'perm_identity',
          'perm_identity',
          'phone',
          'phone'
        ],
        items: [
          {
            icon: 'perm_identity',
            title: 'Users Management',
            route: 'users',
          },
          {
            icon: 'contacts',
            title: 'All Contacts',
            route: 'contacts',
          }
        ],
        menuItems: [
          {
            title: 'Account',
            icon: 'account_box'
          },
          {
            title: 'Settings',
            icon: 'settings'
          },
          {
            title: 'Log Out',
            icon: 'exit_to_app'
          }
        ]
      }
    },

    methods: {
      navClicked(item){
        this.$store.commit('updatePageTitle', item.title)
        if(item.route === 'contacts') this.$store.dispatch('getAllContacts')
        this.$store.commit('updateCurrentUser', null)
        this.$router.push({ name: item.route })
      },
      addClicked(){
        this.$store.commit('changeDialogState')
      },
      logoClicked(){
        this.$router.push({name:'home'})
        this.$store.commit('updatePageTitle', 'Home')
      }
    },

    computed: {
      ...mapState(['pageTitle', 'contactDetails']),
      showBtn(){
        return this.$route.path !== '/contacts' ? true : false
      },
      pageName(){
        return this.pageTitle
      },
      details(){
        return this.contactDetails
      }
    },

    created(){
      this.$store.watch(
        function (state) {
            return state.detailDrawer;
        },
        () => {
            this.rightDrawer = true
        }
      )
    }
  }
</script>
