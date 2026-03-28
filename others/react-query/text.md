## react-query
- react query는 서버로부터 데이터 가져오기, 데이터 캐싱, 캐시 제어 등 데이터를 쉽고 효율적으로 관리할 수 있는 라이브러리
- 대표적인 기능은 다음과 같다
  - 데이터 가져오기 및 캐싱
  - 동일 요청의 중복 제거
  - 신선한 데이터 유지
  - 무한 스크롤, 페이지네이션 등의 성능 최적화
  
### 데이터 캐싱
- react query를 활용하여 데이터를 가져올 때는 항상 쿼리(queryKey)를 지정하게 됨
- 이 쿼리 키는 캐시된 데이터와 비교해 새로운 데이터를 가져올지, 캐시된 데이터를 사용할 지 결정하는 기준이 됨
```
const QUERY_KEY = 'accounts';

const useQueryAccounts = () => {
    const { getAccounts } = useApiAccounts();

    const queryFn = async () => {
        return getAccounts();
    }

    return useSuspenseQuery<Account[], ApiError>([
        queryKey: [QUERY_KEY],
        queryFn,
    ]);
}

```
- 다음 이미지는 쿼리 키와 일치하는 캐시된 데이터가 없을 떄, 서버에서 새로운 데이터를 가져오는 과정을 보여줌
- 서버에서 데이터를 가져오면 그 데이터는 캐시되고 그 이후 요청부터는 캐시된 데이터를 사용할 수 있음
- 반대로 쿼리 키와 일치하는 캐시된 데이터가 있으면, 서버에 요청하지 앟고 캐시된 데이터를 사용하게 됨
- 따라서 같은 데이터를 가져오는 요청이 여러 번 발생해도, 캐시된 데이터를 사용하게 되어 중복 요청을 줄일 수 있음
- 그렇다면 한번 캐시된 데이터가 있으면, 서버로는 더 이상 요청을 보낼 수 없는건가?


### 데이터의 신선도
- TanStackQuery 는 캐시한 데이터를 신선(Fresh)하거나 상한(stale) 상태로 구분해 관리함
- 캐시된 데이터가 신선하다면 캐시된 데이터를 사용하고, 만약 데이터가 상했다면 서버에 다시 요청해 신선한(새로운) 데이터를 가져옴
- 일종의 데이터 유통기한 정도로 생각하면 이해하기 쉬움
- 데이터가 상하는 데까지 걸리는 시간은 staleTime 옵션으로 지정할 수 있음
- 그리고 신선한지 상했는지 여부는 isStale로 확인할 수 있음
```
const QUERY_KEY = 'account';

const useQueryAccount ({ accountNumber } : IProps) => {
    const {getAccount} = useApiAccounts();

    const queryFn = async () => {
        return getAccounts();
    };

    return useSuspenseQuery<Account[], ApiError>([
        queryKey: [QUERY_KEY],
        queryFn,
    ]);
};
```

### 쿼리 클라이언트 환경 구성
- 프로젝트 범위를 <QueryClientProvider>로 랩핑하고, 사용할 queryClient 인스턴스를 연결함
```
export const queryClient = new QueryClient({
    defaultOption: {
        query: {
            staleTime : 600000,
            gcTime: 900000,
            retry: 0,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    },
});

<QueryClientProvider client = {queryClient}>{children}</QueryClientProvider>

```

### useQuery
- 가장 기본적인 쿼리 훅으로, 컴포넌트에서 데이터를 가져올 떄 사용함
```
const 반환 = useQuery<데이터타입>(옵션);
```

### 옵션
|옵션|설명|기본값|
|--|--|--|
|enable|쿼리 자동 실행 여부|true|
|gcTime|비활성 캐시 데이터(Inactive)가 메모리에 남아있는 시간(ms)|5분|
|initialData|쿼리가 생성되거나 캐시되기 전에 사용하는 초기데이터||
|meta|활용할 추가 정보를 지정||
|networkMode|네트워크 모드 지정|'online'|
|notifyOnChangeProps|컴포넌트 리랜더링을 위해 변경 여부를 확인할 쿼리의 특정 반환 속성 목록예시 /n ['data','error']|컴포넌트에서 접근한 반환 속성|
|placeholderData|대기(pending) 중인 상태에서 사용할 데이터||
|queryClient|커스텀 쿼리 클라이언트 연결||
|queryFn|데이터를 가져오는 쿼리 함수로, 데이터를 반환하거나 오류를 던져야 함||
|queryKey|고유한 쿼리 키(식별자)||
|queryKeyHashFn|쿼리 키를 해시하는 함수||
|refetchInterval|데이터 자동 갱신(다시 가져오기)의 시간 간격(ms)||
|refetchIntervalInBackground|백그라운드에서 데이터 자동 갱신 여부|false|
|refetchOnMount|화면 마운트 시점에 useQuery 연결 시 데이터 갱신 여부|true|
|refetchOnReconnect|네트워크 재연결 시 데이터 갱신 여부|true|
|refetchOnWindowFocus|브라우저 화면 포커스 시 데이터 갱신 여부|true|
|retry|쿼리 실패 시 재시도 함수|3|
|retryDelay|재시도 시간 간격(ms)||
|retryOnMount|화면 마운트 시점에 useQuery 연결 시 재시도 여부|true|
|select|가져온 데이터를 변형(선택)하는 함수||
|staleTime|데이터가 상하는데 걸리는 시간(ms)|0|
|structuralSharing|데이터 구조의 재사용을 최적화해, 불변성을 유지하고 불필요한 리렌더링 방지|true|
|throwOnError|쿼리 실패 시 오류를 던질 지 여부|undefined|

