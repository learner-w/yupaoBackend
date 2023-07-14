//  定义一些路由
import Index from "../pages/Index.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import SearchPage from "../pages/SearchPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import TeamJoinPage from "../pages/TeamJoinPage.vue";
import TeamCreatedPage from "../pages/TeamCreatedPage.vue";


const routes = [
    { path: '/', component: Index },
    { path: '/team', title:'找队伍', component: TeamPage },
    { path: '/user', title:'个人信息', component: UserPage  },
    { path: '/user/update', title:'更新信息', component: UserUpdatePage  },
    { path: '/search', title:'找伙伴', component:  SearchPage },
    { path: '/user/edit', title:'修改信息', component:  UserEditPage },
    { path: '/user/list', title:'找队伍', component:  SearchResultPage },
    { path: '/user/login', title:'登录', component:  UserLoginPage },
    { path: '/user/team/join', title:'我加入的队伍', component:  TeamJoinPage },
    { path: '/user/team/created', title:'我创建的队伍', component:  TeamCreatedPage },
    { path: '/team/add', title:'添加队伍', component:  TeamAddPage },
    { path: '/team/update', title:'更新队伍', component:  TeamUpdatePage },
]

export default routes;