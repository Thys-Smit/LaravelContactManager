import ContactsComponent from './components/ContactsComponent'
import UsersComponent from './components/UsersComponent'

const routes = [
    {
      path: '/users',
      name: 'users',
      component: UsersComponent
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactsComponent,
    },
    {
      path: '/contacts/user/:id', 
      name: 'ContactsComponentPerUser', 
      component: ContactsComponent,
    },
    { 
      path: '*', 
      redirect: '/users' 
    }
  ]

  export default routes;
