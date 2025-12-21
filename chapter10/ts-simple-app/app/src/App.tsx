import React, { useContext } from 'react';

type Permission = 'read' | 'write' | 'delete';
type User = {
  permissions: Permission[];
};

const PermissionProvider = React.createContext<Permission[]>([]);

function withInjectedProps<T extends {}, U extends T>(
  injected: T, 
  Component: React.ComponentType<U>
) {
  return function (props: Omit<U, keyof T>) {
    const newProps = { ...injected, ...props } as U;
    return <Component {...newProps} />
  }
}

function withPermission<P extends { requiredPermissions: Permission[] }>(
  requiredPermissions: Permission[],
  Component: React.ComponentType<P>,
) {
  return withInjectedProps({ requiredPermissions }, Component);
}

function Can({
  children,
  requiredPermissions,
}: {
  children: React.ReactNode;
  requiredPermissions: Permission[];
}) {
  const permissions = useContext(PermissionProvider);
  const hasPermission = requiredPermissions.every(permission =>
    permissions.includes(permission)
  );
  if (!hasPermission) {
    return null;
  }
  return <>{children}</>;
}

function Button({
  text,
  onClick,
}: {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return <button onClick={onClick}>{text}</button>;
}

const AdminCan = withPermission(['read', 'write', 'delete'], Can);
const ManagerCan = withPermission(['read', 'write'], Can);

function App() {

  const user: User = {
    permissions: ['read', 'write'],
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('clicked', event);
  }

  return (
    <PermissionProvider value={user.permissions}>
      <AdminCan>
        <button onClick={handleClick}>I can Delete</button>
      </AdminCan>
      <ManagerCan>
        <button onClick={handleClick}>I can't Delete</button>
      </ManagerCan>
    </PermissionProvider>
  );
}

export default App;