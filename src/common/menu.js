import { isUrl } from '../utils/utils';

const menuData = [
  {
    name:'基础篇',
    icon:'dashboard',
    path:'d3base',
    children:[
      {
        name:'array',
        path:'array',
      },
      {
        name:'dom',
        path:'dom',
      },
      {
        name:'比例尺',
        path:'scale',
      },
      {
        name:'刻度',
        path:'axis',
      },
      {
        name:'色彩',
        path:'color',
      },
      {
        name:'路径生成器',
        path:'path',
      },
      {
        name:'过度和动画',
        path:'transition',
      }
    ]
  },
  {
    name:'绘图篇',
    icon:'dashboard',
    path:'d3Svg',
    children:[
      {
        name:'线',
        path:'line',
      },
      {
        name:'直方',
        path:'zhifan',
      },
      {
        name:'基本',
        path:'jiben',
      },
      {
        name:'散点图',
        path:'sandian',
      },
      {
        name:'折线图',
        path:'zhexian'
      },
      {
        name:'饼图',
        path:'pie'
      },
      {
        name:'力导向图',
        path:'forceLine'
      },
      {
        name:'树状图',
        path:'tree'
      },
      {
        name:'集群',
        path:'dendrogram'
      },
      {
        name:'地图',
        path:'ditu'
      },
      {
        name:'雷达',
        path:'leida'
      },{
        name:'雷达2(换数据格式)',
        path:'leida2'
      },
      {
        name:'双线(换数据格式)',
        path:'dbline'
      },
      {
        name:'雷达3',
        path:'leida3'
      },{
        name:"柱状",
        path:"bar"
      },{
        name:"饼图2",
        path:"pie2"
      },
      {
        name:"k线",
        path:"kLine"
      },
      {
        name:"钥匙图",
        path:"keyChart"
      }

    ]
  },
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        path: 'analysis',
      },
      {
        name: '监控页',
        path: 'monitor',
      },
      {
        name: '工作台',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: '表单页',
    icon: 'form',
    path: 'form',
    children: [
      {
        name: '基础表单',
        path: 'basic-form',
      },
      {
        name: '分步表单',
        path: 'step-form',
      },
      {
        name: '高级表单',
        authority: 'admin',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: '列表页',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: '查询表格',
        path: 'table-list',
      },
      {
        name: '标准列表',
        path: 'basic-list',
      },
      {
        name: '卡片列表',
        path: 'card-list',
      },
      {
        name: '搜索列表',
        path: 'search',
        children: [
          {
            name: '搜索列表（文章）',
            path: 'articles',
          },
          {
            name: '搜索列表（项目）',
            path: 'projects',
          },
          {
            name: '搜索列表（应用）',
            path: 'applications',
          },
        ],
      },
    ],
  },
  {
    name: '详情页',
    icon: 'profile',
    path: 'profile',
    children: [
      {
        name: '基础详情页',
        path: 'basic',
      },
      {
        name: '高级详情页',
        path: 'advanced',
        authority: 'admin',
      },
    ],
  },
  {
    name: '结果页',
    icon: 'check-circle-o',
    path: 'result',
    children: [
      {
        name: '成功',
        path: 'success',
      },
      {
        name: '失败',
        path: 'fail',
      },
    ],
  },
  {
    name: '异常页',
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
      {
        name: '触发异常',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
