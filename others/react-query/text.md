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

### 반환

|반환속성|설명|
|--|--|
|data|성공적으로 가져온 데이터|
|dataUpdateAt|최근에 데이터를 성공적으로 가져온 시간|
|error|오류가 발생했을때의 오류 객체, 오류가 발생하지 않았다면 Null|
|errorUpdateCount|모든 오류의 횟수|
|failureCount|쿼리의 실패횟수, 쿼리가 실패할 때마다 증가하고 쿼리가 성공하면 0으로 재지정|
|failureReason|쿼리의 재시도 실패이유, 쿼리가 성공하면 null로 재지정|
|fetchStatus|fetching : 쿼리 함수가 실행 중, (첫 대기 및 백그라운드 다시 가져오기 포함, isFetching) \n paused : 쿼리 함수의 가져오기가 일시 중단됨.(isPaused) \n idle : 쿼리 함수가 동작 중이지 않음|
|isError|쿼리 함수에서의 오류 발생 여부|
|isFetched|쿼리의 첫 데이터 가져오기가 완료되었는지 여부.|
|isSuccess|쿼리 데이터를 성공적으로 가져왔는지 여부|
|refetch|데이터를 새롭게 다시 가져오는 함수 \n throwOnError:true 옵션을 사용해야 오류가 발생|
|state|pending: 캐시된 데이터가 없고 아직 완료되지 않은 상태(isPending) \n error : 오류가 발생한 상태(isError) \n success : 데이터를 성공적으로 가져온 상태(isSuceess)

### 상태확인

- isFetching은 쿼리 함수(queryFn)가 실행중인지의 여부로, 데이터를 가져오는 중으로 나타냄
- isPending은 캐시된 데이터가 없고 쿼리가 아직 완료되지 않은 상태의 여부로 initialData 혹은 placeholderData옵션으로 데이터를 제공하면 출력대기(Pending)가 필요하지 않으므로 false를 반환함
- enable 옵션을 false로 지정하면, 쿼리가 대기 상태로 시작하므로 isPending은 true를 반환함
- isLoading은 isFetching && isPending와 같은 의미로, 쿼리의 첫 번째 가져오기가 진행 중인 경우를 나타냄

```
const {data : account, isFetching, isPending, isLoading } = useQueryAccounts();
```

#### 다시 가져오기
- refetch함수를 사용하면, 데이터를 항상 새롭게 다시 가져올 수 있음


```
const {data : accounts, refetch} = useQueryAccount();
```

#### Suspense 처리(로딩)
- @TODO : 공통로딩처리, 커스텀 로딩 처리

#### error 처리
- @TODO : 공통 에러 처리, 커스텀 에러 처리

### useInfiniteQuery
- 더 보기 버튼으로 추가 데이터를 더 가져오거나 더 나아가 무한 스크롤 기능은 쉽게 찾아볼 수 있는 일반적인 UI임
- React Query는 이런 UI 개발을 위해 useInfiniteQuery 훅을 제공함

```
const 반환 = useInfiniteQuery<페이지 >
```

### 옵션
- useInfiniteQuery는 앞서 살펴본 useQuery의 모든 옵션을 사용할 수 있으며, 추가로 다음의 옵션을 사용할 수 있음
- 다음은 알파벳 순으로 정렬한 목록임

|옵션|설명|기본값|필수여부|
|getNextPageParam|새로운 다음 페이지를 가져오면 다음 페이지의 정보로 호출되는 함수, 다음 페이지 번호를 반환해야함 /n 다음 페이지가 없으면, undefined 또는 null을 반환해야함||Y|
|initialPageParam|첫번째 페이지의 번호| |Y|
|getPreviousPageParam|새로운 이전 페이지를 가져오면 이전 페이지의 정보로 호출되는 함수, 이전 페이지 번호를 반환해야함 /n 이전 페이지가 없으면 undefined 또는 null을 반환함||N|
|maxPages|저장 및 출력할 최대 페이지 수, 페이지가 지나치게 많은 경우에 유용|infinite|N|

### 반환
|반환속성|설명|
|fetchNextPage|다음 페이지를 가져오는 함수,|
|fetchPreviousPage|이전 페이지를 가져오는 함수|
|hasNextPage|다음 페이지가 있는지 여부|
|hasPreviousPage|이전 페이지가 있는지 여부|
|isFetchingNextPage|다음 페이지를 가져오는 중인지의 여부|
|isFetchingPreviousPage|이전 페이지를 가져오는 중인지의 여부|


### 예제
```
 const useInfiniteQueryAccount = () => {
    const { getPageAccount } = useApiAccounts();

    const queryFn = async({ pageParam = 1 }) => {
        return getPageAccount({ pageParam });
    };

    return useInfiniteQuery({
        queryKey: {QUERY_KEY},
        queryFn,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => (lastPage.hasNextCursor ? lastPage.nextCursor : undefined),
    });
 };

 const { data: accounts, fetchNextPage, isFetchingNextPage, hasNextPage } = useinifiniteQueryAccount();

 <button onClick={() => fetchNextPage()} disable={!hasNextPage}>
    {isFetchingNextPage ? '로딩 중...' : '더 보기'}
 </button>;
```
- @TODO : 추후 무한스크롤처리 반영

