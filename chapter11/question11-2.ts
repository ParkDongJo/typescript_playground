

export function log(level: LogLevel) {
  return function<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext
  ) {
    const methodName = String(context.name);

    return function (this: This, ...args: Args): Return {
      console.log(`[${level}-START] ${methodName}`, args);

      const result = target.apply(this, args);

      console.log(`[${level}-END] ${methodName}`, result);

      return result;
    };
  }
}

/*
  아래처럼 UserService 내부의 메서드들이 호출될 때, 제시된 로그처럼 나오도록 log 함수를 완성해주세요.
*/

type LogLevel = 'ERROR' | 'INFO' | 'WARN';

class UserService {
  @log('INFO')
  getUser(id: number) {
    return { id, name: "Alice" };
  }

  @log('INFO')
  getUsers() {
    return [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
  }

  @log('WARN')
  deleteUser(id: number) {
    return { id, name: "Alice" };
  }
}

const service = new UserService();

service.getUser(1);
service.getUsers();
service.deleteUser(1);

/*
[INFO-START] getUser [ 1 ]
[INFO-END] getUser { id: 1, name: 'Alice' }

[INFO-START] getUsers []
[INFO-END] getUsers [ { id: 1, name: 'Alice' }, { id: 2, name: 'Bob' } ]

[WARN-START] deleteUser [ 1 ]
[WARN-END] deleteUser { id: 1, name: 'Alice' }
*/