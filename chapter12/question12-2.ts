// zod를 활용해서 아래 코드를 완성해주세요.
/*
  user 의 email 과 phone 의 유효성을 검증하는 checkUser 함수를 완성해주세요.

  유효성 검증은 아래 조건을 충족해야 합니다.
  . email 은 이메일 형식이어야 합니다.
  . phone 은 010-0000-0000 형식이어야 합니다.
	•	type === 'email'이면 이메일은 필수 입니다. (phone은 필수가 아님, 하지만 있어도 됨)
	•	type === 'phone'이면 휴대폰 번호는 필수 입니다. (email은 필수가 아님, 하지만 있어도 됨)
*/

/*
```
function checkUser(user) {
  return true;
}


// false
console.log(checkUser({
	type: 'email',
	email: 'test.com',
}));

// true
console.log(checkUser({
	type: 'email',
	email: 'test@test.com',
}));

// true
console.log(checkUser({
	type: 'phone',
	phone: '010-1234-5678',
}));

// false
console.log(checkUser({
	type: 'email',
	phone: '010-1234-5678',
}));

// 개발환경에서 부터 TS 에러
console.log(checkUser({
	email: 'test.com',
}));


```
*/

// 정답
import { z } from 'zod';

const userSchema = z.object({
	type: z.enum(['email', 'phone']),
	email: z.string().email().optional(),
	phone: z.string().regex(/^\d{3}-\d{4}-\d{4}$/).optional(),
})
.superRefine((data, ctx) => {
	if (data?.type === 'email' && !data.email) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'email is required',
		});
    return z.NEVER; 
	}
  if (data?.type === 'phone' && !data.phone) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'phone is required',
		});
    return z.NEVER;
	}
})

type User = z.infer<typeof userSchema>;

function checkUser(user: User) {
  const result: z.SafeParseReturnType<User, User> = userSchema.safeParse(user);

  if (result.success) {
    return true;
  } else {
    return false;
  }
}

// false
console.log(checkUser({
	type: 'email',
	email: 'test.com',
}));

// true
console.log(checkUser({
	type: 'email',
	email: 'test@test.com',
}));


// true
console.log(checkUser({
	type: 'phone',
	phone: '010-1234-5678',
}));

// false
console.log(checkUser({
	type: 'email',
	phone: '010-1234-5678',
}));

// console.log(checkUser({
// 	email: 'test.com',
// }));


