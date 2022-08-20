# 목차

- [목차](#목차)
- [웹](#웹)
  - [웹 브라우저 구조](#웹-브라우저-구조)
  - [rest와 rest api](#rest와-rest-api)
- [html](#html)
  - [async와 defer](#async와-defer)
- [css](#css)
  - [text-align사용법](#text-align사용법)
  - [input:focus에서 outline변경](#inputfocus에서-outline변경)
  - [class 선택자 주의점](#class-선택자-주의점)
  - [float 속성](#float-속성)
    <br>

# 웹

## 웹 브라우저 구조

- 웹 브라우저 : 웹 브라우저(Web Browser)는 사용자가 선택한 리소스를 서버에 요청하고 브라우저 창에 표시하는 응용 소프트웨어다
  ![12](https://user-images.githubusercontent.com/110578739/185282092-71793062-e168-4d7b-ac56-9ddb2576716e.png)

  - 웹 브라우저의 기본 구조  
    <br>

- 사용자 인터페이스(User Interface) :
  웹 페이지에서 사용할 수 있는 모든 시각적 요소
  페이지 창을 제외한 나머지 모든 부분(예: 주소 표시줄, 이전/다음 버튼, 북마크 메뉴 등)

- 브라우저 엔진(Browser Engine) :
  브라우저의 핵심 구성 요소로 사용자 인터페이스와 렌더링 엔진 사이의 동작을 제어
  사용자 인터페이스에서 받은 입력을 렌더링 엔진에 쿼리 및 처리

- 렌더링 엔진(Rendering Engine) :
  사용자가 요청한 콘텐츠를 화면에 표시
  HTML 문서 내 HTML과 CSS를 파싱(해석)하여 사용자 인터페이스에 출력

- 통신(Networking) :
  HTTP 또는 FTP와 같은 표준 프로토콜을 사용하여 네트워크 호출에 사용
  또한 인터넷 통신과 관련된 보안 문제를 처리

- UI 백엔드(UI Backend) :
  select box / input 등 위젯을 형성하는 데 사용

- 자바스크립트 해석기(JS Interpreter) :
  자바스크립트 코드를 분석 및 실행

- 데이터 저장소(Data Persistence) :
  데이터를 정장하는 계층으로 쿠키와 같은 모든 종류의 데이터를 저장
  LocalStorage, IndexedDB, WebSQL 및 FileSysyem과 같은 저장소 메커니즘 지원  
  <br>

## rest와 rest api

- REST(Representational State Transfer) : 자원을 이름으로 구분하여 해당 자원의 상태를 주고받는 모든 것
- 구체적으로  
  1.HTTP URI(Uniform Resource Identifier)를 통해 자원(Resource)을 명시  
  2.HTTP Method(POST, GET, PUT, DELETE)를 통해  
  3.해당 자원(URI)에 대한 CRUD Operation을 적용하는 것을 의미 (CRUD = Creat, Read, Update, Delete)
- REST의 구성요소

  1. 자원(Resource) : HTTP URL
  2. 자원에 대한 행위 : HTTP Method
  3. 자원에 대한 표현(Representations)  
     <br>

- REST API : REST의 원리를 따르는 API
- RESTful API : REST의 원리를 따르면서 REST API의 설계규칙을 올바르게 지킨 API를 지칭하는 말
  - RESTful API를 위한 설계 규칙
    1. 소문자를 사용
    2. 언더바( \_ ) 대신 하이픈( - )을 사용
    3. 마지막에 슬래시 ( / ) 를 포함하지 않는다
    4. 행위를 포함하지 않는다
    5. 파일 확장자는 URL에 포함시키지 않는다
    6. 자원에는 형용사, 동사가 아닌 명사를 사용하며, 컨트롤 자원을 의미하는 경우 예외적으로 동사를 사용

# html

## async와 defer

- 파싱 : 네트워크로 받은 HTML과 CSS 파일을 토큰화 시키고 Parse Tree를 생성, 이 Parse Tree를 DOM 트리로 만들어 렌더링 한다

_head태그 내부의 script태그_

```html
<head>
  <script src="script.js"></script>
</head>
```

![13](https://user-images.githubusercontent.com/110578739/185295987-335b772f-4171-44fd-83eb-8ef82b9ba425.png)  
<br>

_body태그 마지막의 script태그_

```html
<body>
  <h1>제목</h1>
  <script src="script.js"></script>
</body>
```

![14](https://user-images.githubusercontent.com/110578739/185296206-0f4d3498-b221-44f3-ae38-34f6b626122a.png)  
<br>

_head태그 내부에 async 사용_

```html
<head>
  <script async src="script.js"></script>
</head>
```

![15](https://user-images.githubusercontent.com/110578739/185296297-02cbf0a5-d0b2-4c6a-a637-df7e4fb8569c.png)  
<br>

_head태그 내부에 defer 사용_

```html
<head>
  <script defer src="script.js"></script>
</head>
```

![16](https://user-images.githubusercontent.com/110578739/185296302-4eea0d0a-e969-413b-a11d-f02fa1a80325.png)  
<br>

# css

## text-align사용법

- `text-align`은 inline요소를 수평측에서 특정 위치로 정렬할 때 사용한다
- `text-align`은 부모 block요소에 적용해주어야한다(그럼 자식 inline요소들이 정렬된다)
- inline요소에 직접 적용해야할때는 `display : inline-block` 사용
- 주의해야 할 점은 block요소 내부에 쓰여진 text자체는 inline요소이다, 부모 block요소에 `text-aling: center`을 사용하면 자식 block요소 내부의 text들이 각자 본인들의 block크기 안에서 가운데 정렬된다  
  <br>

## input:focus에서 outline변경

- `input:focus`에서 outline의 `border-radius`스타일이 적용되지 않는다
- `outline: none`하고 `border` 또는 `box-shadow` 쓰기  
  <br>

## class 선택자 주의점

- `.class1.class2` : 두 클래스를 모두 갖는 요소 선택
- `.class1 .class2` : `class1` 가진 요소의 자손 중 `class2` 갖는 모든 요소 선택  
  <br>

## float 속성

- `float:left` 또는 `float:right`는 문서 기본 흐름에서 벗어나 왼쪽 또는 오른쪽에 부유하도록 하는 것
- `float` 사용시 `display:inline-block`을 한것과 동일한 효과도 부여된다
