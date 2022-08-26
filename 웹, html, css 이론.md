# 목차

- [목차](#목차)
- [웹, 네트워크](#웹-네트워크)
  - [웹 브라우저 구조](#웹-브라우저-구조)
  - [rest와 rest api](#rest와-rest-api)
  - [SSR과 CSR](#ssr과-csr)
- [html](#html)
  - [async와 defer](#async와-defer)
  - [시멘틱태그](#시멘틱태그)
    - [section vs article](#section-vs-article)
    - [image vs background-image](#image-vs-background-image)
  - [속성(attribute)과 property](#속성attribute과-property)
    - [비표준 속성](#비표준-속성)
  - [form 태그](#form-태그)
    - [GET과 POST](#get과-post)
- [css](#css)
  - [text-align사용법](#text-align사용법)
  - [input:focus에서 outline변경](#inputfocus에서-outline변경)
  - [class 선택자 주의점](#class-선택자-주의점)
  - [float 속성](#float-속성)
  - [margin써야하는 경우](#margin써야하는-경우)
    <br>

# 웹, 네트워크

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
  - RESTful API를 위한 설계 규칙 1. 소문자를 사용 2. 언더바( \_ ) 대신 하이픈( - )을 사용 3. 마지막에 슬래시 ( / ) 를 포함하지 않는다 4. 행위를 포함하지 않는다 5. 파일 확장자는 URL에 포함시키지 않는다 6. 자원에는 형용사, 동사가 아닌 명사를 사용하며, 컨트롤 자원을 의미하는 경우 예외적으로 동사를 사용
    <br>

## SSR과 CSR

![24](https://user-images.githubusercontent.com/110578739/185772826-20a74800-2eed-4c2f-aa7b-703793027551.jpg)
장점

- 모든 데이터가 이미 HTML에 담겨진채로 브라우저에 전달되기 때문에 검색엔진 최적화(SEO)에 유리
- 서버로부터 화면을 렌더 하기 위한 필수적인 요소를 먼저 가져오기 때문에 초기로 로딩 속도가 빠름

단점

- TTV(Time To View)와 TTI(Time To Interact) 간에 시간 간격이 존재, 사용자가 버튼을 클릭하거나 이동하려고 해도 아무런 반응이 없을 수 있다
- 매번 페이지를 요청할 때마다 새로 고침 되기 때문에 사용자 경험이 다소 떨어진다
- 서버측 부하가 증가, 페이지를 요청할 때마다 서버에서 페이지를 구성하는 모든 리소스를 준비해서 응답하므로 서버 부담이 증가  
  <br>

![25](https://user-images.githubusercontent.com/110578739/185772830-9fd31043-157b-4fc6-a880-bc244daa6c35.jpg)
장점

- 변경된 부분만 요청함으로써 서버의 부담을 줄일 수 있다
- 페이지 안에 컨텐츠를 클릭하여 다음 단계로 전환 하는 과정에서 링크가 없기 때문에 깜빡임 없이 부드러운 이동

단점

- 자바스크립트를 사용하여 사용자와 상호 작용 후에 페이지 내용을 로드하기 때문에 SEO과정에서 빈 페이지 처럼 보이게 됩니다

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

## 시멘틱태그

- 시멘틱 태그 : "의미가 있는 태그"라는 뜻, 기존의 div, span과 같이 의미 없는 태그를 사용하는 대신에 알아보기 쉽게하기위하여 사용된다

![26](https://user-images.githubusercontent.com/110578739/185824171-b6956656-144b-4a81-808e-6babf6e3804a.png)

- `header` : 제목, 웹싸이트를 나타내는 로고, 검색 폼, 작성자 이름 등의 요소도 포함할 수 있다

- `nav` : header 안에 여러가지 메뉴들이 모여있다면, div로 나누지 말고 nav 태그를 사용

- `footer` : 웹사이트 제일 아래에 부가적인 정보(출처)나 링크가 들어있다면 사용

- `main` : 현재 웹사이트에서 중요한 컨텐츠는 main 태그 안에

- `aside` : main 안에서도 페이지의 컨텐츠와 직접적인 상관이 없는 내용들은 여기에 집어넣는 게 좋다 ex) 광고, 페이지와 연관된 다른 링크들 등

- `article, section` : main 안에서도 div로만 구성하기보다는 용도에 따라서 이 두개의 tag를 사용해볼 수있다

### section vs article

- `article` : 문서 혹은 요소가 독립적으로 존재할 수 있을 때 사용
- `section` : 논리적으로 관계 있는 문서 혹은 요소를 분리할 때 사용

### image vs background-image

- `background-image` : 문서의 내용과는 별개로 스타일링 목적만을 위해서 존재한다면 사용
- `image` : 문서의 내용을 보충해주거나 관계있는 그림을 삽입할때 사용  
  <br>

## 속성(attribute)과 property

- 브라우저는 웹페이지를 만나면 HTML을 읽어(파싱) DOM 객체를 생성한다. 요소 노드(element node)에서 대부분의 표준 HTML 속성(attribute)은 DOM 객체의 프로퍼티(property)가 된다

- 예를 들어 `<body id=”page”>`태그가 있다면 id 속성은 DOM 객체 프로퍼티로 전환 돼 `body.id=”page”`로 접근 가능 (태그의 속성은 숫자로 넘겨도 문자열이 된다 ex) `<body id=3>`, `body.id` 는 `'3'`으로 표현)

- HTML에서 태그는 복수의 속성을 가질 수 있다. 브라우저는 HTML을 파싱해 DOM 객체를 만들 때 HTML 표준 속성을 인식하고, 이 표준 속성을 사용해 DOM 프로퍼티를 만든다

- 따라서 요소가 id 같은 표준 속성으로만 구성되어 있다면, 이에 대응하는 프로퍼티가 자연스레 만들어진다. 하지만 표준이 아닌 속성일 때는 상황이 달라진다

- 한 요소에선 표준인 속성이 다른 요소에선 표준이 아닐 수 있다는 점에도 주의해야 한다. `type`은 `<input>`요소에서 표준이지만, `<body>`에선 아니다

```html
<body id="”body”" type="”…”">
  <input id="”input”" type="”text”" />
  <script>
    alert(input.type); // text
    alert(body.type); // undefined: type은 body의 표준 속성이 아니므로 DOM 프로퍼티가 생성되지 않습니다
  </script>
</body>
```

### 비표준 속성

- 다양한 방식으로 활용되는 비표준 속성에는 한 가지 문제가 있다
  비표준 속성을 사용해 코드를 작성했을 때 시간이 지나서 나중에 그 속성이 표준으로 등록되면 문제가 발생할 수 있다

- 그래서 비표준 속성을 사용하기 위해 미리 약속된 방식이 존재, `data-*`속성

- `data-`로 시작하는 속성은 모두 dataset이라는 프로퍼티에 저장, 예를 들어서 data-status라는 속성이 있다면, element.dataset.status라는 프로퍼티에 접근해서 그 값을 가져올 수 있다  
  <br>

## form 태그

- `<form>` 태그는 웹 페이지에서의 입력 양식전체를 감싸는 태그이다 (로그인 창이나, 회원가입 폼 등)
- 텍스트 필드에 글자를 입력하거나, 체크박스나 라디오 버튼을 클릭하고 제출 버튼을 누르면 백엔드 서버에 양식이 전달되어 정보를 처리
- `<form>` 태그 필수 속성

  - method : GET 또는 POST

  - name : 식별을 위한 이름 지정

  - action : 전송할 서버 쪽의 script 파일을 지정, 전송되는 서버 url 또는 html 링크

- `<form>` 태그 내부에는 여러 다른 태그들을 사용해서 입력 폼을 구성한다

  - `<input>`
  - `<label>`
  - `<select>, <option`>
  - `<datalist>`
  - `<fieldset>,<legend>`
  - `<button>` 등등

- `<form>`태그 접근시 `.form의name`을 사용해서 간단하게 접근할 수 있다

```jsx
<form
  onSubmit={(event) => {
    event.preventDefault();
    const title = event.target.title.value;
    // form태그 내부에서 name이 title인 태그의 값에 접근
    const body = event.target.body.value;
    // form태그 내부에서 name이 body인 태그의 값에 접근
    props.onCreate(title, body);
  }}
>
  <p>
    <input type="text" name="title" placeholder="title" />
  </p>
  <p>
    <textarea name="body" placeholder="body"></textarea>
  </p>
  <p>
    <input type="submit" value="Create" />
  </p>
</form>
```

### GET과 POST

- Get은 서버에서 어떤 데이터를 가져와서 보여줄때 사용, 어떤 값이나 내용, 상태등을 바꾸지 않는 경우에 사용
- Post는 서버상의 데이터 값이나 상태를 바꾸기 위해서 사용

| HTTP 메소드      | GET                                          | POST                        |
| ---------------- | -------------------------------------------- | --------------------------- |
| URL 예시         | http://localhost:3000/login?id=admin&pw=1234 | http://localhost:3000/login |
| 데이터 담기는곳  | HTTP 패킷 Header                             | HTTP 패킷 Body              |
| 리소스 전달 방식 | 쿼리스트링                                   | HTTP Body                   |
| HTTP 응답 코드   | 200                                          | 201                         |
| URL 데이터 노출  | o                                            | x                           |
| 브라우저 기록    | o                                            | x                           |
| 북마크 추가      | o                                            | x                           |
| 데이터 길이 제한 | o                                            | x                           |
| idempotent       | o                                            | x                           |

**idempotent : 연산을 여러번하여도 결과가 달라지지 않는 성질**
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
  <br>

## margin써야하는 경우

![27](https://user-images.githubusercontent.com/110578739/186712726-10531fa4-dfbb-4ef0-889d-a2d2a7b9f3d0.jpg)

- box1~box3을 다 `margin-top: 30px; margin-bottom: 10px;` 주더라도
  box1과 box2 사이에 margin이 40px이 아니라 30px이 된다
- 즉 margin은 여백끼리 겹친다
- padding은 겹쳐지지 않는다
