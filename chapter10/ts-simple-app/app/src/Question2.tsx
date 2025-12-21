import React, { useContext } from 'react';


// 문제 10
// 아래 두 버튼은 각각 user 의 permissions에 따라 렌더링되어야 한다.
/*
  첫번째 버튼은 user 의 permissions 에 'read', 'write', 'delete' 가 포함되어 있어야 렌더링되고,
  두번째 버튼은 user 의 permissions 이 'read', 'write' 가 포함되어 있어야 렌더링 되어야 한다.

  아래 같은 경우는 read, write 만 있으므로 'I can Delete' 버튼은 렌더링 되지 않도록 해야합니다.
  컴포넌트들을 재사용성 있도록 설계해주세요.
*/


type Permission = 'read' | 'write' | 'delete';
type User = {
  permissions: Permission[];
};

const PermissionProvider = React.createContext<Permission[]>([]);

const AdminCan = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
}
const ManagerCan = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
}

function App() {
  const user: User = {
    permissions: ['read', 'write'],
  }

  return (
    <PermissionProvider value={user.permissions}>
      <button onClick={() => {}}>I can Delete</button>
      <button onClick={() => {}}>I can't Delete</button>
    </PermissionProvider>
  );
}

export default App;
