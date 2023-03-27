import {useRouter} from "next/router";
import {useCallback, useEffect} from "react";
import ReactFlow, {useNodesState, useEdgesState, addEdge, Edge, Connection} from "reactflow";
import NovelLayout from "@/components/layouts/NovelLayout";

import "reactflow/dist/style.css";

const initialNodes = [
  {id: "1", position: {x: 100, y: 100}, data: {label: "1"}},
  {id: "2", position: {x: 150, y: 300}, data: {label: "2"}},
  {id: "3", position: {x: 300, y: 700}, data: {label: "3"}},
  {id: "이거보이나?", position: {x: 450, y: 400}, data: {label: "4"}},
  {id: "5", position: {x: 500, y: 500}, data: {label: "5"}},
  {id: "6", position: {x: 650, y: 300}, data: {label: "6"}},
];
const initialEdges = [
  {id: "e1-2", source: "1", target: "2"},
  {id: "e2-3", source: "2", target: "3"},
  {id: "e4-2", source: "4", target: "2"},
];

export default function MindMap() {
  const router = useRouter();
  const {id} = router.query as {id: string};

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  useEffect(() => {
    console.log(edges);
  }, [edges]);

  return (
    <NovelLayout id={id}>
      <div className="h-full w-full">
        <h1>Mind map</h1>
        <div className="flex h-full w-full items-center justify-center">
          <section className="h-2/3 w-2/3 border border-black bg-white">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              panOnDrag={false}
              zoomOnScroll={false}
              zoomOnPinch={false}
            />
          </section>
        </div>
      </div>
    </NovelLayout>
  );
}
