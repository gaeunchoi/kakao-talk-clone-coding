# React + API를 이용해 카카오톡 클론코딩

## API

nextjs api route → vercel 배포  
Base URL : https://goorm-kakaotalk-api.vercel.app/api

## 디자인

Figma로 디자인 작업 후 React를 이용해 뷰 퍼블리싱  
[Figma 작업 결과](https://www.figma.com/design/ERiSlVNUasB6YjhzrPFrpG/Untitled?node-id=0-1&p=f&t=KyBfEbUaYcD8Khyt-0)

## 기능구현

### ✅ Login

![로그인](https://github.com/user-attachments/assets/d1edee4e-bc0a-4086-813a-7b8190311165)

#### 1. id 아이디, pw 비밀번호

- 이메일 형식으로 입력하도록 정규식으로 조건 체크
- 위 조건에 걸리면 '이메일로 회원가입' 아래 에러메시지 출력

#### 2. loginBtn 로그인 버튼

- 입력되지 않은 필드가 있을 경우 버튼 비활성화
- 로그인 진행중(로딩중)일 경우 버튼 비활성화(텍스트 변경 → 로그인 진행중)

#### 3. 회원가입 링크

- signup 페이지 이동

#### 4. 로그인 API

- 아이디/비밀번호가 올바르게 입력되었을 경우 '로그인 성공!' 모달 띄우고 3초후에 chatlist 페이지 이동
- 아이디가 존재하지 않을 경우 '존재하지 않는 이메일입니다' 에러메시지 출력
- 아이디에 맞는 비밀번호를 입력하지 않았을 경우 '비밀번호가 일치하지 않습니다.' 에러메시지 출력

### ✅ Signup

![회원가입](https://github.com/user-attachments/assets/365428b2-0896-4f53-8ed4-c4564b108837)

#### 1. id 아이디

- 이메일 형식으로 입력하도록 정규식으로 조건체크

#### 2. pw 비밀번호

- 8자 이상인지, 특수문자가 포함되어있는지 체크
- 아이디와 4글자 이상 겹치면 사용 불가능

#### 3. confirmPw 비밀번호 확인

- 비밀번호와 동일하게 입력되었는지 체크

#### 4. name, phoneNumber 이름, 휴대전화번호

- 이름은 따로 처리 x
- 휴대전화번호는 숫자만 가능하게 정규식으로 조건체크

#### 5. signupBtn 회원가입 버튼

- 입력되지 않은 필드가 있을 경우 버튼 비활성화
- 회원가입 진행중(로딩중)일 경우 버튼 비활성화(텍스트 변경 → 회원가입 진행중)

#### 6. 회원가입 API

- 이미 가입된 이메일 혹은 휴대폰번호가 있을 경우 에러 모달 띄우기(status === 400)
- 회원가입 완료 시 '회원가입이 완료되었습니다! 로그인 화면으로 돌아갑니다' 모달 띄우기

#### 추가

- input 요소들 컴포넌트로 분리
- alert로 띄우던 메시지들 modal로 변경

## ChatList

![채팅리스트](https://github.com/user-attachments/assets/99f0d001-4769-48be-91a0-9585cc5fcb27)


- API에서 받아온 채팅목록 뿌리기
- 프로필 사진 클릭시 프로필 보여주기
- 채팅방 클릭 시 해당 채팅방으로 이동

## UserProfile
![유저프로필](https://github.com/user-attachments/assets/1410e56b-6b9c-4413-92b5-5a18e69f638a)

- 채팅리스트에서 본인 프로필사진 클릭 시 이동
- 나와의 채팅 버튼 클릭 시 나와의 채팅방으로 이동
- 프로필편집 클릭 시 상태메시지란 input 필드로 변경

## ChatRoom
![채팅방](https://github.com/user-attachments/assets/8517b4a9-e302-42fb-85fe-d8ffc8186d01)

- API에서 받아온 채팅 내용 뿌리기(ChatBubble)
- 텍스트를 입력하지 않으면 전송버튼 비활성화
- 채팅 입력 후 전송버튼 클릭 시 채팅 보내기 API 호출(나 / 상대 체크박스 구분)
