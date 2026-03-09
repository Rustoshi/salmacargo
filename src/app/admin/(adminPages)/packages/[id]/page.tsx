import PackageManager from './PackageManager';

export default async function Page(props: any) {
  const params = await props.params as { id: string };
  return <PackageManager id={params.id} />;
}