### useMutation
- react query는 데이터 변경 작업(생성, 수정, 삭제 등)을 위한 useMutation 훅을 제공함
- 이를 통해 데이터 변경 작업을 처리하고 다양한 성공, 로딩 등의 상태를 얻을 수 있음
- 그리고 요청 실패 시의 자동 재시도나 낙관적 업데이트 같은 고급 기능도 쉽게 처리할 수 있음
- 쿼리(useQuery)는 '가져오기'에 집중하는 반면, 변이(useMutation)는 보내기에 집중하는 훅으로 이해하면 쉬움
- 낙관적 업데이트
  - 낙관적 업데이트(Optimistic Update)는 서버 요청의 응답을 기다리지 않고, 먼저 UI를 업데이트 하는 기능을 말함
  - 서버 응답이 느린 상황에서도 빠른 인터페이스를 제공할 수 있어 사용자 경험을 크게 향상시킬 수 있음

```
const 반환 = useMutation(옵션);
```

### 옵션
|옵션|설명|기본값|
|--|--|--|
|gcTime|비활성 캐시 데이터(Inactive)가 메모리에 남아 있는 시간(ms)||
|meta|활용할 추가 정보를 지정||
|mutationFn|실행할 비동기 변이 함수(필수)||
|mutationKey|queryClient.setMutationDefaults의 기본값 상속을 위한 키||
|networkMode|네트워크모드지정, [online, always, offlineFirst]||
|onError|변이 중 오류가 발생할 때 호출하는 함수||
|onMutate|변이 함수가 실행되기 전에 호출되는 함수||
|onSettled|변이가 성공하거나 실패해도 항상 호출되는 함수||
|onSuccess|변이가 성공할 때 호출되는 함수||
|queryClient|커스텀 쿼리 클라이언트 연결||
|retry|변이 실패 시 재시도 함수|0|
|retryDelay|재시도 시간 간격(ms)||
|scope|동시 실행범위지정, 같은 범위 id를 가진 변이는 병렬이 아닌 직렬로 실행||
|throwOnError|변이 실패 시 오류를 던질지 여부|undefined|

### 반환
|반환속성|설명|
|data|성공적으로 가져온 데이터|
|error|오류가 발생했을 때의 오류 객체, 오류가 발생하지 않았다면 null|
|failureCount|변이의 실패 횟수, 변이가 실패할 때마다 증가하고 변이가 성공하면 0으로 재지정|
|isError|변이 함수에서의 오류 발생 여부|
|isIdle|변이 함수가 실행되기 전의 초기 상태인지 여부|
|isPaused|변이 함수가 일시 중단되었는지 여부|
|isPending|변이 함수가 실행되었는지 여부|
|isSuccess|데이터를 성공적으로 가져왔는지 여부|
|mutate|변이 실행 함수 {variabled : Tvariables, {on Success, onSettled, onError}} => void|
|mutateAsync|비동기 변이 실행함수 {variables: TVariables, { onSuccess, onSettled, onError }} => Promise<TData>|
|reset|변이 내부 상태를 초기 상태로 재지정하는 함수 () => void|
|status|변이의 현재상태 idle : 초기상태 , pending: 실행 중, error: 오류 발생, success: 성공|
|submittedAt|변이가 제출된 시간(유닉스 타임 스탬프)|
|variables|변이 실행 함수(mutate)에 전달된 데이터|

### 예제
- 계좌이체 처리 예제
```
// 뮤테이션 선인 이후
const useMutationTransfer = () => {
    const { transferAccount } = useApiAccount();
    const queryClient = useQueryClient();

    const mutationFn = async (itransfer : ITransfer) => {
        return wait transferAccounts(itransfer);
    };

    return useMutation({
        mutationFn,
        onSuccess: (data) => {
            console.log('계좌이체 onSuccess() : ', data)

            queryClient.refetchQueries({ queryKey : [useQueryAccounts.KEY] });

            //이체인 (step2 화면에서 갱신)
            queryClient.invalidationQuery({ queryKey: [useQueryAccount.Key, data.iFromAccountNumber] });

            //수취인 (계좌 상세조회에서 갱신)
            queryClient.invalidaDataQueries({ queryKey: [useQueryAccount.KEY, data.iToAccountNumber] });
        },
        onError(error) {
            console.error('계좌이체 onError() : ',error);'
        }
        onSettled: () => {
            console.log('게좌이체 onSettled()');
        },
    });
};

export default useMutationTransfer;

//뮤테이션 처리
const onSubmit = (data: ITransferS) => {
    transferMutation.mutate(data, {
        onSuccess: () => {
            navigate('/sample/accounts/transfer/step3');
        },
    });
};
```