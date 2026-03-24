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

    const queryFn = asy
}
```
