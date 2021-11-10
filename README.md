# simple-web-example

## 설명

- 간단한 로커 관리 서비스([simple locker](https://isthereanymerch.com))의 web front 입니다.

## 의존성 패키지 설치

- ```bash
  npm install
  ```

## 실행

- ```bash
  # 개발모드로 실행
  npm run dev

  # 빌드 후 실행
  npm run build
  npm start
  ```

## 테스트

- ```bash
  npm run test
  ```

## 유의사항

- image tag 변경
  - 새 버전을 배포할 때 simple-web.yml의 image tag 값을 변경해야합니다.  
    (ex. image: a3magic3pocket/simple-web:0.0.4 -> a3magic3pocket/simple-web:0.0.5)
  - registry server(지금은 dockerhub)에 동일한 tag가 존재할 경우, 배포 시 테스트에 실패합니다.

## 관련 레포
- [github - simple-api-example](https://github.com/a3magic3pocket/simple-api-example)
- [github - simple-manifest](https://github.com/a3magic3pocket/simple-manifest)
- [github - simple-image-tag-extraction](https://github.com/a3magic3pocket/simple-image-tag-extraction)
- [docker hub - simple-web](https://hub.docker.com/r/a3magic3pocket/simple-web/tags)
- [docker hub - simple-api](https://hub.docker.com/r/a3magic3pocket/simple-api/tags)