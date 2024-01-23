"use client";

import { space_mono } from "@/utils/fonts";
import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

const generateItem = (num: number) => {
  return Array.from(Array(num).keys()).map((e, i) => {
    return i + 1;
  });
};

const Item = () => {};

function Dragable() {
  const [items, setItems] = useState(generateItem(10));

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      arr = items;

    if (destination.droppableId) {
      add = arr[source.index];
      arr.splice(source.index, 1);
      arr.splice(destination.index, 0, add);
      setItems(arr);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="container">
        {(provided) => (
          <div
            className={`${space_mono.className} p-2 bg-muted rounded-lg grid gap-2`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.map((e, i) => (
              <Draggable key={i} draggableId={i.toString()} index={i}>
                {(provided, snapshot) => (
                  <div
                    className="p-2 border rounded-md"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    {e}
                    <span {...provided.dragHandleProps}>[]</span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Dragable;
