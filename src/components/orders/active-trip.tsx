import React, { useState } from 'react'
import { useModalAction, useModalState } from '../ui/modal/modal.context'
import PreviewMap from './preview-map'
import Card from '../ui/cards/card'

type Props = {}

const ActiveTrip = (props: Props) => {
  const state = useModalState();
  const { origin, destination } = state.data;
  const [distance, setDistance] = useState<string>('');

  return (
    <Card className='w-screen'>
      <PreviewMap
        origin={origin}
        destination={destination}
        setDistance={setDistance}
      />
    </Card>
  )
}

export default ActiveTrip