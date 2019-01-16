import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'http://a.hiphotos.baidu.com/zhidao/pic/item/dc54564e9258d109f3abc3c2d758ccbf6c814d71.jpg',
    name: 'admin'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1),
    'role|0-2': 1,
  }));
}

export { LoginUsers, Users };
