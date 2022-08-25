$(document).ready(function () {
  // summernote 라이브러리 실행 함수
  $("#summernote").summernote({
    height: 400,
    toolbar: [
      // 폰트, 색깔, 리스트 기능 활성화
      ["font", ["bold", "underline", "clear"]],
      ["color", ["color"]],
      ["para", ["ul", "ol", "paragraph"]],
    ],
  });
});

// 모달 출력
function openModal() {
  // 모달 display 출력
  $(".modal-container").css("display", "block");
}
function closeModal() {
  // 모달 display 감추기
  $(".modal-container").css("display", "none");
}
// 데이터 전송
function sendForm() {
  if ($("#summernote").summernote("isEmpty")) {
    $(".alert")
      .text("메모를 입력하세요")
      .css("color", "red")
      .css("text-align", "center");

    return false;
  }
  var form = document.getElementById("form_content");
  var postTitle = $("#form-title").val();
  var postContent = form.content.value;
  var postDate = $("#form-date").val();

  //   console.log(postTitle, postContent, postDate);
  axios({
    method: "post",
    url: "http://localhost:8000/memo/write",
    data: {
      title: postTitle,
      date: postDate,
      content: postContent,
    },
  }).then((data) => {
    let html = ;
    $(".memo_list").append(html);
    
    // 에디터 초기화
    $("#summernote").summernote("reset");
    $(".alert").text("");
    // 모달 숨기기
    $(".modal-container").css("display", "none");
  });

  // .then((rep) => {
  //   return rep.data;
  // })
}
