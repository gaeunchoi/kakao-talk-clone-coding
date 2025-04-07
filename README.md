# React + API를 이용해 카카오톡 클론코딩

## API
nextjs api route → vercel 배포  
Base URL : https://goorm-kakaotalk-api.vercel.app/api

## 디자인
Figma로 디자인 작업 후 React를 이용해 뷰 퍼블리싱  
[Figma 작업 결과](https://www.figma.com/design/ERiSlVNUasB6YjhzrPFrpG/Untitled?node-id=0-1&p=f&t=KyBfEbUaYcD8Khyt-0)

## 기능구현
### ✅ Login
![Login](https://github.com/user-attachments/assets/d1edee4e-bc0a-4086-813a-7b8190311165)
- 로그인 성공 시 ChatList 전환
- 입력되지 않은 input 필드가 있는 경우 로그인 버튼 비활성화
- 아이디 입력 필드가 이메일 형식이 아닐 경우 회원가입 버튼 아래 에러메시지 출력
- 아이디/비밀번호가 존재하는 회원 정보와 일치하지 않을 경우 '로그인 정보가 올바르지 않습니다' 모달 띄우기
- 아이디/비밀번호가 올바르게 입력되었을 경우 '로그인 성공!' 모달 띄우기
- 테스트 계정 ID: admin@test.com
- 테스크 계정 PW: admin

### ✅ Signup
![Signup](https://github.com/user-attachments/assets/365428b2-0896-4f53-8ed4-c4564b108837)
- 아이디가 이메일 형식으로 입력되어있는지 체크
- 비밀번호가 8자 이상인지, 특수문자가 포함되어있는지 체크
- 비밀번호가 아이디와 4글자 이상 겹치면 사용 불가능
- 비밀번호와 비밀번호확인 입력값이 동일한지 확인
- 휴대폰번호에 -가 입력되어있는지 확인
- 회원가입 완료 시 '회원가입이 완료되었습니다! 로그인 화면으로 돌아갑니다' 모달 띄우기

## ChatList
![image](https://github.com/user-attachments/assets/b7a67426-bd12-4fa7-83f7-d2b5be6b2c20)
- API에서 받아온 채팅목록 뿌리기
- 프로필 사진 클릭시 프로필 보여주기
- 채팅방 클릭 시 해당 채팅방으로 이동
