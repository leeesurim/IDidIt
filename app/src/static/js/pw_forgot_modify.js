function resetting() {
        var form = document.getElementById('form_login');
            if ( !form.checkValidity() ) {
              form.reportValidity();
              console.log( "reportValidity" );
              return false;
            }

        let password = $('#password').val();
        let password_check = $('#password_check').val();
        if (password === password_check){
          axios({
            method: 'post',
            url: '/forgot/pw/modify_post',
            data: { password: password },
          })
            .then((rep) => {
              return rep.data;
            })
            .then((data) => {
              alert(data);
              document.location.href = '/login';
            });
          }
        else alert('일치하지 않습니다.')
      }

      
      function checkPassword(obj) {
        if (obj.value != $("#password").val()) {
          $(".checkPassword").css("color", "red");
          $(".checkPassword").text(
            "비밀번호가 일치하지 않습니다. 다시 입력해 주세요."
          );
          $("#password_check").focus();
        } else {
          $(".checkPassword").css("color", "blue");
          $(".checkPassword").text("비밀번호가 일치합니다.");
        }
      }

      $(document).ready(function(){
        $("button").hover(function(){
            $(".login_img").attr("src","/img/pw_modify_pink.png")
        },
        function(){$(".login_img").attr("src","/img/pw_modify_grey.png")})
    });