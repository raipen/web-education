# 과제4
3주차 과제를 github에 올리기

# 스터디 요약
## 1. git
git이란?
간단히 말하자면 **git으로 관리할 폴더**(repository)를 만들고, 그 폴더 안에 있는 파일들의 변화를 **commit**으로 저장하는 것이다.

이때 commit할 파일들을 **stage**에 올려놓고, stage에 있는 파일들을 commit하는 것이다.

그리고 commit한 파일들을 **push**하여 github나 gitlab 같은 원격 저장소에 올릴 수 있다.

1. git 설치(https://git-scm.com/downloads or 터미널에서 알잘딱)
2. 터미널 실행(powershell, zsh 등등)
3. ```git --help``` 으로 제대로 설치 되었는지 확인
4. ```git init``` : 현재 폴더를 git으로 관리하겠다는 의미
5. ```git status``` : 현재 폴더의 상태를 확인
6. ```git add 파일명``` : 해당 파일을 stage에 올림
7. ```git commit -m "커밋 메시지"``` : stage에 있는 파일들을 commit
8. ```git log``` : commit 기록을 확인

이때 git 설치 후 최초로 7번 과정을 실행하면 에러가 발생한다.
이는, commit한 사람이 누구인지를 알려주지 않았기 때문이다.
따라서 다음과 같이 설정해주어야 한다.

1. ```git config --global user.name "이름"```
2. ```git config --global user.email "이메일"```

위 명령어는 global 옵션을 주었기 때문에, 다른 폴더에서도 동일하게 적용된다.
만약 폴더마다 다른 이름과 이메일을 사용하고 싶다면, global 옵션을 빼고 명령어를 실행하면 로컬로 설정이 된다.

### 이전 버전으로 돌아가고 싶을 때
1. ```git log```로 커밋 아이디 확인
* ```git reset --hard 커밋아이디``` 커밋 아이디 대신 HEAD~1, HEAD~2 등으로 이전 커밋으로 돌아갈 수 있다.
* ```git reset --soft 커밋아이디``` : 이전 커밋으로 돌아가지만, 파일들은 stage에 올라가있는 상태로 돌아간다.(즉, 현재 수정한 파일들은 그대로 유지된다.)

### git branch
branch란, 독립적으로 어떤 작업을 진행하기 위한 개념이다.

main branch는 바로 배포가능한 상태의 코드만 올려둔 채로
다른 branch에서 새로운 기능을 추가하거나 버그를 수정하는 등의 작업을 진행할 수 있다.

이때, main branch에서 새로운 branch를 만들어서 작업을 진행하고, 작업이 완료되면 main branch에 merge하는 방식으로 진행한다.

1. ```git branch``` : 현재 branch를 확인
    * 새로운 branch를 만들고 싶은 branch에서 실행해야 하므로 현재 branch를 확인하는 것이 중요하다. 원하는 branch가 아닌 경우 checkout으로 이동한 후에 2번과정부터 진행한다.
2. ```git branch 브랜치명``` : 새로운 branch 생성
3. ```git checkout 브랜치명``` : 해당 branch로 이동
4. 여러 작업 및 commit
5. ```git checkout main``` : main branch로 이동
6. ```git merge 브랜치명``` : 해당 branch를 main branch에 merge

이게 일반적인 branch와 merge 방식이지만, 현업에서는 다음과 같은 방식으로 진행한다.(2번 github를 먼저 읽고 아래 내용을 읽어주세요)

1. ```git pull origin main``` : main branch에서 최신 코드를 가져온다.
2. ```git checkout -b 브랜치명``` : 새로운 branch를 만들고 이동한다.
3. 여러 작업 및 commit
4. ```git push origin 브랜치명``` : 새로운 branch를 원격 저장소에 push한다.
5. github에서 **pull request**를 생성한다.
6. 코드 리뷰를 받고, 문제가 없다면 merge한다.

이때 merge하는 방식에는 크게 그냥 일반적인 merge, squash merge, rebase merge가 있다. 각각의 차이점은 다음 링크에서 확인
https://velog.io/@kmg2933/Git-Merge-Squash-Rebase-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0


### 기타
* ```git diff``` : 수정된 파일들을 확인 ( 근데 그냥 github이나 다른 gui 툴을 사용하는게 편하다.)
* git에서 관리하지 않을 파일들은 .gitignore 파일에 작성해두면 git이 무시한다.
* ```git add 파일명```을 하나하나 하기 귀찮다면, ```git add .```으로 한번에 stage에 올릴 수 있다.
* ```git commit -am "커밋 메시지"``` : add와 commit을 한번에 할 수 있다. 이런 여러 옵션들이 많은데 알아서 찾아보자.

## 2. github
github란?
git으로 관리하는 폴더를 원격 저장소로 올려놓는 것이다.
근데 거기에 issue, pull request 등의 기능이 있어서 협업을 할 때 유용하다.

일단 처음 깃허브 안내를 보면 이해하기 힘든 부분이 있어서 짚고 넘어가자면, git의 원래 기본 branch는 master였다. 근데 이게 인종차별적인 의미를 가지고 있어서 github에서는 기본 branch이름으로 main을 쓴다고 한다.(주인과 노예의 관계를 뜻하는 master와 slave를 사용하지 않기 위함이다.)
그래서 깃에서 처음 레포를 만들면 안내에 git branch -M main 이라고 나오는데, 이는 master branch를 main branch로 변경하겠다는 의미이다.

1. github 가입
2. github repository 생성(생성할때 일단 readme나 gitignore 등은 생성하지 않는다. 나중에 직접 생성하자.)

위 과정을 거치면, github에 원격 저장소가 생성된다.
그 이후 다시 git이 설치된 컴퓨터에서 git init이 실행된 폴더에서 다음과 같이 진행한다.

1. ```git remote add origin 원격저장소주소``` : 원격 저장소를 origin이라는 이름으로 추가
2. ```git push -u origin master``` : origin(앞에서 이름 붙인 원격 저장소)에 master branch를 push(깃헙의 안내대로 git branch -M main으로 변경한 경우에는 master가 아닌 main으로 입력해야 한다.)

이때, -u 옵션은 **새로운 브랜치를 올릴 때마다** 최초 한번만 사용하면 된다. 한번 올린 적 있는 branch를 올릴 때는 ```git push```만 입력해도 된다.



한번 로컬(컴퓨터) 저장소와 원격 저장소를 연결하면, 다음과 같은 명령어들을 사용할 수 있다.
git push : 원격 저장소에 변경사항을 업로드
git pull : 원격 저장소에 저장된 내용을 로컬 저장소로 가져옴
git fetch : 원격 저장소에 저장된 내용을 가져오지만, 로컬 저장소에는 반영하지 않음 (pull과 fetch의 차이: https://chaeyoung2.tistory.com/43)

그리고 git clone을 사용하면, 원격 저장소에 있는 내용을 로컬 저장소로 가져올 수 있다. 이때 자동으로 원격 저장소와 연결된다.

## 3. branch 전략
branch 전략이란, 협업을 할 때 어떤 방식으로 branch를 생성하고 merge할지에 대한 방식이다.

간단한 전략은 다음과 같다.

1. main branch는 항상 배포 가능한 상태의 코드만 올려둔다.
2. 새로운 기능을 추가하거나 버그를 수정할 때는 main branch에서 새로운 branch를 생성한다.
3. 새로운 branch에서 작업을 진행하고, 작업이 완료되면 main branch에 merge한다.
4. main branch에 merge한 후에는 새로운 branch를 삭제한다.

여기에서 merge하기 전에 github에서 pull request를 생성하여 코드 리뷰를 받고, 문제가 없다면 merge하는 방식이 **github flow**이다.

이외에도 git flow, gitlab flow 등 다양한 전략이 있으니 찾아보고 적용해보자.
다만 제일 편한건 아마 github flow일 것이다.