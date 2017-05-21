### 接口格式
##### 1. 注册

```
// http://localhost:3000/register

// 返回实例
{
    code: 0,
    msg: "用户名已存在"
}

{
    code: 0,
    msg: "注册成功",
    data: {
        username: "test4",
        shareId: "",
    }
}

{
    code: 2,
    msg: {服务器错误信息}
}
```

##### 2. 登录

```
// http://localhost:3000/login
{
    code: 0,
    msg: "登录成功",
    data: {
        id: 1,
        username: "test",
        password: "123456",
        shareId: "600129",
        createdAt: "2017-05-20T09:07:09.000Z",
        updatedAt: "2017-05-20T09:07:09.000Z"
    }
}

// 登录失败时候，将会直接刷新登录页面，没有返回值。

```
##### 3. 获取历史数据
```
// http://localhost:3000/historyData?code=cn_300228&start=20130930&end=20131231
// code, start, end参数 必要
// 成功
{
    code: 0,
    msg: "ok",
    data: [
        {
            status: 0,
            hq: [
                [
                    "2013-12-31",
                    "80.00",
                    "79.00",
                    "-1.22",
                    "-1.52%",
                    "77.20",
                    "80.00",
                    "20104",
                    "15832.18",
                    "2.77%"
                ],
                ...
            ],
        }
    ]
}
// 参数错误
{
    code: 1,
    msg: '参数错误，请检查code, start, end参数是否正确！',
}

// 服务器错误
{
    code: 2,
    msg: err.message,
}

```
