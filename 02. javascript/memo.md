1. moment js cdn에서 가져온 파일로 npm 없이 라이브러리 사용하는거 해보기
    https://momentjs.com/downloads/moment.js
1. npm 없이 es6 쓰는 법
    1. https://nodejs.org/api/packages.html#determining-module-system
    1. https://nodejs.org/api/esm.html
1. package.json 내용
    1. https://docs.npmjs.com/cli/v9/configuring-npm/package-json
1. readline-sync 윈도우 한글 오류: powershell 병신 -> 해결 못한 라이브러리도 병신
    ```shell
    $env:LC_ALL='C.UTF-8'
    [System.Console]::InputEncoding = [System.Console]::OutputEncoding = [System.Text.Encoding]::UTF8
    ```