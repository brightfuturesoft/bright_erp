import React, { useContext, useMemo } from "react";
import { HolderOutlined } from "@ant-design/icons";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities/useSyntheticListeners";
import DashboardTitle from "../../../CommonComponents/DashboardTitle";

interface DataType {
  key: string;
  photo: string;
  name: string;
  price: number;
}

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: "move" }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

const columns: ColumnsType<DataType> = [
  { key: "sort", align: "center", width: 80, render: () => <DragHandle /> },
  {
    title: "Photo",
    dataIndex: "photo",
    render: (text) => (
      <img
        src={text}
        alt="product"
        className="rounded"
        style={{ width: 50, height: "auto" }}
      />
    ),
  },
  { title: "Name", dataIndex: "name" },
  { title: "Price", dataIndex: "price" },
];

const initialData: DataType[] = [
  {
    key: "1",
    photo:
      "https://media.e-valy.com/cms/products/images/0323de20-17d4-453a-a26c-223c2323f2d8",
    name: "Laptop",
    price: 5000,
  },
  {
    key: "2",
    photo:
      "https://media.e-valy.com/cms/products/images/0323de20-17d4-453a-a26c-223c2323f2d8",
    name: "Phone",
    price: 1000,
  },
  {
    key: "3",
    photo:
      "https://media.e-valy.com/cms/products/images/0323de20-17d4-453a-a26c-223c2323f2d8",
    name: "Desktop",
    price: 6000,
  },
];

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const Row: React.FC<RowProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props["data-row-key"] });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners]
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

const TopSaleingItems: React.FC = () => {
  const [dataSource, setDataSource] = React.useState<DataType[]>(initialData);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex(
          (record) => record.key === active.id
        );
        const overIndex = prevState.findIndex(
          (record) => record.key === over?.id
        );
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  return (
    <div className="space-y-3 mt-2">
      <DashboardTitle title={"Top Saleing Items"} />
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={dataSource.map((i) => i.key)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            rowKey="key"
            components={{ body: { row: Row } }}
            columns={columns}
            dataSource={dataSource}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TopSaleingItems;
