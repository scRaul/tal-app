"use client";

import { GripHorizontal, GripVertical } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface SortableProps {
  children: React.ReactElement[]; //make sure to set key for each child
  onReOrder?: (order: number[]) => void; //callback to get new order;
  className?: string;
}

export default function SortableList(props: SortableProps) {
  var container = useRef<HTMLDivElement | null>(null);
  var dragItem = useRef<HTMLDivElement | null>(null);
  const ItemDivs = useRef<HTMLDivElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [prevSwap, setPrevSwap] = useState(Date.now());
  const [show, setShow] = useState(false);

  useEffect(() => {
    function preventScroll(event: TouchEvent) {
      event.preventDefault();
    }

    if (dragItem) {
      window.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      window.removeEventListener("touchmove", preventScroll);
    }

    return () => {
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [dragItem]);

  useEffect(() => {
    if (!container.current) return;
    ItemDivs.current = [];
    const childDivs = container.current.querySelectorAll("div.sortable_x");
    childDivs.forEach((child, index) => {
      ItemDivs.current.push(child as HTMLDivElement);
    });
  }, [container.current]);

  function handleSelcted(
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) {
    if (!ItemDivs.current) return;
    if (dragItem.current) return;

    const parent = event.currentTarget.parentElement;
    if (!parent) return;
    const copy = parent.cloneNode(true) as HTMLDivElement;
    const rect = parent.getBoundingClientRect();
    copy.style.width = rect.width + "px";
    copy.style.boxShadow = "-2px 0 5px 0 black, 0 2px 5px 0 black";
    copy.style.position = "absolute";
    copy.style.left = rect.left + 2 + "px";
    copy.style.top = rect.top - 2 + "px";
    parent.style.visibility = "hidden";

    dragItem.current = copy;
    if (container.current) {
      container.current.appendChild(copy);
    }
    const index = ItemDivs.current.findIndex((div) => div == parent);
    setCurrentIndex(index);
  }
  function handleUp(
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) {
    if (!dragItem.current) return;
    if (!container.current) return;
    container.current.removeChild(dragItem.current);
    dragItem.current = null;
    const index = ItemDivs.current.findIndex(
      (div) => div.style.visibility == "hidden"
    );
    if (index != -1) ItemDivs.current[index].style.visibility = "visible";
    setCurrentIndex(-1);
    findNewOrder();
  }

  function findNewOrder() {
    if (!ItemDivs.current || !props.children) return;

    const newOrder: number[] = [];
    props.children.forEach((element) => {
      const i = ItemDivs.current.findIndex((div) => div.id == element.key);
      newOrder.push(i);
    });
    if (props.onReOrder) {
      props.onReOrder(newOrder);
    }
  }
  function handleMove(
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) {
    if (!dragItem.current) return;
    if (!container.current) return;
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    const clientY =
      "touches" in event ? event.touches[0].clientY : event.clientY;
    const rect = dragItem.current.getBoundingClientRect();
    const cont = container.current.getBoundingClientRect();
    const pos = clientY - 2;
    const distTop = clientY - cont.top;

    dragItem.current.style.top = pos + "px";

    if (Date.now() > prevSwap) {
      handleCollision(distTop - rect.height / 2);
    }
  }
  function handleCollision(dist: number) {
    if (!ItemDivs.current) return;
    if (!dragItem.current) return;
    if (!container.current) return;
    if (currentIndex < 0) return;
    const contRect = container.current.getBoundingClientRect();
    const selRect = ItemDivs.current[currentIndex].getBoundingClientRect();

    for (let i = 0; i < ItemDivs.current.length; i++) {
      if (i == currentIndex) continue;

      const curRect = ItemDivs.current[i].getBoundingClientRect();
      const otherTTop = curRect.top - contRect.top;
      const otherTBottom = curRect.bottom - contRect.top;
      if (otherTTop < dist && dist < otherTBottom) {
        if (selRect.top > curRect.top) {
          container.current.insertBefore(
            ItemDivs.current[currentIndex],
            ItemDivs.current[i]
          );
        } else {
          container.current.insertBefore(
            ItemDivs.current[i],
            ItemDivs.current[currentIndex]
          );
        }
        const temp = ItemDivs.current[currentIndex];
        ItemDivs.current[currentIndex] = ItemDivs.current[i];
        ItemDivs.current[i] = temp;
        setCurrentIndex(i);
        setPrevSwap(Date.now() + 50);
        return;
      }
    }
  }

  return (
    <div
      ref={container}
      className={`flex flex-col ${props.className}`}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseLeave={handleUp}
      onMouseUp={handleUp}
      onTouchEnd={handleUp}
    >
      {props.children.map((child, index) => (
        <div id={child.key?.toString()} className="sortable_x flex" key={index}>
          <div
            onMouseDown={handleSelcted}
            onTouchStart={handleSelcted}
            className="w-4"
          >
            <GripVertical className="text-gray-500 h-full w-full" />
          </div>
          <div className="flex-grow">{child}</div>
        </div>
      ))}
    </div>
  );
}
