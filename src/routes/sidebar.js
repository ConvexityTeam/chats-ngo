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
    icon: 'DashboardIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/app/profile',
    icon: 'OutlinePersonIcon',
    name: 'Profile',
  },
  {
    path: '/app/campaign',
    icon: 'MegaphoneIcon',
    name: 'Campaign',
  },
  {
    path: '/app/beneficiaries',
    icon: 'UsersIcon',
    name: 'Beneficiaries',
  },
  {
    path: '/app/vendor',
    icon: 'VendorBoothIcon',
    name: 'Vendors',
  },
  {
    path: '/app/transactions',
    icon: 'CreditCardIcon',
    name: 'Transactions',
  },
  {
    path: '/app/market',
    icon: 'ShoppingIcon',
    name: 'Market',
  },
  {
    path: '/app/cashforwork',
    icon: 'MoneyIcon',
    name: 'Cash For Work',
  },
  {
     path: '/app/settings',
    icon: 'SettingsIcon',
    name: 'Settings',
  },
  {
    path: '/app/support',
    icon: 'SupportHeadphonesIcon',
    name: 'Support',
  },
  {
    path: '/app/logout',
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
