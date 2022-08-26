$(document).ready(function () {
  axios({
    method: "get",
    url: "http://localhost:8000/get_data",
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      // 데이터 변수로 선언
      let accountbook_data = data.accountbook;
      let memo_data = data.memo;

      // 메모에 넣기
      for (let i = 0; i < 3; i++) {
        // 미리 만들어 놓은 메모 템플릿에 불러온 데이터를 3개만 넣을 수 있도록 했습니다.
        $(".memo-container").append(
          `<div class="memo-content-container">
              <div class="memo-content-title">
                <p style="font-size: 10px;">${memo_data[i].date}</p>
                <p style="padding-top: 5px;padding-bottom: 5px;">${memo_data[i].title}</p>
              </div>
              <div class="memo-content-content" style="padding-top: 8px;">
              ${memo_data[i].content}
              </div>
          </div>`
        );
      }
    });

  // 클릭 시 링크 이동
  $(".dashboard-accountbook").click(() => {
    location.href = "/accountbook";
  });
  $(".dashboard-memo").click(() => {
    location.href = "/memo";
  });
  $(".dashboard-calendar").click(() => {
    location.href = "calendar";
  });

  // 커서 시 애니메이션 실행

  // 캘린더 함수
  let nav = 0;
  let clicked = null;
  let events = localStorage.getItem("events")
    ? JSON.parse(localStorage.getItem("events"))
    : [];

  const calendar = document.getElementById("calendar");
  // const newEventModal = document.getElementById("newEventModal");
  const deleteEventModal = document.getElementById("deleteEventModal");
  const backDrop = document.getElementById("modalBackDrop");
  const eventTitleInput = document.getElementById("eventTitleInput");
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function openModal(date) {
    clicked = date;

    const eventForDay = events.find((e) => e.date === clicked);

    backDrop.style.display = "block";
  }

  function load() {
    const dt = new Date();

    if (nav !== 0) {
      dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

    document.getElementById(
      "monthDisplay"
    ).innerText = `${dt.toLocaleDateString("en-us", {
      month: "long",
    })} ${year}`;

    calendar.innerHTML = "";

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const daySquare = document.createElement("div");
      daySquare.classList.add("day");

      const dayString = `${year}-${month + 1}-${i - paddingDays}`;
      if (i > paddingDays) {
        daySquare.innerText = i - paddingDays;
        const eventForDay = events.find((e) => e.date === dayString);

        if (i - paddingDays === day && nav === 0) {
          daySquare.id = "currentDay";
        }

        if (eventForDay) {
          const eventDiv = document.createElement("div");
          eventDiv.classList.add("event");
          eventDiv.innerText = eventForDay.title;
          daySquare.appendChild(eventDiv);
        }
        // 함수 추가
        daySquare.addEventListener("click", () => openCalendarModal(dayString));
      } else {
        daySquare.classList.add("padding");
      }

      calendar.appendChild(daySquare);
    }
  }

  function closeModal() {
    eventTitleInput.classList.remove("error");
    // newEventModal.style.display = "none";
    deleteEventModal.style.display = "none";
    backDrop.style.display = "none";
    eventTitleInput.value = "";
    clicked = null;
    load();
  }

  function saveEvent() {
    if (eventTitleInput.value) {
      eventTitleInput.classList.remove("error");

      events.push({
        date: clicked,
        title: eventTitleInput.value,
      });

      localStorage.setItem("events", JSON.stringify(events));
      closeModal();
    } else {
      eventTitleInput.classList.add("error");
    }
  }

  function deleteEvent() {
    events = events.filter((e) => e.date !== clicked);
    localStorage.setItem("events", JSON.stringify(events));
    closeModal();
  }

  function initButtons() {
    document.getElementById("nextButton").addEventListener("click", () => {
      nav++;
      load();
    });

    document.getElementById("backButton").addEventListener("click", () => {
      nav--;
      load();
    });

    document.getElementById("saveButton").addEventListener("click", saveEvent);
    document
      .getElementById("cancelButton")
      .addEventListener("click", closeModal);
    document
      .getElementById("deleteButton")
      .addEventListener("click", deleteEvent);
    document
      .getElementById("closeButton")
      .addEventListener("click", closeModal);
  }

  initButtons();
  load();
});

// 메모 작성 모달 출력
function openCalendarModal(day) {
  // 날짜 불러오기
  // 날짜 yyyy-mm-dd 형태로 변경 로직
  var date = new Date(day);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  var dateString = year + "-" + month + "-" + day;

  // 모달 display 출력
  $(".modal-container").css("display", "block");
  // 모달 css 변경
  $(".modal-content-title").text(dateString);
}

function closeModal() {
  // 모달 display 감추기
  $(".modal-content-container").addClass("modal-close");
  setTimeout(function () {
    $(".modal-container").css("display", "none");
    $(".modal-content-container").removeClass("modal-close");
  }, 500);
  // 초기화
}
