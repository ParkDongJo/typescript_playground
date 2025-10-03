

type Fn<Args extends unknown[], Res> = (
  ...args: [...Args, (result: Rest) => void]
) => void;

function promisify<Args extends unknown[], Res>()