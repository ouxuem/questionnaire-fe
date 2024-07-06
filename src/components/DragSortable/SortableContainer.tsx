import React from 'react'

import { DndContext, closestCenter, MouseSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

type PropsType = {
  children: JSX.Element[] | JSX.Element
  items: Array<{ id: string; [key: string]: any }>
  onDragEnd: (oldIndex: number, newIndex: number) => void
}
const SortableContainer: React.FC<PropsType> = ({ children, items, onDragEnd }) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over == null) return
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.fe_id === active.id)
      const newIndex = items.findIndex((item) => item.fe_id === over.id)
      onDragEnd(oldIndex, newIndex)
    }
  }
  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

export default SortableContainer
