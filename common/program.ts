

type MyIf = any

const condition = true;
type MyIfResult = MyIf<typeof condition, 'a', 'b'>;