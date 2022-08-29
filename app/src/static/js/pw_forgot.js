const getPw = () => {
  // 아이디와 이메일 변수로 저장
  let id = $("#id").val();
  let name = $("#email").val();
  let email = $("#email").val();

  // 아이디 찾기 axios 함수 작성
  axios({
    method: "post",
    url: "http://localhost:8000/forgot/pw/certify_post",
    data: {
      // 아이디와 이메일을 보냄
      id: id,
      name: name,
      email: email,
    },
  }).then((res) => {
    if (res.status == 200) {
      if (res.data.id === undefined) {
        alert(`입력한 정보가 일치하지 않습니다.`);
      } else {
        alert(`회원님의 아이디는 ${res.data.id} 입니다.`);
      }
    }
  });
};
