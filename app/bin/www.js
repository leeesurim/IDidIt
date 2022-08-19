const app = require('../index');
const port = 8000;

// 서버 띄우기
app.listen(port, ()=>{
    console.log( "Server Port : ", port );
});