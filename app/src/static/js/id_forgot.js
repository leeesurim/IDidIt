const getId = () => {
  // 아이디와 이메일 변수로 저장
  let name = $("#name").val();
  let email = $("#email").val();
  // 아이디 찾기 axios 함수 작성
  axios({
    method: "post",
    url: "http://localhost:8000/forgot/get_id",
    data: {
      // 아이디와 이메일을 보냄
      name: name,
      email: email,
    },
  }).then((res) => {
    if (res.status == 200) {
      //
      if (res.data.id === undefined) {
        alert(`이름과 이메일을 다시 한번 확인해주세요.`);
      } else {
        alert(`회원님의 아이디는 ${res.data.id} 입니다.`);
        document.location.href = "/login";
      }
    }
  });
};

