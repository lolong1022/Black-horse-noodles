import {
  Button,
  NavBar,
  Form,
  Field,
  Search,
  Tabbar,
  TabbarItem,
  Grid,
  Icon,
  GridItem,
  Swipe,
  SwipeItem,
  Dialog,
  DropdownMenu,
  DropdownItem,
  Picker,
  Popup
} from 'vant'
const vants = [
  Button,
  NavBar,
  Form,
  Field,
  Search,
  Tabbar,
  TabbarItem,
  Grid,
  Icon,
  GridItem,
  Swipe,
  SwipeItem,
  Dialog,
  DropdownMenu,
  DropdownItem,
  Picker,
  Popup
]
const vantsFilter = (Vue) => {
  vants.forEach((item) => Vue.use(item))
}
export default vantsFilter
