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

  // 메모들 불러오기
  axios({
    method: "get",
    url: `http://localhost:8000/memo/getmemoes`,
  })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .then((data) => {
      let memoData = data.memo;
      // 메모 html 추가 로직
      for (let i = 0; i < memoData.length; i++) {
        console.log(memoData[i].date);
        if ($(".memo_list").children(`#${memoData[i].date}`).html()) {
          // 날짜에 대한 컨테이너가 있을 경우
          // 해당 컨테이너에 메모를 더한다
          $(".memo_list").children(`#${memoData[i].date}`).append(`
          <div class="memo" id=${memoData[i].id}>
            <div class="memo-edit memo-button" onclick="openModify('${memoData[i].id}');">수정</div>
            <div class="memo-delete memo-button" onclick="deleteMemo('${memoData[i].id}');">삭제</div>
            <div class="memo-title">${memoData[i].title}</div>
            <div class="memo-content">${memoData[i].content}</div>
          </div>`);
        } else {
          // 날짜에 대한 컨테이너가 없을 경우
          // 새로운 날짜에 대한 컨테이너를 만들고 메모를 더한다.
          $(".memo_list").append(`
          <div class="memo-container" id=${memoData[i].date}>
            <div class="memo-container-date">${memoData[i].date}</div>
          </div>`);
          // 메모를 더한다.
          $(`#${memoData[i].date}`).append(`
          <div class="memo" id=${memoData[i].id}>
            <div class="memo-edit memo-button" onclick="openModify('${memoData[i].id}');">수정</div>
            <div class="memo-delete memo-button" onclick="deleteMemo('${memoData[i].id}');">삭제</div>
            <div class="memo-title">${memoData[i].title}</div>
            <div class="memo-content">${memoData[i].content}</div>
          </div>`);
        }
        console.log(memoData[i]);
      }
    });
});

// 메모 작성 모달 출력
function openModal() {
  // 모달 display 출력
  $(".modal-container").css("display", "block");
}

function closeModal() {
  // 모달 display 감추기
  // $(".modal-container").css("display", "none");
  $(".modal-content-container").addClass("modal-close");
  setTimeout(function () {
    $("#summernote").summernote("reset");
    $("#form-title").val("");
    $(".modal-content-title").text("메모 작성");
    $(".modal-container").css("display", "none");
    $(".modal-content-container").removeClass("modal-close");
  }, 500);
  // 초기화
}

// 메모 수정 모달 출력
function openModify(id) {
  // 모달 display 출력
  $(".modal-container").css("display", "block");
  // 해당 메모 제목, 내용 가져오기
  let memo_title = $(`#${id}`).children(".memo-title").text();
  let memo_date = $(`#${id}`).siblings(".memo-container-date").text();
  let memo_content = $(`#${id}`).children(".memo-content").text();
  // 날짜 불러오기
  var date = new Date(memo_date);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  var dateString = year + "-" + month + "-" + day;
  // 모달 수정
  $(".modal-content-title").text("메모 수정");
  $("#form-title").val(memo_title);
  $("#summernote").summernote("insertText", memo_content);
  $("#form-date").attr("value", dateString);
}

// 메모 작성 데이터 전송
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
  let url = "";
  if ($(".modal-content-title").text() === "메모 수정") {
    // 메모 수정
    url = "modify";
  } else {
    // 새로운 메모 작성
    url = "write";
  }

  axios({
    method: "post",
    url: `http://localhost:8000/memo/${url}`,
    data: {
      title: postTitle,
      date: postDate,
      content: postContent,
    },
  }).then((data) => {
    // 날짜 별로
    // $(".memo_list").append(html);
    // 에디터 초기화
    $("#summernote").summernote("reset");
    $(".alert").text("");
    // 모달 숨기기
    $(".modal-container").css("display", "none");
  });
}

function deleteMemo(id) {
  axios({
    method: "delete",
    url: "http://localhost:8000/memo/delete",
    data: {
      id: id,
    },
  }).then((res) => {
    if (res.status === 200) {
      // 삭제하고 리로드한다.
      location.reload();
    }
  });
}
