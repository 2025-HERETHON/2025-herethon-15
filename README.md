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
| <img style="width:200px" src="https://github.com/user-attachments/assets/26a029a5-1bcd-4654-97d1-3d8e4068f5ed" /> | <img style="width:200px" src="https://github.com/user-attachments/assets/ee14b2c5-aa7f-471f-bff9-972819ef236a" /> | <img style="width:200px;" alt="Image" src="https://github.com/user-attachments/assets/50a48f1f-c312-4a6e-9d6f-f441745d4aa9" /> | <img style="width:200px" src="https://github.com/user-attachments/assets/c3d4d10b-7252-47d3-b424-1c6cdeab326c" /> | <img style="width:200px" src="https://github.com/user-attachments/assets/feff244e-67f3-4b95-b148-4ee476d857a8" /> | 
| 성신여자대학교 | 동덕여자대학교 | 숙명여자대학교 | 덕성여자대학교 | 이화여자대학교 |
| 박시현 | 송이림 | 박세은 | 이가은 | 황규리 |
| [@daram62](https://github.com/daram62)  | [@twolim](https://github.com/twolim) | [@seeun](https://github.com/seeun) | [@egaeuni](https://github.com/egaeuni) | [@gyuuuuri](https://github.com/gyuuuuri) |


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
  <hr/>
