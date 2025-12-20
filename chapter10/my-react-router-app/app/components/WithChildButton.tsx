type WithChildren<T = {}> = T & { children: React.ReactNode };

type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
} & WithChildren;

function WithChildButton({ onClick, children }: ButtonProps) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  )
}

type LinkProps = {
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
} & WithChildren;

function WithChildLink({ onClick, children }: LinkProps) {
  return (
    <a onClick={onClick}>
      {children}
    </a>
  )
}

function Clickable({ onClick, children }: ButtonProps) {

  function handleClick(event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) {
    event.preventDefault();
    console.log(event.currentTarget.tagName);
  }

  return (
    <>
      <WithChildButton onClick={handleClick}> Click me </WithChildButton>
      <WithChildLink onClick={handleClick}> Click me </WithChildLink>
      <div onClick={handleClick}> Click me </div>
    </>
  )
}