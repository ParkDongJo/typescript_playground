type CardProps = {
  title: string;
  content: string;
}

function Card({ title, content }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  )
}

function withInjectedProps<T extends {}, U extends T>(
  injected: T, 
  Component: React.ComponentType<U>
) {
  return function (props: Omit<U, keyof T>) {
    const newProps = { ...injected, ...props } as U;
    return <Component {...newProps} />
  }
}

function withTitle<U extends { title: string }>(
  title: string,
  Component: React.ComponentType<U>
) {
  return withInjectedProps({ title }, Component);
}

function CardList() {
  const InfoCard = withTitle("Info", Card);
  const WarningCard = withTitle("Warning", Card);
  const ErrorCard = withTitle("Error", Card);

  return (
    <div>
      <InfoCard content="Info card content" />
      <WarningCard content="Warning card content" />
      <ErrorCard content="Error card content" />
    </div>
  )
}