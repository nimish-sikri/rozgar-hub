interface IParams {
    title?: string;
}

export default async function Homelayout({
    children,
    params,
  }: Readonly<{
    children: React.ReactNode;
    params: IParams;
  }>) {
    return (  
        <div className="">
            {children}
        </div>
    );
  }