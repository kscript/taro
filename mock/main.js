let mockData = require('./index.js')();
module.exports = (req, res, next) => {
  let url = req.url.slice(1);
  let data = mockData[url];
  
  let method = req.method.toLowerCase();
  let result = {};
  let headConfig = {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'text/html;charset=utf-8'
  }

  // 验证数据
  if(data){
    // 验证方法
    if(data[method]){
      res.writeHead(200, headConfig);
      result = data[method];
    } else {
      res.writeHead(405, headConfig);
      result = {
        code: 405,
        message: '方法错误'
      }
    }
  } else {
    res.writeHead(404, headConfig);
    result = {
      code: 404,
      message: '请求地址不存在'
    }
  }
  if(data.format){
    result = data.format(method, req.body, result);
  }
  res.end(JSON.stringify(result));
}