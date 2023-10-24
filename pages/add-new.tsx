import React from 'react';
import dynamic from 'next/dynamic';
const ComponentWithNoSSR = dynamic(
  () => import('@/components/template'),
  { ssr: false })
export default function AddNew() {

  return (
    <>
      <ComponentWithNoSSR />
    </>
  )
}
