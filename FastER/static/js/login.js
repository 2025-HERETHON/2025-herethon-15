const emailInput = document.getElementById("id_username");
const loginBtn = document.getElementById("btn1");
const emailErrorMsg = document.getElementById("emailError");
const pwErrorMsg = document.getElementById("pwError");
const passwordInput = document.getElementById("id_password");
const eyeOff = document.getElementById("eyeOff");
const eyeOn = document.getElementById("eyeOn");

//email 형식 검사
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//로그인 버튼 클릭 시 처리
loginBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // 모든 에러 초기화
  emailErrorMsg.classList.remove("visible");
  pwErrorMsg.classList.remove("visible");
  emailInput.classList.remove("input-error");
  passwordInput.classList.remove("input-error");

  // 이메일 형식 검증
  if (!isValidEmail(email)) {
    emailErrorMsg.classList.add("visible");
    emailInput.classList.add("input-error");
    return;
  } else {
    emailErrorMsg.classList.remove("visible");
    emailInput.classList.remove("input-error");
  }

  // 비밀번호 검사
  if (email === "faster1@gmail.com" && password === "fast123") {
    localStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("justLoggedIn", "true");
    location.href = "/menu/";
  } else if (email === "faster1@gmail.com" && password !== "fast123") {
    pwErrorMsg.textContent = "비밀번호가 일치하지 않습니다.";
    pwErrorMsg.classList.add("visible");
    passwordInput.classList.add("input-error");
  } else {
    pwErrorMsg.textContent = "이메일 또는 비밀번호가 올바르지 않습니다.";
    pwErrorMsg.classList.add("visible");
    passwordInput.classList.add("input-error");
  }
});

// 이메일 입력 시 에러 메시지 제거
emailInput.addEventListener("input", () => {
  emailErrorMsg.classList.remove("visible");
  emailInput.classList.remove("input-error");
});

// 비밀번호 입력 시 에러 메시지 제거 + 눈 아이콘 표시
passwordInput.addEventListener("input", () => {
  pwErrorMsg.classList.remove("visible");
  passwordInput.classList.remove("input-error");

  if (passwordInput.value.length > 0) {
    eyeOff.style.display = "inline";
    eyeOn.style.display = "none";
    passwordInput.type = "password"; // 초기화
  } else {
    eyeOff.style.display = "none";
    eyeOn.style.display = "none";
    passwordInput.type = "password";
  }
});

// 비밀번호 보기 토글
eyeOff.addEventListener("click", () => {
  passwordInput.type = "text";
  eyeOff.style.display = "none";
  eyeOn.style.display = "block";
});
eyeOn.addEventListener("click", () => {
  passwordInput.type = "password";
  eyeOn.style.display = "none";
  eyeOff.style.display = "block";
});
