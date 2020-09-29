/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '#',
    icon: 'OutlinePersonIcon',
    name: 'Profile',
  },
  {
    path: '/app/campaign',
    icon: 'MegaphoneIcon',
    name: 'Campaign',
  },
  {
    path: '#',
    icon: 'UsersIcon',
    name: 'Beneficiaries',
  },
  {
    path: '#',
    icon: 'VendorBoothIcon',
    name: 'Vendors',
  },
  {
    path: '#',
    icon: 'CreditCardIcon',
    name: 'Transactions',
  },
  {
    path: '#',
    icon: 'ShoppingIcon',
    name: 'Market',
  },
  {
    path: '#',
    icon: 'MoneyIcon',
    name: 'Cash For Work',
  },
  {
     path: '#',
    icon: 'SettingsIcon',
    name: 'Settings',
  },
  {
    path: '#',
    icon: 'SupportHeadphonesIcon',
    name: 'Support',
  },
  {
    path: '#',
    icon: 'LogOutIcon',
    name: 'Log Out',
  },
  // {
  //   icon: 'PagesIcon',
  //   name: 'Pages',
  //   routes: [
  //     // submenu
  //     {
  //       path: '/login',
  //       name: 'Login',
  //     },
  //     {
  //       path: '/create-account',
  //       name: 'Create account',
  //     },
  //     {
  //       path: '/forgot-password',
  //       name: 'Forgot password',
  //     },
  //     {
  //       path: '/app/404',
  //       name: '404',
  //     },
  //     {
  //       path: '/app/blank',
  //       name: 'Blank',
  //     },
  //   ],
  // },
]

export default routes
