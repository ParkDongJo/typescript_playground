
class EmailValidator {
  // 아래 isEail 타입가드 함수가 정상적으로 작동하도록 해주세요.
}

// 타입 가드 함수 (별도로 필요)
function isEmail(value: unknown): value is string {
  return value instanceof EmailValidator;
}

const email1 = 'test@test.com';
const email2 = 'test.com';
const email3 = 'test@test.com';

console.log(isEmail(email1)); // true
console.log(isEmail(email2)); // false  
console.log(isEmail(email3)); // true

/*
class EmailValidator {
  static [Symbol.hasInstance](instance: unknown): boolean {
    if (typeof instance !== 'string') return false;
    
    // 간단한 이메일 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(instance);
  }
}
*/