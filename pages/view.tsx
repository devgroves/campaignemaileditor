import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const ComponentWithNoSSR = dynamic(
  () => import('@/components/view'),
  { ssr: false })
export default function View() {
  const router = useRouter();
  const { id } = router.query;
  console.log('id view:>> ', id);
  return (
    <>
      <ComponentWithNoSSR id={id}/>
    </>
  )
}
