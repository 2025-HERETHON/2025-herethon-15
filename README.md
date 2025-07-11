# 2025-herethon-15
2025 여기톤 : HER+ETHON 15팀

<hr/>

- **서비스 소개**

   "병원 찾기부터 도착까지, 함께하는 **FastER**" <br>
   "아플 땐 망설이지 말고, 가장 빠르게 병원으로, **FastER**"<br>
   
   FastER는 단순한 병원 정보 서비스가 아닙니다. <br>
   사용자의 긴급 상황을 함께 해결해주는 "**디지털 의료 동반자**"입니다.<br>
   
  우리는 Emergency를 이렇게 정의합니다: <br>
  "혼자 아플 때의 불안" → **동행자**가 되어주는 서비스<br>
  "정보 탐색의 지연" → **실시간 최적 병원 자동 추천**<br>
  "골든타임 손실" → 교통, 대기, 진료과까지 고려한 **즉시 이동 안내**<br>
  "병원까지의 길" → 현재 위치부터 **도착까지 끝까지 함께 가는 내비게이터**<br>

- **기술 스택**

  <span>프론트엔드: </span> <img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

  <span>백엔드: </span><img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"> <img src="https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=Django&logoColor=white">

  <span>기획·디자인: </span> <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

- **팀원 소개**
  
| PM | FE | FE | BE | BE |
| --- | --- | --- | --- | --- |
| <img width="200" alt="Image" src="https://github.com/user-attachments/assets/1750aadd-8292-489d-b9bf-426317766d17" /> | <img width="200" alt="Image" src="https://github.com/user-attachments/assets/f7bb7c5c-6671-4fd6-b693-2d5e1351725b" /> | <img width="200" alt="Image" src="https://github.com/user-attachments/assets/96e841cc-763b-4da0-a451-ccfc2fd25219" /> | <img width="200" alt="Image" src="https://github.com/user-attachments/assets/355ab040-af2b-42b1-8fed-1ebbc1c82d5b" /> | <img width="200" alt="Image" src="https://github.com/user-attachments/assets/e088254c-68b4-4efb-a9b2-4a39d96bef93" /> | 
| 성신여자대학교 | 동덕여자대학교 | 숙명여자대학교 | 덕성여자대학교 | 이화여자대학교 |
| 박시현 | 송이림 | 박세은 | 이가은 | 황규리 |
| [@psh1213](https://github.com/psh1213)  | [@twolim](https://github.com/twolim) | [@seeun](https://github.com/seeun) | [@egaeuni](https://github.com/egaeuni) | [@gyuuuuri](https://github.com/gyuuuuri) |


- **폴더 구조**

  ```
  📂 all_project
  └─ FastER
   ├─ FastER
   │  ├─ __init__.py
   │  ├─ asgi.py
   │  ├─ settings.py
   │  ├─ urls.py
   │  └─ wsgi.py
   ├─ accounts/
   │  ├─ __init__.py
   │  ├─ admin.py
   │  ├─ apps.py
   │  ├─ models.py
   │  ├─ tests.py
   │  └─ views.py
   ├─ hospital/
   │  ├─ __init__.py
   │  ├─ admin.py
   │  ├─ apps.py
   │  ├─ models.py
   │  ├─ tests.py
   │  └─ views.py
   ├─ direction/
   │  ├─ __init__.py
   │  ├─ admin.py
   │  ├─ apps.py
   │  ├─ models.py
   │  ├─ tests.py
   │  └─ views.py
   └─ manage.py
  ```

- **개발환경에서의 실행 방법**
  ```
  $ python manage.py migrate
  $ python manage.py runserver
  ```

- **ERD**
  <img width="1088" height="553" alt="스크린샷 2025-07-12 오전 3 39 42" src="https://github.com/user-attachments/assets/f1ce1dcc-8f5a-4ddf-9feb-9a1364f355a2" />

  <hr/>
