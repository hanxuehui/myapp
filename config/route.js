
  export default [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user',
          routes: [
            {
              name: 'login',
              path: '/user/login',
              component: './user/Login',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      path: '/',
      redirect: '/welcome',
    },
    {
      path: '/welcome',
      name: 'welcome',
      icon: 'smile',
      component: './Welcome',
    },
    // {
    //   path: '/admin',
    //   name: 'admin',
    //   icon: 'crown',
    //   access: 'canAdmin',
    //   component: './Admin',
    //   routes: [
    //     {
    //       path: '/admin/sub-page',
    //       name: 'sub-page',
    //       icon: 'smile',
    //       component: './Welcome',
    //     },
    //     {
    //       component: './404',
    //     },
    //   ],
    // },
    {
      path: '/dashboard',
      name: 'dashboard',
      icon: 'dashboard',
      routes: [
        {
          path: '/dashboard',
          redirect: '/dashboard/analysis',
        },
        {
          name: 'analysis',
          icon: 'smile',
          path: '/dashboard/analysis',
          component: './dashboard/analysis',
        },
        {
          name: 'monitor',
          icon: 'smile',
          path: '/dashboard/monitor',
          component: './dashboard/monitor',
        },
        {
          name: 'workplace',
          icon: 'smile',
          path: '/dashboard/workplace',
          component: './dashboard/workplace',
        },
      ],
    },
    // {
    //   name: 'account',
    //   icon: 'user',
    //   path: '/account',
    //   routes: [
    //     {
    //       path: '/account',
    //       redirect: '/account/center',
    //     },
    //     {
    //       name: 'center',
    //       icon: 'smile',
    //       path: '/account/center',
    //       component: './account/center',
    //     },
    //     {
    //       name: 'settings',
    //       icon: 'smile',
    //       path: '/account/settings',
    //       component: './account/settings',
    //     },
    //   ],
    // },
    {
      name: '人员管理',
      icon: 'user',
      path: '/peopleMage',
      routes: [
        {
          path: '/peopleMage',
          redirect: '/peopleMage/management',
        },
        {
          name: '人员调遣记录',
          icon: 'smile',
          path: '/peopleMage/management',
          component: './peopleMage/management',
        },
      ],
    },
    {
      name: '信息库',
      icon: 'user',
      path: '/informaBase',
      routes: [
        {
          path: '/informaBase',
          redirect: '/informaBase/profeSubcontract',
        },
        {
          name: '内部人员信息',
          icon: 'smile',
          path: '/informaBase/internalPerson',
          component: './informaBase/internalPerson', 
        },
        {
          name: '检修人员信息',
          icon: 'smile',
          path: '/informaBase/overhaul',
          component: './informaBase/overhaul', 
        },
        {
          name: '专业分包信息',
          icon: 'smile',
          path: '/informaBase/profeSubcontract',
          component: './informaBase/profeSubcontract',
        },
        {
          name: '劳务分包信息',
          icon: 'smile',
          path: '/informaBase/laborSubcontract',
          component: './informaBase/laborSubcontract', 
        },
      ],
    },
    {
      component: './404',
    },
  ];
  