## QueryKey
- 쿼리 키(queryKey)는 쿼리를 식별하는 고유한 값으로 배열 형태로 지정
- 다중 아이템 쿼리 키를 사용할 때는 아이템의 순서가 중요함

```
useQuery({queryKey : ['hello']})

useQuery({queryKey : ['hello','world',123,{a:1, b:2}]});

useQuery({queryKey : ['hello', 'world',123, {a: 1, b:2}]})
useQuery({queryKey : ['hello', 'world',123, {b:2, c: undefined, a: 1}]});

useQuery({queryKey : ['hello', 'world',123, {a: 1, b:2}]})
useQuery({queryKey : ['hello', 'world',123, {a: 1, b:2, c:3}]});
useQuery({queryKey : ['hello', 'world']});
useQuery({queryKey : [123, 'world',{a: 1, b:2, c:3}, 'hello']});

```
- 기본적으로 쿼리 함수(queryFn) 에서 사용하는 변수는 쿼리 키에 포함돼야 함
- 그러면 변수가 변경될 때마다 자동으로 다시 가져올 수 있음
```
useQuery<Account, ApiError>({
    queryKey: [QUERY_KEY, accountNumber],
    queryFn,
    enable: !!accountNumber,
    staleTime: 10 * 60 * 1000,
    refetchOnMount: true,
});
```

### QueryFn
- 쿼리 함수(queryFn)는 데이터를 가져오는 비동기 함수로, 꼭 데이터를 바노한하거나 오류를 던져야 함
- 던져진 오류는 반환되는 error 객체로 확인할 수 있음
- error는 기본적으로 null
```
const { data: account, error } = useQueryAccount({accountNumber: accountNumber || ''});
console.log('error : ', error);
```

### enabled
- 쿼리 호출 가능 조건을 지정하는 옵션
- 변수가 있어야만 동작하는 쿼리에 작성하는게 일반적이며, 해당 변수의 존재 유무에 대한 조건을 선언함
```
useQuery<Account, ApiError>({
    queryKey: [QUERY_KEY, accountNumber],
    queryFn,
    enable:!!accountNumber,
})
```

### select
- 선택 함수(select)를 사용하면 가져온 데이터를 변형(선택)할 수 있음
- 쿼리 함수가 반환하는 데이터를 인수로 받아 선택 함수에서 처리하고 반환하면 최종 데이터가 됨
- 최종 데이터의 타입은 useQuery의 3번째 제네릭 타입으로 선언할 수 있음
- 2번째는 오류 타입(error)이다
```
return useQuery<Account[], ApiErrir>({
    queryKey:[QUERY_KEY],
    queryFn,
    select: (data) => data.map((aco) => aco.accountNumber),
});
```

### placeholderData
- 새로운 데이터를 가져오는 과정에서 쿼리가 무효화되어 일시적으로 데이터가 없는 상태가 되면 데이터 출력 화면이 깜박일 수 있다
- 이런 현상을 방지하기 위해 placeholderData옵션을 사용하면, 쿼리 함수가 호출되는 대기 상태(pending)에서 임시로 표시할 데이터를 미리 지정할 수 있음
- placeholderData옵션에는 함수를 지정할 수 있으며, 이 함수는 새로운 데이터를 가져오기 직전의 이전 데이터를 받을 수 있어서 이랄 반환해 인시 데이터로 사용할 수 있음
```
useQuery<Account, ApiError>({
    queryKey:[QUERY_KEY, accountNumber],
    queryFn,
    placeholderData: (prev) => prev,
});
```
- 테스트 커밋
