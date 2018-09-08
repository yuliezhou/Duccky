###### 目录结构描述
```
├─app.js
├─app.json
├─app.wxss
├─project.config.json
├─README.md
├─api                            // 接口目录
│  ├─api.js                      // 接口整合
│  ├─config.js                   // 接口地址
│  └─util.js                     
├─images
│  
├─pages
│  ├─index                       // 首页
│  ├─choosecourse                // 辅助选课
│  ├─comment                     // 评论
│  ├─coupon                      // 优惠券
│  ├─course-details              // 课程详情
│  ├─medalwall                   // 勋章墙
│  ├─mycourse                    // 我的课程
│  ├─pay                         // 确认购买
│  ├─personal                    // 我的伽满
│  ├─ranking                     // 排行榜
│  ├─recharge                    // 充值
│  ├─share-details               // 分享
│  ├─sportstest                  // 体侧记录
│  ├─store                       // 选择门店
│  ├─system                      // 课程体系
│  ├─training                    // 训练记录
│  ├─userinfo                    // 个人信息
│  ├─wallet                      // 个人钱包
│  └─webview
└─utils
   └─ ...
```

###### 当前版本
- 相关页面逻辑，均有简单注释

- 数据均是模拟真实数据结构,后台可配合我的参数名和数据结构返回数据,也可以自后端选择传递的参数等..但须修改wxml 以及 js

- images文件夹有几张模拟后台的图片.上线时可删除.减少包的大小,可以提升体验

- 如有疑惑.可以询问