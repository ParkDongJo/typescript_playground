type FilterRule = {
    field: string;
    operator: string;
    value: any;
}

type CombinatorialFilter = {
    combinator: "and" | "or";
    rules: FilterRule[];
}

type ChainedFilter = {
    rules: (CombinatorialFilter | FilterRule)[];
}

type Filter = CombinatorialFilter | ChainedFilter;

function reset(filter: Filter): Filter {
    if ('combinator' in filter) {
        return {
            combinator: "and",
            rules: []
        }
    }
    return { rules: [] };
}

const filter: CombinatorialFilter = { rules: [], combinator: 'or' };
// 반환 타입은 Filter
// 반환 타입이 너무 넓다.
const resetFilter = reset(filter);


function resetV2<F extends Filter>(filter: F): F {
    if ('combinator' in filter) {
        // F 타입에 할당 할 수 없다고 나온다.
        return {
            combinator: "and",
            rules: []
        }
    }
    // F 타입에 할당 할 수 없다고 나온다.
    return { rules: [] };
}

// 하위 타입을 포용하는 형태로 코드 작성
function resetV3<F extends Filter>(filter: F): F {
    const result = { ...filter };
    result.rules = [];
    if ('combinator' in result) {
        result.combinator = "and";
    }
    return result;
}

// 이렇게 제네릭과 함께, 코드 기반에서 하위 타입을 대응하는 식으로 구현하여 더 좁은 타입으로 반환하면서
// 코드의 안정성을 높일 수 있다.
const resetFilterV3 = resetV3(filter);

// v3과 같지만 다른 방식
type TreeItem = {
    id: string;
    children: TreeItem[];
    collapsed?: boolean;
}
function attachToRoot<T extends TreeItem>(children: T[]): TreeItem {
    return {
        id: 'root',
        children,
    }
}

type BaseTreeItem = {
    id: string;
    children: BaseTreeItem[];
}