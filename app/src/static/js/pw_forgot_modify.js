function resetting() {
        let password = $('#password').val();
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